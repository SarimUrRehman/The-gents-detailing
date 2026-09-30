export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  shortDesc: string;
  duration: string;
  startingPrice: number;
  iconName:
    | 'Sparkles'
    | 'ShieldCheck'
    | 'Flame'
    | 'Scissors'
    | 'Droplets'
    | 'Armchair'
    | 'Sun'
    | 'Crown';
  highlights: string[];
}

export interface PackageTier {
  id: string;
  name: string;
  subtitle: string;
  basePrice: number;
  duration: string;
  popular?: boolean;
  description: string;
  features: string[];
}

export interface AddOnOption {
  id: string;
  name: string;
  price: number;
  durationAdd: string;
  description: string;
}

export interface VehicleSizeOption {
  id: 'hatchback' | 'sedan' | 'suv' | 'ute' | 'van';
  label: string;
  examples: string;
  priceAdder: number;
}

export interface PerthSuburb {
  name: string;
  postcode: string;
  region: 'Northern Suburbs' | 'Southern Suburbs' | 'Eastern Suburbs' | 'Western & Coastal' | 'Perth CBD & Inner';
}

export interface GalleryCaseStudy {
  id: string;
  title: string;
  vehicle: string;
  suburb: string;
  servicePerformed: string;
  duration: string;
  summary: string;
  metrics: string;
  visualType: 'gt3_obsidian' | 'defender_ceramic' | 'amg_steam' | 'raptor_pet' | 'rs6_correction' | 'cayenne_full';
}

