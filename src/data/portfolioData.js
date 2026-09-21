export const photographerProfile = {
  name: "NOA VÉRITÉ",
  title: "Master Photographer & Visual Director",
  headline: "LIGHT / FORM / HUMAN.",
  subtext: "Selected work by Noa Vérité.",
  locations: ["Paris", "Tokyo", "New York", "Milan"],
  bio: "Noa Vérité is an internationally celebrated photographer and visual director whose work investigates the tension between sculptural human anatomy, austere modern architecture, and the emotional purity of natural light. Spanning haute couture editorial, museum retrospective monographs, and fine-art portraiture, Vérité's compositions are distinguished by severe geometric precision and profound poetic intimacy.",
  representation: [
    { city: "Paris (Global HQ)", agency: "Maison Vérité & Associés", contact: "atelier@noaverite.com", phone: "+33 1 42 68 55 00" },
    { city: "New York", agency: "Art + Commerce New York", contact: "ny@noaverite.com", phone: "+1 212 555 0192" },
    { city: "Tokyo", agency: "Aoyama Visual Consortium", contact: "tokyo@noaverite.com", phone: "+81 3 5412 8800" },
    { city: "London", agency: "Dazed & Curated Artists", contact: "london@noaverite.com", phone: "+44 20 7946 0850" }
  ],
  stats: [
    { value: "18+", label: "Years of Practice" },
    { value: "24", label: "Museum Solo Exhibitions" },
    { value: "6", label: "Steidl Monographs" },
    { value: "48", label: "International Awards" }
  ]
};

export const categories = [
  { id: "all", label: "All Works", count: 18 },
  { id: "fashion", label: "Fashion", count: 6 },
  { id: "portraits", label: "Portraits", count: 5 },
  { id: "editorial", label: "Editorial", count: 4 },
  { id: "motion", label: "Motion / Film", count: 3 }
];

