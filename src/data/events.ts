import type { AgendaItem, EventDay } from '../types'
import { getPlace, placeLocation } from './hospital'

/** From ICACON Brochure 2026 — companion demo content */
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
  registerUrl: 'https://www.meetingsnmore.com',
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
    note: 'Pre-conference workshops · Indoor navigation available',
  },
  {
    id: 'day1',
    label: 'Conference Day 1',
    shortLabel: '12 Sept',
    dateLabel: '12 September 2026',
    venue: 'Lemon Tree Hotel, Aligarh',
    hasIndoorNav: false,
    note: 'Demo programme — plenaries & sessions at Lemon Tree',
  },
  {
    id: 'day2',
    label: 'Conference Day 2',
    shortLabel: '13 Sept',
    dateLabel: '13 September 2026',
    venue: 'Lemon Tree Hotel, Aligarh',
    hasIndoorNav: false,
    note: 'Demo programme — closing day at Lemon Tree',
  },
]

/**
 * Full companion schedule.
 * Workshop titles/directors from brochure; conference session times are demo placeholders
 * styled after typical ICACON programme flow (not an official published timetable).
 */
export const SCHEDULE: AgendaItem[] = [
  // —— 11 Sept · JNMC workshops ——
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
    time: '09:30 – 12:30',
    title: 'Advanced Airway Workshop',
    location: loc('workshop-hall-a'),
    placeId: 'workshop-hall-a',
    type: 'session',
    speaker: 'Director: Prof. Rashid M Khan',
  },
  {
    id: 'w-pocus',
    dayId: 'workshop',
    time: '09:30 – 12:30',
    title: 'POCUS Workshop',
    location: loc('workshop-101'),
    placeId: 'workshop-101',
    type: 'session',
    speaker: 'Director: Prof. Poonam Malhotra',
  },
  {
    id: 'w-vent',
    dayId: 'workshop',
    time: '09:30 – 12:30',
    title: 'Mechanical Ventilation Workshop',
    location: loc('anaesth-theatre'),
    placeId: 'anaesth-theatre',
    type: 'session',
    speaker: 'Director: Dr. Yash Javeri',
  },
  {
    id: 'w-ob',
    dayId: 'workshop',
    time: '09:30 – 12:30',
    title: 'Obstetric Crisis Simulation & Skills',
    location: loc('skills-lab'),
    placeId: 'skills-lab',
    type: 'session',
    speaker: 'Director: Dr. Faiza Khan',
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
  {
    id: 'w-pm',
    dayId: 'workshop',
    time: '13:30 – 16:00',
    title: 'Workshops continue (afternoon session)',
    location: 'Same workshop rooms as morning',
    type: 'session',
  },
  {
    id: 'w-tea',
    dayId: 'workshop',
    time: '16:00 – 16:30',
    title: 'Tea & Networking',
    location: loc('cafeteria'),
    placeId: 'cafeteria',
    type: 'break',
  },

  // —— 12 Sept · Lemon Tree Day 1 ——
  {
    id: 'd1-reg',
    dayId: 'day1',
    time: '08:00 – 09:00',
    title: 'Conference Registration',
    location: 'Lemon Tree Hotel · Lobby',
    type: 'registration',
  },
  {
    id: 'd1-inaug',
    dayId: 'day1',
    time: '09:00 – 10:00',
    title: 'Inauguration Ceremony',
    location: 'Lemon Tree Hotel · Main Hall',
    type: 'keynote',
    speaker: 'National ICA Committee & Organising Team',
  },
  {
    id: 'd1-key',
    dayId: 'day1',
    time: '10:00 – 10:45',
    title: 'Keynote: Towards Smarter Anaesthesia',
    location: 'Lemon Tree Hotel · Main Hall',
    type: 'keynote',
    speaker: 'International faculty',
  },
  {
    id: 'd1-tea',
    dayId: 'day1',
    time: '10:45 – 11:15',
    title: 'Tea Break & Exhibition',
    location: 'Lemon Tree Hotel · Foyer',
    type: 'break',
  },
  {
    id: 'd1-sym1',
    dayId: 'day1',
    time: '11:15 – 12:45',
    title: 'Symposium: Perioperative Medicine & Technology',
    location: 'Lemon Tree Hotel · Main Hall',
    type: 'session',
    speaker: 'National & international faculty',
  },
  {
    id: 'd1-lunch',
    dayId: 'day1',
    time: '12:45 – 13:45',
    title: 'Lunch',
    location: 'Lemon Tree Hotel · Dining',
    type: 'break',
  },
  {
    id: 'd1-panel',
    dayId: 'day1',
    time: '13:45 – 15:00',
    title: 'Panel: Engage, Enlighten, Empower',
    location: 'Lemon Tree Hotel · Main Hall',
    type: 'session',
    speaker: 'High-energy panel on contemporary challenges',
  },
  {
    id: 'd1-free',
    dayId: 'day1',
    time: '15:00 – 16:00',
    title: 'Free Papers / Research in Motion',
    location: 'Lemon Tree Hotel · Hall B',
    type: 'session',
    speaker: 'Original research & clinical audits',
  },
  {
    id: 'd1-tea2',
    dayId: 'day1',
    time: '16:00 – 16:30',
    title: 'Tea',
    location: 'Lemon Tree Hotel · Foyer',
    type: 'break',
  },
  {
    id: 'd1-quiz',
    dayId: 'day1',
    time: '16:30 – 17:30',
    title: 'PG Quiz',
    location: 'Lemon Tree Hotel · Main Hall',
    type: 'quiz',
    speaker: 'High-stakes anaesthesiology showdown',
  },
  {
    id: 'd1-social',
    dayId: 'day1',
    time: '19:00 onwards',
    title: 'Networking Dinner (invitees)',
    location: 'Lemon Tree Hotel',
    type: 'social',
  },

  // —— 13 Sept · Lemon Tree Day 2 ——
  {
    id: 'd2-reg',
    dayId: 'day2',
    time: '08:30 – 09:00',
    title: 'Morning Registration Desk',
    location: 'Lemon Tree Hotel · Lobby',
    type: 'registration',
  },
  {
    id: 'd2-plen',
    dayId: 'day2',
    time: '09:00 – 10:00',
    title: 'Plenary: Learning Sans Borders',
    location: 'Lemon Tree Hotel · Main Hall',
    type: 'keynote',
    speaker: 'Global faculty connections',
  },
  {
    id: 'd2-sym',
    dayId: 'day2',
    time: '10:00 – 11:15',
    title: 'Symposium: Precision & Safety in Anaesthesia',
    location: 'Lemon Tree Hotel · Main Hall',
    type: 'session',
  },
  {
    id: 'd2-tea',
    dayId: 'day2',
    time: '11:15 – 11:45',
    title: 'Tea Break',
    location: 'Lemon Tree Hotel · Foyer',
    type: 'break',
  },
  {
    id: 'd2-parallel',
    dayId: 'day2',
    time: '11:45 – 13:00',
    title: 'Parallel Sessions: Residents & Consultants',
    location: 'Lemon Tree Hotel · Halls A & B',
    type: 'session',
    speaker: 'Programme tailored across career stages',
  },
  {
    id: 'd2-lunch',
    dayId: 'day2',
    time: '13:00 – 14:00',
    title: 'Lunch',
    location: 'Lemon Tree Hotel · Dining',
    type: 'break',
  },
  {
    id: 'd2-panel',
    dayId: 'day2',
    time: '14:00 – 15:00',
    title: 'Panel: Future Directions in the Specialty',
    location: 'Lemon Tree Hotel · Main Hall',
    type: 'session',
  },
  {
    id: 'd2-awards',
    dayId: 'day2',
    time: '15:00 – 15:45',
    title: 'Awards & Prize Distribution',
    location: 'Lemon Tree Hotel · Main Hall',
    type: 'keynote',
    speaker: 'Attractive prizes for top scorers',
  },
  {
    id: 'd2-close',
    dayId: 'day2',
    time: '15:45 – 16:15',
    title: 'Valedictory & Closing Remarks',
    location: 'Lemon Tree Hotel · Main Hall',
    type: 'keynote',
    speaker: 'Team ICACON 2026',
  },
  {
    id: 'd2-tea2',
    dayId: 'day2',
    time: '16:15 – 16:45',
    title: 'Farewell Tea',
    location: 'Lemon Tree Hotel · Foyer',
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
    placeId: 'workshop-hall-a',
    fee: '₹4,000',
  },
  {
    id: 'pocus',
    title: 'Point of Care Ultrasound (POCUS)',
    director: 'Prof. Poonam Malhotra',
    placeId: 'workshop-101',
    fee: '₹4,000',
  },
  {
    id: 'vent',
    title: 'Mechanical Ventilation',
    director: 'Dr. Yash Javeri',
    placeId: 'anaesth-theatre',
    fee: '₹4,000',
  },
  {
    id: 'ob',
    title: 'Obstetrics Crisis Simulation and Skill',
    director: 'Dr. Faiza Khan',
    placeId: 'skills-lab',
    fee: '₹4,000',
  },
] as const

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
  organiser: {
    name: 'Meetings and More (Professional Conference Organiser)',
    web: 'www.meetingsnmore.com',
  },
  tips: [
    'Workshop day (11 Sept) is at JNMC — use indoor navigation in this app.',
    'Conference days (12–13 Sept) are at Lemon Tree Hotel, Aligarh.',
    'Workshop seats: first come, first served. Conference registration required.',
    'Workshop fee: ₹4,000 each (incl. 18% GST).',
  ],
}
