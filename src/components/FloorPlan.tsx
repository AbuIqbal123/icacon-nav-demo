import { useMemo, type ReactNode } from 'react'
import type { FloorId, Place, RoutePath } from '../types'
import { getPlace } from '../data/hospital'

interface FloorPlanProps {
  floor: FloorId
  route: RoutePath | null
  selectedStartId: string | null
  selectedDestId: string | null
  onSelectPlace: (place: Place) => void
}

const VIEW = { w: 400, h: 420 }

/** Clickable room bounds — keep in sync with place.position centers in hospital.ts */
export interface RoomHit {
  placeId: string
  x: number
  y: number
  w: number
  h: number
  label: string
}

const ROOMS_BY_FLOOR: Record<FloorId, RoomHit[]> = {
  ground: [
    { placeId: 'restroom-g', x: 44, y: 164, w: 64, h: 44, label: 'Restroom' },
    { placeId: 'registration', x: 44, y: 224, w: 88, h: 50, label: 'Registration' },
    { placeId: 'prayer-room', x: 268, y: 156, w: 64, h: 44, label: 'Prayer Room' },
    { placeId: 'emergency-exit', x: 340, y: 140, w: 28, h: 40, label: 'Exit' },
    { placeId: 'cafeteria', x: 268, y: 232, w: 88, h: 50, label: 'Cafeteria' },
    { placeId: 'opd-lobby', x: 144, y: 262, w: 112, h: 64, label: 'OPD Lobby' },
    { placeId: 'lifts-g', x: 178, y: 178, w: 44, h: 44, label: 'Lifts' },
    { placeId: 'main-entrance', x: 160, y: 360, w: 80, h: 48, label: 'Main Entrance' },
    { placeId: 'parking', x: 24, y: 340, w: 70, h: 48, label: 'Parking' },
  ],
  first: [
    { placeId: 'anatomy-museum', x: 44, y: 94, w: 108, h: 96, label: 'Anatomy Museum' },
    { placeId: 'lecture-hall-b', x: 250, y: 94, w: 108, h: 86, label: 'Lecture Hall B' },
    { placeId: 'skills-lab', x: 280, y: 232, w: 78, h: 68, label: 'Obstetric Sim' },
    { placeId: 'lifts-1', x: 178, y: 178, w: 44, h: 44, label: 'Lifts' },
  ],
  second: [
    { placeId: 'workshop-101', x: 44, y: 94, w: 98, h: 76, label: 'POCUS' },
    { placeId: 'room-205', x: 148, y: 94, w: 48, h: 52, label: 'USG Blocks' },
    { placeId: 'workshop-hall-a', x: 44, y: 242, w: 108, h: 76, label: 'Adv. Airway' },
    { placeId: 'anaesth-theatre', x: 250, y: 84, w: 108, h: 86, label: 'Mech. Vent' },
    { placeId: 'main-auditorium', x: 250, y: 232, w: 108, h: 86, label: 'Auditorium' },
    { placeId: 'lifts-2', x: 178, y: 178, w: 44, h: 44, label: 'Lifts' },
  ],
}

/** Decorative (non-destination) rooms drawn without hit targets */
function DecorRoom({
  x,
  y,
  w,
  h,
  label,
}: {
  x: number
  y: number
  w: number
  h: number
  label: string
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={6}
        fill="var(--color-surface-elevated)"
        stroke="var(--color-border)"
        strokeWidth={1}
        opacity={0.85}
      />
      <text
        x={x + w / 2}
        y={y + h / 2 + 3}
        textAnchor="middle"
        className="room-label"
        fill="var(--color-ink-muted)"
        opacity={0.55}
      >
        {label}
      </text>
    </g>
  )
}

function FloorShell({ children }: { children: ReactNode }) {
  return (
    <g>
      <rect
        x={24}
        y={64}
        width={352}
        height={292}
        rx={12}
        fill="var(--color-surface)"
        stroke="#863419"
        strokeWidth={1.5}
        strokeOpacity={0.35}
      />
      {children}
    </g>
  )
}

function GroundDecor() {
  return (
    <FloorShell>
      <DecorRoom x={44} y={84} w={88} h={64} label="Admin" />
      <DecorRoom x={268} y={84} w={88} h={56} label="Pharmacy" />
      <path
        d="M200 360 L200 230 M120 240 L280 240"
        fill="none"
        stroke="var(--color-border)"
        strokeWidth={14}
        strokeLinecap="round"
        opacity={0.65}
      />
      <path d="M40 360 L160 360" fill="none" stroke="var(--color-border)" strokeWidth={12} strokeLinecap="round" opacity={0.45} />
    </FloorShell>
  )
}

