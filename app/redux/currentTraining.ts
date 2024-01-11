import { createSlice } from '@reduxjs/toolkit'

export interface ICartInitialState {
  isTraining: boolean
  exercises: {
    [exercise: string]: [
      {
        repeat: number
        weight: number
      }
    ]
  }
  temporaryTraining: {
    [exercise: string]: [
      {
        repeat: number
        weight: number
      }
    ]
  }
}

const initialState: ICartInitialState = {
  isTraining: false,
  exercises: {},
  temporaryTraining: {},
}

export const currentTraining = createSlice({
  name: 'currentTraining',
  initialState,
  reducers: {
    addExercise: (state, { payload }) => {
      state.exercises = { ...state.exercises, [payload]: [] }
    },
    createExercise: (state, { payload }) => {
      state.exercises = { ...state.exercises, ...payload }
    },
    saveExercise: (state, { payload }) => {
      state.exercises[payload.title].push({
        repeat: payload.repeat,
        weight: payload.weight,
      })
    },
    deleteExercise: (state, { payload }) => {
      delete state.exercises[payload]
    },
    stopTraining: (state) => {
      state.exercises = {}
    },
    startTraining: (state) => {
      state.isTraining = !state.isTraining
    },
    saveTraining: (state) => {
      state.temporaryTraining = state.exercises
    },
  },
})

export const {
  saveExercise,
  createExercise,
  addExercise,
  deleteExercise,
  stopTraining,
  startTraining,
  saveTraining,
} = currentTraining.actions
