'use client'
import { checkIsPublicRoute } from '@/functions'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic';
import { AuthProvider } from '@/contexts/Auth/AuthProveider'
import "../styles/global.scss"
import { ThemeProvider } from '@/contexts/Theme/ThemeProveider';
import { OperationsProvider } from '@/contexts/Operations/OperationsProveider';

const DynamicPrivateRoute = dynamic(() => import('@/components/PrivateRoute'), { ssr: false });
const DynamicPublicRoute = dynamic(() => import('@/components/PublicRoute'), { ssr: false });


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
      <body>
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
                <OperationsProvider>
                  <DynamicPrivateRoute>
                    {children}
                  </DynamicPrivateRoute>
                </OperationsProvider>
              </AuthProvider>
            </ThemeProvider>
          )}
        </>
      </body>
    </html>
  )
}
