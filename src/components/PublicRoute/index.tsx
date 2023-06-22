'use client'
import { useRouter } from "next/navigation";
import { ReactNode, useContext, useEffect } from "react";

import { APP_ROUTES } from "@/constants/app-routes";
import { AuthContext } from "@/contexts/Auth/AuthContext";

type PublicRouteProps = {
  children: ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { push } = useRouter();
  const auth = useContext(AuthContext)
  
  const isUserAuthenticated = auth.getToken();

  useEffect(() => {
    if (isUserAuthenticated) {
      push(APP_ROUTES.private.dashboard)
    }

  }, [isUserAuthenticated, push])

  return (
    <>
      {isUserAuthenticated && null}
      {!isUserAuthenticated && isUserAuthenticated !== undefined && children}
    </>
  )
}

export default PublicRoute;