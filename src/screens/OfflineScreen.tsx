import { Header } from '../components/Header'
import { EVENT_META, OFFLINE_INFO } from '../data/events'
import type { Screen } from '../types'

interface OfflineScreenProps {
  onNavigate: (s: Screen) => void
}

export function OfflineScreen({ onNavigate }: OfflineScreenProps) {
  const s = OFFLINE_INFO.secretariat

  return (
    <div className="app-screen">
      <Header title="Info & contacts" onBack={() => onNavigate('home')} />
      <div className="scroll-area px-3 py-3 space-y-3">
        <section className="rounded-2xl bg-surface-elevated border border-border p-3.5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-brand">
            Conference Secretariat
          </p>
          <p className="mt-1.5 text-sm font-bold text-ink">{s.dept}</p>
          <p className="text-sm text-ink-muted">{s.college}</p>
          <p className="mt-2 text-sm text-ink">{s.secretary}</p>
          <p className="mt-1.5 text-sm text-ink">
            {s.phones.map((p) => (
              <span key={p} className="block">
                {p}
              </span>
            ))}
          </p>
          <a
            href={`mailto:${s.email}`}
            className="mt-1.5 inline-block text-sm font-bold text-maroon"
          >
            {s.email}
          </a>
        </section>

        <section className="rounded-2xl bg-surface-elevated border border-border p-3.5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-brand">
            Professional organiser
          </p>
          <p className="mt-1.5 text-sm text-ink">{OFFLINE_INFO.organiser.name}</p>
          <a
            href={`https://${OFFLINE_INFO.organiser.web}`}
            target="_blank"
            rel="noreferrer"
            className="mt-1 inline-block text-sm font-bold text-maroon"
          >
            {OFFLINE_INFO.organiser.web}
          </a>
          <p className="mt-2 text-xs text-ink-muted">
            Register online · fees include 18% GST (see brochure)
          </p>
        </section>

        <section className="rounded-2xl bg-surface-elevated border border-border p-3.5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-brand">On-site</p>
          <p className="mt-1.5 text-sm text-ink">Help desk: {OFFLINE_INFO.helpdesk}</p>
          <p className="mt-1 text-sm text-ink-muted">{OFFLINE_INFO.emergency}</p>
          <p className="mt-2 font-mono text-sm text-ink font-bold">{OFFLINE_INFO.wifi}</p>
          <p className="text-[10px] text-ink-muted mt-0.5">Demo guest Wi‑Fi credentials</p>
        </section>

        <section className="rounded-2xl bg-surface-elevated border border-border p-3.5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-brand mb-2">
            Workshop notes
          </p>
          <ul className="space-y-2">
            {OFFLINE_INFO.tips.map((tip) => (
              <li key={tip} className="text-sm text-ink-muted flex gap-2">
                <span className="text-maroon font-bold shrink-0">›</span>
                {tip}
              </li>
            ))}
          </ul>
        </section>

        <p className="text-center text-[11px] text-ink-muted px-2 pb-2">
          {EVENT_META.organisedBy}
        </p>
      </div>
    </div>
  )
}
