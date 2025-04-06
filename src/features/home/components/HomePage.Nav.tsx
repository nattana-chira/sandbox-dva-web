"use client"

import { faBell } from '@fortawesome/free-regular-svg-icons'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FriendRequest } from "@/libs/api/friend";

interface Props {
  friendRequests: FriendRequest[]
  toggleModal: Function
  handleLogOut: React.MouseEventHandler<SVGSVGElement>
}

const HomePageNav: React.FC<Props> = ({ friendRequests, toggleModal, handleLogOut }) => {
  return (
    <>
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
    </>
  )
}

export default HomePageNav