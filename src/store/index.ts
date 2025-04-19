import { configureStore } from '@reduxjs/toolkit'
import app from './app/app.slice'
import data from './data/data.slice'

export const store = configureStore({
  reducer: {
    app,
    data
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch