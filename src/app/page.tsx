import Input from "@/components/form/Input";
import FriendCard from "@/components/home/FriendCard";
import FriendRequestCard from "@/components/home/FriendRequestCard";
import { faBell, faUser } from '@fortawesome/free-regular-svg-icons'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { faPlus, faRightFromBracket, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import Textarea from "@/components/form/Textarea";

export default function Home() {
  const friends = []
  const user = {
    id: "1",
    email: "jonedoe@gmail.com",
    firstName: "John",
    lastName: "Doe",
    profileImage: "linktomage"
  }

  const handleToggleAddFriend = () => {

  }

  const handleInputAddFriend = () => {

  }

  const handleAddFriend = () => {

  }

  const handleAcceptFriendRequest = () => {

  }

  const handleRejectFriendRequest = () => {

  }

  const handleLogOut = () => {
    
  }

  const handleInputSearchFriend = () => {
    
  }

  const handleShowFriendChat = () => {

  }

  const handleInputMessage = () => {

  }

  const handleSendMessage = () => {
    
  }

  return (
    <div className="flex ">
      {/* Sidebar */}
      <div className="w-80 h-screen border-r border-gray-300">
        <div className="">

          {/* Navigation Bar */}
          <nav className="flex items-center justify-between border-b border-gray-300 p-2 h-[80px]">
            <div className="flex items-center gap-3">
              <div className="w-[60px] font-bold text-lg">Friends</div>

              {/* Notification Icon with Badge */}
              <div className="w-full relative">
                <div className="bg-black text-white h-[40px] w-[40px] rounded-md flex items-center">
                  <FontAwesomeIcon icon={faBell} className="bell-icon" />
                </div>
                {/* Notification Count Badge */}
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  2
                </span>
              </div>
            </div>

            {/* Right Side: Icons */}
            <div className="w-[50px] flex items-center">
              <div className="w-[25px] mr-1">
                <FontAwesomeIcon icon={faUserPlus} className="add-friend-icon" />
              </div>

              <div className="w-[25px]">
                <FontAwesomeIcon icon={faRightFromBracket} className="log-out-icon" />
              </div>
            </div>
          </nav>

          {/* Friend Request Section */}
          <div className="border-b border-gray-300 p-2 py-4">
            <h2 className="font-semibold text-gray-400 mb-2">Friend Requests</h2>

            <FriendRequestCard user={user} onAccept={() => {}} onReject={() => {}}/>
            <FriendRequestCard user={user} onAccept={() => {}} onReject={() => {}}/>
            <FriendRequestCard user={user} onAccept={() => {}} onReject={() => {}}/>
          </div>

          {/* Search Input Section */}
          <div className="border-b border-gray-300 pl-3 py-4 pr-5">
            <Input id="searchFriend" placeholder="Search friends" className="h-10" />
          </div>

          {/* Friend Online Section */}
          <div className="border-gray-300 p-2 pt-4">
            <h2 className="font-semibold text-gray-400 mb-2">Online — 2</h2>
            <FriendCard user={user} onSelect={() => {}}/>
            <FriendCard user={user} onSelect={() => {}}/>
          </div>

          {/* Friend Offline Section */}
          <div className="border-gray-300 p-2">
            <h2 className="font-semibold text-gray-400 mb-2">Offline — 2</h2>
            <FriendCard user={user} onSelect={() => {}}/>
            <FriendCard user={user} onSelect={() => {}}/>
          </div>
          
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex-1 w-full">
        {/* Chat Friend */}
        <div className="text-xl p-2 h-[80px] border-b border-gray-300 p-2">
          <FriendCard user={user} onSelect={() => {}} className="mt-1" />
        </div>

        {/* Chat Messages */}
        <div className="h-[calc(100vh-160px)] bg-blue-50 p-4">
            <div className="w-fit h-fit bg-white items-center justify-center rounded-lg border border-gray-300 p-2 mb-2">
              <div>chat 1</div>
              <div className="text-xs text-gray-400">10:30 AM</div>
            </div>

            <div className="w-fit h-fit bg-black text-white items-center justify-center rounded-lg border border-gray-300 p-2 mb-2 ml-auto">
              <div>chat 2222222222222</div>
              <div className="text-xs text-gray-400">10:34 AM</div>
            </div>
        </div>

        {/* Message Input */}
        <div className="sticky bottom-0 h-[80px] border-t border-gray-300 flex items-center p-2">
          <Textarea id="message" placeholder="Type a message..." className="h-15 text-xs resize-none" />
          <div className="h-15 pl-2 pr-15">
            <button
              // onClick={() => {}}
              className="bg-black text-sm text-white rounded-md h-9 px-4 py-2"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
