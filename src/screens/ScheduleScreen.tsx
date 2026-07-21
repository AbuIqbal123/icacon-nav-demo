import { useMemo, useState } from 'react'
import { Header } from '../components/Header'
import { EVENT_DAYS, EVENT_META, scheduleForDay } from '../data/events'
import type { EventDayId, Screen } from '../types'

interface ScheduleScreenProps {
  onNavigate: (s: Screen) => void
  onGoToPlace: (placeId: string) => void
}

const typeLabel: Record<string, string> = {
  registration: 'Registration',
  keynote: 'Keynote',
  session: 'Session',
  break: 'Break',
  quiz: 'Quiz',
  social: 'Social',
}

export function ScheduleScreen({ onNavigate, onGoToPlace }: ScheduleScreenProps) {
  const [dayId, setDayId] = useState<EventDayId>('workshop')
  const day = EVENT_DAYS.find((d) => d.id === dayId) ?? EVENT_DAYS[0]
  const items = useMemo(() => scheduleForDay(dayId), [dayId])

  return (
    <div className="app-screen">
      <Header
        title="Programme"
        subtitle={`${EVENT_META.dateLabel} · Companion demo`}
        onBack={() => onNavigate('home')}
      />

      {/* Day switcher */}
      <div className="shrink-0 px-3 pt-2 pb-2 border-b border-border bg-surface-elevated">
        <div className="flex gap-1.5">
          {EVENT_DAYS.map((d) => {
            const active = d.id === dayId
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => setDayId(d.id)}
                className={`flex-1 rounded-xl py-2 px-1 text-center border transition-colors ${
                  active
                    ? 'bg-brand text-white border-brand'
                    : 'bg-surface border-border text-ink-muted'
                }`}
              >
                <span className="block text-[10px] font-bold uppercase tracking-wide opacity-90">
                  {d.shortLabel}
                </span>
                <span className="block text-xs font-bold mt-0.5 leading-tight">
                  {d.id === 'workshop' ? 'Workshops' : d.id === 'day1' ? 'Conf. D1' : 'Conf. D2'}
                </span>
              </button>
            )
          })}
        </div>
        <p className="mt-2 text-[11px] text-ink-muted leading-snug">
          <span className="font-bold text-ink">{day.venue}</span>
          {day.note ? ` · ${day.note}` : ''}
        </p>
      </div>

      <div className="scroll-area px-3 py-3 space-y-2">
        {!day.hasIndoorNav && (
          <div className="rounded-xl border border-border bg-surface px-3 py-2 text-xs text-ink-muted">
            Indoor map is for the JNMC workshop day only. Lemon Tree sessions show venue areas —
            no indoor navigation.
          </div>
        )}

        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl bg-surface-elevated border border-border p-3.5"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs font-bold text-brand tracking-wide">{item.time}</p>
              <span className="text-[10px] font-bold uppercase tracking-wide text-ink-muted bg-surface border border-border rounded-full px-2 py-0.5 shrink-0">
                {typeLabel[item.type] ?? item.type}
              </span>
            </div>
            <h3 className="font-display text-sm font-bold text-ink mt-1 leading-snug">
              {item.title}
            </h3>
            {item.speaker && (
              <p className="text-xs text-maroon mt-0.5 font-medium">{item.speaker}</p>
            )}
            <div className="flex items-center justify-between gap-2 mt-1.5">
              <p className="text-xs text-ink-muted min-w-0">{item.location}</p>
              {item.placeId && day.hasIndoorNav && (
                <button
                  type="button"
                  onClick={() => onGoToPlace(item.placeId!)}
                  className="shrink-0 text-xs font-bold text-maroon rounded-lg px-2 py-1 hover:bg-brand/5"
                >
                  Map
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
