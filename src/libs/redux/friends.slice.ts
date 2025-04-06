import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FriendRequest } from '../api/friend'
import { User } from '../api/auth'

interface FriendsState {
  onlineUserIds: string[]
  friendRequests: FriendRequest[]
  friends: User[]
}

const initialState: FriendsState = {
  onlineUserIds: [],
  friendRequests: [],
  friends: []
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
    },
    setFriendRequests(state, action: PayloadAction<FriendRequest[]>) {
      state.friendRequests = action.payload
    },
    setFriends(state, action: PayloadAction<User[]>) {
      state.friends = action.payload
    }
  }
})

export const { setOnlineUserIds, addOnlineUserId, removeOnlineUserId, setFriendRequests, setFriends } = friendsSlice.actions
export default friendsSlice.reducer