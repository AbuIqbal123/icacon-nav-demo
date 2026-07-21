import { useMemo, useState } from 'react'
import { Header } from '../components/Header'
import { EVENT_DAYS, EVENT_META, LINKS, scheduleForDay } from '../data/events'
import type { EventDayId, Screen } from '../types'

interface ScheduleScreenProps {
  onNavigate: (s: Screen) => void
  onGoToPlace: (placeId: string) => void
}

export function ScheduleScreen({ onNavigate, onGoToPlace }: ScheduleScreenProps) {
  const [dayId, setDayId] = useState<EventDayId>('workshop')
  const day = EVENT_DAYS.find((d) => d.id === dayId) ?? EVENT_DAYS[0]
  const items = useMemo(() => scheduleForDay(dayId), [dayId])

  const officialPdf =
    dayId === 'day1' ? LINKS.day1Pdf : dayId === 'day2' ? LINKS.day2Pdf : null

  return (
    <div className="app-screen">
      <Header title="Programme" subtitle={EVENT_META.dateLabel} onBack={() => onNavigate('home')} />

      <div className="shrink-0 px-3 pt-2 pb-2 border-b border-border bg-surface-elevated">
        <div className="flex gap-1.5">
          {EVENT_DAYS.map((d) => {
            const active = d.id === dayId
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => setDayId(d.id)}
                className={`flex-1 rounded-xl py-2 px-1 text-center border ${
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
        <p className="mt-2 text-[11px] text-ink-muted">
          <span className="font-bold text-ink">{day.venue}</span>
        </p>
      </div>

      <div className="scroll-area px-3 py-3 space-y-2">
        {officialPdf && (
          <div className="rounded-2xl border border-border bg-surface-elevated p-4 space-y-3">
            <p className="text-sm text-ink leading-snug">
              Full scientific programme is on the official PDF.
            </p>
            <a
              href={officialPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center rounded-xl bg-brand text-white font-bold text-sm py-3"
            >
              Open Day {dayId === 'day1' ? '1' : '2'} programme (PDF)
            </a>
          </div>
        )}

        {dayId === 'workshop' && (
          <div className="flex gap-2">
            <a
              href={LINKS.workshops}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center rounded-xl border border-border bg-surface-elevated py-2 text-xs font-bold text-brand"
            >
              Workshops (site)
            </a>
            <a
              href={LINKS.brochure}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center rounded-xl border border-border bg-surface-elevated py-2 text-xs font-bold text-brand"
            >
              Brochure
            </a>
          </div>
        )}

        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl bg-surface-elevated border border-border p-3.5"
          >
            <p className="text-xs font-bold text-brand tracking-wide">{item.time}</p>
            <h3 className="font-display text-sm font-bold text-ink mt-0.5 leading-snug">
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
                  className="shrink-0 text-xs font-bold text-maroon rounded-lg px-2 py-1"
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
