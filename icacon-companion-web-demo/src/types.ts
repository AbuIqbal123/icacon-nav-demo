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

export type Screen = 'home' | 'navigate' | 'schedule' | 'offline'
