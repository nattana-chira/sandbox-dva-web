import API from "../utils/api";
import type { User } from "./auth";

export type FriendRequest = {
  id: string
  senderId: string
  receiverId: string
  sender: User
}

type AddFriendParams = {
  email: string
};

type FetchFriendsResponse = {
  data: User[]
};

type FetchFriendRequestsResponse = {
  data: FriendRequest[]
};

type FriendRequestResponse = {
  data: FriendRequest
};

export async function sendFriendRequest({ email }: AddFriendParams): Promise<FriendRequestResponse> {
  return await API.post('/api/friends/requests', { email })
}

export async function fetchFriends(): Promise<FetchFriendsResponse> {
  return await API.get('/api/friends')
}

export async function fetchFriendRequests(): Promise<FetchFriendRequestsResponse> {
  return await API.get('/api/friends/requests')
}

export async function acceptFriendRequest(id: string): Promise<FriendRequestResponse> {
  return await API.post(`/api/friends/requests/${id}/accept`)
}

export async function rejectFriendRequest(id: string): Promise<FriendRequestResponse> {
  return await API.post(`/api/friends/requests/${id}/reject`)
}