export const portfolioItems = [
  {
    id: "pv-01",
    title: "Maison De L'Ombre",
    subtitle: "Autumn / Winter Haute Couture Campaign",
    category: "fashion",
    year: "2025",
    location: "Paris, France",
    client: "Maison Margiela / Vogue Paris",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1600&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1400&auto=format&fit=crop",
    aspect: "tall",
    isHero: true,
    exif: {
      camera: "Phase One IQ4 150MP Achromatic",
      lens: "Schneider Kreuznach 80mm LS f/2.8",
      exposure: "1/250s at f/4.0",
      iso: "ISO 100",
      filmStock: "Medium Format Digital Sensor",
      lighting: "Single Profoto B10X Plus with 5ft Octa & Silver Reflector"
    },
    curatorNote: "An exploration of draped Japanese raw wool against cold architectural concrete. The composition uses high-contrast tonal transitions to carve the silhouette like a Rodin sculpture.",
    awards: ["Grand Prix du Festival de la Mode Hyères 2025", "PDN Annual Winner"]
  },
  {
    id: "pv-02",
    title: "The Sovereign Gaze",
    subtitle: "Monograph Series: Volume IV",
    category: "portraits",
    year: "2025",
    location: "Reykjavik, Iceland",
    client: "Steidl Publications / Palais de Tokyo",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1600&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1400&auto=format&fit=crop",
    aspect: "wide",
    isHero: true,
    exif: {
      camera: "Hasselblad H6D-100c",
      lens: "HC 2,2/100mm",
      exposure: "1/500s at f/2.2",
      iso: "ISO 64",
      filmStock: "120mm Kodak Tri-X 400 pushed to 800",
      lighting: "Diffused Arctic Midnight Sun"
    },
    curatorNote: "Stripped of ornament and post-production embellishment, this portrait captures the fierce vulnerability of human gaze under subpolar daylight.",
    awards: ["Taylor Wessing Photographic Portrait Prize Nominee"]
  },
  {
    id: "pv-03",
    title: "Brutalist Silk",
    subtitle: "Architectural Fashion Study",
    category: "fashion",
    year: "2024",
    location: "Kyoto, Japan",
    client: "Issey Miyake / Dazed Magazine",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1400&auto=format&fit=crop",
    aspect: "tall",
    isHero: false,
    exif: {
      camera: "Leica S3 Medium Format",
      lens: "Summarit-S 70mm f/2.5 ASPH CS",
      exposure: "1/125s at f/5.6",
      iso: "ISO 200",
      filmStock: "Digital Medium Format Maestro II",
      lighting: "Natural Zen garden dappled shadow"
    },
    curatorNote: "Pleated micro-textiles set against weathered cedar and poured concrete. Fluid motion suspended in absolute mathematical stillness.",
    awards: ["Tokyo ADC Photographic Grand Award"]
  },
  {
    id: "pv-04",
    title: "Nocturne in Venice",
    subtitle: "35mm Anamorphic Visual Poem",
    category: "motion",
    year: "2025",
    location: "Venice, Italy",
    client: "Venice International Biennale of Art",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1600&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1520106212299-d99c443e4568?q=80&w=1400&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-silhouette-of-a-person-in-the-fog-at-night-42861-large.mp4",
    aspect: "wide",
    isHero: true,
    exif: {
      camera: "ARRI Alexa Mini LF",
      lens: "Cooke Anamorphic /i Full Frame Plus 40mm",
      exposure: "1/48s (180° Shutter)",
      iso: "EI 800",
      filmStock: "ARRIRAW Open Gate 4.5K",
      lighting: "Sodium vapor reflections on lagoon water"
    },
    curatorNote: "A 4-minute slow-cinema meditation on Venice at 3:00 AM under dense marine fog. Light leaks generated naturally through vintage uncoated anamorphic glass.",
    awards: ["Cannes Lion Silver Craft (Cinematography)"]
  },
  {
    id: "pv-05",
    title: "The Sculptor's Muse",
    subtitle: "Human Geometry in Raw Form",
    category: "portraits",
    year: "2024",
    location: "Milan, Italy",
    client: "Fondazione Prada / Vanity Fair",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1600&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1400&auto=format&fit=crop",
    aspect: "tall",
    isHero: false,
    exif: {
      camera: "Leica M11 Monochrom",
      lens: "Noctilux-M 50mm f/0.95 ASPH",
      exposure: "1/1000s at f/1.2",
      iso: "ISO 125",
      filmStock: "Dedicated B&W Full-Frame CMOS",
      lighting: "Direct Northern studio northlight skylight"
    },
    curatorNote: "The chiaroscuro of skin texture and bone structure treated with the monumental weight of Carrara marble.",
    awards: ["Prix Pictet Shortlist 2024"]
  },
  {
    id: "pv-06",
    title: "Vogue Scandinavia: The Solstice Issue",
    subtitle: "Front Cover & 18-Page Editorial",
    category: "editorial",
    year: "2025",
    location: "Lofoten, Norway",
    client: "Vogue Scandinavia",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1600&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1400&auto=format&fit=crop",
    aspect: "wide",
    isHero: true,
    exif: {
      camera: "Contax 645",
      lens: "Carl Zeiss Planar T* 80mm f/2.0",
      exposure: "1/125s at f/2.8",
      iso: "ISO 400",
      filmStock: "Fujichrome Provia 100F Cross-Processed",
      lighting: "Polar twilight reflection over fjord ice"
    },
    curatorNote: "A landmark editorial bridging high-tech sustainable thermal fashion with the unforgiving drama of Arctic granite cliffs.",
    awards: ["Editorial Cover of the Year — SPD Awards"]
  },
  {
    id: "pv-07",
    title: "Velvet Noir & Chromatic Shadows",
    subtitle: "Avant-Garde Tailoring",
    category: "fashion",
    year: "2024",
    location: "Berlin, Germany",
    client: "Balenciaga / 032c Magazine",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1600&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1400&auto=format&fit=crop",
    aspect: "tall",
    isHero: false,
    exif: {
      camera: "Hasselblad 907X 50C",
      lens: "XCD 45mm f/4 P",
      exposure: "1/60s at f/5.6",
      iso: "ISO 400",
      filmStock: "Hasselblad Medium Format",
      lighting: "Single tungsten spotlight with heavy smoke haze"
    },
    curatorNote: "Dark velvet textures absorbing nearly 99% of incident light, interrupted solely by surgical flashes of neon red gel.",
    awards: ["German Design Award (Visual Arts)"]
  },
  {
    id: "pv-08",
    title: "Anima Mundi",
    subtitle: "Experimental Dance & Physicality",
    category: "portraits",
    year: "2025",
    location: "London, UK",
    client: "Sadler's Wells Theatre & Royal Ballet",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1600&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=1400&auto=format&fit=crop",
    aspect: "wide",
    isHero: false,
    exif: {
      camera: "Leica SL3",
      lens: "APO-Summicron-SL 50mm f/2 ASPH",
      exposure: "1/2000s at f/2.0",
      iso: "ISO 800",
      filmStock: "BSI CMOS 60MP",
      lighting: "Strobe synchronized high-speed flash"
    },
    curatorNote: "Capturing the peak kinetic tension where biological musculature transforms into pure kinetic calligraphy.",
    awards: ["International Photography Awards (Gold)"]
  },
  {
    id: "pv-09",
    title: "Harper's Bazaar Art: The Minimalist Mind",
    subtitle: "Feature on Contemporary Sculptors",
    category: "editorial",
    year: "2024",
    location: "Zurich, Switzerland",
    client: "Harper's Bazaar Art Edition",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1600&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=1400&auto=format&fit=crop",
    aspect: "tall",
    isHero: false,
    exif: {
      camera: "Phase One XT Camera System",
      lens: "Rodenstock HR Digaron-W 32mm f/4.0",
      exposure: "1/30s at f/11",
      iso: "ISO 50",
      filmStock: "IQ4 150MP System",
      lighting: "Natural gallery skylight through frosted glass"
    },
    curatorNote: "Architectural harmony between the artist's weathered hands and unfinished raw granite monoliths.",
    awards: ["Swiss Design Awards Honorable Mention"]
  },
  {
    id: "pv-10",
    title: "Chronos & Silk (Visual Study)",
    subtitle: "Fluid Dynamics High-Speed Film",
    category: "motion",
    year: "2024",
    location: "New York, USA",
    client: "Lincoln Center for the Performing Arts",
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=1600&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1400&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-flowing-silk-fabric-in-slow-motion-41804-large.mp4",
    aspect: "wide",
    isHero: false,
    exif: {
      camera: "Phantom Flex4K High-Speed",
      lens: "Angénieux Optimo Anamorphic 56-152mm",
      exposure: "1/2000s at 1000fps",
      iso: "ISO 640",
      filmStock: "Phantom Raw 4K",
      lighting: "18kW HMI Fresnel Bank"
    },
    curatorNote: "1000 frames per second recording of pure unweighted silk moving through wind tunnels, revealing macro-level atmospheric turbulence.",
    awards: ["Aesthetica Short Film Festival Best Experimental"]
  },
  {
    id: "pv-11",
    title: "Monolith & Shadow",
    subtitle: "Brutalist Architecture in Madrid",
    category: "editorial",
    year: "2025",
    location: "Madrid, Spain",
    client: "Architectural Digest International",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1400&auto=format&fit=crop",
    aspect: "tall",
    isHero: false,
    exif: {
      camera: "Linhof Master Technika 4x5",
      lens: "Schneider Super-Symmar XL 110mm f/5.6",
      exposure: "2s at f/22",
      iso: "ISO 100",
      filmStock: "Ilford Delta 100 4x5 Sheet Film",
      lighting: "Late afternoon rake sunlight"
    },
    curatorNote: "Large format film view camera perspective shifts yielding razor-sharp convergence on monolithic post-modern concrete.",
    awards: ["ArchDaily Visual Awards 2025"]
  },
  {
    id: "pv-12",
    title: "Dazed: The Neo-Dadaists",
    subtitle: "Contemporary Youth Culture Series",
    category: "fashion",
    year: "2025",
    location: "London & Seoul",
    client: "Dazed Magazine",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=1400&auto=format&fit=crop",
    aspect: "tall",
    isHero: false,
    exif: {
      camera: "Mamiya RZ67 Pro II D",
      lens: "Mamiya Sekor Z 110mm f/2.8 W",
      exposure: "1/400s at f/4.0",
      iso: "ISO 400",
      filmStock: "Kodak Portra 400 Medium Format",
      lighting: "Direct ringflash mixed with urban neon"
    },
    curatorNote: "Raw unapologetic punk ethos filtered through strict geometric framing and saturated negative film chemistry.",
    awards: ["British Fashion Council New Wave Creative"]
  }
];

