'use client'
import dynamic from 'next/dynamic';
const DynamicNavComponent = dynamic(() => import('@/components/NavComponent'), { ssr: false });
const DynamicFooterComponent = dynamic(() => import('@/components/FooterComponent'), { ssr: false });
import 'sweetalert2/src/sweetalert2.scss'

export const metadata = {
  title: 'App Next.js',
  description: 'Desc App Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (

    <html lang="en">
      <head />
      <body>
        <>
          <div id="page-container">
            <div id="content-wrap">
              <DynamicNavComponent />
              {children}
            </div>
            <DynamicFooterComponent />
          </div>
        </>
      </body>
    </html >
  )
}
