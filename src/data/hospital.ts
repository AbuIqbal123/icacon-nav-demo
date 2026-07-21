import type { FloorInfo, Place, RoutePath, RouteStep, FloorId, Point } from '../types'

export const FLOORS: FloorInfo[] = [
  { id: 'ground', label: 'Ground Floor', shortLabel: 'G' },
  { id: 'first', label: '1st Floor', shortLabel: '1' },
  { id: 'second', label: '2nd Floor', shortLabel: '2' },
]

export function floorLabel(id: FloorId): string {
  return FLOORS.find((f) => f.id === id)?.label ?? id
}

/** Shared lift core on every floor plan (must match FloorPlan SVG) */
const LIFT: Record<FloorId, Point> = {
  ground: { x: 200, y: 200 },
  first: { x: 200, y: 200 },
  second: { x: 200, y: 200 },
}

/**
 * Place positions must match room labels on the floor plan SVG.
 * Corridor routing always uses the central lifts cross (x=200 / y=200).
 */
/** Centers match clickable room bounds in FloorPlan (routing endpoints) */
export const PLACES: Place[] = [
  // —— Ground Floor ——
  {
    id: 'main-entrance',
    name: 'Main Entrance',
    shortName: 'Entrance',
    floor: 'ground',
    category: 'entrance',
    position: { x: 200, y: 384 },
    description: 'Main visitor entrance',
    tags: ['start', 'gate', 'entry', 'entrance'],
    isStartPoint: true,
    isQuickAccess: true,
  },
  {
    id: 'parking',
    name: 'Parking',
    shortName: 'Parking',
    floor: 'ground',
    category: 'entrance',
    position: { x: 59, y: 364 },
    description: 'Visitor parking',
    tags: ['parking', 'car'],
    isStartPoint: true,
  },
  {
    id: 'opd-lobby',
    name: 'OPD Lobby',
    shortName: 'OPD',
    floor: 'ground',
    category: 'facility',
    position: { x: 200, y: 294 },
    description: 'Outpatient waiting hall',
    tags: ['opd', 'lobby'],
    isStartPoint: true,
    isQuickAccess: true,
  },
  {
    id: 'registration',
    name: 'Registration Desk',
    shortName: 'Registration',
    floor: 'ground',
    category: 'service',
    position: { x: 88, y: 249 },
    description: 'ICACON check-in',
    tags: ['register', 'check-in', 'badge'],
    isQuickAccess: true,
  },
  {
    id: 'cafeteria',
    name: 'Cafeteria',
    shortName: 'Cafeteria',
    floor: 'ground',
    category: 'service',
    position: { x: 312, y: 257 },
    description: 'Food court / canteen',
    tags: ['food', 'canteen', 'cafeteria', 'tea', 'lunch'],
    isQuickAccess: true,
  },
  {
    id: 'restroom-g',
    name: 'Restroom',
    shortName: 'Restroom',
    floor: 'ground',
    category: 'facility',
    position: { x: 76, y: 186 },
    description: 'Washrooms, Ground Floor west corridor',
    tags: ['toilet', 'washroom', 'wc', 'restroom'],
    isQuickAccess: true,
  },
  {
    id: 'emergency-exit',
    name: 'Emergency Exit',
    shortName: 'Exit',
    floor: 'ground',
    category: 'exit',
    position: { x: 354, y: 160 },
    description: 'East courtyard exit',
    tags: ['exit', 'emergency', 'fire'],
  },
  {
    id: 'prayer-room',
    name: 'Prayer Room',
    shortName: 'Prayer',
    floor: 'ground',
    category: 'facility',
    position: { x: 300, y: 178 },
    description: 'Quiet prayer space, east wing',
    tags: ['prayer'],
  },
  {
    id: 'lifts-g',
    name: 'Lifts (Ground Floor)',
    shortName: 'Lifts',
    floor: 'ground',
    category: 'landmark',
    position: { ...LIFT.ground },
    description: 'Central lift lobby',
    tags: ['lift', 'elevator'],
  },

  // —— 1st Floor ——
  {
    id: 'anatomy-museum',
    name: 'Anatomy Museum',
    shortName: 'Museum',
    floor: 'first',
    category: 'landmark',
    position: { x: 98, y: 142 },
    description: 'Landmark museum, west wing',
    tags: ['museum', 'anatomy'],
  },
  {
    id: 'lecture-hall-b',
    name: 'Lecture Hall B',
    shortName: 'Hall B',
    floor: 'first',
    category: 'lecture',
    position: { x: 304, y: 137 },
    description: 'Parallel sessions',
    tags: ['lecture', 'hall'],
    isQuickAccess: true,
  },
  {
    id: 'skills-lab',
    name: 'Obstetric Crisis Simulation Workshop',
    shortName: 'Obstetric Sim',
    floor: 'first',
    category: 'lab',
    position: { x: 319, y: 266 },
    description: 'Obstetric crisis simulation & skills — Dr. Faiza Khan',
    tags: ['lab', 'skills', 'obstetric', 'simulation', 'workshop'],
    isQuickAccess: true,
  },
  {
    id: 'lifts-1',
    name: 'Lifts (1st Floor)',
    shortName: 'Lifts',
    floor: 'first',
    category: 'landmark',
    position: { ...LIFT.first },
    description: 'Central lift lobby',
    tags: ['lift', 'elevator'],
  },

  // —— 2nd Floor ——
  {
    id: 'workshop-101',
    name: 'POCUS Workshop',
    shortName: 'POCUS',
    floor: 'second',
    category: 'workshop',
    position: { x: 93, y: 132 },
    description: 'Point of Care Ultrasound — Prof. Poonam Malhotra',
    tags: ['workshop', 'pocus', 'ultrasound', 'room 101'],
    isQuickAccess: true,
  },
  {
    id: 'anaesth-theatre',
    name: 'Mechanical Ventilation Workshop',
    shortName: 'Mech. Vent',
    floor: 'second',
    category: 'workshop',
    position: { x: 304, y: 127 },
    description: 'Mechanical ventilation workshop — Dr. Yash Javeri',
    tags: ['workshop', 'ventilation', 'mechanical', 'theatre'],
    isQuickAccess: true,
  },
  {
    id: 'main-auditorium',
    name: 'Main Auditorium',
    shortName: 'Auditorium',
    floor: 'second',
    category: 'lecture',
    position: { x: 304, y: 275 },
    description: 'Briefing / plenary space',
    tags: ['auditorium', 'plenary', 'briefing'],
    isQuickAccess: true,
  },
  {
    id: 'workshop-hall-a',
    name: 'Advanced Airway Workshop',
    shortName: 'Adv. Airway',
    floor: 'second',
    category: 'workshop',
    position: { x: 98, y: 280 },
    description: 'Advanced airway workshop — Prof. Rashid M Khan',
    tags: ['workshop', 'airway', 'hall a'],
    isQuickAccess: true,
  },
  {
    id: 'room-205',
    name: 'USG Regional Nerve Blocks Workshop',
    shortName: 'USG Blocks',
    floor: 'second',
    category: 'workshop',
    position: { x: 172, y: 120 },
    description: 'Ultrasound guided regional nerve blocks',
    tags: ['room 205', 'workshop', 'regional', 'nerve', 'blocks', 'ultrasound'],
    isQuickAccess: true,
  },
  {
    id: 'lifts-2',
    name: 'Lifts (2nd Floor)',
    shortName: 'Lifts',
    floor: 'second',
    category: 'landmark',
    position: { ...LIFT.second },
    description: 'Central lift lobby',
    tags: ['lift', 'elevator'],
  },
]

