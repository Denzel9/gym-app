import { FunctionComponent, ReactNode, createContext, useEffect, useMemo, useState } from 'react'
import { User, onAuthStateChanged, UserInfo } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'
import { Alert } from 'react-native'
import { auth, db, login, logout, register } from '../firebase'

interface IContext {
  user: User | null
  isLoading: boolean
  register: (email: string, password: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<IContext>({} as IContext)

const AuthProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<null | User>(null)
  const [isLoadingInitial, setIsliadinInitial] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const registerHandler = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const { user } = await register(email, password)

      await addDoc(collection(db, 'users'), {
        id: user.uid,
        name: user.displayName || '...',
        userInfo: {
          Возрaст: 0,
          Вес: 0,
          Рост: 0,
        },
      }).then(() => {
        addDoc(collection(db, 'calendar'), {
          id: user.uid,
          name: user.displayName || '...',
          calendar: [],
        })
      })
    } catch (error: any) {
      Alert.alert('Error reg:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const loginHandler = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      await login(email, password)
    } catch (error: any) {
      Alert.alert('Error log:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const logoutHandler = async () => {
    setIsLoading(true)
    try {
      await logout()
    } catch (error: any) {
      Alert.alert('Error logout:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        setUser(user || null)
        setIsliadinInitial(false)
      }),
    []
  )

  const value = useMemo(
    () => ({
      user,
      isLoading,
      login: loginHandler,
      logout: logoutHandler,
      register: registerHandler,
    }),
    [user, isLoading]
  )
  return <AuthContext.Provider value={value}>{!isLoadingInitial && children}</AuthContext.Provider>
}

export default AuthProvider
