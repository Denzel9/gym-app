import { useContext } from 'react'
import { TODAY } from '../helpers/getDate'
import { UserContext } from '../providers/UserProvider'
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { Alert } from 'react-native'
import { db } from '../firebase'
import { DayTraining, TrainingDayInterface } from '../types/calendar.types'

export const useTraining = () => {
  const { calendar, isLoading, setIsLoading, profile } = useContext(UserContext)

  const todayTraining = calendar?.find((el) => {
    const dayDate = el?.date?.split('.')
    const todayDate = TODAY?.split('.')
    if (
      el?.training?.length &&
      dayDate[0] === todayDate[0] &&
      dayDate[1] === todayDate[1] &&
      dayDate[2] === todayDate[2]
    ) {
      return el
    }
    return null
  })

  const lastTraining = calendar?.find((el) => {
    const dayDate = el?.date?.split('.')
    const todayDate = TODAY?.split('.')
    if (
      (el?.training?.length && dayDate[0] < todayDate[0] && dayDate[1] <= todayDate[1]) ||
      (dayDate && dayDate[2] < todayDate[2])
    ) {
      return el
    }
    return null
  })

  const nextTraining = calendar?.find((el) => {
    const dayDate = el?.date?.split('.')
    const todayDate = TODAY?.split('.')
    if (
      el?.training?.length &&
      dayDate[0] > todayDate[0] &&
      dayDate[1] >= todayDate[1] &&
      dayDate[2] >= todayDate[2]
    ) {
      return el
    }
    return null
  })

  const getTraining = (date: string) =>
    calendar?.find((el) => {
      const dayDate = el.date.split('.')
      const todayDate = date.split('.')
      if (
        el.training.length &&
        dayDate[0] === todayDate[0] &&
        dayDate[1] === todayDate[1] &&
        dayDate[2] === todayDate[2]
      ) {
        return el
      }
      return null
    })

  const addTrainingDay = async (date: string, type: string, dayTraining: TrainingDayInterface) => {
    setIsLoading(true)
    try {
      if (!calendar.find((el) => el.date === date))
        await addDoc(collection(db, 'calendar'), {
          training: dayTraining,
          type,
          date,
          id: profile?.id,
        })
    } catch (error: any) {
      Alert.alert('Error reg:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteTrainingDay = async (id: string) => {
    setIsLoading(true)
    try {
      await deleteDoc(doc(db, 'calendar', id))
    } catch (error: any) {
      Alert.alert('Error delete:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateTraining = async (id: string, training: DayTraining[]) => {
    setIsLoading(true)
    try {
      await updateDoc(doc(db, 'calendar', id), {
        training: training,
      })
    } catch (error: any) {
      Alert.alert('Error update:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    todayTraining,
    lastTraining,
    nextTraining,
    getTraining,
    isLoading,
    addTrainingDay,
    deleteTrainingDay,
    updateTraining,
  }
}
