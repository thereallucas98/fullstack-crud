import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react'
import { IUser } from '../redux'

interface AuthContextData {
  signed: boolean
  user: IUser | null
  signAuthLogin: (user: IUser, token: string) => void
  signOut(): void
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<IUser | null>(null)

  useEffect(() => {
    async function loadStorageData() {
      const storageUser = localStorage.getItem('AUTH:user')
      const storagedToken = localStorage.getItem('AUTH:token')

      if (storageUser && storagedToken) {
        setUser(JSON.parse(storageUser))
      }
    }
    loadStorageData()
  }, [])

  function signAuthLogin(user: IUser, token: string) {
    localStorage.setItem('AUTH:user', JSON.stringify(user))
    localStorage.setItem('AUTH:token', token)

    setUser(user)
  }

  function signOut() {
    localStorage.clear()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, signAuthLogin, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
