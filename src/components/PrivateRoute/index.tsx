'use client'
import { ReactNode, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";

import { APP_ROUTES } from "@/constants/app-routes";
import { AuthContext } from "@/contexts/Auth/AuthContext";

type PrivateRouteProps = {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { push } = useRouter();
  const auth = useContext(AuthContext)

  const isUserAuthenticated = auth.getToken();

  useEffect(() => {
    if (!isUserAuthenticated) {
      push(APP_ROUTES.public.login)
    }
  }, [isUserAuthenticated, push])

  return (
    <>
      {!isUserAuthenticated && null}
      {isUserAuthenticated && children}
    </>
  )
}

export default PrivateRoute;