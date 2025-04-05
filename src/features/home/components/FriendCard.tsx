import { User } from "@/libs/api/auth";
import { config } from "@/libs/config";
import React from "react";

interface Props {
  user: User
  onSelect: (user: User) => void
  className?: string
  online?: boolean
  selected?: boolean | null
}

const FriendCard: React.FC<Props> = ({ user, className, onSelect, online = false, selected = false }) => {
  const profilePic = user.profilePic ? config.API_URL + user.profilePic : 'https://fakeimg.pl/40x40?text=profile'

  return (
  <div className={`flex mb-1 py-2 cursor-pointer rounded ${selected ? 'bg-gray-200' : ''} ${className}`} onClick={() => onSelect(user)}>
    {/* Profile Image */}
    <div className="w-[50px] h-11 flex-shrink-0">
      <img 
        src={profilePic}
        alt="Profile" 
        className="rounded-full w-[40px] h-[40px] m-auto" 
      />
      {online && (
        <div className={`absolute w-3 h-3 ml-9 -mt-3 border-2 border-white rounded-full bg-green-500`}></div>
      )}
    </div>

    {/* User Info */}
    <div className="w-full truncate pl-1">
      <h2 className="font-bold">{user.firstName} {user.lastName}</h2>
      <p className="font-semibold text-xs text-gray-400">{user.email}</p>
    </div>
  </div>
  )
}

export default FriendCard;