export function getPlace(id: string): Place | undefined {
  return PLACES.find((p) => p.id === id)
}

export function getPlacesByFloor(floor: FloorId): Place[] {
  return PLACES.filter((p) => p.floor === floor)
}

export function placeLocation(place: Place): string {
  return `${place.name}, ${floorLabel(place.floor)}`
}

export function searchPlaces(query: string): Place[] {
  const q = query.trim().toLowerCase()
  const navigable = PLACES.filter((p) => p.category !== 'landmark')
  if (!q) return navigable
  return PLACES.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.shortName.toLowerCase().includes(q) ||
      p.tags.some((t) => t.includes(q)) ||
      floorLabel(p.floor).toLowerCase().includes(q),
  )
}

// —— Geometry helpers (map coords: x→ right, y→ down) ——

const MAP_UNITS_TO_M = 0.5
const WALK_M_PER_MIN = 50

function dist(a: Point, b: Point): number {
  return Math.hypot(b.x - a.x, b.y - a.y)
}

function segmentDistM(a: Point, b: Point): number {
  return Math.max(1, Math.round(dist(a, b) * MAP_UNITS_TO_M))
}

function polylineLengthM(pts: Point[]): number {
  let d = 0
  for (let i = 1; i < pts.length; i++) d += dist(pts[i - 1], pts[i])
  return Math.round(d * MAP_UNITS_TO_M)
}

