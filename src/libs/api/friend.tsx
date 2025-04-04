import { API_URL } from "../constants";
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

type GetFriendsResponse = {
  data: User[]
};

type GetFriendRequestsResponse = {
  data: FriendRequest[]
};

type FriendRequestResponse = {
  data: FriendRequest[]
};

export async function sendFriendRequest({ email }: AddFriendParams) {
  return await API.post(API_URL + '/api/friends/requests', { email })
}

export async function fetchFriends(): Promise<GetFriendsResponse> {
  return await API.get(API_URL + '/api/friends')
}

export async function fetchFriendRequests(): Promise<GetFriendRequestsResponse> {
  return await API.get(API_URL + '/api/friends/requests')
}

export async function acceptFriendRequest(id: string): Promise<FriendRequestResponse> {
  return await API.post(API_URL + `/api/friends/requests/${id}/accept`)
}

export async function rejectFriendRequest(id: string): Promise<FriendRequestResponse> {
  return await API.post(API_URL + `/api/friends/requests/${id}/reject`)
}