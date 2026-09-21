import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Maximize2, Compass, Eye } from 'lucide-react';
import { portfolioItems } from '../data/portfolioData';
import { soundManager } from '../utils/audio';
import { SplitTextReveal, FadeInScroll } from './AnimatedText';

export default function Exhibition3D({ onOpenLightbox }) {
  const mountRef = useRef(null);
  const [selectedFrameIndex, setSelectedFrameIndex] = useState(0);
  const [cameraMode, setCameraMode] = useState('orbit'); // 'orbit', 'focus', 'wide'
  const [isSceneReady, setIsSceneReady] = useState(false);
  const isInteracting = useRef(false);

  // References to communicate with Three.js render loop
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const framesGroupRef = useRef(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });
  const targetCamPos = useRef(new THREE.Vector3(0, 0, 9));
  const currentCamPos = useRef(new THREE.Vector3(0, 0, 9));
  const isVisibleRef = useRef(true);

  // Curated 6 masterpieces for the 3D spatial exhibition
  const exhibitionArtworks = portfolioItems.slice(0, 6);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    // Track intersection to pause render loop when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05, rootMargin: '100px 0px 100px 0px' }
    );
    observer.observe(container);

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x070707);
    scene.fog = new THREE.FogExp2(0x070707, 0.07);
    sceneRef.current = scene;

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 9);
    cameraRef.current = camera;

    // 3. High-Performance WebGL Renderer with Adaptive Pixel Ratio
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: false,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isMobile ? 1.0 : Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Context loss resiliency
    const handleContextLost = (e) => {
      e.preventDefault();
      console.warn('WebGL context lost');
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost, false);

    // 4. Museum Architectural Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const keyLight = new THREE.SpotLight(0xfff5e6, 3.5, 30, Math.PI / 4, 0.5, 1);
    keyLight.position.set(5, 8, 8);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xddeeff, 1.2);
    rimLight.position.set(-5, -4, -4);
    scene.add(rimLight);

    // 5. Museum Floor Grid Reflection
    const gridHelper = new THREE.GridHelper(30, isMobile ? 15 : 30, 0x333338, 0x151518);
    gridHelper.position.y = -2.6;
    scene.add(gridHelper);

    // 6. Floating Minimalist Photographic Frames Group
    const framesGroup = new THREE.Group();
    framesGroupRef.current = framesGroup;
    scene.add(framesGroup);

    const textureLoader = new THREE.TextureLoader();
    const frameMeshes = [];
    const createdMaterials = [];
    const createdGeometries = [];
    const createdTextures = [];

    // Shared Geometries & Materials for Performance & Memory
    const planeGeo = new THREE.PlaneGeometry(2.4, 3.2);
    const frameBackingGeo = new THREE.BoxGeometry(2.55, 3.35, 0.08);
    createdGeometries.push(planeGeo, frameBackingGeo);

    const frameBackingMat = new THREE.MeshStandardMaterial({
      color: 0x111113,
      roughness: 0.8,
      metalness: 0.2
    });
    createdMaterials.push(frameBackingMat);

    // Arrange 6 frames in a gentle circular gallery arc
    const radius = 5.2;
    exhibitionArtworks.forEach((art, i) => {
      const angle = (i / exhibitionArtworks.length) * Math.PI * 2;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius - 2;

      // Sized texture for performance
      const textureUrl = `${art.image}&w=900`;
      const texture = textureLoader.load(textureUrl, () => {
        if (i === 0) setIsSceneReady(true);
      });
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      createdTextures.push(texture);

      const planeMat = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.25,
        metalness: 0.1,
        side: THREE.DoubleSide
      });
      createdMaterials.push(planeMat);

      const artMesh = new THREE.Mesh(planeGeo, planeMat);
      const backingMesh = new THREE.Mesh(frameBackingGeo, frameBackingMat);
      backingMesh.position.z = -0.045;

      const singleFrameGroup = new THREE.Group();
      singleFrameGroup.add(artMesh);
      singleFrameGroup.add(backingMesh);

      singleFrameGroup.position.set(x, 0, z);
      singleFrameGroup.lookAt(0, 0, 0);
      singleFrameGroup.userData = { index: i, item: art };

      framesGroup.add(singleFrameGroup);
      frameMeshes.push(singleFrameGroup);
    });

    // 7. Ambient Micro-particles (Subtle museum dust floating in light beam)
    const particleCount = isMobile ? 80 : 180;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 16;
      positions[i + 1] = (Math.random() - 0.5) * 8;
      positions[i + 2] = (Math.random() - 0.5) * 16;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    createdGeometries.push(particleGeo);

    const particleMat = new THREE.PointsMaterial({
      color: 0xcccccc,
      size: isMobile ? 0.05 : 0.04,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });
    createdMaterials.push(particleMat);

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 8. Mouse & Pointer Interaction with Cached Bounds (Zero Layout Thrashing)
    let isMouseDown = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let cachedRect = container.getBoundingClientRect();

    const updateCachedRect = () => {
      if (container) cachedRect = container.getBoundingClientRect();
    };

    const handlePointerDown = (e) => {
      isMouseDown = true;
      prevMouseX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      prevMouseY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
      isInteracting.current = true;
    };

    const handlePointerMove = (e) => {
      if (!isMouseDown) {
        // Gentle hover parallax (desktop only)
        if (!isMobile && cachedRect.width > 0) {
          const clientX = e.clientX || 0;
          const clientY = e.clientY || 0;
          const normX = (clientX - cachedRect.left) / cachedRect.width - 0.5;
          const normY = (clientY - cachedRect.top) / cachedRect.height - 0.5;
          targetRotation.current.y = normX * 0.4;
          targetRotation.current.x = normY * 0.2;
        }
        return;
      }

      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
      const deltaX = clientX - prevMouseX;
      const deltaY = clientY - prevMouseY;

      targetRotation.current.y += deltaX * 0.008;
      targetRotation.current.x = Math.max(-0.4, Math.min(0.4, targetRotation.current.x + deltaY * 0.005));

      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    container.addEventListener('mouseenter', updateCachedRect, { passive: true });

    const handlePointerUp = () => {
      isMouseDown = false;
      isInteracting.current = false;
    };

    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    container.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    // Resize Observer with debounce
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!container || !camera || !renderer) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    // 9. High-Performance Render Loop with Visibility Culling
    let startTime = performance.now();
    let animId;

    const animate = (timestamp) => {
      animId = requestAnimationFrame(animate);

      // Skip render if off-screen or tab is backgrounded
      if (!isVisibleRef.current || document.hidden) {
        return;
      }

      const elapsedTime = (timestamp - startTime) * 0.001;

      // Smooth camera and group rotation lerp
      currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.08;
      currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.08;

      if (framesGroup) {
        framesGroup.rotation.y = currentRotation.current.y;
        framesGroup.rotation.x = currentRotation.current.x;

        // Gentle floating levitation physics for each frame
        frameMeshes.forEach((mesh, idx) => {
          mesh.position.y = Math.sin(elapsedTime * 1.2 + idx * 1.1) * 0.08;
        });
      }

      // Smooth camera position transitions
      currentCamPos.current.lerp(targetCamPos.current, 0.06);
      camera.position.copy(currentCamPos.current);

      // Rotate ambient micro-particles
      if (particles) {
        particles.rotation.y = elapsedTime * 0.02;
      }

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    // Comprehensive Resource Disposal on Unmount
    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mouseenter', updateCachedRect);
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      container.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);

      if (renderer.domElement) {
        renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }

      createdGeometries.forEach(geo => geo.dispose());
      createdMaterials.forEach(mat => mat.dispose());
      createdTextures.forEach(tex => tex.dispose());
      gridHelper.geometry.dispose();
      renderer.dispose();
    };
  }, []);

  // Frame Selection & Camera Orbit Pivot
  const focusFrame = (index) => {
    setSelectedFrameIndex(index);
    soundManager.playApertureClick();

    const angle = -(index / exhibitionArtworks.length) * Math.PI * 2;
    targetRotation.current.y = angle;
    targetRotation.current.x = 0;
  };

  const handleModeChange = (mode) => {
    setCameraMode(mode);
    soundManager.playApertureClick();
    if (mode === 'orbit') {
      targetCamPos.current.set(0, 0, 9);
    } else if (mode === 'focus') {
      targetCamPos.current.set(0, 0, 5.8);
    } else if (mode === 'wide') {
      targetCamPos.current.set(0, 2, 12);
    }
  };

  const activeArtwork = exhibitionArtworks[selectedFrameIndex] || exhibitionArtworks[0];

  return (
    <section id="exhibition3d" className="relative bg-[#070707] text-[#ECEBE6] py-24 md:py-32 border-t border-white/10 overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <FadeInScroll delay={0.1} direction="left">
              <div className="flex items-center space-x-3 font-mono text-xs tracking-[0.3em] text-neutral-400 mb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>SECTION 02 / SPATIAL 3D EXHIBITION</span>
              </div>
            </FadeInScroll>
            <SplitTextReveal
              as="h2"
              delay={0.15}
              className="font-display text-4xl sm:text-6xl md:text-7xl font-light tracking-[0.1em] text-white"
            >
              VIRTUAL GALLERY.
            </SplitTextReveal>
            <FadeInScroll delay={0.3} direction="up">
              <p className="font-serif italic text-lg text-neutral-400 mt-2 font-light max-w-xl">
                An interactive 3D spatial rotunda featuring floating medium-format plates in calibrated museum illumination.
              </p>
            </FadeInScroll>
          </div>

          {/* Camera Perspective Angle Switchers */}
          <div className="flex items-center space-x-2 font-mono text-[10px] tracking-widest bg-neutral-900/80 p-1.5 border border-white/10 backdrop-blur-md">
            {[
              { id: 'orbit', label: 'STANDARD' },
              { id: 'focus', label: 'CLOSE-UP' },
              { id: 'wide', label: 'ELEVATION' }
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => handleModeChange(m.id)}
                data-cursor="hover"
                className={`px-3 py-1.5 uppercase transition-all ${
                  cameraMode === m.id
                    ? 'bg-white text-black font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3D WebGL Canvas Viewport Stage */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div
          ref={mountRef}
          data-cursor="drag"
          data-cursor-text="ORBIT 3D"
          className="relative h-[65vh] sm:h-[72vh] w-full bg-[#08080a] border border-white/15 overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.95)]"
        >
          {/* Top Stage Badges */}
          <div className="absolute top-6 left-6 z-20 pointer-events-none flex items-center space-x-3 font-mono text-[10px] tracking-widest text-neutral-400 bg-black/60 backdrop-blur-md px-3.5 py-2 border border-white/10">
            <Compass className="w-3.5 h-3.5 text-white animate-spin" style={{ animationDuration: '16s' }} />
            <span>INTERACTIVE 3D WEBGL ROTUNDA • DRAG TO ROTATE</span>
          </div>

          {/* Interactive Frame Navigator Pills */}
          <div className="absolute top-6 right-6 z-20 flex items-center space-x-1.5 font-mono text-[11px] bg-black/70 backdrop-blur-md p-1 border border-white/10">
            {exhibitionArtworks.map((art, idx) => (
              <button
                key={art.id}
                onClick={() => focusFrame(idx)}
                data-cursor="hover"
                className={`w-7 h-7 flex items-center justify-center transition-all ${
                  selectedFrameIndex === idx
                    ? 'bg-white text-black font-bold'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          {/* Bottom Active Artwork Information Card HUD */}
          <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col md:flex-row items-start md:items-end justify-between gap-4 p-6 bg-black/75 backdrop-blur-md border border-white/10">
            <div className="space-y-1">
              <div className="font-mono text-[10px] tracking-[0.3em] text-neutral-400 uppercase">
                PLATE {selectedFrameIndex + 1} OF {exhibitionArtworks.length} • {activeArtwork.category}
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-light text-white tracking-wide">
                {activeArtwork.title}
              </h3>
              <p className="font-serif italic text-sm text-neutral-300">
                {activeArtwork.subtitle} — <span className="font-sans not-italic text-xs text-neutral-400">{activeArtwork.location} ({activeArtwork.year})</span>
              </p>
              <div className="hidden sm:flex items-center space-x-4 font-mono text-[10px] text-neutral-400 pt-1">
                <span>{activeArtwork.exif.camera}</span>
                <span>•</span>
                <span>{activeArtwork.exif.lens}</span>
                <span>•</span>
                <span>{activeArtwork.exif.exposure}</span>
              </div>
            </div>

            {/* Lightbox Trigger for focused 3D Artwork */}
            <button
              onClick={() => onOpenLightbox && onOpenLightbox(activeArtwork)}
              data-cursor="view"
              data-cursor-text="INSPECT"
              className="flex items-center space-x-3 bg-white text-black px-5 py-3 font-mono text-xs tracking-widest uppercase font-bold hover:bg-[#E2DFD2] transition-colors"
            >
              <span>INSPECT 4K</span>
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
