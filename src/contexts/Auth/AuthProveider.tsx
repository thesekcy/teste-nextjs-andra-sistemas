import { useState } from 'react'
import { AuthContext } from './AuthContext'
import { useApi } from '@/hooks/useApi'
import * as jwt from 'jsonwebtoken';
import { User } from '@/types';

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null | 'unauthorized'>(null)
  const [authLoading, setAuthLoading] = useState<boolean>(false)
  const api = useApi()

  const signin = async (email: string, password: string) => {

    const passwordEncoded = jwt.sign({ usuSenhaLogin: password }, 'andra3RPW@8aZ');

    setAuthLoading(true)
    const data = await api.signin(email, passwordEncoded)

    if (data.data.retorno && data.headers['x-token']) {
      setUser(data.data.retorno[0].detalhesUsuario)
      setToken(data.headers['x-token'])
      setAuthLoading(false)

      return true
    }
    setAuthLoading(false)
    return false
  }

  const signout = async () => {
    clearToken()
    setUser('unauthorized')
  }

  const getToken = () => {
    return localStorage.getItem('authToken')
  }

  const setToken = (token: string) => {
    localStorage.setItem('authToken', token)
  }

  const clearToken = () => {
    localStorage.removeItem('authToken')
  }

  return (
    <AuthContext.Provider value={{ user, authLoading, signin, signout, getToken, setToken, clearToken }}>
      {children}
    </AuthContext.Provider>
  )
}
