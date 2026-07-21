import { Header } from '../components/Header'
import { EVENT_META, LINKS, OFFLINE_INFO } from '../data/events'
import type { Screen } from '../types'

interface OfflineScreenProps {
  onNavigate: (s: Screen) => void
}

function LinkRow({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between gap-2 py-2.5 border-b border-border last:border-0 text-sm font-bold text-brand"
    >
      <span>{label}</span>
      <span className="text-ink-muted font-normal text-xs">Open</span>
    </a>
  )
}

export function OfflineScreen({ onNavigate }: OfflineScreenProps) {
  const s = OFFLINE_INFO.secretariat
  const r = OFFLINE_INFO.registrationContact

  return (
    <div className="app-screen">
      <Header title="Info" onBack={() => onNavigate('home')} />
      <div className="scroll-area px-3 py-3 space-y-3">
        <section className="rounded-2xl bg-surface-elevated border border-border px-3.5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-brand pt-3 pb-1">
            Official links
          </p>
          <LinkRow href={LINKS.website} label="Website" />
          <LinkRow href={LINKS.brochure} label="Brochure (PDF)" />
          <LinkRow href={LINKS.register} label="Register" />
          <LinkRow href={LINKS.workshops} label="Workshops" />
          <LinkRow href={LINKS.program} label="Programme" />
          <LinkRow href={LINKS.day1Pdf} label="Day 1 programme (PDF)" />
          <LinkRow href={LINKS.day2Pdf} label="Day 2 programme (PDF)" />
          <LinkRow href={LINKS.venue} label="Venue" />
        </section>

        <section className="rounded-2xl bg-surface-elevated border border-border p-3.5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-brand">
            Secretariat
          </p>
          <p className="mt-1.5 text-sm font-bold text-ink">{s.dept}</p>
          <p className="text-sm text-ink-muted">{s.college}</p>
          <p className="mt-2 text-sm text-ink">{s.secretary}</p>
          {s.phones.map((p) => (
            <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="block text-sm text-ink mt-1">
              {p}
            </a>
          ))}
          <a href={LINKS.email} className="mt-1.5 inline-block text-sm font-bold text-maroon">
            {s.email}
          </a>
        </section>

        <section className="rounded-2xl bg-surface-elevated border border-border p-3.5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-brand">
            Registration help
          </p>
          <p className="mt-1.5 text-sm font-bold text-ink">
            {r.name} · {r.role}
          </p>
          <a href={`tel:${r.phone.replace(/\s/g, '')}`} className="block text-sm text-ink mt-1">
            {r.phone}
          </a>
          <a href={`mailto:${r.email}`} className="block text-sm font-bold text-maroon mt-1">
            {r.email}
          </a>
          <a
            href={LINKS.organiser}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block text-xs text-ink-muted"
          >
            {OFFLINE_INFO.organiser.name}
          </a>
        </section>

        <section className="rounded-2xl bg-surface-elevated border border-border p-3.5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-brand">On-site (demo)</p>
          <p className="mt-1.5 text-sm text-ink">Help desk: {OFFLINE_INFO.helpdesk}</p>
          <p className="mt-1 text-sm text-ink-muted">{OFFLINE_INFO.emergency}</p>
          <p className="mt-2 font-mono text-sm font-bold text-ink">{OFFLINE_INFO.wifi}</p>
        </section>

        <section className="rounded-2xl bg-surface-elevated border border-border p-3.5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-brand mb-2">Notes</p>
          <ul className="space-y-1.5">
            {OFFLINE_INFO.tips.map((tip) => (
              <li key={tip} className="text-sm text-ink-muted">
                · {tip}
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
