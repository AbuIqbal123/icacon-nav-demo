import type { EventDay, MapLinks, PdfId } from './types'

/** Apple Maps search URL (opens the native Maps app on iOS). */
function appleMapsQuery(query: string): string {
  return `https://maps.apple.com/?q=${encodeURIComponent(query)}`
}

/** Official links — icaconaligarh.com */
export const LINKS = {
  website: 'https://www.icaconaligarh.com',
  brochureRemote: 'https://www.icaconaligarh.com/pdf/brochure.pdf',
  partnershipBrochure: 'https://www.icaconaligarh.com/pdf/partnership-brochure.pdf',
  program: 'https://www.icaconaligarh.com/program.php',
  day1PdfRemote: 'https://www.icaconaligarh.com/pdf/day1.pdf',
  day2PdfRemote: 'https://www.icaconaligarh.com/pdf/day2.pdf',
  workshops: 'https://www.icaconaligarh.com/workshops.php',
  venue: 'https://www.icaconaligarh.com/venue.php',
  registrationPage: 'https://www.icaconaligarh.com/registration.php',
  register: 'https://in.eregnow.com/ticketing/register/icacon2026',
  organiser: 'https://www.meetingsnmore.com/mnm/',
  email: 'mailto:icacon2026@gmail.com',
  /** Public privacy policy (App Store / Play requirement + in-app link) */
  privacy: 'https://abuiqbal123.github.io/icacon-privacy/',
} as const

export const EVENT_META = {
  name: 'ICACON 2026',
  appName: 'ICACON 2026 Companion',
  fullName:
    '7th International & 17th National Conference of the Indian College of Anaesthesiologists',
  subtitle: 'Event companion · Aligarh',
  venue: 'Jawaharlal Nehru Medical College',
  university: 'AMU Aligarh',
  organisedBy:
    'Department of Anaesthesiology & Critical Care, JNMC, Aligarh Muslim University',
  dateLabel: '11–13 September 2026',
  dateShort: '11–13 Sept 2026',
  workshopDate: '11 September 2026',
  workshopDateShort: '11 Sept 2026',
  conferenceDates: '12–13 September 2026',
  conferenceVenue: 'Lemon Tree Hotel, Aligarh',
  theme: 'Towards Smarter Anaesthesia: Integrating Technology, Intelligence & Precision',
}

/** Shared Apple Maps place link for all JNMC / 11 Sept workshop locations. */
const JNMC_APPLE_MAPS = 'https://maps.apple/p/uDCXH~0AJ1dAwy'

/**
 * Venue map destinations — Google Maps place links + Apple Maps place links.
 * iOS shows a chooser so users can open native Apple Maps (App Store guideline 4).
 */
export const VENUE_MAPS = {
  jnmc: {
    googleMapsUrl:
      'https://www.google.com/maps/place/Jawaharlal+Nehru+Medical+College,+AMU/@27.9186868,78.088435,17z/data=!4m6!3m5!1s0x3974a4e0f6b6118f:0x81191b8caed27551!8m2!3d27.9186868!4d78.088435!16s%2Fg%2F11bc5cc12l?hl=en',
    appleMapsUrl: JNMC_APPLE_MAPS,
  },
  lemonTree: {
    googleMapsUrl:
      'https://www.google.com/maps?q=Lemon+Tree+Hotel,+Aligarh,+Plot+No:B/11,+Marris+Rd,+opp.+Pragati+Vihar+Colony,+Aligarh,+Uttar+Pradesh+202001,+India&ftid=0x3974a50066650bed:0xfb61bc046d6c69d3&hl=en',
    appleMapsUrl: 'https://maps.apple/p/Zqtc1DTSCdjmpJ',
  },
} as const satisfies Record<string, MapLinks>

export const EVENT_DAYS: EventDay[] = [
  {
    id: 'workshop',
    label: 'Workshops',
    shortLabel: '11 Sept',
    dateLabel: '11 September 2026',
    venue: 'JNMC, AMU Aligarh',
    maps: VENUE_MAPS.jnmc,
    note: 'Pre-conference workshops',
  },
  {
    id: 'day1',
    label: 'Conference Day 1',
    shortLabel: '12 Sept',
    dateLabel: '12 September 2026',
    venue: 'Lemon Tree Hotel, Aligarh',
    maps: VENUE_MAPS.lemonTree,
    note: 'Official programme: Day 1 PDF',
  },
  {
    id: 'day2',
    label: 'Conference Day 2',
    shortLabel: '13 Sept',
    dateLabel: '13 September 2026',
    venue: 'Lemon Tree Hotel, Aligarh',
    maps: VENUE_MAPS.lemonTree,
    note: 'Official programme: Day 2 PDF',
  },
]

/**
 * Pre-conference workshops (11 Sept).
 * All run in parallel 9am–4pm (user-confirmed).
 */
export const WORKSHOP_DAY = {
  timeLabel: '9am – 4pm',
  timeNote: 'All workshops run simultaneously',
  fee: '₹4,000',
} as const

/** Airway, Ventilation, Obstetrics — Paramedical College. */
export const WORKSHOP_VENUE_MAPS = {
  googleMapsUrl:
    'https://www.google.com/maps?q=W3CQ+4F+Paramedical+College,+AMU,+Aligarh,+Uttar+Pradesh+202001,+India&ftid=0x3974a59324f6c0bb:0x1745afefe1f3faf5&hl=en',
  appleMapsUrl: JNMC_APPLE_MAPS,
} as const satisfies MapLinks

