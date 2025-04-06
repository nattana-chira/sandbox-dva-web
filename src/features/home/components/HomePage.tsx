"use client"

import FriendRequestCard from "@/features/home/components/FriendRequestCard";
import AuthGuard from "@/features/_shared/components/AuthGuard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "./AddFriendModal";
import { handleError } from "@/libs/utils/apiErrorHandler";
import { acceptFriendRequest, fetchFriendRequests, fetchFriends, rejectFriendRequest, sendFriendRequest } from "@/libs/api/friend";
import { SubmitHandler } from "react-hook-form";
import { AddFriendFormData } from "../homePage.interfaces";
import { User } from "@/libs/api/auth";
import useWebSocket from "@/features/_shared/hooks/useWebSocket.hook";
import { ChatMessage, fetchChatMessages } from "@/libs/api/chat";
import { useAppDispatch, useAppSelector } from "@/libs/redux/redux.hook";
import { Provider } from 'react-redux'
import { store } from '@/libs/redux/redux.store'
import { setFriendRequests, setFriends } from "@/libs/redux/friends.slice";
import HomePageChat from "./HomePage.Chat";
import HomePageFriend from "./HomePage.Friend";
import HomePageNav from "./HomePage.Nav";

function HomePageComponent() {
  const [isModalOpen, toggleModal] = useState<boolean>(false)
  const [addFriendLoading, toggleAddFriendLoading] = useState<boolean>(false)
  const router = useRouter()
  const [chatFriend, selectChatFriend] = useState<User | null>(null)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [messageText, setMessageText] = useState<string>('')

  const { friends, onlineUserIds, friendRequests } = useAppSelector(state => state.friends)
  const dispatch = useAppDispatch()
  const { 
    handleSocketSendMessage, 
    handleSocketSendFriendRequest, 
    handleSocketAcceptFriendRequest, 
    receivedMessage, 
    setReceivedMessage 
  } = useWebSocket()

  useEffect(() => {
    getFriends()
    getFriendRequests()
  }, [])

  // Add real-time message received from web socket server
  useEffect(() => {
    if (receivedMessage && chatFriend && chatFriend.id === receivedMessage.senderId) {
      setChatMessages([...chatMessages, receivedMessage])
      setReceivedMessage(null)
    }
  }, [receivedMessage])

  const getFriends = () => {
    fetchFriends()
      .then((res) => dispatch(setFriends(res.data)))
      .catch(handleError)
  }

  const getFriendRequests = () => {
    fetchFriendRequests()
      .then((res) => dispatch(setFriendRequests(res.data)))
      .catch(handleError)
  }

  const handleToggleAddFriendModal = () => {
    toggleModal(false)
  }

  const handleAddFriend: SubmitHandler<AddFriendFormData> = async (data) => {
    try {
      toggleAddFriendLoading(true)
      const res = await sendFriendRequest(data)
      handleSocketSendFriendRequest({ msgReceiverId: res.data.receiverId })
      alert('Send friend request successfully')
      toggleModal(false)

    } catch (e) {
      handleError(e)

    } finally {
      toggleAddFriendLoading(false)
    }
  }

  const handleAcceptFriendRequest = async (id: string, toggleLoading: Function) => {
    try {
      toggleLoading(true)
      const res = await acceptFriendRequest(id)
      handleSocketAcceptFriendRequest({ msgReceiverId: res.data.senderId })
      getFriends()
      getFriendRequests()
      alert('Accept Friend Request successfully')

    } catch (e) {
      handleError(e)

    } finally {
      toggleLoading(false)
    }
  }

  const handleRejectFriendRequest = async (id: string, toggleLoading: Function) => {
    try {
      toggleLoading(true)
      await rejectFriendRequest(id)
      getFriendRequests()
      alert('Reject Friend Request successfully')

    } catch (e) {
      handleError(e)

    } finally {
      toggleLoading(false)
    }
  }

  const handleLogOut = () => {
    localStorage.removeItem("token");
    router.push('/login')
  }

  const handleShowFriendChat = async (friend: User) => {
    try {
      setChatMessages([])
      selectChatFriend(friend)
      const res = await fetchChatMessages({ friendUserId: friend.id })
      setChatMessages(res.data)
      
    } catch (e) {
      handleError(e)
    }
  }

  const handleInputMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (chatFriend) {
      setMessageText(e.target.value)
    }
  }

  const handleSendMessage = async () => {
    if (chatFriend && messageText) {
      handleSocketSendMessage({ msgReceiverId: chatFriend.id, messageText })
      setMessageText('')
      const res = await fetchChatMessages({ friendUserId: chatFriend.id })
      setChatMessages(res.data)
    }
  }

  return (
    <>
      {/* Add Friend Modal */}
      <Modal 
        isOpen={isModalOpen} 
        isLoading={addFriendLoading} 
        onClose={handleToggleAddFriendModal} 
        onAddFriend={handleAddFriend} 
      />

      {/* Sidebar */}
      <div className="w-[calc(.25rem*80)] h-screen border-r border-gray-300">
        <div className="">

          {/* Navigation Bar */}
          <HomePageNav 
            friendRequests={friendRequests} 
            toggleModal={toggleModal} 
            handleLogOut={handleLogOut}
          />

          {/* Friend Request Section */}
          <div className="border-b border-gray-300 p-2 py-4">
            <h2 className="font-semibold text-gray-400 mb-2">Friend Requests</h2>

            {friendRequests.map((friendRequest, i) => (
              <FriendRequestCard 
                key={i}
                friendRequest={friendRequest} 
                onAccept={handleAcceptFriendRequest} 
                onReject={handleRejectFriendRequest} 
              />
            ))}
          </div>

          {/* Friend Section */}
          <HomePageFriend 
            chatFriend={chatFriend}
            friends={friends}
            onlineUserIds={onlineUserIds}
            handleShowFriendChat={handleShowFriendChat}
          />
          
        </div>
      </div>

      {/* Chat Section */}
      <HomePageChat 
        chatFriend={chatFriend}
        onlineUserIds={onlineUserIds}
        chatMessages={chatMessages}
        messageText={messageText}
        handleSendMessage={handleSendMessage}
        handleInputMessage={handleInputMessage}
      />
    </>
  )
}

export default function HomePage() {
  return (
    <Provider store={store}>
      <AuthGuard>
        <HomePageComponent />
      </AuthGuard>
    </Provider>
  )
}