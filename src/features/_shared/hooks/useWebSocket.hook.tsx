import { ChatMessage } from '@/libs/api/chat';
import { config } from '@/libs/config';
import { useAppDispatch, useAppSelector } from '@/libs/redux/redux.hook';
import { handleError } from '@/libs/utils/apiErrorHandler';
import { useState, useEffect, useRef } from 'react';
import { setOnlineUserIds, addOnlineUserId, removeOnlineUserId } from "@/libs/redux/friends.slice";

type SocketMessage = {
  token: string
  receiverId: string | number
  type: string
  content: string
}

const useWebSocket = () => {
  const [receivedMessage, setReceivedMessage] = useState<ChatMessage | null>(null);
  const ws = useRef<WebSocket | null>(null);

  // const _friends = useAppSelector(state => state.friends.friends)
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

  const handleSocketSendMessage = ({ receiverId, messageText }: { receiverId: string, messageText: string}) => {
    try {
      if (ws.current && messageText) {
        const token = localStorage.getItem('token') || ''
  
        const socketMessage: SocketMessage = {
          token, 
          receiverId,
          type: 'message',
          content: messageText
        }
        ws.current.send(JSON.stringify(socketMessage))
      }
    } catch (e) {
      handleError(e)
    }
  }

  return { handleSocketSendMessage, receivedMessage, setReceivedMessage }
}

export default useWebSocket