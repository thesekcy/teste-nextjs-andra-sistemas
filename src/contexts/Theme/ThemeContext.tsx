import { createContext } from 'react'

export type ThemeContextType = {
  theme: string | 'light' | 'dark'
  changeTheme: (theme: 'light' | 'dark') => void
}

export const ThemeContext = createContext<ThemeContextType>(null!)
