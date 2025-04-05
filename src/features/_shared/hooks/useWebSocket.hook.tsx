import { config } from '@/libs/config';
import React, { useState, useEffect, useRef } from 'react';

type SocketMessage = {
  token: string
  senderId: string | number
  receiverId: string | number
  type: string
  content: string
}

const useWebSocket = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Create a WebSocket connection to the server
    const token = localStorage.getItem('token') || '';
    ws.current = new WebSocket(config.WEB_SOCKET_URL + `?token=${token}`)

    console.log("Try WebSocket ")

    // Listen for messages from the server
    ws.current.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    // Cleanup WebSocket connection on component unmount
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const handleSendMessage = () => {
    if (ws.current && newMessage) {
      const token = localStorage.getItem('token') || '';

      const socketMessage: SocketMessage = {
        token, 
        senderId: 10,
        receiverId: 20,
        type: 'message',
        content: newMessage
      }
      ws.current.send(JSON.stringify(socketMessage));
      setNewMessage('');
    }
  }

  return { handleSendMessage }

  // return (
  //   <div>
  //     <h3>Messages</h3>
  //     <ul>
  //       {messages.map((msg, index) => (
  //         <li key={index}>{msg}</li>
  //       ))}
  //     </ul>
  //     <input
  //       type="text"
  //       value={newMessage}
  //       onChange={(e) => setNewMessage(e.target.value)}
  //       placeholder="Type a message"
  //     />
  //     <button onClick={handleSendMessage}>Send</button>
  //   </div>
  // );
};

export default useWebSocket;