'use client';
import { checkIsPublicRoute } from "@/functions/check-is-public-route";
import { usePathname } from "next/navigation"

export const metadata = {
  title: 'Andra Sistemas - Teste',
  description: 'Teste para a vaga da Andra Sistemas, Desenvolvedor Next.js',
}

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
