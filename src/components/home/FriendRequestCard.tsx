import { User } from "@/types/user";
import React from "react";

interface Props {
  user: User
  onAccept: () => void
  onReject: () => void
}

const FriendRequestCard: React.FC<Props> = ({ user, onAccept, onReject }) => {
  return (
  <div className="flex mb-1">
    {/* Profile Image */}
    <div className="w-[40px] h-11 flex-shrink-0">
      <img 
        src="https://fakeimg.pl/40x40?text=profile" 
        alt="Profile" 
        className="rounded-full w-[32px] h-[32px] m-auto mt-1" 
      />
    </div>

    {/* User Info */}
    <div className="w-full truncate pl-1">
      <h2 className="font-bold">{user.firstName} {user.lastName}</h2>
      <p className="font-semibold text-xs text-gray-400">{user.email}</p>
    </div>

    {/* Action Buttons */}
    <div className="w-[50px] flex space-x-2 justify-end flex-shrink-0">
      <span className="text-green-500 text-2xl">✔</span>
      <span className="text-red-500 text-2xl">✘</span>
    </div>
  </div>
  )
}

export default FriendRequestCard;