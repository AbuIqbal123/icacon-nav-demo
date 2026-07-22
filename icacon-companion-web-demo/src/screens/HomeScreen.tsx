import { Calendar, ChevronRight, Compass, Info, MapPin } from 'lucide-react'
import { EVENT_META, LINKS } from '../data/events'
import type { Screen } from '../types'

interface HomeScreenProps {
  onNavigate: (s: Screen) => void
}

const LOGOS = {
  icacon: '/logos/icacon.jpg',
  amu: '/logos/amu.jpg',
  meetingsAndMore: '/logos/meetings-and-more.png',
} as const

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <div className="app-screen">
      <div className="scroll-area pb-7">
        {/* Hero — matches mobile brand header */}
        <div className="icacon-bar text-white px-[22px] pt-5 pb-11 rounded-b-3xl">
          <div className="flex items-center gap-3.5 mb-5">
            <img
              src={LOGOS.icacon}
              alt="Indian College of Anaesthesiologists"
              className="w-[52px] h-[52px] rounded-full bg-white object-cover"
            />
            <img
              src={LOGOS.amu}
              alt="Aligarh Muslim University"
              className="w-[52px] h-[52px] rounded-full bg-white object-cover"
            />
            <img
              src={LOGOS.meetingsAndMore}
              alt="Meetings and More"
              className="w-[52px] h-[52px] rounded-full bg-white object-cover"
            />
          </div>

          <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-white/75">
            7th International &amp; 17th National
          </p>
          <h1 className="text-[28px] font-extrabold leading-tight mt-2">
            {EVENT_META.name}
          </h1>
          <p className="mt-3.5 text-[13px] font-bold text-gold-soft tracking-[0.06em] uppercase">
            Indian College of Anaesthesiologists
          </p>
          <p className="mt-3 text-[13px] text-white/[0.88] leading-5 line-clamp-3">
            {EVENT_META.theme}
          </p>

          <div className="mt-[18px] flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-black/15 rounded-full px-3.5 py-[7px]">
              <MapPin size={12} className="text-gold-soft" />
              {EVENT_META.dateShort}
            </span>
            <span className="text-xs font-bold bg-black/10 rounded-full px-3.5 py-[7px]">
              Aligarh
            </span>
          </div>
        </div>

        <div className="px-4 -mt-5 relative z-10 flex flex-col gap-3.5">
          <button
            type="button"
            onClick={() => onNavigate('schedule')}
            className="w-full rounded-2xl bg-surface-elevated border border-border py-4 px-3.5 flex items-center gap-3 text-left active:opacity-90"
          >
            <span className="w-11 h-11 rounded-xl bg-brand/10 text-brand flex items-center justify-center shrink-0">
              <Calendar size={22} strokeWidth={2} />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block text-base font-bold text-ink">Programme</span>
              <span className="block text-xs text-ink-muted mt-0.5">
                11–13 Sept · Workshops &amp; conference
              </span>
            </span>
            <ChevronRight className="text-ink-muted shrink-0" size={20} />
          </button>

          <button
            type="button"
            onClick={() => onNavigate('navigate')}
            className="w-full rounded-2xl bg-surface-elevated border border-border py-4 px-3.5 flex items-center gap-3 text-left active:opacity-90"
          >
            <span className="w-11 h-11 rounded-xl bg-brand/10 text-brand flex items-center justify-center shrink-0">
              <Compass size={22} strokeWidth={2} />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block text-base font-bold text-ink">JNMC Navigation</span>
              <span className="block text-xs text-ink-muted mt-0.5">
                JNMC workshop venues
              </span>
            </span>
            <ChevronRight className="text-ink-muted shrink-0" size={20} />
          </button>

          <div className="flex gap-2">
            <a
              href={LINKS.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-0 rounded-xl border border-border bg-surface-elevated py-3 text-center text-xs font-bold text-brand"
            >
              Website
            </a>
            <a
              href={LINKS.brochure}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-0 rounded-xl border border-border bg-surface-elevated py-3 text-center text-xs font-bold text-brand"
            >
              Brochure
            </a>
            <a
              href={LINKS.register}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-0 rounded-xl border border-border bg-surface-elevated py-3 text-center text-xs font-bold text-brand"
            >
              Register
            </a>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('offline')}
            className="w-full rounded-2xl bg-surface-elevated border border-border py-4 px-3.5 flex items-center gap-3 text-left active:opacity-90"
          >
            <span className="w-11 h-11 rounded-xl bg-brand/10 text-brand flex items-center justify-center shrink-0">
              <Info size={22} strokeWidth={2} />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block text-base font-bold text-ink">Info</span>
              <span className="block text-xs text-ink-muted mt-0.5">
                Contacts, hosts &amp; resources
              </span>
            </span>
            <ChevronRight className="text-ink-muted shrink-0" size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
