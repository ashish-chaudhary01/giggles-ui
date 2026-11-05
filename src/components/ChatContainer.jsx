import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import Header from "./Header";
import UserProfileModal from "./UserProfileModal";
import { useAuthStore } from "../store/useAuthStore";
import NoMessageHistory from "./NoMessageHistory";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./MessageSkeleton";

function ChatContainer() {
  const {
    selectedUser,
    messages,
    isMessagesLoading,
    isProfileModalOpen,
    setIsProfileModalOpen,
    getMessagesByUserId,
  } = useChatStore();

  const messageEndRef = useRef(null);

  const { authUser } = useAuthStore();

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
  }, [selectedUser, getMessagesByUserId]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [messages]);

  return (
    <div className="h-screen relative flex flex-col">
      <Header
        user={selectedUser}
        setIsProfileModalOpen={setIsProfileModalOpen}
      />

      {/* messages container */}
      <div className="p-4 sm:px-10 overflow-y-auto flex-1">
        {isMessagesLoading ? (
          <MessageSkeleton />
        ) : messages.length > 0 ? (
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`chat ${authUser._id === msg.senderId ? "chat-end" : "chat-start"}`}
            >
              <div className="chat-image avatar">
                {authUser._id === msg.receiverId && (
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src={selectedUser.profilePic || "avtar.jpg"}
                    />
                  </div>
                )}
              </div>
              <div className="chat-header">
                <time className="text-xs opacity-50">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </time>
              </div>
              <div
                className={`chat-bubble ${msg.senderId === authUser._id && "chat-bubble-info"}`}
              >
                {msg.image && (
                  <img
                    src={msg.image}
                    alt="shared"
                    className="rounded-lg h-48 object-cover mb-2"
                  />
                )}
                {msg.text && msg.text}
              </div>
            </div>
          ))
        ) : (
          <NoMessageHistory />
        )}

        <div ref={messageEndRef} />
      </div>

      {/* send message input */}
      <MessageInput />

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
