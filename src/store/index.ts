import { configureStore } from '@reduxjs/toolkit'
import conversation from './conversationSlice'
import message from './messageSlice'
import logger from 'redux-logger'
export const store = configureStore({
  reducer: { conversation, message },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
