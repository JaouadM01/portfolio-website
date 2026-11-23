import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  const label = isDark ? 'Schakel over naar licht thema' : 'Schakel over naar donker thema'

  return (
    <button type="button" className="icon-btn" onClick={toggleTheme} aria-label={label} title={label}>
      {isDark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
    </button>
  )
}
