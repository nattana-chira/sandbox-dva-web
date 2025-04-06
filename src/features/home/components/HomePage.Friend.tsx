import { User } from "@/libs/api/auth"
import FriendCard from "./FriendCard"
import Input from "@/features/_shared/components/form/Input"
import { useMemo, useState } from "react"

interface Props {
  chatFriend: User | null
  friends: User[]
  onlineUserIds: string[]
  handleShowFriendChat: (user: User) => void
}

const HomePageFriend: React.FC<Props> = (
  { chatFriend, friends, onlineUserIds, handleShowFriendChat }
) => {
  const [searchText, setSearchText ]= useState<string>('')

  const handleInputSearchFriend = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  const searchedFriends = useMemo(() => {
    if (searchText)
      return friends.filter(friend => 
        (friend.firstName + friend.lastName + friend.email).includes(searchText)) 

    return friends
  }, [friends, searchText])

  const onlineFriends = useMemo(() => searchedFriends.filter(friend => onlineUserIds.includes(friend.id.toString())), [searchedFriends, onlineUserIds])
  const offlineFriends = useMemo(() => searchedFriends.filter(friend => !onlineUserIds.includes(friend.id.toString())), [searchedFriends, onlineUserIds])

  return (
    <>
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
    </>
  )
}

export default HomePageFriend