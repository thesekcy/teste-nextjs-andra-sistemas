'use client'
import { Inter } from 'next/font/google'
import { checkIsPublicRoute } from '@/functions'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic';
import { AuthProvider } from '@/contexts/Auth/AuthProveider'
import "../styles/global.scss"
import { ThemeProvider } from '@/contexts/Theme/ThemeProveider';

const DynamicPrivateRoute = dynamic(() => import('@/components/PrivateRoute'), { ssr: false });
const DynamicPublicRoute = dynamic(() => import('@/components/PublicRoute'), { ssr: false });

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const pathname = usePathname();
  const isPublicPage = checkIsPublicRoute(pathname)
  return (

    <html lang="en">
      <head>
        <title>Andra Sistemas - Next.Js Teste</title>
      </head>
      <body className={`${inter.className}`}>
        <>
          {isPublicPage && (
            <AuthProvider>
              <DynamicPublicRoute>
                {children}
              </DynamicPublicRoute>
            </AuthProvider>
          )}

          {!isPublicPage && (
            <ThemeProvider>
              <AuthProvider>
                <DynamicPrivateRoute>
                  {children}
                </DynamicPrivateRoute>
              </AuthProvider>
            </ThemeProvider>
          )}
        </>
      </body>
    </html>
  )
}
