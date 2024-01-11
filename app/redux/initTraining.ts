import { createSlice } from '@reduxjs/toolkit'
import { initExerciseType } from '../data/initTraning'

export interface ICartInitialState {
  trainingList: { type: string; exercise: string[]; disabled: boolean }[]
}

const initialState: ICartInitialState = {
  trainingList: [
    {
      type: 'Выберите тип тренировки',
      exercise: [],
      disabled: true,
    },
    {
      type: 'Верхнеплечевой',
      exercise: ['Бицепс', 'Трицепс', 'Жим гантелей вверх', 'Жим гантелей в бок'],
      disabled: false,
    },
    { type: 'Спина', exercise: ['Трапеция', 'Широчайшие'], disabled: false },
    {
      type: 'Ноги',
      exercise: ['Присед', 'Сибание ног в тренажере', 'Разгибание ног в тренажере'],
      disabled: false,
    },
    {
      type: 'Кардио',
      exercise: ['Велотренажер', 'Беговая дорожка'],
      disabled: false,
    },
  ],
}

export const initTraining = createSlice({
  name: 'initTraining',
  initialState,
  reducers: {
    initTrainingList: (state) => {
      state.trainingList = initExerciseType
    },
    addExercise: (state, { payload }) => {
      const { type, exercise } = payload
      const exerciseItim = state.trainingList.find((el) => el.type === type)
      exerciseItim?.exercise.push(exercise)
    },

    deleteExercise: (state, { payload }) => {
      const { type, exercise } = payload
      let exerciseItem = state.trainingList.find((el) => el.type === type)
      if (exerciseItem?.exercise)
        exerciseItem.exercise = exerciseItem?.exercise.filter((el) => el !== exercise)
    },
    clearTraining: (state) => {
      state.trainingList = initExerciseType
    },
  },
})

export const { addExercise, deleteExercise, clearTraining, initTrainingList } = initTraining.actions
