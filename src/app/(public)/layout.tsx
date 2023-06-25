'use client';
import { checkIsPublicRoute } from "@/functions/check-is-public-route";
import { usePathname } from "next/navigation"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const pathname = usePathname();
  const isPublicPage = checkIsPublicRoute(pathname)

  return (
    <>
      {children}
    </>
  )
}
