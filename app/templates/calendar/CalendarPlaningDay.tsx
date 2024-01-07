import classNames from 'classnames'
import { FunctionComponent, useState } from 'react'
import { MdClose } from 'react-icons/md'
import { initExerciseType } from '../../../data/initTraning'
import { useAddTrainingDay } from '../../../hooks/query-hooks/useCalendar'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import {
  addExercise,
  clearTraining,
  deleteExercise,
  initTrainingList,
} from '../../../redux/initTraining'
import { TrainingDayInterface } from '../../../types/calendar.interface'

const CalendarPlaningDay: FunctionComponent<{
  setPlan(plan: boolean): void
  plan: boolean
  date: string
  setTrainingType(type: string): void
  trainingType: string
  id: string
  calendar: TrainingDayInterface[]
  dayfilter: string
  monthFilter: number
  yearFilter: number
}> = ({
  setPlan,
  plan,
  date,
  setTrainingType,
  trainingType,
  monthFilter,
  yearFilter,
  dayfilter,
}) => {
  const [addNewExercise, setAddNewExercise] = useState(false)
  const dispatch = useAppDispatch()
  const [exerciseName, setExerciseName] = useState('')
  const exerciseLists = useAppSelector((state) => state.initTraining.trainingList)
  let exerciseList = exerciseLists.find((el) => el.type === trainingType)

  const newExercise = exerciseList?.exercise.map((el) => ({
    exercise: el,
    sets: [],
  }))

  const { mutateCalendar } = useAddTrainingDay(
    `${dayfilter}.${String(monthFilter + 1).padStart(2, '0')}.${yearFilter}`,
    newExercise!
  )

  const handleAddExercise = () => {
    const uniqueExercise = exerciseList?.exercise.find((el) => el === exerciseName)
    if (!uniqueExercise && exerciseName.length)
      dispatch(addExercise({ type: trainingType, exercise: exerciseName }))
    setExerciseName('')
  }

  const handleSetTrainindDay = () => {
    mutateCalendar()
      .then(() => dispatch(clearTraining()))
      .then(() => setPlan(false))
  }
  return (
    <div
      className={classNames(
        plan ? 'bg-black bg-opacity-40' : 'bg-opacity-0 pointer-events-none ',
        ' z-50 fixed bg-base right-0 top-0 w-full h-full'
      )}
      onClick={() => setPlan(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={classNames(
          plan ? 'translate-x-0' : ' translate-x-96',
          'duration-300 w-4/5 h-full bg-base float-right p-2 relative'
        )}
      >
        <button onClick={() => setPlan(false)}>
          <MdClose className=" text-3xl" />
        </button>
        <h2 className=" text-xl">План тренировки на: {date}</h2>
        <p className=" mt-5">Тип тренировки:</p>
        <select
          className=" w-full rounded-lg text-black py-1 mt-1"
          value={trainingType}
          name="sasa"
          placeholder="Выберите тип тренировки"
          onChange={(e) => setTrainingType(e.target.value)}
        >
          {initExerciseType.map((el) => {
            return (
              <option disabled={el.disabled} key={el.type} value={el.type}>
                {el.type}
              </option>
            )
          })}
        </select>

        <div className=" mt-5">
          {exerciseList?.exercise.map((el, i) => {
            return (
              <div key={el} className=" flex justify-between">
                <p>
                  <span className=" text-gold text-lg">{i + 1}.</span> {el}
                </p>
                <button
                  onClick={() => {
                    console.log({ type: trainingType, exercise: el })
                    dispatch(deleteExercise({ type: trainingType, exercise: el }))
                  }}
                >
                  <MdClose />
                </button>
              </div>
            )
          })}
        </div>
        <button
          onClick={() => {
            dispatch(initTrainingList())
          }}
        >
          Восстановить тренировку
        </button>
        {addNewExercise && (
          <div className=" relative">
            <input
              placeholder="Упражнение"
              type="text"
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
              className=" text-black p-1 rounded-lg w-full mt-5"
            />
            <button
              className=" absolute right-0 top-2 bg-gold rounded-full p-1"
              onClick={() => setAddNewExercise(false)}
            >
              <MdClose />
            </button>
          </div>
        )}
        <button
          className=" block border border-gold px-4 py-2 rounded-lg  mt-2 shadow shadow-black"
          onClick={addNewExercise ? handleAddExercise : () => setAddNewExercise(true)}
        >
          {addNewExercise ? 'Сохранить упражнение' : 'Добавить упражнение'}
        </button>

        <button
          onClick={handleSetTrainindDay}
          className=" absolute right-2 bottom-10 border-b border-gold pb-2"
        >
          Cохранить
        </button>
      </div>
    </div>
  )
}

export default CalendarPlaningDay
