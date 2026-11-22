export interface Property {
  id: string;
  title: string;
  district: string;
  subdistrict: string;
  type: "Villa" | "Penthouse" | "Mansion" | "Duplex";
  status: "Exclusive" | "Off-Market" | "Just Listed" | "Off-Plan";
  priceAED: number;
  priceUSD: number;
  bedrooms: number;
  bathrooms: number;
  builtUpSqFt: number;
  plotSqFt?: number;
  featured: boolean;
  description: string;
  architecturalHighlights: string[];
  amenities: string[];
  completionYear?: string;
  agent: {
    name: string;
    role: string;
    phone: string;
    whatsapp: string;
  };
}

export const PROPERTIES: Property[] = [
  {
    id: "the-frond-horizon-villa",
    title: "The Frond Horizon Signature Villa",
    district: "Palm Jumeirah",
    subdistrict: "Frond N",
    type: "Villa",
    status: "Exclusive",
    priceAED: 68000000,
    priceUSD: 18515000,
    bedrooms: 5,
    bathrooms: 7,
    builtUpSqFt: 12400,
    plotSqFt: 15800,
    featured: true,
    description:
      "Commanding uninterrupted horizons over the Arabian Gulf, this bespoke residence marries private sandy shores with sculptural Italian travertine architecture. Custom floor-to-ceiling Schuco structural glass unites indoor and outdoor wellness spaces.",
    architecturalHighlights: [
      "Custom Commission by Milanese Studio (2025)",
      "Triple-height gallery atrium with suspended bronze staircase",
      "Private 22-meter infinity pool flush with private beach",
      "Subterranean temperature-regulated wine vault for 1,200 bottles",
    ],
    amenities: [
      "Direct Private Beach Access",
      "Private Marina Berth",
      "Wellness Spa & Turkish Hammam",
      "4-Vehicle Climate Controlled Garage",
      "Staff Quarters (Driver & Maids)",
    ],
    agent: {
      name: "Tariq Al-Rashid",
      role: "Managing Partner · Palm Jumeirah",
      phone: "+971 4 800 9000",
      whatsapp: "+971500000000",
    },
  },
  {
    id: "the-palm-crown-penthouse",
    title: "The Palm Crown Sky Penthouse",
    district: "Palm Jumeirah",
    subdistrict: "Crescent",
    type: "Penthouse",
    status: "Just Listed",
    priceAED: 84000000,
    priceUSD: 22870000,
    bedrooms: 4,
    bathrooms: 6,
    builtUpSqFt: 8950,
    featured: true,
    description:
      "Hovering above the Crescent with panoramic dual-aspect vistas of the open ocean and the Dubai skyline. Features a cantilevered glass-bottom lap pool on a private 3,000 sq ft wrap-around sky terrace.",
    architecturalHighlights: [
      "360-degree dual aspect water & skyline panoramas",
      "Cantilevered private sky pool",
      "Poliform customized gourmet show kitchen & back catering kitchen",
      "Biometric private elevator arrival direct to residence",
    ],
    amenities: [
      "Private Sky Pool",
      "Dedicated Valet & Concierge",
      "Branded 5-Star Spa Access",
      "3 Allocated Underground Bays",
    ],
    agent: {
      name: "Tariq Al-Rashid",
      role: "Managing Partner · Palm Jumeirah",
      phone: "+971 4 800 9000",
      whatsapp: "+971500000000",
    },
  },
  {
    id: "signature-meadow-mansion",
    title: "The Montgomerie Fairway Estate",
    district: "Emirates Hills",
    subdistrict: "Sector E",
    type: "Mansion",
    status: "Off-Market",
    priceAED: 115000000,
    priceUSD: 31315000,
    bedrooms: 6,
    bathrooms: 8,
    builtUpSqFt: 16200,
    plotSqFt: 28500,
    featured: true,
    description:
      "Positioned along the 18th fairway of the Montgomerie Championship Golf Course, this secluded classical estate is ensconced in mature manicured olive groves with an illuminated reflecting pool.",
    architecturalHighlights: [
      "Acres of private manicured grounds with 100-year-old Andalusian olive trees",
      "Double-height rotunda foyer finished in French limestone",
      "Private cinema suite with Dolby Atmos acoustic dampening",
      "Full professional tennis & padel court on-site",
    ],
    amenities: [
      "Championship Golf Views",
      "Championship Padel Court",
      "Indoor Lap Pool & Outdoor Lagoon",
      "Gated Motor Court for 10 Vehicles",
    ],
    agent: {
      name: "Victoria Kensington",
      role: "Senior Partner · Emirates Hills",
      phone: "+971 4 800 9000",
      whatsapp: "+971500000000",
    },
  },
  {
    id: "bulgari-marina-duplex",
    title: "Bulgari Private Marina Duplex",
    district: "Jumeirah Bay Island",
    subdistrict: "Bulgari Residences",
    type: "Duplex",
    status: "Exclusive",
    priceAED: 62000000,
    priceUSD: 16880000,
    bedrooms: 3,
    bathrooms: 4,
    builtUpSqFt: 6400,
    featured: true,
    description:
      "An ultra-rare offering within the private Bulgari enclave on Jumeirah Bay Island. Direct yacht slip ownership, Antonio Citterio interior fittings, and private beach club privilege.",
    architecturalHighlights: [
      "Designed by Antonio Citterio Patricia Viel",
      "Floor-to-ceiling glass wrapping the private yacht basin",
      "Book-matched Arabescato marble baths with ocean outlooks",
      "Private mooring for up to 40-meter vessel",
    ],
    amenities: [
      "Private Yacht Slip",
      "Bulgari Yacht Club Membership",
      "24/7 In-Residence Dining",
      "Exclusive Gated Island Security",
    ],
    agent: {
      name: "Alexander von Berg",
      role: "Director · Jumeirah Bay Island",
      phone: "+971 4 800 9000",
      whatsapp: "+971500000000",
    },
  },
  {
    id: "downtown-opera-sky-villa",
    title: "The Opera District Sky Villa",
    district: "Downtown Dubai",
    subdistrict: "Opera District",
    type: "Penthouse",
    status: "Just Listed",
    priceAED: 46000000,
    priceUSD: 12525000,
    bedrooms: 4,
    bathrooms: 5,
    builtUpSqFt: 7800,
    featured: false,
    description:
      "Perched directly opposite Burj Khalifa and the Dubai Fountains. Features dramatic 6-meter ceiling heights, private art gallery hallway, and sound-engineered music salon.",
    architecturalHighlights: [
      "Front-row unobstructed Burj Khalifa & Fountain views",
      "6-meter double-volume formal reception salon",
      "Museum-grade lighting integration for contemporary art collections",
    ],
    amenities: [
      "Burj Khalifa Vistas",
      "Direct Dubai Opera Pedestrian Link",
      "Private Infinity Edge Terrace",
      "Dedicated Sommelier Services",
    ],
    agent: {
      name: "Tariq Al-Rashid",
      role: "Managing Partner",
      phone: "+971 4 800 9000",
      whatsapp: "+971500000000",
    },
  },
  {
    id: "dubai-hills-fairway-mansion",
    title: "Dubai Hills Grove Fairway Residence",
    district: "Dubai Hills Estate",
    subdistrict: "Dubai Hills Grove",
    type: "Mansion",
    status: "Off-Market",
    priceAED: 58000000,
    priceUSD: 15790000,
    bedrooms: 6,
    bathrooms: 8,
    builtUpSqFt: 14200,
    plotSqFt: 22000,
    featured: false,
    description:
      "Sited in the ultra-exclusive 'Street of Dreams', this clean-lined modern mansion overlooks rolling greens with the Downtown skyline glistening on the northern horizon.",
    architecturalHighlights: [
      "Seamless indoor-outdoor sliding glass pocket doors",
      "Basement car gallery showroom for 6 collector automobiles",
      "Rooftop entertaining deck with firepit and jacuzzi",
    ],
    amenities: [
      "Fairway Frontage",
      "Car Collector Showroom",
      "Private Gym & Ice Bath",
      "Rooftop Sunset Lounge",
    ],
    agent: {
      name: "Victoria Kensington",
      role: "Senior Partner",
      phone: "+971 4 800 9000",
      whatsapp: "+971500000000",
    },
  },
  {
    id: "bulgari-lighthouse-sky-palace",
    title: "Bulgari Lighthouse Sovereign Sky Palace",
    district: "Jumeirah Bay Island",
    subdistrict: "Bulgari Lighthouse",
    type: "Penthouse",
    status: "Off-Market",
    priceAED: 145000000,
    priceUSD: 39480000,
    bedrooms: 5,
    bathrooms: 7,
    builtUpSqFt: 11650,
    featured: true,
    description:
      "Hovering atop Antonio Citterio's architectural beacon on Jumeirah Bay Island. Features 360-degree coral-reef ocean horizons, private rooftop infinity pool, and dedicated 50-meter superyacht berth.",
    architecturalHighlights: [
      "Antonio Citterio Patricia Viel signature architecture",
      "Private full-floor sky penthouse with private high-speed biometric elevator",
      "Cantilevered rooftop plunge pool overlooking Burj Al Arab",
      "Direct owner access to private Bulgari Yacht Club marina",
    ],
    amenities: [
      "50-Meter Superyacht Berth",
      "Bulgari Private Beach Club Access",
      "24/7 Butler & Sommelier Service",
      "Subterranean 4-Bay Private Garage",
    ],
    agent: {
      name: "Alexander von Berg",
      role: "Director · Jumeirah Bay Island",
      phone: "+971 4 800 9000",
      whatsapp: "+971500000000",
    },
  },
  {
    id: "the-lana-dorchester-residences",
    title: "The Lana Dorchester Collection Sky Villa",
    district: "Downtown Dubai",
    subdistrict: "Marasi Bay",
    type: "Duplex",
    status: "Exclusive",
    priceAED: 52000000,
    priceUSD: 14160000,
    bedrooms: 4,
    bathrooms: 5,
    builtUpSqFt: 8200,
    featured: true,
    description:
      "Managed by the iconic Dorchester Collection with interiors by Gilles & Boissier. Floor-to-ceiling panoramic glass captures the entire Downtown skyline and the private Marasi marina.",
    architecturalHighlights: [
      "Interiors curated by Paris-based Gilles & Boissier",
      "Double-height 7-meter living gallery with Italian Calacatta marble",
      "Full hotel service integration with Michelin-starred in-residence dining",
    ],
    amenities: [
      "Dorchester Collection Concierge",
      "Private Marina Berth Access",
      "Rooftop Infinity Pool & Dior Spa",
      "Chauffeured Rolls-Royce House Car",
    ],
    agent: {
      name: "Tariq Al-Rashid",
      role: "Managing Partner",
      phone: "+971 4 800 9000",
      whatsapp: "+971500000000",
    },
  },
];

