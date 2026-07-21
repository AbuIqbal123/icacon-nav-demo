import { ChevronRight, Compass, MapPin } from 'lucide-react'
import { Logo } from '../components/Logo'
import { EVENT_META, WORKSHOPS } from '../data/events'
import type { Screen } from '../types'

interface HomeScreenProps {
  onNavigate: (s: Screen) => void
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <div className="app-screen">
      <div className="scroll-area">
        <div className="icacon-bar text-white px-5 pt-6 pb-10 rounded-b-3xl">
          <div className="flex items-center gap-3">
            <Logo size={48} />
            <div className="min-w-0">
              <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-white/75">
                7th International &amp; 17th National
              </p>
              <h1 className="font-display text-2xl font-bold leading-tight mt-0.5">
                {EVENT_META.name}
              </h1>
            </div>
          </div>

          <p className="mt-4 text-sm font-bold text-gold-soft tracking-wide uppercase">
            Indian College of Anaesthesiologists
          </p>
          <p className="mt-2 text-xs text-white/85 leading-snug">
            {EVENT_META.theme}
          </p>
          <p className="mt-2 text-sm text-white/90 leading-relaxed">
            Companion demo · Workshops at JNMC · Conference at Lemon Tree
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 text-xs font-bold bg-black/15 rounded-full px-3 py-1">
              <MapPin size={12} className="text-gold-soft" />
              {EVENT_META.dateShort}
            </span>
            <span className="text-xs font-medium bg-black/10 rounded-full px-3 py-1">
              Aligarh
            </span>
          </div>
        </div>

        <div className="px-4 -mt-4 relative z-10 space-y-3 pb-6">
          <button
            type="button"
            onClick={() => onNavigate('navigate')}
            className="w-full rounded-2xl bg-surface-elevated border border-border shadow-sm p-4 flex items-center gap-3 text-left active:scale-[0.99] transition-transform"
          >
            <span className="w-11 h-11 rounded-xl icacon-bar text-white flex items-center justify-center shrink-0">
              <Compass size={22} />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block font-display font-bold text-ink">JNMC Navigation</span>
              <span className="block text-xs text-ink-muted mt-0.5">
                Indoor map for workshop day only
              </span>
            </span>
            <ChevronRight className="text-brand shrink-0" size={20} />
          </button>

          <section className="rounded-2xl bg-surface-elevated border border-border p-3.5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand mb-2">
              Workshops · 11 Sept · JNMC
            </p>
            <ul className="space-y-2">
              {WORKSHOPS.map((w) => (
                <li key={w.id} className="text-sm">
                  <span className="font-bold text-ink">{w.title}</span>
                  <span className="block text-xs text-ink-muted">{w.director}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[11px] text-ink-muted border-t border-border pt-2">
              Conference · 12–13 Sept · {EVENT_META.conferenceVenue}
            </p>
          </section>

          <div className="grid grid-cols-2 gap-2.5">
            {(
              [
                { id: 'schedule' as Screen, title: 'Programme', desc: 'All 3 days' },
                { id: 'navigate' as Screen, title: 'Navigate', desc: 'JNMC map' },
                { id: 'offline' as Screen, title: 'Info & contacts', desc: 'Secretariat' },
              ] as const
            ).map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={() => onNavigate(item.id)}
                className="rounded-2xl bg-surface-elevated border border-border p-3.5 text-left hover:border-brand/40 transition-colors"
              >
                <span className="block font-display font-bold text-sm text-ink">{item.title}</span>
                <span className="block text-xs text-ink-muted mt-0.5">{item.desc}</span>
              </button>
            ))}
          </div>

          <p className="text-center text-[11px] text-ink-muted px-2">
            Organised by {EVENT_META.organisedBy}
          </p>
        </div>
      </div>
    </div>
  )
}
