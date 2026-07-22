export type EventDayId = 'workshop' | 'day1' | 'day2'

export interface EventDay {
  id: EventDayId
  label: string
  shortLabel: string
  dateLabel: string
  venue: string
  /** Google Maps search / place URL */
  mapsUrl: string
  note?: string
}

export interface AgendaItem {
  id: string
  dayId: EventDayId
  time: string
  title: string
  location: string
  type: 'session' | 'break' | 'registration' | 'keynote' | 'quiz' | 'social'
  speaker?: string
}

export type PdfId = 'brochure' | 'day1' | 'day2'
