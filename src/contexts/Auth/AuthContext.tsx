import { User } from '@/types'
import { createContext } from 'react'

export type AuthContextType = {
  user: User | null | 'unauthorized'
  authLoading: boolean
  signin: (email: string, password: string) => Promise<boolean>
  signout: () => void
  getToken: () => string | null
  setToken: (token: string, userId: string) => void
  clearToken: () => void
}

export const AuthContext = createContext<AuthContextType>(null!)
