import { TODAY } from '../helpers/getDate'
import { useProfile } from './useProfile'

export const useTraining = () => {
  const { calendar } = useProfile()

  const todayTraining = calendar?.calendar?.find((el) => {
    const dayDate = el.date.split('.')
    const todayDate = TODAY.split('.')
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

  const lastTraining = calendar?.calendar?.find((el) => {
    const dayDate = el.date.split('.')
    const todayDate = TODAY.split('.')
    if (
      (el.training.length && dayDate[0] < todayDate[0] && dayDate[1] <= todayDate[1]) ||
      dayDate[2] < todayDate[2]
    ) {
      return el
    }
    return null
  })

  const nextTraining = calendar?.calendar?.find((el) => {
    const dayDate = el.date.split('.')
    const todayDate = TODAY.split('.')
    if (
      el.training.length &&
      dayDate[0] > todayDate[0] &&
      dayDate[1] >= todayDate[1] &&
      dayDate[2] >= todayDate[2]
    ) {
      return el
    }
    return null
  })

  const getTraining = (date: string) =>
    calendar?.calendar?.find((el) => {
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

  return { todayTraining, lastTraining, nextTraining, getTraining }
}
