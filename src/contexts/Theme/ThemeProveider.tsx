import { useEffect, useState } from 'react'
import { ThemeContext } from './ThemeContext'

export const ThemeProvider = ({ children }: { children: JSX.Element }) => {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const saveTheme = localStorage.getItem('theme')
    if (saveTheme) setTheme(saveTheme)
    else setTheme('light')
  }, [])

  function changeTheme(theme: 'light' | 'dark') {
    setTheme(theme)
    localStorage.setItem('theme', theme)
  }


  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
