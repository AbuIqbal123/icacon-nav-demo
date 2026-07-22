import { ChevronRight, Compass, MapPin } from 'lucide-react'
import { EVENT_META, VENUE_MAPS } from '../data/events'

export function NavigateScreen() {
  return (
    <div className="app-screen">
      <div className="scroll-area px-5 pt-3 pb-10">
        <h1 className="text-[28px] font-bold text-ink tracking-tight">Navigate</h1>
        <p className="text-sm text-ink-muted mt-1 mb-[18px]">Venues &amp; indoor map</p>

        <div className="flex flex-col items-center text-center py-[22px] px-4 rounded-2xl border border-border bg-surface-elevated">
          <div className="w-14 h-14 rounded-2xl bg-brand/10 text-brand flex items-center justify-center mb-3">
            <Compass size={28} />
          </div>
          <h2 className="text-[17px] font-bold text-ink">Indoor map</h2>
          <p className="mt-2 text-sm leading-5 text-ink-muted max-w-[280px]">
            Floor-by-floor guidance for JNMC workshop rooms will unlock when floor
            plans are finalised.
          </p>
        </div>

        <p className="mt-[22px] mb-2 ml-1 text-[13px] font-semibold text-ink-muted">
          Open in Maps
        </p>
        <div className="rounded-[14px] border border-border bg-surface-elevated overflow-hidden">
          <a
            href={VENUE_MAPS.jnmc}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 py-3.5 px-3.5 active:bg-surface"
          >
            <span className="w-9 h-9 rounded-[10px] bg-brand/[0.08] text-brand flex items-center justify-center shrink-0">
              <MapPin size={18} />
            </span>
            <span className="flex-1 min-w-0 text-left">
              <span className="block text-[15px] font-semibold text-ink">
                JNMC, AMU Aligarh
              </span>
              <span className="block mt-0.5 text-[13px] text-ink-muted">
                Workshops · {EVENT_META.workshopDateShort}
              </span>
            </span>
            <ChevronRight size={18} className="text-ink-muted shrink-0" />
          </a>

          <div className="h-px bg-border ml-[62px]" />

          <a
            href={VENUE_MAPS.lemonTree}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 py-3.5 px-3.5 active:bg-surface"
          >
            <span className="w-9 h-9 rounded-[10px] bg-brand/[0.08] text-brand flex items-center justify-center shrink-0">
              <MapPin size={18} />
            </span>
            <span className="flex-1 min-w-0 text-left">
              <span className="block text-[15px] font-semibold text-ink">
                {EVENT_META.conferenceVenue}
              </span>
              <span className="block mt-0.5 text-[13px] text-ink-muted">
                Conference · {EVENT_META.conferenceDates}
              </span>
            </span>
            <ChevronRight size={18} className="text-ink-muted shrink-0" />
          </a>
        </div>
      </div>
    </div>
  )
}