export const COMMUNITIES = [
  {
    id: "palm-jumeirah",
    name: "Palm Jumeirah",
    tagline: "The World's Eighth Wonder",
    roiYield: "6.8% Prime Yield",
    avgPriceSqFt: "AED 6,200",
    startingPrice: "AED 18,000,000",
    description:
      "The undisputed global emblem of beachfront luxury living. A palm-tree shaped archipelago offering private beachfront frond villas, branded crescent penthouses, and superyacht marinas.",
    landmarks: ["Atlantis The Royal", "One&Only The Palm", "Nakheel Mall Marina"],
  },
  {
    id: "downtown-dubai",
    name: "Downtown Dubai",
    tagline: "The Center of Now",
    roiYield: "7.4% Prime Yield",
    avgPriceSqFt: "AED 4,800",
    startingPrice: "AED 12,000,000",
    description:
      "The cosmopolitan epicenter of Dubai anchored by Burj Khalifa, Dubai Mall, and Dubai Opera. Home to prime sky villas with legendary fountain and architectural vistas.",
    landmarks: ["Burj Khalifa", "Dubai Opera", "Fashion Avenue"],
  },
  {
    id: "emirates-hills",
    name: "Emirates Hills",
    tagline: "The Beverly Hills of Dubai",
    roiYield: "5.5% Prime Yield",
    avgPriceSqFt: "AED 5,100",
    startingPrice: "AED 45,000,000",
    description:
      "Dubai's most prestigious gated golf community, offering bespoke private mansions on multi-acre estates overlooking the championship Montgomerie course.",
    landmarks: ["Montgomerie Golf Club", "Address Montgomerie", "Private Lakes"],
  },
  {
    id: "jumeirah-bay-island",
    name: "Jumeirah Bay Island",
    tagline: "Seahorse Island of Seclusion",
    roiYield: "6.2% Prime Yield",
    avgPriceSqFt: "AED 12,500",
    startingPrice: "AED 60,000,000",
    description:
      "A sculptured offshore sanctuary connected to Jumeirah beach by a private bridge. The ultimate address for privacy, housing the Bulgari Resort and private marina residences.",
    landmarks: ["Bulgari Resort & Residences", "Bulgari Yacht Club", "Private Marina"],
  },
  {
    id: "dubai-hills-estate",
    name: "Dubai Hills Estate",
    tagline: "The Green Heart of Dubai",
    roiYield: "7.1% Prime Yield",
    avgPriceSqFt: "AED 3,200",
    startingPrice: "AED 9,500,000",
    description:
      "A vast master-planned green community framed around an 18-hole championship golf course, featuring modern mansions along the prestigious Street of Dreams.",
    landmarks: ["Dubai Hills Golf Club", "Dubai Hills Park", "King's College Hospital"],
  },
  {
    id: "difc",
    name: "DIFC Gate District",
    tagline: "Global Financial Prestige",
    roiYield: "7.8% Prime Yield",
    avgPriceSqFt: "AED 4,100",
    startingPrice: "AED 8,500,000",
    description:
      "The leading international financial hub in the Middle East, offering world-renowned Michelin-starred dining, Christie's auction gallery, and branded penthouses.",
    landmarks: ["The Gate Building", "Gate Village Art Galleries", "Zuma & LPM"],
  },
];

