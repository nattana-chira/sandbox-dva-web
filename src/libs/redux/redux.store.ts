import { configureStore } from '@reduxjs/toolkit'
import friendsReducer from './friends.slice'

export const store = configureStore({
  reducer: {
    friends: friendsReducer
  }
})

// Types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch