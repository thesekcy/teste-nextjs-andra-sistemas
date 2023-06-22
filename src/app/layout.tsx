'use client'
import { Inter } from 'next/font/google'
import { checkIsPublicRoute } from '@/functions'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic';
import { AuthProvider } from '@/contexts/Auth/AuthProveider'
import "../styles/global.scss"

const DynamicPrivateRoute = dynamic(() => import('@/components/PrivateRoute'), { ssr: false });
const DynamicPublicRoute = dynamic(() => import('@/components/PublicRoute'), { ssr: false });

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'App Next.js',
  description: 'Desc App Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const pathname = usePathname();
  const isPublicPage = checkIsPublicRoute(pathname)

  return (

    <html lang="en">
      <head />
      <body className={inter.className}>
        <>
          {isPublicPage && (
            <AuthProvider>
              <DynamicPublicRoute>
                {children}
              </DynamicPublicRoute>
            </AuthProvider>
          )}

          {!isPublicPage && (
            <AuthProvider>
              <DynamicPrivateRoute>
                {children}
              </DynamicPrivateRoute>
            </AuthProvider>
          )}
        </>
      </body>
    </html>
  )
}
