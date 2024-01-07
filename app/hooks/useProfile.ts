import { useEffect, useMemo, useState } from 'react'
import { useAuth } from './useAuth'
import { onSnapshot, collection, query, where, limit } from 'firebase/firestore'
import { db } from '../firebase'
import { CalendarInterface } from '../types/calendar.types'

interface IProfile {
  id: string
  name: string
  docId: string
  userInfo: {
    Вес: string
    Рост: string
    Лет: string
  }
}

export const useProfile = () => {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [profile, setProfile] = useState<IProfile>({} as IProfile)
  const [calendar, setCalendar] = useState<CalendarInterface>({} as CalendarInterface)

  useEffect(() => {
    onSnapshot(
      query(collection(db, 'users'), where('id', '==', user?.uid), limit(1)),
      (snapshot) => {
        const profile = snapshot.docs.map((el) => ({
          ...(el.data() as Omit<IProfile, 'docId'>),
          docId: el.id,
        }))[0]

        setProfile(profile)
      }
    )

    onSnapshot(
      query(collection(db, 'calendar'), where('id', '==', user?.uid), limit(1)),
      (snapshot) => {
        const calendar = snapshot.docs.map((el) => ({
          ...(el.data() as Omit<CalendarInterface, 'docId'>),
          docId: el.id,
        }))[0]

        setCalendar(calendar)
        setIsLoading(false)
      }
    )
  }, [])

  const fullUserInfo = () => {
    const userInfo =
      profile.userInfo && Object.entries(profile.userInfo).every((el) => +el[1] !== 0)
    const isCorrectname = profile?.name !== '...'
    return userInfo && isCorrectname
  }

  const value = useMemo(() => ({ profile, calendar, isLoading, fullUserInfo }), [])

  return value
}
