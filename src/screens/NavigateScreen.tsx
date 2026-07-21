import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ArrowDown, Search, X } from 'lucide-react'
import { Header } from '../components/Header'
import { FloorPlan } from '../components/FloorPlan'
import {
  FLOORS,
  PLACES,
  findRoute,
  floorLabel,
  getPlace,
  searchPlaces,
} from '../data/hospital'
import type { FloorId, Place, Screen } from '../types'

interface NavigateScreenProps {
  onNavigate: (s: Screen) => void
  initialDestId?: string | null
  onClearInitialDest?: () => void
}

type SelectMode = 'start' | 'dest' | null
type FloorFilter = FloorId | 'all'

const FLOOR_ORDER = FLOORS.map((f) => f.id)

/** Directions sheet heights (px) */
const SHEET_COLLAPSED = 72
const SHEET_MIN = 140
const SHEET_DEFAULT = 220
const SHEET_MAX_RATIO = 0.58 // of the navigate screen height

function floorIndexOf(id: FloorId) {
  return FLOOR_ORDER.indexOf(id)
}

export function NavigateScreen({
  onNavigate,
  initialDestId,
  onClearInitialDest,
}: NavigateScreenProps) {
  const [floor, setFloor] = useState<FloorId>('ground')
  const [query, setQuery] = useState('')
  const [startId, setStartId] = useState('main-entrance')
  const [destId, setDestId] = useState<string | null>(null)
  const [selectMode, setSelectMode] = useState<SelectMode>(null)
  const [showSearch, setShowSearch] = useState(false)
  const [showDirections, setShowDirections] = useState(true)
  const [sheetHeight, setSheetHeight] = useState(SHEET_DEFAULT)
  const [sheetDragging, setSheetDragging] = useState(false)
  const [pickerFloorFilter, setPickerFloorFilter] = useState<FloorFilter>('all')

  // Swipe tracking (map floors)
  const swipeStartX = useRef<number | null>(null)
  const swipeStartY = useRef<number | null>(null)
  const suppressRoomClick = useRef(false)

  // Directions sheet resize
  const screenRef = useRef<HTMLDivElement>(null)
  const sheetDrag = useRef<{ startY: number; startH: number } | null>(null)
  const sheetHeightRef = useRef(sheetHeight)
  const showDirectionsRef = useRef(showDirections)
  sheetHeightRef.current = sheetHeight
  showDirectionsRef.current = showDirections

  const sheetMax = useCallback(() => {
    const h = screenRef.current?.clientHeight ?? window.innerHeight
    return Math.max(SHEET_MIN + 40, Math.round(h * SHEET_MAX_RATIO))
  }, [])

  const openSheet = useCallback(() => {
    setShowDirections(true)
    setSheetHeight((h) => {
      const next = Math.max(h >= SHEET_MIN ? h : SHEET_DEFAULT, SHEET_DEFAULT)
      return Math.min(next, sheetMax())
    })
  }, [sheetMax])

  const closeSheet = useCallback(() => {
    setShowDirections(false)
  }, [])

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!sheetDrag.current) return
      const dy = sheetDrag.current.startY - e.clientY
      const max = sheetMax()
      const next = Math.round(
        Math.min(max, Math.max(SHEET_COLLAPSED, sheetDrag.current.startH + dy)),
      )
      setSheetHeight(next)
      setShowDirections(next > SHEET_COLLAPSED + 24)
    }
    const onUp = () => {
      if (!sheetDrag.current) return
      sheetDrag.current = null
      setSheetDragging(false)
      setSheetHeight((h) => {
        if (h < SHEET_MIN) {
          setShowDirections(false)
          return SHEET_COLLAPSED
        }
        setShowDirections(true)
        return Math.min(sheetMax(), Math.max(SHEET_MIN, h))
      })
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
    }
  }, [sheetMax])

  useEffect(() => {
    if (initialDestId) {
      setDestId(initialDestId)
      const place = getPlace(initialDestId)
      if (place) setFloor(place.floor)
      openSheet()
      onClearInitialDest?.()
    }
  }, [initialDestId, onClearInitialDest, openSheet])

  const route = useMemo(() => {
    if (!startId || !destId) return null
    return findRoute(startId, destId)
  }, [startId, destId])

  // When a new route is set, jump map to the start floor of that route
  useEffect(() => {
    if (route?.floorSequence?.length) {
      setFloor(route.floorSequence[0])
    }
  }, [route?.fromId, route?.toId])

  const results = useMemo(() => searchPlaces(query), [query])
  const startPlace = getPlace(startId)
  const destPlace = destId ? getPlace(destId) : null

  const closePicker = () => {
    setShowSearch(false)
    setSelectMode(null)
    setQuery('')
    // iOS sometimes keeps keyboard-zoom; blur + scroll reset helps
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
    window.scrollTo(0, 0)
  }

  const openPicker = (mode: 'start' | 'dest') => {
    setSelectMode(mode)
    setQuery('')
    // Start on All floors so users see the full list (less confusing than auto-filtering)
    setPickerFloorFilter('all')
    setShowSearch(true)
  }

  const handleSelectPlace = (place: Place) => {
    if (selectMode === 'start') {
      setStartId(place.id)
      setFloor(place.floor)
      closePicker()
      return
    }
    if (place.id === startId) return
    setDestId(place.id)
    setFloor(place.floor)
    openSheet()
    closePicker()
  }

  const listItems = useMemo(() => {
    const base = query
      ? results
      : PLACES.filter((p) => p.category !== 'landmark' || p.id === 'anatomy-museum')

    if (pickerFloorFilter === 'all') return base
    return base.filter((p) => p.floor === pickerFloorFilter)
  }, [query, results, pickerFloorFilter])

  const shiftFloor = useCallback((delta: number) => {
    setFloor((current) => {
      const i = floorIndexOf(current)
      const next = i + delta
      if (next < 0 || next >= FLOOR_ORDER.length) return current
      return FLOOR_ORDER[next]
    })
  }, [])

  const onSwipeStart = (clientX: number, clientY: number) => {
    swipeStartX.current = clientX
    swipeStartY.current = clientY
  }

  const onSwipeEnd = (clientX: number, clientY: number) => {
    if (swipeStartX.current == null || swipeStartY.current == null) return
    const dx = clientX - swipeStartX.current
    const dy = clientY - swipeStartY.current
    const threshold = 56
    // Only change floor on clear horizontal swipes (ignore vertical / taps)
    if (Math.abs(dx) > threshold && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) shiftFloor(1)
      else shiftFloor(-1)
      suppressRoomClick.current = true
      window.setTimeout(() => {
        suppressRoomClick.current = false
      }, 50)
    }
    swipeStartX.current = null
    swipeStartY.current = null
  }

  return (
    <div className="app-screen" ref={screenRef}>
      <Header title="Navigation" subtitle="JNMC · ICACON Workshop" onBack={() => onNavigate('home')} />

      {/* Compact A → B route strip */}
      <div className="shrink-0 px-3 py-2 border-b border-border bg-surface-elevated">
        <div className="flex items-stretch gap-1.5">
          <button
            type="button"
            onClick={() => openPicker('start')}
            className="flex-1 min-w-0 rounded-xl border border-brand/30 bg-surface px-2.5 py-2 flex items-center gap-2 text-left active:bg-brand/5"
          >
            <span className="shrink-0 w-6 h-6 rounded-full bg-brand text-white text-[11px] font-bold flex items-center justify-center">
              A
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[10px] font-bold uppercase tracking-wide text-brand leading-none">
                From
              </span>
              <span className="block text-sm font-bold text-ink truncate mt-0.5">
                {startPlace?.shortName ?? 'Start'}
              </span>
            </span>
          </button>

          <div className="flex items-center text-ink-muted px-0.5" aria-hidden>
            <ArrowDown size={14} className="rotate-[-90deg]" />
          </div>

          <button
            type="button"
            onClick={() => openPicker('dest')}
            className={`flex-1 min-w-0 rounded-xl border px-2.5 py-2 flex items-center gap-2 text-left active:bg-maroon/5 ${
              destPlace
                ? 'border-maroon/30 bg-surface'
                : 'border-dashed border-maroon/40 bg-maroon/[0.04]'
            }`}
          >
            <span className="shrink-0 w-6 h-6 rounded-full bg-maroon text-white text-[11px] font-bold flex items-center justify-center">
              B
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[10px] font-bold uppercase tracking-wide text-maroon leading-none">
                To
              </span>
              <span
                className={`block text-sm font-bold truncate mt-0.5 ${
                  destPlace ? 'text-ink' : 'text-ink-muted'
                }`}
              >
                {destPlace?.shortName ?? 'Choose…'}
              </span>
            </span>
          </button>
        </div>
      </div>

      {/* Floor tabs */}
      <div className="shrink-0 flex gap-1 px-3 py-1.5">
        {FLOORS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFloor(f.id)}
            className={`flex-1 rounded-lg py-1.5 text-xs font-bold ${
              floor === f.id
                ? 'bg-brand text-white'
                : 'bg-surface-elevated border border-border text-ink-muted'
            }`}
          >
            {f.shortLabel === 'G' ? 'Ground' : `${f.shortLabel}F`}
          </button>
        ))}
      </div>

      {/* Map — horizontal swipe changes floor; taps select rooms */}
      <div
        className="relative flex-1 min-h-0 bg-surface px-1 overflow-hidden"
        style={{ touchAction: 'manipulation' }}
        onTouchStart={(e) => onSwipeStart(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchEnd={(e) =>
          onSwipeEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY)
        }
        onMouseDown={(e) => onSwipeStart(e.clientX, e.clientY)}
        onMouseUp={(e) => onSwipeEnd(e.clientX, e.clientY)}
      >
        <FloorPlan
          floor={floor}
          route={route}
          selectedStartId={startId}
          selectedDestId={destId}
          onSelectPlace={(p) => {
            if (suppressRoomClick.current) return
            if (p.id === startId && destId) return
            if (!destId) {
              if (p.id !== startId) {
                setDestId(p.id)
                openSheet()
              }
              return
            }
            // Tap replaces destination
            setDestId(p.id)
            setFloor(p.floor)
            openSheet()
          }}
        />

        {/* Page dots */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 pointer-events-none">
          {FLOORS.map((f) => (
            <span
              key={f.id}
              className={`h-1.5 rounded-full transition-all ${
                floor === f.id ? 'w-4 bg-brand' : 'w-1.5 bg-border'
              }`}
            />
          ))}
        </div>

        {route && route.floorSequence.length > 1 && !route.floorSequence.includes(floor) && (
          <button
            type="button"
            onClick={() => setFloor(route.floorSequence[0])}
            className="absolute top-2 left-2 right-2 rounded-xl btn-theme-maroon text-xs font-bold py-2"
          >
            Route is on another floor — jump there
          </button>
        )}
      </div>

      {/* Directions — resizable sheet (drag handle) */}
      {route && destPlace && (
        <div
          className="shrink-0 flex flex-col border-t border-border bg-surface-elevated shadow-[0_-2px_12px_rgba(42,33,28,0.06)]"
          style={{
            height: showDirections ? sheetHeight : SHEET_COLLAPSED,
            maxHeight: `${SHEET_MAX_RATIO * 100}%`,
            transition: sheetDragging ? 'none' : 'height 0.15s ease-out',
          }}
        >
          {/* Drag handle — pull up/down to resize */}
          <div
            className="shrink-0 flex flex-col items-center pt-1.5 pb-0.5 cursor-ns-resize touch-none select-none"
            onPointerDown={(e) => {
              e.preventDefault()
              setSheetDragging(true)
              sheetDrag.current = {
                startY: e.clientY,
                startH: showDirectionsRef.current
                  ? sheetHeightRef.current
                  : SHEET_COLLAPSED,
              }
            }}
            role="separator"
            aria-orientation="horizontal"
            aria-valuemin={SHEET_COLLAPSED}
            aria-valuemax={sheetMax()}
            aria-valuenow={showDirections ? sheetHeight : SHEET_COLLAPSED}
            aria-label="Drag to resize directions"
          >
            <span className="w-10 h-1 rounded-full bg-border" />
            <span className="text-[10px] text-ink-muted mt-0.5">Drag to resize</span>
          </div>

          <div className="shrink-0 px-3 py-1.5 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wide text-brand">Directions</p>
              <p className="text-sm font-bold text-ink truncate">
                {startPlace?.shortName} → {destPlace.shortName}
              </p>
              <p className="text-[11px] text-ink-muted">
                {route.totalDistanceM} m · ~{route.totalDurationMin} min
                {route.floorSequence.length > 1
                  ? ` · ${route.floorSequence.map(floorLabel).join(' → ')}`
                  : ''}
              </p>
            </div>
            <button
              type="button"
              className="text-xs font-bold text-brand shrink-0 pl-2 py-2"
              onClick={() => (showDirections ? closeSheet() : openSheet())}
              aria-expanded={showDirections}
            >
              {showDirections ? 'Hide' : 'Show'}
            </button>
          </div>

          {showDirections && (
            <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
              {route.floorSequence.length > 1 && (
                <div className="flex gap-1 shrink-0 px-3 pb-1.5">
                  {route.floorSequence.map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFloor(f)}
                      className={`text-[10px] font-bold px-2 py-1 rounded-full border ${
                        floor === f
                          ? 'bg-brand text-white border-brand'
                          : 'border-border text-ink-muted'
                      }`}
                    >
                      {FLOORS.find((x) => x.id === f)?.shortLabel === 'G'
                        ? 'G'
                        : `${FLOORS.find((x) => x.id === f)?.shortLabel}F`}
                    </button>
                  ))}
                </div>
              )}
              <ol className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-3 pb-2 space-y-2.5 [-webkit-overflow-scrolling:touch]">
                {route.steps.map((step, i) => (
                  <li key={step.id} className="flex gap-2.5 text-sm">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-brand text-white text-[10px] font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <span className="min-w-0">
                      <span className="text-ink leading-snug block">{step.instruction}</span>
                      {step.distanceM > 0 && (
                        <span className="text-[11px] text-ink-muted">{step.distanceM} m</span>
                      )}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}

      {/* Place picker */}
      {showSearch && (
        <div className="absolute inset-0 z-30 bg-surface flex flex-col min-h-0 overflow-hidden">
          <div className="shrink-0 border-b border-border bg-surface-elevated">
            <div className="px-3 pt-3 pb-2 flex items-start gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-wide text-ink-muted">
                  {selectMode === 'start' ? 'Step 1 of 2' : 'Step 2 of 2'}
                </p>
                <h2 className="font-display text-lg font-bold text-ink leading-tight">
                  {selectMode === 'start' ? 'Choose starting point' : 'Choose destination'}
                </h2>
              </div>
              <button
                type="button"
                onClick={closePicker}
                className="shrink-0 text-base font-bold text-brand px-2 py-1 rounded-lg"
              >
                Cancel
              </button>
            </div>

            <div className="px-3 pb-2">
              {/* text-base (16px) prevents iOS Safari auto-zoom on focus */}
              <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2.5">
                <Search size={18} className="text-ink-muted shrink-0" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={
                    selectMode === 'start'
                      ? 'Search start (e.g. Entrance, Parking)…'
                      : 'Search place (e.g. Workshop 101)…'
                  }
                  enterKeyHint="search"
                  autoComplete="off"
                  autoCorrect="off"
                  className="flex-1 min-w-0 bg-transparent outline-none text-base text-ink placeholder:text-ink-muted"
                  style={{ fontSize: '16px' }}
                />
                {query && (
                  <button type="button" onClick={() => setQuery('')} aria-label="Clear search">
                    <X size={18} className="text-ink-muted" />
                  </button>
                )}
              </div>
            </div>

            <div className="px-3 pb-2.5">
              <p className="text-[11px] font-bold text-ink-muted mb-1.5">Filter by floor</p>
              <div className="flex gap-1.5">
                {(
                  [
                    { id: 'all' as const, label: 'All floors' },
                    ...FLOORS.map((f) => ({
                      id: f.id as FloorFilter,
                      label: f.shortLabel === 'G' ? 'Ground' : `${f.shortLabel}F`,
                    })),
                  ] as { id: FloorFilter; label: string }[]
                ).map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setPickerFloorFilter(f.id)}
                    className={`flex-1 rounded-full py-2 text-xs font-bold border ${
                      pickerFloorFilter === f.id
                        ? selectMode === 'start'
                          ? 'bg-brand text-white border-brand'
                          : 'bg-maroon text-white border-maroon'
                        : 'bg-surface border-border text-ink-muted'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="scroll-area flex-1 min-h-0">
            {pickerFloorFilter === 'all' && !query
              ? FLOORS.map((fl) => {
                  const onFloor = listItems.filter((p) => p.floor === fl.id)
                  if (!onFloor.length) return null
                  return (
                    <div key={fl.id}>
                      <p className="sticky top-0 z-10 px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-brand bg-surface border-b border-border">
                        {fl.label}
                      </p>
                      {onFloor.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => handleSelectPlace(p)}
                          className="w-full px-4 py-3 text-left border-b border-border/70 active:bg-surface-elevated"
                        >
                          <span className="block text-base font-semibold text-ink">{p.name}</span>
                          <span className="block text-sm text-ink-muted mt-0.5">
                            {p.description}
                          </span>
                        </button>
                      ))}
                    </div>
                  )
                })
              : listItems.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleSelectPlace(p)}
                    className="w-full px-4 py-3 text-left border-b border-border/70 active:bg-surface-elevated"
                  >
                    <span className="block text-base font-semibold text-ink">{p.name}</span>
                    <span className="block text-sm text-ink-muted mt-0.5">
                      {floorLabel(p.floor)}
                    </span>
                  </button>
                ))}

            {listItems.length === 0 && (
              <p className="text-center text-base text-ink-muted py-10 px-4">
                {query ? `No places match “${query}”` : 'No places on this floor'}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
