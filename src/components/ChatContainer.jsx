import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import Header from "./Header";
import UserProfileModal from "./UserProfileModal";
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

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
  }, [selectedUser, getMessagesByUserId]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [messages]);

  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden">
      <Header
        user={selectedUser}
        setIsProfileModalOpen={setIsProfileModalOpen}
      />

      {/* messages container */}
      <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:px-10">
        {isMessagesLoading ? (
          <MessageSkeleton />
        ) : messages.length > 0 ? (
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`chat ${selectedUser._id === msg.senderId ? "chat-start" : "chat-end"}`}
            >
              <div className="chat-image avatar">
                {selectedUser._id === msg.senderId && (
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
                className={`chat-bubble ${msg.senderId !== selectedUser._id && "chat-bubble-info"}`}
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
      <div className="shrink-0">
        <MessageInput />
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
