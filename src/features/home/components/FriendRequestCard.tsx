"use client"

import { FriendRequest } from "@/libs/api/friend";
import React, { useState } from "react";

interface Props {
  friendRequest: FriendRequest
  onAccept: (id: string, toggleLoading: (toggle: boolean) => void) => void
  onReject: (id: string, toggleLoading: (toggle: boolean) => void) => void
}

const FriendRequestCard: React.FC<Props> = ({ friendRequest, onAccept, onReject }) => {
  const [loading, toggleLoading] = useState<boolean>(false)
  const { sender } = friendRequest

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
      <h2 className="font-bold">{sender.firstName} {sender.lastName}</h2>
      <p className="font-semibold text-xs text-gray-400">{sender.email}</p>
    </div>

    {/* Action Buttons */}
    <div className="w-[50px] flex space-x-2 justify-end flex-shrink-0">
      <span
        onClick={() => !loading && onAccept(friendRequest.id, toggleLoading)}
        className={`text-2xl ${loading ? 'text-grey-500' : 'text-green-500'}`}>
        ✔
      </span>
      <span
        onClick={() => !loading && onReject(friendRequest.id, toggleLoading)}
        className={`text-2xl ${loading ? 'text-grey-500' : 'text-red-500'}`}>
        ✘
      </span>
    </div>
  </div>
  )
}

export default FriendRequestCard;