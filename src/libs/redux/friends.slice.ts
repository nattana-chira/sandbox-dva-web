import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FriendsState {
  onlineUserIds: string[]
}

const initialState: FriendsState = {
  onlineUserIds: []
}

const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    setOnlineUserIds(state, action: PayloadAction<string[]>) {
      state.onlineUserIds = action.payload
    },
    addOnlineUserId(state, action: PayloadAction<string>) {
      state.onlineUserIds.push(action.payload)
    },
    removeOnlineUserId(state, action: PayloadAction<string>) {
      state.onlineUserIds = state.onlineUserIds.filter(userId => userId !== action.payload) 
    }
  },
})

export const { setOnlineUserIds, addOnlineUserId, removeOnlineUserId } = friendsSlice.actions
export default friendsSlice.reducer