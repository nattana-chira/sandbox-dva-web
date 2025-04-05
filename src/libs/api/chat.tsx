import API from "../utils/api";

export type ChatMessage = {
  id: string
  chatId: string   
  senderId: string
  content: string
  createdAt: string
}

type FetchChatMessagesParams = {
  friendUserId: string | number
};

type FetchChatMessagesResponse = {
  data: ChatMessage[]
};

export async function fetchChatMessages({ friendUserId }: FetchChatMessagesParams): Promise<FetchChatMessagesResponse> {
  return await API.get('/api/chats/messages', { params: { friendUserId } })
}