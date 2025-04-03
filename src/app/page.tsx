import Image from "next/image";

export default function Home() {
  const friends = []

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
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-gray-800 text-white p-6">
        <h2 className="text-xl font-semibold">Sidebar Menu</h2>
        <ul className="mt-4">
          <li className="hover:bg-gray-700 p-2 rounded-md">Home</li>
          <li className="hover:bg-gray-700 p-2 rounded-md">About</li>
          <li className="hover:bg-gray-700 p-2 rounded-md">Contact</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">My App</h1>
          <div>
            <button className="bg-blue-500 p-2 rounded-md hover:bg-blue-400">
              Profile
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-6">
          <h2 className="text-3xl font-bold mb-4">Welcome to the Dashboard</h2>
          <p className="text-lg text-gray-700">
            This is a page with a top navbar and a left sidebar layout.
          </p>
        </div>
      </div>
    </div>
  );
}