/** POCUS — Simulation Lab (Old OPD Complex, near ART Centre), JNMC. */
export const SIMULATION_LAB_MAPS = {
  googleMapsUrl:
    'https://www.google.com/maps?q=W39P+5FC+Anti+Retroviral+Therapy+Centre,+jnmc+amu,+Aligarh,+Uttar+Pradesh+202001,+India&ftid=0x3974a505ac2a6a2d:0x898a1871fe2e8f65&hl=en',
  appleMapsUrl: JNMC_APPLE_MAPS,
} as const satisfies MapLinks

/** USG Regional — Surgery OT Complex (near Dept of Anaesthesia). */
export const USG_REGIONAL_MAPS = {
  googleMapsUrl:
    'https://www.google.com/maps?q=W39P+CP8+Department+of+Anaesthesiology,+JNMCH+AMU,+Aligarh,+Uttar+Pradesh+202001,+India&ftid=0x3974a591a024317d:0xb279db9852865dbb&hl=en',
  appleMapsUrl: JNMC_APPLE_MAPS,
} as const satisfies MapLinks

export const USG_REGIONAL_VENUE = 'Surgery OT Complex' as const
export const USG_REGIONAL_VENUE_NOTE = 'Near Dept of Anaesthesia' as const

export interface Workshop {
  id: string
  title: string
  director?: string
  fee: string
  /** Venue name (shown only when not the default shared site) */
  venueLabel: string
  /** Optional second venue line (keeps rows readable) */
  venueNote?: string
  maps: MapLinks
  /** true = Paramedical College with the other main workshops */
  sharedSite?: boolean
}

export const WORKSHOPS: Workshop[] = [
  {
    id: 'airway',
    title: 'Advanced Airway Workshop',
    director: 'Prof. Rashid M Khan',
    fee: '₹4,000',
    venueLabel: 'Paramedical College',
    maps: WORKSHOP_VENUE_MAPS,
    sharedSite: true,
  },
  {
    id: 'pocus',
    title: 'Point of Care Ultrasound (POCUS)',
    director: 'Prof. Poonam Malhotra',
    fee: '₹4,000',
    venueLabel: 'Simulation Lab, JNMC',
    venueNote: 'Old OPD Complex · Near ART Centre',
    maps: SIMULATION_LAB_MAPS,
    sharedSite: false,
  },
  {
    id: 'vent',
    title: 'Mechanical Ventilation',
    director: 'Dr. Yash Javeri',
    fee: '₹4,000',
    venueLabel: 'Paramedical College',
    maps: WORKSHOP_VENUE_MAPS,
    sharedSite: true,
  },
  {
    id: 'ob',
    title: 'Obstetrics Crisis Simulation and Skill',
    director: 'Dr. Faiza Khan',
    fee: '₹4,000',
    venueLabel: 'Paramedical College',
    maps: WORKSHOP_VENUE_MAPS,
    sharedSite: true,
  },
  {
    id: 'blocks',
    title: 'Ultrasound Guided Regional Nerve Blocks',
    director: 'Dr. Md Ishtiyaque Hussain',
    fee: '₹4,000',
    venueLabel: USG_REGIONAL_VENUE,
    venueNote: USG_REGIONAL_VENUE_NOTE,
    maps: USG_REGIONAL_MAPS,
    sharedSite: false,
  },
]

export const OFFLINE_INFO = {
  helpdesk: 'Registration Desk, Ground Floor (JNMC)',
  emergency: 'Hospital ER · Ground Floor',
  secretariat: {
    dept: 'Department of Anaesthesiology & Critical Care',
    college: 'Jawaharlal Nehru Medical College, AMU Aligarh',
    secretary: 'Prof. Obaid A Siddiqui, Organising Secretary',
    phones: ['+91 98976 95761', '+91 97168 02158'],
    email: 'icacon2026@gmail.com',
    coSecretary: {
      name: 'Dr Shahna Ali',
      role: 'Co-Organising Secretary',
      phone: '+91 94119 79684',
    },
  },
  registrationContact: {
    name: 'Mr. Rachit Bisht',
    role: 'Registration Incharge',
    phone: '+91 89209 49917',
    email: 'projects@meetingsnmore.com',
  },
  organiser: {
    name: 'Meetings and More (Professional Conference Organiser)',
    web: 'www.meetingsnmore.com',
  },
  tips: [
    '11 Sept workshops · JNMC · 9am–4pm (all parallel)',
    '12–13 Sept conference · Lemon Tree Hotel',
    'Workshop fee: ₹4,000 (incl. GST)',
  ],
}

/**
 * Bundled PDF modules — replace files in assets/pdfs/ with official downloads.
 * Filenames include "-programme" so OTA asset IDs change when schedules update
 * (avoids App Store builds forever serving a first-launch cache of day1.pdf / day2.pdf).
 */
export const PDF_ASSETS: Record<PdfId, { title: string; module: number }> = {
  brochure: {
    title: 'ICACON Brochure',
    module: require('../../assets/pdfs/brochure.pdf'),
  },
  day1: {
    title: 'Day 1 Programme',
    module: require('../../assets/pdfs/day1-programme.pdf'),
  },
  day2: {
    title: 'Day 2 Programme',
    module: require('../../assets/pdfs/day2-programme.pdf'),
  },
}
