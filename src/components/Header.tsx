import { ArrowLeft } from 'lucide-react'

interface HeaderProps {
  title: string
  subtitle?: string
  onBack?: () => void
}

export function Header({ title, subtitle, onBack }: HeaderProps) {
  return (
    <header className="shrink-0 border-b border-border bg-surface-elevated px-3 py-2.5 min-h-[52px] flex items-center">
      <div className="flex items-center gap-2 w-full">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="p-2 -ml-1 rounded-xl text-brand hover:bg-surface shrink-0"
            aria-label="Back"
          >
            <ArrowLeft size={20} />
          </button>
        )}
        <div className="flex-1 min-w-0">
          <h1 className="font-display text-[15px] font-bold tracking-wide text-ink truncate capitalize">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-ink-muted truncate mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
    </header>
  )
}
