import { ChatMessage } from '@/libs/api/chat';
import { config } from '@/libs/config';
import { useAppDispatch, useAppSelector } from '@/libs/redux/redux.hook';
import { handleError } from '@/libs/utils/apiErrorHandler';
import { useState, useEffect, useRef } from 'react';
import { setOnlineUserIds, addOnlineUserId, removeOnlineUserId, setFriendRequests, setFriends } from "@/libs/redux/friends.slice";
import { fetchFriendRequests, fetchFriends } from '@/libs/api/friend';

type SocketMessage = {
  token: string
  receiverId: string | number
  type: string
  content: string
}

const useWebSocket = () => {
  const [receivedMessage, setReceivedMessage] = useState<ChatMessage | null>(null);
  const ws = useRef<WebSocket | null>(null);
  const dispatch = useAppDispatch()

  useEffect(() => {
    // Create a WebSocket connection to the server
    const token = localStorage.getItem('token') || '';
    ws.current = new WebSocket(config.WEB_SOCKET_URL + `?token=${token}`)

    // Listen for messages from the server
    ws.current.onmessage = (event) => {
      console.log("on message event.data", event.data)

      const socketMessage = JSON.parse(event.data)

      switch (socketMessage?.type) {
        case 'message':
          setReceivedMessage(socketMessage)
          break

        case 'all-connected-users':
          console.log('all-connected-users')
          dispatch(setOnlineUserIds(socketMessage.userIds))
          break

        case 'new-user-connect':
          console.log('new-user-connect')
          dispatch(addOnlineUserId(socketMessage.userId))
          break

        case 'user-disconnect':
          console.log('user-disconnect')
          dispatch(removeOnlineUserId(socketMessage.userId))
          break

        case 'send-friend-request':
          console.log('send-friend-request')
          fetchFriendRequests()
            .then((res) => dispatch(setFriendRequests(res.data)))
            .catch(handleError)
          break

        case 'accept-friend-request':
          console.log('accept-friend-request')
          fetchFriends()
            .then((res) => dispatch(setFriends(res.data)))
            .catch(handleError)
          break

        default: break
      }
    }
  
    // Cleanup WebSocket connection on component unmount
    return () => {
      if (ws.current) {
        ws.current.close()
      }
    }
  }, [])

  const handleSocketSendMessage = ({ msgReceiverId, messageText }: { msgReceiverId: string, messageText: string}) => {
    try {
      if (ws.current && messageText) {
        const token = localStorage.getItem('token') || ''
  
        const socketMessage: SocketMessage = {
          token, 
          receiverId: msgReceiverId,
          type: 'message',
          content: messageText
        }
        ws.current.send(JSON.stringify(socketMessage))
      }
    } catch (e) {
      handleError(e)
    }
  }

  const handleSocketSendFriendRequest = ({ msgReceiverId }: { msgReceiverId: string }) => {
    try {
      if (ws.current) {
        const token = localStorage.getItem('token') || ''
  
        const socketMessage = {
          token, 
          receiverId: msgReceiverId,
          type: 'send-friend-request',
        }
        ws.current.send(JSON.stringify(socketMessage))
      }
    } catch (e) {
      handleError(e)
    }
  }

  const handleSocketAcceptFriendRequest = ({ msgReceiverId }: { msgReceiverId: string }) => {
    try {
      if (ws.current) {
        const token = localStorage.getItem('token') || ''
  
        const socketMessage = {
          token,
          receiverId: msgReceiverId,
          type: 'accept-friend-request',
        }
        ws.current.send(JSON.stringify(socketMessage))
      }
    } catch (e) {
      handleError(e)
    }
  }

  return { handleSocketSendMessage, handleSocketSendFriendRequest, handleSocketAcceptFriendRequest, receivedMessage, setReceivedMessage }
}

export default useWebSocket