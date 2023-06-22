'use client'
import dynamic from 'next/dynamic';
const DynamicNavComponent = dynamic(() => import('@/components/NavComponent'), { ssr: false });

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
          <DynamicNavComponent />
          {children}
        </>
      </body>
    </html >
  )
}