function FirstDecor() {
  return (
    <FloorShell>
      <path
        d="M150 200 L250 200 M200 178 L200 300 M250 200 L320 280"
        fill="none"
        stroke="var(--color-border)"
        strokeWidth={14}
        strokeLinecap="round"
        opacity={0.65}
      />
    </FloorShell>
  )
}

function SecondDecor() {
  return (
    <FloorShell>
      <path
        d="M150 200 L250 200 M200 178 L200 280 M100 160 L150 200 M120 280 L150 200 M280 140 L250 200 M300 280 L250 200"
        fill="none"
        stroke="var(--color-border)"
        strokeWidth={14}
        strokeLinecap="round"
        opacity={0.65}
      />
    </FloorShell>
  )
}

function InteractiveRoom({
  room,
  isStart,
  isDest,
  onSelect,
}: {
  room: RoomHit
  isStart: boolean
  isDest: boolean
  onSelect: () => void
}) {
  const selected = isStart || isDest
  const stroke = isStart ? '#863419' : isDest ? '#800d43' : 'var(--color-border)'
  const fill = isStart
    ? 'rgba(134, 52, 25, 0.12)'
    : isDest
      ? 'rgba(128, 13, 67, 0.12)'
      : 'var(--color-surface-elevated)'
  const strokeW = selected ? 2.5 : 1.2
  const labelColor = selected ? (isStart ? '#863419' : '#800d43') : 'var(--color-ink-muted)'
  const badge = isStart ? 'A' : isDest ? 'B' : null
  const badgeFill = isStart ? '#863419' : '#800d43'
  const cx = room.x + room.w / 2

  return (
    <g
      className="cursor-pointer"
      onClick={(e) => {
        e.stopPropagation()
        onSelect()
      }}
      role="button"
      tabIndex={0}
      aria-label={room.label}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect()
        }
      }}
    >
      {/* Larger invisible hit area for fat-finger taps */}
      <rect x={room.x - 2} y={room.y - 2} width={room.w + 4} height={room.h + 4} fill="transparent" />

      <rect
        x={room.x}
        y={room.y}
        width={room.w}
        height={room.h}
        rx={8}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeW}
        className="transition-colors"
      />

      {/* Label stays centered in the room — never covered by a pin */}
      <text
        x={cx}
        y={room.y + room.h / 2 + 3}
        textAnchor="middle"
        className="room-label"
        fill={labelColor}
        fontWeight={selected ? 700 : 600}
        style={{ pointerEvents: 'none' }}
      >
        {room.label}
      </text>

      {/* A/B badge sits above the room, clear of the label */}
      {badge && (
        <g transform={`translate(${cx}, ${room.y - 2})`} style={{ pointerEvents: 'none' }}>
          <circle r={9} fill={badgeFill} stroke="white" strokeWidth={2} />
          <text
            y={3.5}
            textAnchor="middle"
            fill="white"
            fontSize={10}
            fontWeight={700}
            fontFamily="Lato, sans-serif"
          >
            {badge}
          </text>
        </g>
      )}
    </g>
  )
}

export function FloorPlan({
  floor,
  route,
  selectedStartId,
  selectedDestId,
  onSelectPlace,
}: FloorPlanProps) {
  const rooms = ROOMS_BY_FLOOR[floor]
  const polyline = route?.polylines[floor] ?? null

  const pathD = useMemo(() => {
    if (!polyline || polyline.length < 2) return null
    return polyline.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  }, [polyline])

  return (
    <svg
      viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
      className="w-full h-full select-none"
      aria-label={`${floor} floor plan — tap a room to select`}
    >
      {floor === 'ground' && <GroundDecor />}
      {floor === 'first' && <FirstDecor />}
      {floor === 'second' && <SecondDecor />}

      {/* Route under rooms so labels stay readable */}
      {pathD && (
        <path
          d={pathD}
          fill="none"
          stroke="var(--color-route)"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="route-dotted"
          opacity={0.9}
        />
      )}

      {/* Clickable rooms — labels inside, A/B badge above the room */}
      {rooms.map((room) => {
        const place = getPlace(room.placeId)
        if (!place) return null
        return (
          <InteractiveRoom
            key={room.placeId}
            room={room}
            isStart={room.placeId === selectedStartId}
            isDest={room.placeId === selectedDestId}
            onSelect={() => onSelectPlace(place)}
          />
        )
      })}
    </svg>
  )
}
