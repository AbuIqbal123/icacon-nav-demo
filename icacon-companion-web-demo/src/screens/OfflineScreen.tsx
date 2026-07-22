import {
  BookOpen,
  Calendar,
  ChevronRight,
  FileText,
  Globe,
  MapPin,
  UserPlus,
  type LucideIcon,
} from 'lucide-react'
import { EVENT_META, LINKS, OFFLINE_INFO, VENUE_MAPS } from '../data/events'

const LOGOS = {
  icacon: '/logos/icacon.jpg',
  amu: '/logos/amu.jpg',
  meetingsAndMore: '/logos/meetings-and-more.png',
} as const

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="mt-[22px] mb-2 ml-1 text-[13px] font-semibold text-ink-muted">
      {children}
    </p>
  )
}

function Group({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[14px] border border-border bg-surface-elevated overflow-hidden">
      {children}
    </div>
  )
}

function IconWell({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="w-8 h-8 rounded-lg bg-brand/[0.08] text-brand flex items-center justify-center shrink-0">
      <Icon size={17} strokeWidth={2.2} />
    </span>
  )
}

function NavRow({
  icon,
  label,
  href,
  last,
}: {
  icon: LucideIcon
  label: string
  href: string
  last?: boolean
}) {
  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 py-3 px-3.5 min-h-[52px] active:bg-surface"
      >
        <IconWell icon={icon} />
        <span className="flex-1 text-base font-medium text-ink text-left">{label}</span>
        <ChevronRight size={18} className="text-ink-muted shrink-0" />
      </a>
      {!last ? <div className="h-px bg-border ml-[60px]" /> : null}
    </>
  )
}

function ContactCard({
  name,
  role,
  phones,
  email,
}: {
  name: string
  role: string
  phones: string[]
  email: string
}) {
  return (
    <div className="px-4 py-4">
      <p className="text-[17px] font-semibold text-ink tracking-tight">{name}</p>
      <p className="mt-[3px] text-sm text-ink-muted">{role}</p>
      <div className="mt-3.5 flex flex-col gap-2.5">
        {phones.map((p) => (
          <a
            key={p}
            href={`tel:${p.replace(/\s/g, '')}`}
            className="text-base font-medium text-ink py-0.5 active:opacity-50"
          >
            {p}
          </a>
        ))}
        <a
          href={`mailto:${email}`}
          className="text-base font-medium text-ink py-0.5 active:opacity-50"
        >
          {email}
        </a>
      </div>
    </div>
  )
}

export function OfflineScreen() {
  const s = OFFLINE_INFO.secretariat
  const r = OFFLINE_INFO.registrationContact

  return (
    <div className="app-screen">
      <div className="scroll-area px-5 pt-2 pb-10">
        <h1 className="text-[32px] font-bold text-ink tracking-tight mb-[18px]">Info</h1>

        <div className="flex gap-2.5">
          <a
            href={LINKS.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-[14px] border border-border bg-surface-elevated py-3.5 px-2 flex flex-col items-center gap-2 active:bg-surface"
          >
            <span className="w-10 h-10 rounded-xl bg-brand/[0.08] text-brand flex items-center justify-center">
              <Globe size={20} />
            </span>
            <span className="text-[13px] font-semibold text-ink">Website</span>
          </a>
          <a
            href={LINKS.brochure}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-[14px] border border-border bg-surface-elevated py-3.5 px-2 flex flex-col items-center gap-2 active:bg-surface"
          >
            <span className="w-10 h-10 rounded-xl bg-brand/[0.08] text-brand flex items-center justify-center">
              <FileText size={20} />
            </span>
            <span className="text-[13px] font-semibold text-ink">Brochure</span>
          </a>
          <a
            href={LINKS.register}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-[14px] border border-border bg-surface-elevated py-3.5 px-2 flex flex-col items-center gap-2 active:bg-surface"
          >
            <span className="w-10 h-10 rounded-xl bg-brand/[0.08] text-brand flex items-center justify-center">
              <UserPlus size={20} />
            </span>
            <span className="text-[13px] font-semibold text-ink">Register</span>
          </a>
        </div>

        <SectionLabel>Resources</SectionLabel>
        <Group>
          <NavRow icon={Calendar} label="Day 1 programme" href={LINKS.day1Pdf} />
          <NavRow icon={Calendar} label="Day 2 programme" href={LINKS.day2Pdf} />
          <NavRow icon={BookOpen} label="Workshops" href={LINKS.workshops} />
          <NavRow icon={MapPin} label="Venue" href={VENUE_MAPS.jnmc} last />
        </Group>

        <SectionLabel>Secretariat</SectionLabel>
        <Group>
          <ContactCard
            name="Prof. Obaid A Siddiqui"
            role="Organising Secretary"
            phones={s.phones}
            email={s.email}
          />
        </Group>

        <SectionLabel>Registration</SectionLabel>
        <Group>
          <ContactCard
            name={r.name}
            role={r.role}
            phones={[r.phone]}
            email={r.email}
          />
        </Group>

        <SectionLabel>Hosts</SectionLabel>
        <Group>
          <div className="flex justify-around py-[18px] px-2">
            <div className="flex flex-col items-center gap-2 min-w-[72px]">
              <img
                src={LOGOS.icacon}
                alt="ICA"
                className="w-[52px] h-[52px] rounded-full bg-white object-cover"
              />
              <span className="text-xs font-semibold text-ink-muted">ICA</span>
            </div>
            <div className="flex flex-col items-center gap-2 min-w-[72px]">
              <img
                src={LOGOS.amu}
                alt="AMU"
                className="w-[52px] h-[52px] rounded-full bg-white object-cover"
              />
              <span className="text-xs font-semibold text-ink-muted">AMU</span>
            </div>
            <a
              href={LINKS.organiser}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 min-w-[72px]"
            >
              <img
                src={LOGOS.meetingsAndMore}
                alt="PCO"
                className="w-[52px] h-[52px] rounded-full bg-white object-cover"
              />
              <span className="text-xs font-semibold text-ink-muted">PCO</span>
            </a>
          </div>
        </Group>

        <SectionLabel>Good to know</SectionLabel>
        <Group>
          <div className="px-4 py-3.5 flex flex-col gap-2.5">
            {OFFLINE_INFO.tips.map((tip) => (
              <p key={tip} className="text-sm leading-5 text-ink">
                {tip}
              </p>
            ))}
          </div>
        </Group>

        <p className="mt-6 text-center text-[11px] leading-4 text-ink-muted px-4">
          {EVENT_META.organisedBy}
        </p>
      </div>
    </div>
  )
}
