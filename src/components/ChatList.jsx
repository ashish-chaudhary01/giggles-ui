import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

function ChatList({ inputSearch }) {
  const {
    chatUsers,
    getChatUsers,
    setSelectedUser,
    selectedUser,
    setIsProfileModalOpen,
  } = useChatStore();

  const { authUser } = useAuthStore();

  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getChatUsers();
  }, [getChatUsers]);

  const filteredList =
    inputSearch.trim().length > 0
      ? chatUsers.filter((chat) => {
          const inputQuery = inputSearch.trim().toLowerCase();
          const userEmail = chat.user.email;
          const username = chat.user.username;
          const fullName = chat.user.fullName;

          return (
            fullName.includes(inputQuery) ||
            userEmail.includes(inputQuery) ||
            username.includes(inputQuery)
          );
        })
      : chatUsers;

  return (
    <div className="sidebar-scrollbar-hidden min-h-0 flex-1 overflow-y-auto overflow-x-hidden mt-5 space-y-1 pb-20">
      {filteredList.length === 0 ? (
        <p className="text-center mt-10 capitalize font-medium text-gray-500">
          No chat found
        </p>
      ) : (
        filteredList.map((chat, idx) => (
          <div
            key={chat.user?._id || idx}
            className={`p-3 sm:p-4 flex gap-3 rounded-xl hover:bg-black/10 cursor-pointer transition-all duration-75 ${selectedUser === chat && "bg-black/10"}`}
            onClick={() => {
              setSelectedUser(chat.user);
              setIsProfileModalOpen(false);
            }}
          >
            <div
              className={`avatar ${onlineUsers.includes(String(chat.user?._id)) ? "avatar-online" : ""}`}
            >
              <div className="size-10 shrink-0">
                <img
                  src={chat.user?.profilePic || "/avtar.jpg"}
                  alt="user-profile"
                  className="size-full rounded-full object-cover"
                />
              </div>
            </div>
            <div className="truncate">
              <h2 className="font-semibold text-[1.1rem] capitalize leading-4.5">
                {chat.user?.fullName}
              </h2>
              <p className="text-gray-600 text-md">
                {chat.lastMessage.senderId === authUser._id && (
                  <span className="font-medium text-gray-600">You: </span>
                )}
                {chat.lastMessage?.text && chat.lastMessage.text}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ChatList;
