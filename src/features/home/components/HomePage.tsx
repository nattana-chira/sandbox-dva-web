"use client"

import Input from "@/features/_shared/components/form/Input";
import FriendCard from "@/features/home/components/FriendCard";
import FriendRequestCard from "@/features/home/components/FriendRequestCard";
import { faBell } from '@fortawesome/free-regular-svg-icons'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import Textarea from "@/features/_shared/components/form/Textarea";
import AuthGuard from "@/features/_shared/components/AuthGuard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "./AddFriendModal";
import { handleError } from "@/libs/utils/apiErrorHandler";
import { acceptFriendRequest, FriendRequest, fetchFriendRequests, fetchFriends, rejectFriendRequest, sendFriendRequest } from "@/libs/api/friend";
import { SubmitHandler } from "react-hook-form";
import { AddFriendFormData } from "../homePage.interfaces";
import { User } from "@/libs/api/auth";
import useWebSocket from "@/features/_shared/hooks/useWebSocket.hook";
import { ChatMessage, fetchChatMessages } from "@/libs/api/chat";
import ChatMessageComponent from "./ChatMessage";
import { useAppDispatch, useAppSelector } from "@/libs/redux/redux.hook";
import { Provider } from 'react-redux'
import { store } from '@/libs/redux/redux.store'

function HomePageComponent() {
  const [isModalOpen, toggleModal] = useState<boolean>(false)
  const [addFriendLoading, toggleAddFriendLoading] = useState<boolean>(false)
  const router = useRouter()
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([])
  const [friends, setFriends] = useState<User[]>([])
  const [searchText, setSearchText ]= useState<string>('')
  const [chatFriend, selectChatFriend] = useState<User | null>(null)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [messageText, setMessageText] = useState<string>('')

  const onlineUserIds = useAppSelector(state => state.friends.onlineUserIds)
  const { handleSocketSendMessage, receivedMessage, setReceivedMessage } = useWebSocket()

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
      .then((res) => setFriends(res.data))
      .catch(handleError)
  } 

  const getFriendRequests = () => {
    fetchFriendRequests()
      .then((res) => setFriendRequests(res.data))
      .catch(handleError)
  }

  const handleToggleAddFriendModal = () => {
    toggleModal(false)
  }

  const isOnline = (userId: string) => {
    onlineUserIds.find(
      onlineUserId => onlineUserId.toString() === userId.toString()
    )
  }

  const handleAddFriend: SubmitHandler<AddFriendFormData> = async (data) => {
    try {
      toggleAddFriendLoading(true)
      await sendFriendRequest(data)
      alert('Add Friend successfully')
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
      await acceptFriendRequest(id)
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

  const handleInputSearchFriend = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
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
      handleSocketSendMessage({ receiverId: chatFriend.id, messageText })
      setMessageText('')
      const res = await fetchChatMessages({ friendUserId: chatFriend.id })
      setChatMessages(res.data)
    }
  }

  let _friends = searchText 
    ? friends.filter(friend => 
        (friend.firstName + friend.lastName + friend.email).includes(searchText)) 
    : friends

  const onlineFriends = _friends.filter(friend => onlineUserIds.includes(friend.id.toString()))
  const offlineFriends = _friends.filter(friend => !onlineUserIds.includes(friend.id.toString()))

  return (
    <AuthGuard>
      <Modal isOpen={isModalOpen} isLoading={addFriendLoading} onClose={handleToggleAddFriendModal} onAddFriend={handleAddFriend} />

      {/* Sidebar */}
      <div className="w-[calc(.25rem*80)] h-screen border-r border-gray-300">
        <div className="">

          {/* Navigation Bar */}
          <nav className="flex items-center justify-between border-b border-gray-300 p-2 h-[80px]">
            <div className="flex items-center gap-3">
              <div className="w-[60px] font-bold text-lg">Friends</div>

              {/* Notification Icon with Badge */}
              <div className="w-full relative">
                <div className="bg-black text-white h-[40px] w-[40px] rounded-md flex items-center">
                  <FontAwesomeIcon icon={faBell} className="bell-icon ml-3" />
                </div>
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {friendRequests.length}
                </span>
              </div>
            </div>

            <div className="w-[80px] flex justify-end">
              {/* Add Friend */}
              <div className="w-[25px] mr-4 cursor-pointer">
                <FontAwesomeIcon icon={faUserPlus} onClick={() => toggleModal(true)} className="add-friend-icon" />
              </div>

              {/* Log Out */}
              <div className="w-[25px] cursor-pointer">
                <FontAwesomeIcon icon={faRightFromBracket} onClick={handleLogOut} className="log-out-icon" />
              </div>
            </div>
          </nav>

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

          {/* Search Friend Section */}
          <div className="border-b border-gray-300 pl-3 py-4 pr-5">
            <Input id="searchFriend" onChange={handleInputSearchFriend} placeholder="Search friends" className="h-10" />
          </div>

          {/* Friend Online Section */}
          <div className="border-gray-300 p-2 pt-4">
            <h2 className="font-semibold text-gray-400 mb-2">Online — 2</h2>
            {onlineFriends.map((friend, i) =>
              <FriendCard
                key={i}
                selected={chatFriend && chatFriend.id === friend.id}
                user={friend}
                onSelect={handleShowFriendChat}
                online 
              />
            )}
          </div>

          {/* Friend Offline Section */}
          <div className="border-gray-300 p-2">
            <h2 className="font-semibold text-gray-400 mb-2">Offline — 2</h2>
            {offlineFriends.map((friend, i) => 
              <FriendCard 
                key={i}
                selected={chatFriend && chatFriend.id === friend.id} 
                user={friend} 
                onSelect={handleShowFriendChat} 
              />
            )}
          </div>
          
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex-1 w-full">
        {/* Chat Friend */}
        <div className="text-xl p-2 h-[80px] border-b border-gray-300 p-2">
          {chatFriend && 
            <FriendCard 
              user={chatFriend} 
              onSelect={() => {}} 
              online={onlineUserIds.includes(chatFriend.id.toString())}
              className="mt-1" 
            />
          }
        </div>

        {/* Chat Messages Box */}
        <div className="h-[calc(100vh-160px)] w-[calc(100vw-(.25rem*80))] bg-blue-50 p-4 overflow-y-auto">
          {chatFriend && chatMessages.map((message, i) => (
            <ChatMessageComponent key={i} message={message} chatFriend={chatFriend} />
          ))}
        </div>
        
        {/* Message Input */}
        <div className="sticky bottom-0 h-[80px] border-t border-gray-300 flex items-center p-2">
          <Textarea id="message" placeholder="Type a message..." className="h-15 text-xs resize-none" value={messageText} onChange={handleInputMessage} />
          <div className="h-15 pl-2 pr-15">
            <button
              onClick={handleSendMessage}
              className="bg-black text-sm text-white rounded-md h-9 px-4 py-2"
            >
              Send
            </button>
          </div>
        </div>
      </div>
 
    </AuthGuard>
  )
}

export default function HomePage() {
  return (
    <Provider store={store}>
      <HomePageComponent />
    </Provider>
  )
}