function samePoint(a: Point, b: Point, eps = 1): boolean {
  return Math.abs(a.x - b.x) < eps && Math.abs(a.y - b.y) < eps
}

function dedupePoints(pts: Point[]): Point[] {
  const out: Point[] = []
  for (const p of pts) {
    if (!out.length || !samePoint(out[out.length - 1], p)) out.push({ ...p })
  }
  return out
}

/**
 * Route on one floor via the central cross (vertical x=200, horizontal y=200).
 * Path vertices match the dotted line drawn on the map.
 */
function pathOnFloor(from: Point, to: Point): Point[] {
  if (samePoint(from, to)) return [{ ...from }]

  if (Math.abs(from.x - to.x) < 1 || Math.abs(from.y - to.y) < 1) {
    return dedupePoints([from, to])
  }

  const viaVertical: Point[] = [from, { x: 200, y: from.y }, { x: 200, y: to.y }, to]
  const viaHorizontal: Point[] = [from, { x: from.x, y: 200 }, { x: to.x, y: 200 }, to]

  const lenV = polylineLengthM(viaVertical)
  const lenH = polylineLengthM(viaHorizontal)

  return dedupePoints(lenV <= lenH ? viaVertical : viaHorizontal)
}

type TurnKind = 'straight' | 'left' | 'right' | 'uturn'

/**
 * Turn at `curr` coming from `prev` going to `next`.
 * Screen coords (y increases downward): positive cross product = turn right.
 */
function turnAt(prev: Point, curr: Point, next: Point): TurnKind {
  const inX = curr.x - prev.x
  const inY = curr.y - prev.y
  const outX = next.x - curr.x
  const outY = next.y - curr.y
  const magIn = Math.hypot(inX, inY)
  const magOut = Math.hypot(outX, outY)
  if (magIn < 0.5 || magOut < 0.5) return 'straight'

  const cross = inX * outY - inY * outX
  const dot = inX * outX + inY * outY
  const cos = dot / (magIn * magOut)

  if (cos > 0.85) return 'straight'
  if (cos < -0.5) return 'uturn'
  return cross > 0 ? 'right' : 'left'
}

/** Drop collinear middle points so each vertex is a real turn. */
function simplifyPath(pts: Point[]): Point[] {
  const d = dedupePoints(pts)
  if (d.length <= 2) return d
  const out: Point[] = [d[0]]
  for (let i = 1; i < d.length - 1; i++) {
    if (turnAt(out[out.length - 1], d[i], d[i + 1]) !== 'straight') {
      out.push(d[i])
    }
  }
  out.push(d[d.length - 1])
  return dedupePoints(out)
}

function instructionForSegment(
  turn: TurnKind | 'start',
  opts: { towardLifts?: boolean; exitLift?: boolean; arriveName?: string },
): string {
  // Distance is shown as a separate label under the step — keep text turn-only
  if (opts.arriveName && turn === 'start') {
    return `Walk straight to ${opts.arriveName}`
  }

  if (turn === 'start' || turn === 'straight') {
    if (opts.exitLift) return 'Exit the lift and walk straight'
    if (opts.towardLifts) return 'Walk straight toward the central lifts'
    if (opts.arriveName) return `Continue straight to ${opts.arriveName}`
    return 'Walk straight along the corridor'
  }

  if (turn === 'left') {
    if (opts.towardLifts) return 'Turn left toward the central lifts'
    if (opts.arriveName) return `Turn left to ${opts.arriveName}`
    return 'Turn left and continue along the corridor'
  }

  if (turn === 'right') {
    if (opts.towardLifts) return 'Turn right toward the central lifts'
    if (opts.arriveName) return `Turn right to ${opts.arriveName}`
    return 'Turn right and continue along the corridor'
  }

  return 'Turn around and continue'
}

/**
 * Build walk steps that follow each map polyline segment (left/right/straight).
 * Distances come from the same points drawn as the dotted route.
 */
