export type FloorId = 'ground' | 'first' | 'second'

export type PlaceCategory =
  | 'entrance'
  | 'workshop'
  | 'lecture'
  | 'lab'
  | 'service'
  | 'facility'
  | 'exit'
  | 'landmark'

export interface Point {
  x: number
  y: number
}

export interface Place {
  id: string
  name: string
  shortName: string
  floor: FloorId
  category: PlaceCategory
  position: Point
  description: string
  tags: string[]
  isStartPoint?: boolean
  isQuickAccess?: boolean
}

export interface RouteStep {
  id: string
  instruction: string
  distanceM: number
  floor: FloorId
}

export interface RoutePath {
  fromId: string
  toId: string
  totalDistanceM: number
  totalDurationMin: number
  steps: RouteStep[]
  polylines: Partial<Record<FloorId, Point[]>>
  floorSequence: FloorId[]
}

export interface FloorInfo {
  id: FloorId
  label: string
  shortLabel: string
}

export type EventDayId = 'workshop' | 'day1' | 'day2'

export interface EventDay {
  id: EventDayId
  label: string
  shortLabel: string
  dateLabel: string
  venue: string
  /** Indoor map only available for JNMC workshop day */
  hasIndoorNav: boolean
  note?: string
}

export interface AgendaItem {
  id: string
  dayId: EventDayId
  time: string
  title: string
  location: string
  placeId?: string
  type: 'session' | 'break' | 'registration' | 'keynote' | 'quiz' | 'social'
  speaker?: string
}

export type Screen = 'home' | 'navigate' | 'schedule' | 'offline'
