import { User } from "@/libs/api/auth";
import React from "react";

interface Props {
  user: User
  onSelect: (user: User) => void
  className?: string
}

const FriendCard: React.FC<Props> = ({ user, className, onSelect }) => {
  return (
  <div className={`flex mb-1 py-1 cursor-pointer ${className}`} onClick={() => onSelect(user)}>
    {/* Profile Image */}
    <div className="w-[50px] h-11 flex-shrink-0">
      <img 
        src="https://fakeimg.pl/40x40?text=profile" 
        alt="Profile" 
        className="rounded-full w-[40px] h-[40px] m-auto" 
      />
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