export const darkroomContactSheets = [
  {
    id: "cs-01",
    rollNumber: "ROLL_8492_PARIS_SS25",
    filmType: "KODAK TRI-X 400 (35MM / 36 EXP)",
    date: "OCTOBER 14, 2024",
    location: "PALAIS GALLIERA, PARIS",
    notes: "Frame 18 selected for Vogue Paris Cover. Heavy contrast in developer bath. Push 1 stop.",
    frames: [
      { frame: "14A", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop", selected: false, note: "Slight camera shake" },
      { frame: "15A", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600&auto=format&fit=crop", selected: false, note: "Eyes closed" },
      { frame: "16A", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600&auto=format&fit=crop", selected: false, note: "Composition balanced" },
      { frame: "17A", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop", selected: false, note: "Harsh backlight" },
      { frame: "18A", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop", selected: true, note: "HERO MASTER SHOT — PRINT #1" },
      { frame: "19A", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop", selected: false, note: "Light leak on left edge" }
    ]
  },
  {
    id: "cs-02",
    rollNumber: "ROLL_9901_TOKYO_ARCHIVE",
    filmType: "FUJICHROME VELVIA 50 (120MM FORMAT)",
    date: "NOVEMBER 02, 2024",
    location: "GINZA / SHINJUKU, TOKYO",
    notes: "Deep saturation on architectural panels. Extreme grain clarity.",
    frames: [
      { frame: "01", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop", selected: false, note: "Exposure -0.5 EV" },
      { frame: "02", image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=600&auto=format&fit=crop", selected: true, note: "EXCELLENT TEXTURE" },
      { frame: "03", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop", selected: false, note: "Subtle flare" },
      { frame: "04", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop", selected: false, note: "Good shadow detail" },
      { frame: "05", image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=600&auto=format&fit=crop", selected: true, note: "FEATURED MONOGRAPH" },
      { frame: "06", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop", selected: false, note: "Refraction artifact" }
    ]
  }
];

export const studioPhilosophy = [
  {
    number: "01",
    title: "Light as Raw Matter",
    description: "Light is not merely a tool for illumination; it is a physical, sculptural substance. We treat shadows with the same architectural intention as solid steel or carved marble."
  },
  {
    number: "02",
    title: "The Unrepeatable Moment",
    description: "In an era of synthetic generation, the grain of authentic film and the unpredictable physics of natural optics remain the ultimate testament to human presence."
  },
  {
    number: "03",
    title: "Monumental Restraint",
    description: "We eliminate the superfluous until only the essential geometry, emotional tension, and structural truth of the subject remain."
  },
  {
    number: "04",
    title: "Tactile Precision",
    description: "From custom hand-ground anamorphic glass to bespoke gelatin-silver darkroom chemistry, every detail is calibrated with uncompromising artisanal discipline."
  }
];

export const museumExhibitions = [
  { year: "2025", title: "Light / Form / Human (Retrospective)", venue: "Palais de Tokyo", city: "Paris, France", type: "Solo Exhibition" },
  { year: "2024", title: "The Sculptural Gaze", venue: "Mori Art Museum", city: "Tokyo, Japan", type: "Solo Exhibition" },
  { year: "2024", title: "Modernist Shadows", venue: "Tate Modern (Level 3 Gallery)", city: "London, UK", type: "Invited Group Exhibition" },
  { year: "2023", title: "Anatomy of Silence", venue: "Fondazione Prada", city: "Milan, Italy", type: "Commissioned Installation" },
  { year: "2023", title: "Achromatic Visions", venue: "MoMA PS1", city: "New York, USA", type: "Retrospective" },
  { year: "2022", title: "Monoliths in Motion", venue: "Venice Biennale of Architecture", city: "Venice, Italy", type: "National Pavilion" }
];

export const monographs = [
  { title: "LIGHT / FORM / HUMAN", publisher: "Steidl Verlag", year: "2025", pages: "384 Pages", details: "Linen clothbound, tri-tone print, edition of 2,500 numbered copies" },
  { title: "The Sovereign Gaze", publisher: "Thames & Hudson", year: "2023", pages: "296 Pages", details: "Japanese binding, silk-screened acetate slipcase" },
  { title: "Nocturnes in Silver Gelatin", publisher: "MACK Books", year: "2021", pages: "220 Pages", details: "Hand-tipped silver bromide prints, signed archival edition" }
];

export const cameraRigSpecs = [
  { category: "Primary Bodies", items: ["Hasselblad H6D-100c Medium Format", "Phase One IQ4 150MP Achromatic", "Leica M11 Monochrom", "ARRI Alexa Mini LF"] },
  { category: "Artisanal Glass", items: ["Carl Zeiss Planar 80mm f/2.0 T*", "Cooke Anamorphic /i 40mm & 75mm", "Leica Noctilux-M 50mm f/0.95 ASPH", "Rodenstock HR Digaron 32mm"] },
  { category: "Darkroom Chemistry", items: ["Custom Hydroquinone-Free Metol Developer", "Kodak D-76 Stock 1:1", "Selenium Archival Toning Bath", "Ilford Multigrade FB Warmtone"] }
];
