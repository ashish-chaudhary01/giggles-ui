import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import Header from "./Header";
import UserProfileModal from "./UserProfileModal";
import { useAuthStore } from "../store/useAuthStore";
import NoMessageHistory from "./NoMessageHistory";
import { SendHorizontal } from "lucide-react";

function ChatContainer() {
  const [inputText, setInputText] = useState("");
  const {
    selectedUser,
    messages,
    isProfileModalOpen,
    setIsProfileModalOpen,
    getMessagesByUserId,
  } = useChatStore();

  const { authUser } = useAuthStore();

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
  }, [selectedUser, getMessagesByUserId]);

  return (
    <div className="relative flex flex-col">
      <Header
        user={selectedUser}
        setIsProfileModalOpen={setIsProfileModalOpen}
      />

      {/* messages container */}
      <div className="p-4 overflow-y-auto flex-1">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`chat ${authUser._id === msg.senderId ? "chat-end" : "chat-start"}`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src={
                      (authUser._id === msg.senderId
                        ? authUser.profilePic
                        : selectedUser.profilePic) || "/avtar.jpg"
                    }
                  />
                </div>
              </div>
              <div className="chat-header">
                <time className="text-xs opacity-50">
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
            </div>
          ))
        ) : (
          <NoMessageHistory />
        )}
      </div>

      {/* send message input container */}
      <div className="flex items-center p-3 gap-1">
        <input
          type="text"
          placeholder="Type a message"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 px-6 py-2.5 outline-none border-2 border-black/15 bg-gray-100 rounded-full focus:border-blue-400"
        />

        <button
          className={`${inputText.length > 0 ? "flex" : "hidden"} items-center justify-center p-2.5 rounded-full bg-blue-500 text-white transition-all duration-200`}
        >
          <SendHorizontal className="transform" />
        </button>
      </div>

      {/* user profile modal view */}
      {isProfileModalOpen && (
        <UserProfileModal
          selectedUser={selectedUser}
          setIsProfileModalOpen={setIsProfileModalOpen}
        />
      )}
    </div>
  );
}

export default ChatContainer;
