import type { AgendaItem, EventDay } from '../types'
import { getPlace, placeLocation } from './hospital'

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

function loc(placeId: string): string {
  const p = getPlace(placeId)
  return p ? placeLocation(p) : placeId
}

export const EVENT_DAYS: EventDay[] = [
  {
    id: 'workshop',
    label: 'Workshops',
    shortLabel: '11 Sept',
    dateLabel: '11 September 2026',
    venue: 'JNMC, AMU Aligarh',
    hasIndoorNav: true,
    note: 'Pre-conference workshops · Indoor map available',
  },
  {
    id: 'day1',
    label: 'Conference Day 1',
    shortLabel: '12 Sept',
    dateLabel: '12 September 2026',
    venue: 'Lemon Tree Hotel, Aligarh',
    hasIndoorNav: false,
    note: 'Official programme: Day 1 PDF',
  },
  {
    id: 'day2',
    label: 'Conference Day 2',
    shortLabel: '13 Sept',
    dateLabel: '13 September 2026',
    venue: 'Lemon Tree Hotel, Aligarh',
    hasIndoorNav: false,
    note: 'Official programme: Day 2 PDF',
  },
]

/** Workshop day only — conf days use official PDFs (no invented timetable). */
export const SCHEDULE: AgendaItem[] = [
  {
    id: 'w-reg',
    dayId: 'workshop',
    time: '08:00 – 09:00',
    title: 'Registration & Badge Collection',
    location: loc('registration'),
    placeId: 'registration',
    type: 'registration',
  },
  {
    id: 'w-brief',
    dayId: 'workshop',
    time: '09:00 – 09:30',
    title: 'Workshop Briefing',
    location: loc('main-auditorium'),
    placeId: 'main-auditorium',
    type: 'keynote',
    speaker: 'Organising Committee',
  },
  {
    id: 'w-airway',
    dayId: 'workshop',
    time: '09:30 – 16:00',
    title: 'Advanced Airway Workshop',
    location: loc('workshop-hall-a'),
    placeId: 'workshop-hall-a',
    type: 'session',
    speaker: 'Director: Prof. Rashid M Khan',
  },
  {
    id: 'w-pocus',
    dayId: 'workshop',
    time: '09:30 – 16:00',
    title: 'POCUS Workshop',
    location: loc('workshop-101'),
    placeId: 'workshop-101',
    type: 'session',
    speaker: 'Director: Prof. Poonam Malhotra',
  },
  {
    id: 'w-vent',
    dayId: 'workshop',
    time: '09:30 – 16:00',
    title: 'Mechanical Ventilation Workshop',
    location: loc('anaesth-theatre'),
    placeId: 'anaesth-theatre',
    type: 'session',
    speaker: 'Director: Dr. Yash Javeri',
  },
  {
    id: 'w-ob',
    dayId: 'workshop',
    time: '09:30 – 16:00',
    title: 'Obstetric Crisis Simulation & Skills',
    location: loc('skills-lab'),
    placeId: 'skills-lab',
    type: 'session',
    speaker: 'Director: Dr. Faiza Khan',
  },
  {
    id: 'w-blocks',
    dayId: 'workshop',
    time: '09:30 – 16:00',
    title: 'USG Regional Nerve Blocks Workshop',
    location: loc('room-205'),
    placeId: 'room-205',
    type: 'session',
  },
  {
    id: 'w-lunch',
    dayId: 'workshop',
    time: '12:30 – 13:30',
    title: 'Lunch',
    location: loc('cafeteria'),
    placeId: 'cafeteria',
    type: 'break',
  },
]

export function scheduleForDay(dayId: EventDay['id']): AgendaItem[] {
  return SCHEDULE.filter((s) => s.dayId === dayId)
}

export const WORKSHOPS = [
  {
    id: 'airway',
    title: 'Advanced Airway Workshop',
    director: 'Prof. Rashid M Khan',
    placeId: 'workshop-hall-a' as const,
    fee: '₹4,000',
  },
  {
    id: 'pocus',
    title: 'Point of Care Ultrasound (POCUS)',
    director: 'Prof. Poonam Malhotra',
    placeId: 'workshop-101' as const,
    fee: '₹4,000',
  },
  {
    id: 'vent',
    title: 'Mechanical Ventilation',
    director: 'Dr. Yash Javeri',
    placeId: 'anaesth-theatre' as const,
    fee: '₹4,000',
  },
  {
    id: 'ob',
    title: 'Obstetrics Crisis Simulation and Skill',
    director: 'Dr. Faiza Khan',
    placeId: 'skills-lab' as const,
    fee: '₹4,000',
  },
  {
    id: 'blocks',
    title: 'Ultrasound Guided Regional Nerve Blocks',
    director: undefined as string | undefined,
    placeId: 'room-205' as const,
    fee: '₹4,000',
  },
]

const registration = getPlace('registration')

export const OFFLINE_INFO = {
  wifi: 'ICACON-Guest · JNMC2026',
  helpdesk: registration
    ? placeLocation(registration)
    : 'Registration Desk, Ground Floor',
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
    'Workshop day (11 Sept) is at JNMC — use Navigate for the indoor map.',
    'Conference (12–13 Sept) is at Lemon Tree — open the official Day 1 / Day 2 PDFs in Programme.',
    'Workshop seats: first come, first served. Conference registration required.',
    'Workshop fee: ₹4,000 each (incl. 18% GST).',
  ],
}
