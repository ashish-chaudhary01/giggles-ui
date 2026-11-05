import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";

function ChatList({ inputSearch }) {
  const {
    chatUsers,
    getChatUsers,
    setSelectedUser,
    selectedUser,
    setIsProfileModalOpen,
  } = useChatStore();

  useEffect(() => {
    getChatUsers();
  }, [getChatUsers]);

  const filteredList =
    inputSearch.trim().length > 0
      ? chatUsers.filter((user) => {
          const inputQuery = inputSearch.trim().toLowerCase();
          const userEmail = user.email;
          const username = user.username;
          const fullName = user.fullName;

          return (
            fullName.includes(inputQuery) ||
            userEmail.includes(inputQuery) ||
            username.includes(inputQuery)
          );
        })
      : chatUsers;

  if (!filteredList)
    return (
      <p className="text-center mt-10 capitalize font-medium text-gray-500">
        No chat found
      </p>
    );

  return (
    <div className="overflow-y-auto overflow-x-hidden flex-1 mt-5 space-y-1">
      {filteredList.map((user, idx) => (
        <div
          key={idx}
          className={`p-3 sm:p-4 flex items-center gap-3 rounded-xl hover:bg-black/10 slide-down cursor-pointer transition-all duration-75 ${selectedUser === user && "bg-black/10"}`}
          onClick={() => {
            setSelectedUser(user);
            setIsProfileModalOpen(false);
          }}
        >
          <div className={`avatar avatar-online`}>
            <div className="size-10 shrink-0">
              <img
                src={user.profilePic || "/avtar.jpg"}
                alt="user-profile"
                className="size-full rounded-full object-cover"
              />
            </div>
          </div>
          <div className="truncate">
            <h2 className="font-semibold text-[1.1rem] capitalize">
              {user.fullName}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatList;
