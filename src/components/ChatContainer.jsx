import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import Header from "./Header";
import UserProfileModal from "./UserProfileModal";
import NoMessageHistory from "./NoMessageHistory";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { Check, CheckCheck } from "lucide-react";

function ChatContainer() {
  const {
    selectedUser,
    messages,
    isMessagesLoading,
    isProfileModalOpen,
    setIsProfileModalOpen,
    getMessagesByUserId,
    subscribeToMessages,
  } = useChatStore();
  const socket = useAuthStore((state) => state.socket);

  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
    return subscribeToMessages();
  }, [selectedUser, socket, getMessagesByUserId, subscribeToMessages]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [messages]);

  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden bg-white">
      <Header
        user={selectedUser}
        setIsProfileModalOpen={setIsProfileModalOpen}
      />

      {/* messages container */}
      <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden p-4 sm:px-10">
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
              <div className="chat-header"></div>
              <div
                className={`chat-bubble text-wrap max-w-[90%] sm:max-w-[75%] lg:max-w-[60%] min-w-0 ${msg.senderId !== selectedUser._id && "chat-bubble-info"}`}
              >
                {msg.image && (
                  <img
                    src={msg.image}
                    alt="shared"
                    className="rounded-lg h-48 object-cover mb-2"
                  />
                )}
                {msg.text && <span className="wrap-anywhere">{msg.text}</span>}
              </div>
              {msg.senderId !== selectedUser._id && (
                <div className="flex gap-1 justify-end items-center mt-1">
                  <time className="text-xs opacity-50">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </time>
                  <div className="">
                    {msg.status === "sent" ? (
                      <Check size={15} />
                    ) : msg.status === "delivered" ? (
                      <CheckCheck size={15} />
                    ) : (
                      <CheckCheck size={15} className="text-blue-500" />
                    )}
                  </div>
                </div>
              )}
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
