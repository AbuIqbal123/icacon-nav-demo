import { useCallback, useState } from 'react'
import { BottomNav } from './components/BottomNav'
import { HomeScreen } from './screens/HomeScreen'
import { NavigateScreen } from './screens/NavigateScreen'
import { ScheduleScreen } from './screens/ScheduleScreen'
import { OfflineScreen } from './screens/OfflineScreen'
import type { Screen } from './types'

export default function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [initialDestId, setInitialDestId] = useState<string | null>(null)

  const go = useCallback((s: Screen) => setScreen(s), [])

  const goToPlace = useCallback((placeId: string) => {
    setInitialDestId(placeId)
    setScreen('navigate')
  }, [])

  return (
    <div className="app-frame">
      <div className="app-shell">
        <header className="app-status" aria-hidden>
          <span>ICACON</span>
          <span className="tracking-widest uppercase text-[9px] opacity-90">2026</span>
        </header>

        {/* Fixed stage: all screens fill the same box so tabs never resize the shell */}
        <main className="app-main">
          {screen === 'home' && <HomeScreen onNavigate={go} />}
          {screen === 'navigate' && (
            <NavigateScreen
              onNavigate={go}
              initialDestId={initialDestId}
              onClearInitialDest={() => setInitialDestId(null)}
            />
          )}
          {screen === 'schedule' && (
            <ScheduleScreen onNavigate={go} onGoToPlace={goToPlace} />
          )}
          {screen === 'offline' && <OfflineScreen onNavigate={go} />}
        </main>

        <BottomNav screen={screen} onNavigate={go} />
      </div>
    </div>
  )
}
