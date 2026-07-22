import type { EventDay } from '../types'

/** Official links — icaconaligarh.com */
export const LINKS = {
  website: 'https://www.icaconaligarh.com',
  brochure: '/brochure.pdf',
  brochureRemote: 'https://www.icaconaligarh.com/pdf/brochure.pdf',
  partnershipBrochure: 'https://www.icaconaligarh.com/pdf/partnership-brochure.pdf',
  program: 'https://www.icaconaligarh.com/program.php',
  day1Pdf: 'https://www.icaconaligarh.com/pdf/day1.pdf',
  day2Pdf: 'https://www.icaconaligarh.com/pdf/day2.pdf',
  workshops: 'https://www.icaconaligarh.com/workshops.php',
  venue: 'https://www.icaconaligarh.com/venue.php',
  registrationPage: 'https://www.icaconaligarh.com/registration.php',
  register: 'https://in.eregnow.com/ticketing/register/icacon2026',
  organiser: 'https://www.meetingsnmore.com/mnm/',
  email: 'mailto:icacon2026@gmail.com',
} as const

/** From brochure + official site */
export const EVENT_META = {
  name: 'ICACON 2026',
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

/** Google Maps deep links (opens app or browser) */
export const VENUE_MAPS = {
  jnmc:
    'https://www.google.com/maps/search/?api=1&query=Jawaharlal+Nehru+Medical+College+AMU+Aligarh',
  lemonTree:
    'https://www.google.com/maps/search/?api=1&query=Lemon+Tree+Hotel+Aligarh',
} as const

export const EVENT_DAYS: EventDay[] = [
  {
    id: 'workshop',
    label: 'Workshops',
    shortLabel: '11 Sept',
    dateLabel: '11 September 2026',
    venue: 'JNMC, AMU Aligarh',
    mapsUrl: VENUE_MAPS.jnmc,
    note: 'Pre-conference workshops',
  },
  {
    id: 'day1',
    label: 'Conference Day 1',
    shortLabel: '12 Sept',
    dateLabel: '12 September 2026',
    venue: 'Lemon Tree Hotel, Aligarh',
    mapsUrl: VENUE_MAPS.lemonTree,
    note: 'Official programme: Day 1 PDF',
  },
  {
    id: 'day2',
    label: 'Conference Day 2',
    shortLabel: '13 Sept',
    dateLabel: '13 September 2026',
    venue: 'Lemon Tree Hotel, Aligarh',
    mapsUrl: VENUE_MAPS.lemonTree,
    note: 'Official programme: Day 2 PDF',
  },
]

/**
 * Pre-conference workshops (11 Sept).
 * All run in parallel 09:00–16:00.
 */
export const WORKSHOP_DAY = {
  timeLabel: '09:00 – 16:00',
  timeNote: 'All workshops run simultaneously',
  fee: '₹4,000',
} as const

export interface Workshop {
  id: string
  title: string
  director?: string
  fee: string
  /** Future: map place id when floor plans ship */
  placeId?: string
}

export const WORKSHOPS: Workshop[] = [
  {
    id: 'airway',
    title: 'Advanced Airway Workshop',
    director: 'Prof. Rashid M Khan',
    fee: '₹4,000',
    placeId: 'workshop-hall-a',
  },
  {
    id: 'pocus',
    title: 'Point of Care Ultrasound (POCUS)',
    director: 'Prof. Poonam Malhotra',
    fee: '₹4,000',
    placeId: 'workshop-101',
  },
  {
    id: 'vent',
    title: 'Mechanical Ventilation',
    director: 'Dr. Yash Javeri',
    fee: '₹4,000',
    placeId: 'anaesth-theatre',
  },
  {
    id: 'ob',
    title: 'Obstetrics Crisis Simulation and Skill',
    director: 'Dr. Faiza Khan',
    fee: '₹4,000',
    placeId: 'skills-lab',
  },
  {
    id: 'blocks',
    title: 'Ultrasound Guided Regional Nerve Blocks',
    fee: '₹4,000',
    placeId: 'room-205',
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
    '11 Sept workshops · JNMC · 09:00–16:00 (all parallel)',
    '12–13 Sept conference · Lemon Tree Hotel',
    'Workshop seats: first come, first served',
    'Workshop fee: ₹4,000 (incl. GST)',
  ],
}
