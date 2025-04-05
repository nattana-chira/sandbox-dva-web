import { ChatMessage } from '@/libs/api/chat';
import { config } from '@/libs/config';
import { handleError } from '@/libs/utils/apiErrorHandler';
import { useState, useEffect, useRef } from 'react';

type SocketMessage = {
  token: string
  receiverId: string | number
  type: string
  content: string
}

const useWebSocket = () => {
  const [receivedMessage, setReceivedMessage] = useState<ChatMessage | null>(null);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Create a WebSocket connection to the server
    const token = localStorage.getItem('token') || '';
    ws.current = new WebSocket(config.WEB_SOCKET_URL + `?token=${token}`)

    console.log("Try WebSocket ")

    // Listen for messages from the server
    ws.current.onmessage = (event) => {
      console.log("event.data", event.data)
      setReceivedMessage(JSON.parse(event.data))
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