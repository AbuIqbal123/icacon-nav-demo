import { useState } from 'react'
import { ChevronRight, FileText, Globe, MapPin } from 'lucide-react'
import {
  EVENT_DAYS,
  LINKS,
  WORKSHOP_DAY,
  WORKSHOPS,
} from '../data/events'
import type { EventDayId } from '../types'

const TAB_LABEL: Record<EventDayId, string> = {
  workshop: '11 Sept',
  day1: '12 Sept',
  day2: '13 Sept',
}

function VenueRow({ name, mapsUrl }: { name: string; mapsUrl: string }) {
  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 px-3.5 py-3.5 active:bg-surface"
    >
      <span className="w-9 h-9 rounded-[10px] bg-brand/[0.08] text-brand flex items-center justify-center shrink-0">
        <MapPin size={18} />
      </span>
      <span className="flex-1 min-w-0 text-left">
        <span className="block text-[15px] font-semibold text-ink">{name}</span>
        <span className="block mt-0.5 text-[13px] font-medium text-brand">
          Open in Google Maps
        </span>
      </span>
      <ChevronRight size={18} className="text-ink-muted shrink-0" />
    </a>
  )
}

function Resources() {
  return (
    <div className="mt-7">
      <p className="text-xs font-bold tracking-wide uppercase text-ink-muted mb-2 px-1">
        More details
      </p>
      <div className="rounded-2xl border border-border bg-surface-elevated overflow-hidden">
        <a
          href={LINKS.brochure}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3.5 py-3.5 active:bg-surface"
        >
          <span className="w-9 h-9 rounded-[10px] bg-surface text-brand flex items-center justify-center shrink-0">
            <FileText size={18} />
          </span>
          <span className="flex-1 min-w-0 text-left">
            <span className="block text-[15px] font-semibold text-ink">Brochure</span>
            <span className="block mt-0.5 text-[13px] text-ink-muted">
              Full event overview
            </span>
          </span>
          <ChevronRight size={18} className="text-ink-muted shrink-0" />
        </a>

        <div className="h-px bg-border ml-[62px]" />

        <a
          href={LINKS.website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3.5 py-3.5 active:bg-surface"
        >
          <span className="w-9 h-9 rounded-[10px] bg-surface text-brand flex items-center justify-center shrink-0">
            <Globe size={18} />
          </span>
          <span className="flex-1 min-w-0 text-left">
            <span className="block text-[15px] font-semibold text-ink">Website</span>
            <span className="block mt-0.5 text-[13px] text-ink-muted">
              icaconaligarh.com
            </span>
          </span>
          <ChevronRight size={18} className="text-ink-muted shrink-0" />
        </a>
      </div>
    </div>
  )
}

export function ScheduleScreen() {
  const [dayId, setDayId] = useState<EventDayId>('workshop')
  const day = EVENT_DAYS.find((d) => d.id === dayId) ?? EVENT_DAYS[0]
  const isConference = dayId === 'day1' || dayId === 'day2'
  const officialPdf = dayId === 'day1' ? LINKS.day1Pdf : dayId === 'day2' ? LINKS.day2Pdf : null

  return (
    <div className="app-screen">
      <div className="shrink-0 px-5 pt-3 pb-2 bg-surface">
        <h1 className="text-[28px] font-bold text-ink tracking-tight">Programme</h1>

        <div className="flex mt-4 bg-border rounded-xl p-[3px]">
          {EVENT_DAYS.map((d) => {
            const active = d.id === dayId
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => setDayId(d.id)}
                className={`flex-1 py-2.5 rounded-[10px] text-center text-sm font-semibold transition-shadow ${
                  active
                    ? 'bg-surface-elevated text-ink font-bold shadow-sm'
                    : 'text-ink-muted'
                }`}
              >
                {TAB_LABEL[d.id]}
              </button>
            )
          })}
        </div>
      </div>

      <div className="scroll-area px-5 pt-3 pb-10">
        {isConference && officialPdf ? (
          <>
            <div className="rounded-2xl border border-border bg-surface-elevated p-5">
              <h2 className="text-xl font-bold text-ink">
                {dayId === 'day1' ? 'Day 1' : 'Day 2'} programme
              </h2>
              <p className="mt-2 text-sm leading-5 text-ink-muted">
                Full scientific schedule with sessions and speakers.
              </p>
              <a
                href={officialPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-[18px] block w-full text-center rounded-xl bg-brand text-white font-bold text-[15px] py-3.5 active:opacity-90"
              >
                View programme
              </a>
            </div>

            <p className="mt-6 mb-2 ml-1 text-xs font-bold tracking-wide uppercase text-ink-muted">
              Venue
            </p>
            <div className="rounded-2xl border border-border bg-surface-elevated overflow-hidden">
              <VenueRow name={day.venue} mapsUrl={day.mapsUrl} />
            </div>
          </>
        ) : (
          <>
            <div className="mb-3">
              <h2 className="text-[17px] font-bold text-ink">Pre-conference workshops</h2>
            </div>

            <div className="mb-3 py-3 px-3.5 rounded-xl bg-brand/[0.08]">
              <p className="text-base font-bold text-brand">{WORKSHOP_DAY.timeLabel}</p>
              <p className="mt-[3px] text-[13px] font-medium text-ink-muted">
                {WORKSHOP_DAY.timeNote}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface-elevated overflow-hidden">
              {WORKSHOPS.map((w, index) => (
                <div
                  key={w.id}
                  className={`px-4 py-[18px] ${
                    index < WORKSHOPS.length - 1 ? 'border-b border-border' : ''
                  }`}
                >
                  <p className="text-base font-semibold text-ink leading-snug">{w.title}</p>
                  {w.director ? (
                    <p className="mt-1.5 text-sm text-ink-muted leading-[19px]">{w.director}</p>
                  ) : null}
                </div>
              ))}
            </div>

            <p className="mt-4 text-xs leading-[18px] text-ink-muted px-1">
              Seats: first come, first served. Conference registration required. Fee{' '}
              {WORKSHOP_DAY.fee} each (incl. 18% GST).
            </p>

            <p className="mt-6 mb-2 ml-1 text-xs font-bold tracking-wide uppercase text-ink-muted">
              Venue
            </p>
            <div className="rounded-2xl border border-border bg-surface-elevated overflow-hidden">
              <VenueRow name={day.venue} mapsUrl={day.mapsUrl} />
            </div>

            <Resources />
          </>
        )}
      </div>
    </div>
  )
}