function stepsAlongPath(
  rawPath: Point[],
  floor: FloorId,
  opts: {
    towardLifts?: boolean
    fromLift?: boolean
    arriveName?: string
  } = {},
): Omit<RouteStep, 'id'>[] {
  const path = simplifyPath(rawPath)
  if (path.length < 2) return []

  const steps: Omit<RouteStep, 'id'>[] = []
  const last = path.length - 2

  for (let i = 0; i < path.length - 1; i++) {
    const a = path[i]
    const b = path[i + 1]
    const distanceM = segmentDistM(a, b)
    const isFirst = i === 0
    const isLast = i === last

    let turn: TurnKind | 'start' = 'start'
    if (!isFirst) {
      turn = turnAt(path[i - 1], a, b)
    }

    const towardLifts = Boolean(opts.towardLifts && isLast)
    const exitLift = Boolean(opts.fromLift && isFirst)
    const arriveName = isLast && opts.arriveName ? opts.arriveName : undefined

    steps.push({
      instruction: instructionForSegment(turn, {
        towardLifts,
        exitLift,
        arriveName,
      }),
      distanceM,
      floor,
    })
  }

  return steps
}

function buildSteps(
  from: Place,
  to: Place,
  polylines: Partial<Record<FloorId, Point[]>>,
  floorSequence: FloorId[],
): RouteStep[] {
  const parts: Omit<RouteStep, 'id'>[] = []

  parts.push({
    instruction: `Start at ${from.name}`,
    distanceM: 0,
    floor: from.floor,
  })

  const floorLevel: Record<FloorId, number> = { ground: 0, first: 1, second: 2 }

  if (floorSequence.length === 1) {
    const floor = floorSequence[0]
    const poly = polylines[floor] ?? []
    parts.push(
      ...stepsAlongPath(poly, floor, {
        arriveName: to.name,
      }),
    )
    parts.push({
      instruction: `Arrive at ${to.name}`,
      distanceM: 0,
      floor: to.floor,
    })
  } else {
    const fromPoly = polylines[from.floor] ?? []
    const toPoly = polylines[to.floor] ?? []

    parts.push(
      ...stepsAlongPath(fromPoly, from.floor, {
        towardLifts: true,
      }),
    )

    const liftVerb =
      floorLevel[to.floor] > floorLevel[from.floor]
        ? 'up'
        : floorLevel[to.floor] < floorLevel[from.floor]
          ? 'down'
          : ''
    parts.push({
      instruction: liftVerb
        ? `Take the lift ${liftVerb} to ${floorLabel(to.floor)}`
        : `Take the lift to ${floorLabel(to.floor)}`,
      distanceM: 0,
      floor: from.floor,
    })

    parts.push(
      ...stepsAlongPath(toPoly, to.floor, {
        fromLift: true,
        arriveName: to.name,
      }),
    )

    parts.push({
      instruction: `Arrive at ${to.name}`,
      distanceM: 0,
      floor: to.floor,
    })
  }

  return parts.map((p, i) => ({ ...p, id: `s${i + 1}` }))
}

function buildRoute(from: Place, to: Place): RoutePath {
  const polylines: Partial<Record<FloorId, Point[]>> = {}
  let floorSequence: FloorId[]

  if (from.floor === to.floor) {
    floorSequence = [from.floor]
    polylines[from.floor] = pathOnFloor(from.position, to.position)
  } else {
    floorSequence = [from.floor, to.floor]
    polylines[from.floor] = pathOnFloor(from.position, LIFT[from.floor])
    polylines[to.floor] = pathOnFloor(LIFT[to.floor], to.position)
  }

  const steps = buildSteps(from, to, polylines, floorSequence)

  let totalDistanceM = 0
  for (const floor of floorSequence) {
    const poly = polylines[floor]
    if (poly) totalDistanceM += polylineLengthM(poly)
  }
  if (floorSequence.length > 1) totalDistanceM += 10
  totalDistanceM = Math.max(10, totalDistanceM)

  // Prefer sum of step walk distances when available (matches turn-by-turn)
  const stepWalk = steps.reduce((s, x) => s + x.distanceM, 0)
  if (stepWalk > 0) totalDistanceM = stepWalk

  const totalDurationMin = Math.max(1, Math.ceil(totalDistanceM / WALK_M_PER_MIN))

  return {
    fromId: from.id,
    toId: to.id,
    totalDistanceM,
    totalDurationMin,
    steps,
    polylines,
    floorSequence,
  }
}

export function findRoute(fromId: string, toId: string): RoutePath | null {
  if (fromId === toId) return null
  const from = getPlace(fromId)
  const to = getPlace(toId)
  if (!from || !to) return null
  return buildRoute(from, to)
}

export const START_POINTS = PLACES.filter((p) => p.isStartPoint)
export const QUICK_DESTINATIONS = PLACES.filter((p) => p.isQuickAccess && p.category !== 'entrance')
