import { User } from "@/libs/api/auth";
import React from "react";
import { ChatMessage } from "@/libs/api/chat";
import { getHumanReadableDate } from "@/libs/utils/dateFormat";

interface Props {
  message: ChatMessage
  chatFriend: User
}

const ChatMessageComponent: React.FC<Props> = ({ message, chatFriend }) => {
  const isSender = Number(message.senderId) !== Number(chatFriend.id)
  const { formattedDate } = getHumanReadableDate(message.createdAt)

  return (
    <div className={`w-fit h-fit max-w-[calc((100vw-(.25rem*80))/2)] items-center justify-center rounded-lg border border-gray-300 p-2 mb-2 ${isSender ? 'bg-black text-white ml-auto' : 'bg-white' }`}>
      <div className="whitespace-pre-line break-words">{message.content}</div>
      <div className="text-xs text-gray-400">{formattedDate}</div>
    </div>
  )
}

export default ChatMessageComponent;