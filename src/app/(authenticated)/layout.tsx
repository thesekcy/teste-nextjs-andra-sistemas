'use client'
import { ThemeContext } from '@/contexts/Theme/ThemeContext';
import { ThemeProvider, createTheme } from '@mui/material';
import dynamic from 'next/dynamic';
import { useContext } from 'react';
const DynamicNavComponent = dynamic(() => import('@/components/NavComponent'), { ssr: false });
const DynamicFooterComponent = dynamic(() => import('@/components/FooterComponent'), { ssr: false });
import 'sweetalert2/src/sweetalert2.scss'

export const metadata = {
  title: 'App Next.js',
  description: 'Desc App Next.js',
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const { theme } = useContext(ThemeContext)
  return (

    <html lang="en">
      <head />
      <body className={`theme-${theme}`}>
        <>
          <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
          <div id="page-container">
            <div id="content-wrap">
              <DynamicNavComponent />
              {children}
            </div>
            <DynamicFooterComponent />
          </div>
        </ThemeProvider>
      </>
    </body>
    </html >
  )
}
