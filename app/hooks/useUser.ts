import { updateDoc, doc } from 'firebase/firestore'
import { Alert } from 'react-native'
import { db } from '../firebase'
import { useContext } from 'react'
import { UserContext } from '../providers/UserProvider'

export const useUser = () => {
  const { profile, calendar } = useContext(UserContext)

  const fullUserInfo = () => {
    const userInfo =
      profile?.userInfo && Object.entries(profile?.userInfo).every((el) => +el[1] !== 0)
    const isCorrectname = profile?.name !== '...'
    return userInfo && isCorrectname
  }

  const getLevelsUser = () => {
    if (fullUserInfo() && calendar.length >= 1 && calendar?.some((el) => el.training.length)) {
      return 'Новичок'
    }
    if (fullUserInfo() && calendar.length >= 2 && calendar?.some((el) => el.training.length)) {
      return 'Любитель'
    }
    if (fullUserInfo() && calendar.length >= 5 && calendar?.some((el) => el.training.length)) {
      return 'Профи'
    }
    return '-'
  }

  const updateUserData = async (name: string, text: string, id: string) => {
    try {
      if (text.length > 2)
        await updateDoc(doc(db, 'users', id), {
          [name]: text,
        })
    } catch (error: any) {
      Alert.alert('Error update', error)
    }
  }

  const updateUserDataInfo = async (name: string, text: string, id: string) => {
    try {
      if (text.length > 1)
        await updateDoc(doc(db, 'users', id), {
          [`userInfo.${name}`]: text,
        })
    } catch (error: any) {
      Alert.alert('Error update', error)
    }
  }

  return { updateUserData, updateUserDataInfo, fullUserInfo, getLevelsUser }
}
