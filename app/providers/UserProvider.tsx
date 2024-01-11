import { FunctionComponent, ReactNode, createContext, useEffect, useMemo, useState } from 'react'
import { TrainingDayInterface } from '../types/calendar.types'
import { collection, limit, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../hooks/useAuth'

interface IUserContext {
  profile: IProfile
  calendar: TrainingDayInterface[]
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

export interface IProfile {
  id: string
  name: string
  lastName: string
  docId: string
  email: string
  userInfo: {
    weight: string
    height: string
    age: string
  }
}

export const UserContext = createContext<IUserContext>({} as IUserContext)

const UserProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [profile, setProfile] = useState<IProfile>({} as IProfile)
  const [calendar, setCalendar] = useState<TrainingDayInterface[]>([] as TrainingDayInterface[])

  useEffect(() => {
    onSnapshot(
      query(collection(db, 'users'), where('id', '==', user && user?.uid), limit(1)),
      (snapshot) => {
        const profile = snapshot.docs.map((el) => ({
          ...(el.data() as Omit<IProfile, 'docId'>),
          docId: el.id,
        }))[0]

        setProfile(profile)
        setIsLoading(false)
      }
    )
  }, [user?.uid])

  useEffect(() => {
    onSnapshot(
      query(collection(db, 'calendar'), where('id', '==', user && user?.uid)),
      (snapshot) => {
        const calendar = snapshot?.docs?.map((el) => ({
          ...(el.data() as TrainingDayInterface),
          docId: el.id,
        }))

        setCalendar(calendar)
        setIsLoading(false)
      }
    )
  }, [user?.uid])

  const value = { profile, calendar, isLoading, setIsLoading }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default UserProvider
