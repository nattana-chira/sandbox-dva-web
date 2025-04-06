import { User } from "@/libs/api/auth"
import FriendCard from "./FriendCard"
import { ChatMessage } from "@/libs/api/chat"
import ChatMessageComponent from "./ChatMessage"
import Textarea from "@/features/_shared/components/form/Textarea"

interface Props {
  chatFriend: User | null
  onlineUserIds: string[]
  chatMessages: ChatMessage[]
  messageText: string
  handleSendMessage: () => void
  handleInputMessage: React.ChangeEventHandler<HTMLTextAreaElement>
}

const HomePageChat: React.FC<Props> = (
  { chatFriend, onlineUserIds, chatMessages, messageText, handleSendMessage, handleInputMessage }
) => {
  return (
 
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
      <Textarea 
        id="message" 
        placeholder="Type a message..." 
        className="h-15 text-xs resize-none" 
        value={messageText} 
        onChange={handleInputMessage} 
      />
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
  )
}

export default HomePageChat