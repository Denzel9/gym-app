import { FunctionComponent, useEffect, useState } from 'react'
import { TODAY } from '../../../helpers/getDate'
import { MdOutlineClose } from 'react-icons/md'
import { useAddTrainingDay } from '../../../hooks/query-hooks/useCalendar'

import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { TrainingDayInterface } from '../../../types/calendar.interface'

const CalendarDay: FunctionComponent<{
  dayTraining: TrainingDayInterface | undefined
  setPlan(plan: boolean): void
  date: string
  dayfilter: string
  monthFilter: number
  yearFilter: number
  availableDay(): boolean | undefined
}> = ({ dayTraining, date, setPlan, dayfilter, monthFilter, yearFilter, availableDay }) => {
  const [edit, setEdit] = useState(false)
  const [success, setSuccess] = useState(false)
  const [exercise, setExercise] = useState('')
  const [editExercise, setEditExercise] = useState(false)
  const [showPlanDay, setShowPlanDay] = useState(true)

  const { mutateCalendar } = useAddTrainingDay(
    `${dayfilter}.${String(monthFilter + 1).padStart(2, '0')}.${yearFilter}`,
    dayTraining?.training!
  )

  const handleDeleteExercise = (exercise: number) => {
    dayTraining?.training.splice(exercise, 1)
    mutateCalendar().then(() => setSuccess(true))
  }

  const handleAddExercise = (exercise: string) => {
    exercise.length &&
      dayTraining?.training.push({
        exercise: exercise,
        sets: [],
      })
    mutateCalendar().then(() => setExercise(''))
  }

  useEffect(() => {
    setTimeout(() => success && setSuccess(false), 1000)
  }, [success])

  return (
    <div className=" relative">
      {success && (
        <span className=" fixed bottom-32 z-20 right-0 bg-red-900 p-2">Упражнение удалено</span>
      )}
      {!!dayTraining?.training?.length && (
        <div className=" flex justify-between items-baseline">
          <div className=" flex items-end gap-2">
            <h2 className=" mt-5 text-xl">План на день</h2>
            <button className=" text-2xl" onClick={() => setShowPlanDay(!showPlanDay)}>
              {showPlanDay ? <MdOutlineKeyboardArrowDown /> : <MdOutlineKeyboardArrowUp />}
            </button>
          </div>
          <button onClick={() => setEdit(!edit)}>{edit ? 'Сохранить' : 'Редактировать'}</button>
        </div>
      )}
      {!dayTraining?.training?.length && (
        <div className=" flex flex-col items-center">
          {availableDay() ? (
            <p className=" text-2xl text-center mt-10">
              {`${date === TODAY ? 'Сегодня' : 'В этот день'} тренировка не запланирована`}
            </p>
          ) : (
            <p className=" text-2xl text-center mt-10">В этот день тренировки не было</p>
          )}
          {availableDay() && (
            <button
              onClick={() => setPlan(true)}
              className=" bg-base px-4 py-2 rounded-lg border border-gold mt-3"
            >
              Запланировать
            </button>
          )}
        </div>
      )}
      {showPlanDay &&
        dayTraining?.training?.map((el, i) => {
          const repeats = el.sets?.reduce((acc, cur) => (acc += cur.repeat), 0)
          const weight = el.sets?.reduce((acc, cur) => (acc += cur.weight * cur.repeat), 0)
          return (
            <div
              key={el.exercise}
              className=" relative bg-white bg-opacity-80 text-base  mt-3 p-2 rounded-lg"
            >
              <div>
                <h2 className=" text-xl">{el.exercise}</h2>
                {edit && (
                  <button
                    onClick={() => handleDeleteExercise(i)}
                    className=" absolute -right-1 -top-1 bg-red-800 text-white rounded-full p-1 animate-bounce"
                  >
                    <MdOutlineClose />
                  </button>
                )}
              </div>
              <div className=" flex items-center gap-5">
                <div>
                  <h3>Подходов</h3>
                  <p>{el.sets.length || 3}</p>
                </div>
                <div>
                  <h3>Повторений</h3>
                  <p>{repeats === 0 ? '-' : repeats}</p>
                </div>
                <div>
                  <h3>Общий вес</h3>
                  <p>{weight === 0 ? '-' : weight}</p>
                </div>
              </div>
            </div>
          )
        })}
      <div className=" relative">
        {editExercise && (
          <input
            autoFocus
            className=" mt-5 w-full rounded-lg p-2 text-black"
            placeholder="Что будем делать?"
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
          />
        )}
        {showPlanDay && !!dayTraining?.training.length && (
          <div className=" flex justify-between">
            <button
              onClick={() => (editExercise ? handleAddExercise(exercise) : setEditExercise(true))}
              className=" block mt-2 border-b border-gold pb-2"
            >
              {editExercise ? 'Сохранить' : 'Добавить упражнение'}
            </button>
            {editExercise && (
              <button
                onClick={() => setEditExercise(false)}
                className=" absolute top-3 right-0 bg-red-900 p-1 rounded-full"
              >
                <MdOutlineClose />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default CalendarDay
