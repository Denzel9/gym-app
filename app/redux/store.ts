import { configureStore } from '@reduxjs/toolkit'
import { mainSlice } from './reducer'
import { currentTraining } from './currentTraining'
import { initTraining } from './initTraining'


export const store = configureStore({
  reducer: {
    timer: mainSlice.reducer,
    currentTraining: currentTraining.reducer,
    initTraining: initTraining.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
