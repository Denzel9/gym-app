import { FunctionComponent, useContext, useState } from 'react'
import { TrainingDayInterface } from '../../../types/calendar.types'
import { Alert, View } from 'react-native'
import CalendarDayHeader from './CDHeader'
import CDInfo from './CDInfo'
import Button from '../../../components/ui/Button'
import CDItem from './CDItem/CDItem'
import CDAddExercise from './CDAddExercise'
import { useTraining } from '../../../hooks/useTraining'

const CalendarDay: FunctionComponent<{
  dayTraining: TrainingDayInterface
  date: string
  dayfilter: string
  monthFilter: number
  yearFilter: number
  availableDay(): boolean | undefined
}> = ({ dayTraining, date, availableDay }) => {
  const [edit, setEdit] = useState(false)
  const [exercise, setExercise] = useState('')
  const [editExercise, setEditExercise] = useState(false)
  const [showPlanDay, setShowPlanDay] = useState(true)

  const { updateTraining } = useTraining()

  const handleAddExercise = (exercise: string) => {
    try {
      if (exercise.length) {
        dayTraining?.training?.push({
          exercise: exercise.charAt(0).toUpperCase().concat(exercise.slice(1)),
          sets: [],
        })
        updateTraining(dayTraining?.docId!, dayTraining?.training)
      }
    } catch (error: any) {
      Alert.alert('Error add', error)
    } finally {
      setExercise('')
      setEditExercise(false)
    }
  }

  return (
    <View style={{ position: 'relative' }}>
      {dayTraining?.training?.length && (
        <CalendarDayHeader
          showPlanDay={showPlanDay}
          edit={edit}
          setShowPlanDay={setShowPlanDay}
          setEdit={setEdit}
        />
      )}

      {!dayTraining?.training?.length && <CDInfo availableDay={availableDay} date={date} />}

      {showPlanDay &&
        dayTraining?.training?.map((el) => {
          return (
            <CDItem
              key={el.exercise}
              title={el.exercise}
              sets={el.sets}
              edit={edit}
              dayTraining={dayTraining}
            />
          )
        })}

      {showPlanDay && editExercise && !!dayTraining?.training?.length && (
        <CDAddExercise
          exercise={exercise}
          setExercise={setExercise}
          editExercise={editExercise}
          setEditExercise={setEditExercise}
        />
      )}

      {showPlanDay && !!dayTraining?.training?.length && (
        <Button
          title={editExercise ? 'Сохранить' : 'Добавить упражнение'}
          onPress={() => (editExercise ? handleAddExercise(exercise) : setEditExercise(true))}
        />
      )}
    </View>
  )
}

export default CalendarDay