export interface ReviewItem {
  id: string;
  author: string;
  initials: string;
  suburb: string;
  vehicle: string;
  service: string;
  rating: number;
  date: string;
  text: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const BUSINESS_INFO = {
  name: 'The Gents Detailing Co',
  tagline: 'Perth Mobile Car Detailing',
  phoneDisplay: '0447 826 355',
  phoneHref: 'tel:+61447826355',
  email: 'hello@thegentsdetailing.com.au',
  location: 'Perth, WA, Australia',
  hours: 'Mon – Sat: 7:30 AM – 6:00 PM AWST',
  socials: {
    instagram: 'https://instagram.com/thegentsdetailingco',
    facebook: 'https://facebook.com/thegentsdetailingco',
    tiktok: 'https://tiktok.com/@thegentsdetailingco',
  },
};

export const CORE_SERVICES: ServiceItem[] = [
  {
    id: 'paint-correction',
    index: '01',
    title: 'Paint Correction & Polishing',
    shortDesc:
      'Multi-stage machine compounding and refining to eliminate up to 95% of swirl marks, wash marring, oxidation, and light scratches.',
    duration: '4–8 hrs',
    startingPrice: 420,
    iconName: 'Sparkles',
    highlights: ['Digital paint depth gauge readings', 'Swirl & hologram elimination', 'Deep liquid-mirror gloss'],
  },
  {
    id: 'ceramic-coating',
    index: '02',
    title: 'Ceramic Coatings',
    shortDesc:
      'Professional-grade 9H SiO2 & graphene protection engineered to shield your paintwork against harsh Western Australian UV rays and road grime.',
    duration: '6–10 hrs',
    startingPrice: 690,
    iconName: 'ShieldCheck',
    highlights: ['3 to 7-year durability options', 'Extreme hydrophobic water beading', 'UV & chemical resistance'],
  },
  {
    id: 'steam-cleaning',
    index: '03',
    title: 'Steam Cleaning (Interior Sanitising)',
    shortDesc:
      '160°C dry vapour steam treatment that sanitises leather, Alcantara, air vents, and carpets—eliminating 99.9% of bacteria and odours without harsh chemicals.',
    duration: '2–3 hrs',
    startingPrice: 185,
    iconName: 'Flame',
    highlights: ['160°C chemical-free sanitisation', 'Safe on fine leather & screens', 'Deep odour & allergen neutralisation'],
  },
  {
    id: 'pet-hair-removal',
    index: '04',
    title: 'Pet Hair Removal',
    shortDesc:
      'Specialised electrostatic rubber brushing, compressed air purging, and fabric extraction to remove stubborn embedded dog and cat fur after beach or park runs.',
    duration: '1.5–3 hrs',
    startingPrice: 140,
    iconName: 'Scissors',
    highlights: ['Boot, rear bench & carpet extraction', 'Coastal sand & dander removal', 'Deodorising enzyme mist included'],
  },
  {
    id: 'exterior-wash-wax',
    index: '05',
    title: 'Exterior Wash & Wax',
    shortDesc:
      'Swirl-free pH-neutral snow foam pre-wash, two-bucket hand wash, iron fallout wheel clean, and pure Brazilian carnauba/SiO2 hybrid spray wax.',
    duration: '1.5–2 hrs',
    startingPrice: 120,
    iconName: 'Droplets',
    highlights: ['Touchless snow foam pre-soak', 'Barrel-deep wheel & caliper clean', 'Satin tyre dressing & glass polish'],
  },
  {
    id: 'interior-deep-clean',
    index: '06',
    title: 'Interior Deep Clean',
    shortDesc:
      'Comprehensive cabin restoration including carpet shampooing, leather conditioning, console detailing, and streak-free interior glass.',
    duration: '2.5–4 hrs',
    startingPrice: 210,
    iconName: 'Armchair',
    highlights: ['Hot-water fabric extraction', 'Matte UV leather nourishment', 'Air-purged seat rails & switchgear'],
  },
  {
    id: 'headlight-restoration',
    index: '07',
    title: 'Headlight Restoration',
    shortDesc:
      'Wet-sanding, rotary compounding, and UV ceramic clear-sealing to restore cloudy, yellowed polycarbonate lenses to crystal factory clarity.',
    duration: '1 hr',
    startingPrice: 110,
    iconName: 'Sun',
    highlights: ['Multi-grit wet sanding', 'Optical clarity polishing', 'Ceramic UV blocker applied'],
  },
  {
    id: 'full-detail',
    index: '08',
    title: 'Full Detail (Pre-Sale or Reset)',
    shortDesc:
      'Our bumper-to-bumper interior and exterior transformation. Ideal for annual resets, newly purchased vehicles, or maximising resale value.',
    duration: '5–7 hrs',
    startingPrice: 480,
    iconName: 'Crown',
    highlights: ['Single-stage gloss enhancement', 'Full interior steam & extraction', 'Engine bay detail & ceramic sealant'],
  },
];

export const PACKAGE_TIERS: PackageTier[] = [
  {
    id: 'pkg-essential',
    name: 'Essential Clean',
    subtitle: 'Refined Maintenance Detail',
    basePrice: 160,
    duration: 'Approx. 2 Hours',
    description:
      'Designed for well-maintained vehicles needing a safe, swirl-free exterior wash and crisp cabin tidy-up at your home or office.',
    features: [
      'pH-neutral snow foam pre-wash & 2-bucket hand wash',
      'Deep wheel face, barrel & arch pressure clean',
      'Hydrophobic SiO2 spray sealant (up to 8 weeks gloss)',
      'Full interior vacuum including boot & floor mats',
      'Microfibre wipe-down of dash, console & door trims',
      'Streak-free interior & exterior glass + satin tyre finish',
    ],
  },
  {
    id: 'pkg-signature',
    name: 'Signature Detail',
    subtitle: 'Complete Inside & Out Restoration',
    basePrice: 290,
    duration: 'Approx. 3.5 – 4.5 Hours',
    popular: true,
    description:
      'Our most requested gentleman’s treatment. Combines chemical paint decontamination with 160°C interior steam sanitising and leather care.',
    features: [
      'Everything in Essential Clean, plus:',
      'Iron fallout & tar decontamination + clay bar treatment',
      '6-month Carnauba / Ceramic hybrid paint protection',
      '160°C dry vapour steam sanitising of vents, console & seams',
      'Leather deep clean & OEM matte UV conditioning (or upholstery shampoo)',
      'Door jambs degreased & dressed + cabin antibacterial mist',
    ],
  },
  {
    id: 'pkg-ultimate',
    name: 'Ultimate Gent',
    subtitle: 'Showroom Correction & Ceramic Shield',
    basePrice: 550,
    duration: 'Approx. 6 – 8 Hours',
    description:
      'The flagship driveway transformation. Single-stage machine paint enhancement paired with complete cabin extraction, steam sanitising, and 12-month ceramic coating.',
    features: [
      'Everything in Signature Detail, plus:',
      'Single-stage machine polish (removes 60–75% of swirls & haze)',
      '12-month SiO2 Ceramic Lite coating on paintwork & wheel faces',
      'Full hot-water carpet & mat extraction + light pet hair removal',
      'Engine bay safe degrease, steam clean & satin plastics dressing',
      'Exterior windscreen hydrophobic rain-repellent coating',
    ],
  },
];

export const ADD_ON_OPTIONS: AddOnOption[] = [
  {
    id: 'addon-pet-hair',
    name: 'Heavy Pet Hair & Beach Sand Extraction',
    price: 65,
    durationAdd: '+45 mins',
    description: 'Electrostatic rubber agitation & compressed-air purging of embedded fur from carpets and boot liners.',
  },
  {
    id: 'addon-steam',
    name: '160°C Full Cabin Steam Sanitising',
    price: 85,
    durationAdd: '+60 mins',
    description: 'Hospital-grade dry vapour treatment across seats, headliner, AC vents, and high-touch controls.',
  },
  {
    id: 'addon-ceramic-upgrade',
    name: '3-Year 9H Ceramic Coating Upgrade',
    price: 390,
    durationAdd: '+2.5 hrs',
    description: 'Upgrades exterior sealant to a dedicated 9H SiO2 ceramic layer for multi-year WA UV defence.',
  },
  {
    id: 'addon-headlights',
    name: 'Headlight Lens Wet-Sand & Ceramic Seal',
    price: 75,
    durationAdd: '+45 mins',
    description: 'Eliminates yellowing and oxidation from both front headlights for crisp night-driving optics.',
  },
  {
    id: 'addon-engine',
    name: 'Concourse Engine Bay Detail',
    price: 60,
    durationAdd: '+30 mins',
    description: 'Safe citrus degrease, low-pressure steam rinse, and non-greasy OEM satin finish on hoses and covers.',
  },
];

export const VEHICLE_SIZES: VehicleSizeOption[] = [
  {
    id: 'hatchback',
    label: 'Hatchback / Coupe',
    examples: 'VW Golf, Mazda 3, Porsche 911, Hyundai i30',
    priceAdder: 0,
  },
  {
    id: 'sedan',
    label: 'Sedan / Wagon',
    examples: 'Tesla Model 3, BMW 3 Series, Mercedes C-Class, Audi RS6',
    priceAdder: 25,
  },
  {
    id: 'suv',
    label: 'SUV / 4WD (5–7 Seat)',
    examples: 'Toyota Prado, Range Rover Sport, Mazda CX-5, Porsche Cayenne',
    priceAdder: 55,
  },
  {
    id: 'ute',
    label: 'Dual-Cab Ute',
    examples: 'Ford Ranger Raptor, Toyota HiLux, Isuzu D-Max, VW Amarok',
    priceAdder: 65,
  },
  {
    id: 'van',
    label: 'People Mover / Commercial Van',
    examples: 'Kia Carnival, Mercedes V-Class, Toyota HiAce, VW Transporter',
    priceAdder: 85,
  },
];

export const PERTH_SUBURBS: PerthSuburb[] = [
  // Perth CBD & Inner
  { name: 'Perth CBD', postcode: '6000', region: 'Perth CBD & Inner' },
  { name: 'West Perth', postcode: '6005', region: 'Perth CBD & Inner' },
  { name: 'East Perth', postcode: '6004', region: 'Perth CBD & Inner' },
  { name: 'Subiaco', postcode: '6008', region: 'Perth CBD & Inner' },
  { name: 'Mount Lawley', postcode: '6050', region: 'Perth CBD & Inner' },
  { name: 'Leederville', postcode: '6007', region: 'Perth CBD & Inner' },
  { name: 'North Perth', postcode: '6006', region: 'Perth CBD & Inner' },
  { name: 'Victoria Park', postcode: '6100', region: 'Perth CBD & Inner' },
  // Western & Coastal
  { name: 'Cottesloe', postcode: '6011', region: 'Western & Coastal' },
  { name: 'Nedlands', postcode: '6009', region: 'Western & Coastal' },
  { name: 'Dalkeith', postcode: '6009', region: 'Western & Coastal' },
  { name: 'Claremont', postcode: '6010', region: 'Western & Coastal' },
  { name: 'Peppermint Grove', postcode: '6011', region: 'Western & Coastal' },
  { name: 'Mosman Park', postcode: '6012', region: 'Western & Coastal' },
  { name: 'City Beach', postcode: '6015', region: 'Western & Coastal' },
  { name: 'Floreat', postcode: '6014', region: 'Western & Coastal' },
  { name: 'Scarborough', postcode: '6019', region: 'Western & Coastal' },
  { name: 'Trigg', postcode: '6029', region: 'Western & Coastal' },
  // Northern Suburbs
  { name: 'Karrinyup', postcode: '6018', region: 'Northern Suburbs' },
  { name: 'Innaloo', postcode: '6018', region: 'Northern Suburbs' },
  { name: 'Hillarys', postcode: '6025', region: 'Northern Suburbs' },
  { name: 'Sorrento', postcode: '6020', region: 'Northern Suburbs' },
  { name: 'Joondalup', postcode: '6027', region: 'Northern Suburbs' },
  { name: 'Morley', postcode: '6062', region: 'Northern Suburbs' },
  { name: 'Dianella', postcode: '6059', region: 'Northern Suburbs' },
  { name: 'Ocean Reef', postcode: '6027', region: 'Northern Suburbs' },
  // Southern Suburbs
  { name: 'South Perth', postcode: '6151', region: 'Southern Suburbs' },
  { name: 'Como', postcode: '6152', region: 'Southern Suburbs' },
  { name: 'Applecross', postcode: '6153', region: 'Southern Suburbs' },
  { name: 'Mount Pleasant', postcode: '6153', region: 'Southern Suburbs' },
  { name: 'Fremantle', postcode: '6160', region: 'Southern Suburbs' },
  { name: 'East Fremantle', postcode: '6158', region: 'Southern Suburbs' },
  { name: 'Melville', postcode: '6156', region: 'Southern Suburbs' },
  { name: 'Canning Vale', postcode: '6155', region: 'Southern Suburbs' },
  { name: 'Cockburn Central', postcode: '6164', region: 'Southern Suburbs' },
  // Eastern Suburbs
  { name: 'Belmont', postcode: '6104', region: 'Eastern Suburbs' },
  { name: 'Ascot', postcode: '6104', region: 'Eastern Suburbs' },
  { name: 'Bayswater', postcode: '6053', region: 'Eastern Suburbs' },
  { name: 'Bassendean', postcode: '6054', region: 'Eastern Suburbs' },
  { name: 'Guildford', postcode: '6055', region: 'Eastern Suburbs' },
  { name: 'Kalamunda', postcode: '6076', region: 'Eastern Suburbs' },
  { name: 'Midland', postcode: '6056', region: 'Eastern Suburbs' },
];

export const GALLERY_CASE_STUDIES: GalleryCaseStudy[] = [
  {
    id: 'case-1',
    title: 'Two-Stage Paint Correction & 5-Year Ceramic',
    vehicle: 'Porsche 911 Carrera S (Jet Black Metallic)',
    suburb: 'Applecross, WA',
    servicePerformed: 'Paint Correction + 9H Ceramic Coating',
    duration: '8.5 Hours on Driveway',
    summary:
      'Eliminated heavy dealership wash swirls and rotary buffer trails under Scangrip inspection lighting before locking in deep wet-look clarity.',
    metrics: '96% Defect Removal · +42 GU Gloss Increase',
    visualType: 'gt3_obsidian',
  },
  {
    id: 'case-2',
    title: 'Hydrophobic Graphene Shield & Wheel Off Detail',
    vehicle: 'Land Rover Defender 110 V8 (Santorini Black)',
    suburb: 'Cottesloe, WA',
    servicePerformed: 'Ultimate Gent + 3-Year Ceramic Upgrade',
    duration: '7.5 Hours on Driveway',
    summary:
      'Protected against coastal salt spray along Marine Parade with high-solids SiO2 coating across bodywork, satin arches, and 22-inch forged alloys.',
    metrics: '118° Water Contact Angle · 3-Year UV Shield',
    visualType: 'defender_ceramic',
  },
  {
    id: 'case-3',
    title: '160°C Dry Vapour Cockpit Sanitisation & Leather Reset',
    vehicle: 'Mercedes-AMG C63 S Coupe',
    suburb: 'Subiaco, WA',
    servicePerformed: 'Signature Detail + Steam Sanitising',
    duration: '4 Hours at Client Office',
    summary:
      'Removed 3 years of glossy body oils from Nappa leather bolsters and steering wheel, restoring a factory dead-matte finish and crisp cabin scent.',
    metrics: '99.9% Bacteria Neutralised · OEM Matte Finish',
    visualType: 'amg_steam',
  },
  {
    id: 'case-4',
    title: 'Post-Beach Golden Retriever Fur & Sand Extraction',
    vehicle: 'Ford Ranger Raptor (Shadow Black)',
    suburb: 'Scarborough, WA',
    servicePerformed: 'Interior Deep Clean + Pet Hair Removal',
    duration: '3.5 Hours on Driveway',
    summary:
      'Extracted deeply woven dog hair and fine coastal quartz sand from rear bench stitching, carpet pile, and under-seat rails after weekly dog beach runs.',
    metrics: '100% Embedded Fur Extracted · Enzyme Deodorised',
    visualType: 'raptor_pet',
  },
  {
    id: 'case-5',
    title: 'Single-Stage Gloss Enhancement & Glass Coating',
    vehicle: 'Audi RS6 Avant (Nardo Grey / Mythos Trim)',
    suburb: 'Nedlands, WA',
    servicePerformed: 'Ultimate Gent Package',
    duration: '6.5 Hours on Driveway',
    summary:
      'Refined clear coat haze to bring out razor-sharp body line reflections and sealed all panoramic glass and piano-black exterior trim.',
    metrics: '85% Swirl Reduction · 12-Month SiO2 Sealant',
    visualType: 'rs6_correction',
  },
  {
    id: 'case-6',
    title: 'Pre-Sale Full Detail & Headlight Optical Restoration',
    vehicle: 'Porsche Cayenne Turbo',
    suburb: 'South Perth, WA',
    servicePerformed: 'Full Detail + Headlight Restoration',
    duration: '6 Hours on Driveway',
    summary:
      'Prepared for private sale with full steam extraction, engine bay dressing, and single-stage machine polish—vehicle sold within 48 hours of listing.',
    metrics: '+$4,500 Above Guide Sale Price · Sold in 48h',
    visualType: 'cayenne_full',
  },
];

/**
 * NOTE: SAMPLE PERTH REVIEWS
 * The following 6 testimonials are realistic sample Perth-based reviews created as
 * initial placeholders. Swap these objects with real verified Google/client reviews
 * as they are collected.
 */
export const SAMPLE_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Marcus T.',
    initials: 'MT',
    suburb: 'Applecross, WA',
    vehicle: 'Black BMW M3 Competition',
    service: '2-Stage Paint Correction & Ceramic Coating',
    rating: 5,
    date: '2 weeks ago',
    text: 'My black M3 was covered in swirl marks from local hand car washes. The Gents arrived on time in Applecross with a full studio setup, spent 8 hours machine polishing and applying ceramic coating, and the paint now looks deeper than the day I picked it up from the dealership.',
  },
  {
    id: 'rev-2',
    author: 'Sarah L.',
    initials: 'SL',
    suburb: 'Cottesloe, WA',
    vehicle: 'Range Rover Sport',
    service: 'Signature Detail + Pet Hair Removal',
    rating: 5,
    date: '3 weeks ago',
    text: 'After months of taking our two Labradors to North Cottesloe dog beach, the boot and back seats were embedded with sand and white fur. Every single hair was removed and the steam cleaning left the leather smelling like a brand-new showroom cabin.',
  },
  {
    id: 'rev-3',
    author: 'Liam K.',
    initials: 'LK',
    suburb: 'Subiaco, WA',
    vehicle: 'Porsche Macan GTS',
    service: 'Ultimate Gent Package',
    rating: 5,
    date: '1 month ago',
    text: 'Booked them to detail my Macan while I was in meetings at my Subiaco office. Zero hassle, super polite and professional, and walking out at 4pm to a mirror-finish car in the staff carpark was unbeatable.',
  },
  {
    id: 'rev-4',
    author: 'Daniel R.',
    initials: 'DR',
    suburb: 'Scarborough, WA',
    vehicle: 'Ford Ranger Wildtrak',
    service: 'Interior Steam Cleaning & Exterior Detail',
    rating: 5,
    date: '1 month ago',
    text: 'Spilled iced coffee through the centre console and cloth bolsters. Their 160-degree dry steam cleaner lifted every trace of staining out of the switches and fabric without leaving anything damp. Worth every cent.',
  },
  {
    id: 'rev-5',
    author: 'Chloe W.',
    initials: 'CW',
    suburb: 'South Perth, WA',
    vehicle: 'Mercedes-Benz GLC 300',
    service: 'Full Detail (Pre-Sale)',
    rating: 5,
    date: '2 months ago',
    text: 'Had The Gents perform a Full Pre-Sale Detail before listing my GLC on Carsales. The engine bay, leather bolsters, and paintwork came up immaculate—the very first buyer who inspected it paid my full asking price.',
  },
  {
    id: 'rev-6',
    author: 'Nathan B.',
    initials: 'NB',
    suburb: 'Hillarys, WA',
    vehicle: 'Tesla Model Y Performance',
    service: '9H Ceramic Coating & Glass Protection',
    rating: 5,
    date: '2 months ago',
    text: 'Tesla black paint is notoriously soft. The Gents corrected the factory haze right in my Hillarys garage and applied a 5-year ceramic coating. Washing the car now takes 15 minutes and water just sheets straight off.',
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How does mobile car detailing work across Perth?',
    answer:
      'You simply book your preferred package and AWST time slot online or by calling 0447 826 355. We travel directly to your home driveway, garage, or workplace anywhere across the Perth metropolitan area—from Joondalup down to Fremantle and out to the Hills—bringing all commercial-grade machines, lighting, and pH-neutral products.',
  },
  {
    id: 'faq-2',
    question: 'Do I need to provide water or power?',
    answer:
      'Our mobile unit carries on-board pure deionised water and power generation for workplace carparks or apartments. However, if we are working at a residential property with easy access to a standard domestic outdoor tap and power point within 25 metres, we are happy to connect to yours—just let us know in the booking access notes.',
  },
  {
    id: 'faq-3',
    question: 'How long does paint correction take?',
    answer:
      'A Single-Stage Enhancement Polish typically takes between 4 and 5 hours and removes 60–75% of light swirls and oxidation. A Multi-Stage Paint Correction for heavier defects or dark vehicles takes between 6 and 9 hours. For Paint Correction and Ceramic Coating bookings, a shaded garage or carport is ideal so panels remain cool.',
  },
  {
    id: 'faq-4',
    question: 'How long does ceramic coating last in Perth’s UV climate?',
    answer:
      'Western Australia experiences some of the highest UV index ratings in the world, which rapidly oxidises unprotected clear coat. Our entry Ceramic Lite sealant lasts 12 months, while our flagship 9H SiO2 and Graphene coatings last between 3 and 7 years with simple pH-neutral maintenance washes.',
  },
  {
    id: 'faq-5',
    question: 'Can you remove stubborn dog hair and coastal beach sand?',
    answer:
      'Yes—Pet Hair Removal and Steam Sanitising are two of our signature specialties. We use electrostatic rubber brushes, compressed air lances, and heated extraction to lift fur woven deep into boot liners and rear seats, followed by 160°C dry vapour steam to neutralise pet odours.',
  },
  {
    id: 'faq-6',
    question: 'What is your cancellation policy and what payment methods do you accept?',
    answer:
      'We understand plans change—rescheduling or cancelling with at least 24 hours’ notice incurs zero fees. If heavy Perth rain impacts an outdoor booking without cover, we reschedule you to the next priority dry slot free of charge. You pay only upon completion and inspection via EFTPOS, Visa, Mastercard, Apple Pay, PayID, or Cash.',
  },
];
