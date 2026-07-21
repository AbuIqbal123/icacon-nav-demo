import { Calendar, Compass, Home, Info } from 'lucide-react'
import type { Screen } from '../types'

interface BottomNavProps {
  screen: Screen
  onNavigate: (s: Screen) => void
}

const items: { id: Screen; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'navigate', label: 'Navigate', icon: Compass },
  { id: 'schedule', label: 'Programme', icon: Calendar },
  { id: 'offline', label: 'Info', icon: Info },
]

export function BottomNav({ screen, onNavigate }: BottomNavProps) {
  return (
    <nav className="app-nav" aria-label="Main">
      <ul>
        {items.map(({ id, label, icon: Icon }) => {
          const active = screen === id
          return (
            <li key={id}>
              <button
                type="button"
                onClick={() => onNavigate(id)}
                className={active ? 'nav-active' : undefined}
                aria-current={active ? 'page' : undefined}
              >
                <Icon size={20} strokeWidth={active ? 2.4 : 2} />
                <span className="text-[10px] font-bold tracking-wide">{label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
