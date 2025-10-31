import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

/**
 * Custom hook for managing dark/light theme
 * Persists theme preference to localStorage
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load theme from localStorage or default to dark
    const savedTheme = localStorage.getItem('hexa-theme') as Theme
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    } else {
      // Default to dark theme
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('hexa-theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  return {
    theme,
    toggleTheme,
    mounted,
  }
}