export const AGENTS = [
  {
    id: "tariq-al-rashid",
    name: "Tariq Al-Rashid",
    role: "Managing Partner · Ultra-Prime Palm & Waterfront",
    experience: "14 Years in Dubai",
    volume: "AED 1.8B+ Career Sales",
    languages: ["English", "Arabic", "French"],
    rera: "BRN: 39482 · ORN: 29481",
    bio: "Specializing exclusively in Palm Jumeirah frond villas and prime waterfront penthouses, Tariq has represented some of the most prominent transactions in Dubai’s history.",
  },
  {
    id: "victoria-kensington",
    name: "Victoria Kensington",
    role: "Senior Partner · Emirates Hills & Golf Estates",
    experience: "11 Years in Dubai",
    volume: "AED 1.4B+ Career Sales",
    languages: ["English", "German", "Russian"],
    rera: "BRN: 41829 · ORN: 29481",
    bio: "Victoria advises high-profile European family offices and tech entrepreneurs seeking substantial acreage, privacy, and golf fairway frontages in Emirates Hills and Dubai Hills.",
  },
  {
    id: "alexander-von-berg",
    name: "Alexander von Berg",
    role: "Director · Jumeirah Bay Island & Private Vault",
    experience: "12 Years in Dubai",
    volume: "AED 2.1B+ Career Sales",
    languages: ["English", "German", "Italian"],
    rera: "BRN: 28910 · ORN: 29481",
    bio: "Head of the Velvet Key Private Vault, Alexander coordinates strictly off-market mandates, trophy island plots, and bespoke developer equity partnerships.",
  },
];
