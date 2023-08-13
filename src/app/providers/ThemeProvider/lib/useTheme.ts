import { useContext } from 'react'
import { LOCAL_STORAGE_THEME_KEY, THEMES, ThemeContext } from './ThemeContext'

interface UseThemeResult {
  toggleTheme: () => void
  theme: THEMES
}
export function useTheme(): UseThemeResult {
  const { theme, setTheme } = useContext(ThemeContext)
  const toggleTheme = () => {
    let newTheme
    switch (theme) {
      case THEMES.LIGHT:
        newTheme = THEMES.ORANGE
        break
      case THEMES.ORANGE:
        newTheme = THEMES.DARK
        break
      case THEMES.DARK:
        newTheme = THEMES.LIGHT
        break
      default:
        newTheme = THEMES.DARK
        break
    }
    setTheme(newTheme)
    document.body.className = newTheme
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
  }
  return { theme, toggleTheme }
}
