import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useDebounce } from "use-debounce";
import { useAuthStore } from "../store/useAuthStore";

function SearchList({ inputSearch, setActiveTab, setInputSearch }) {
  const {
    searchUser,
    searchResult,
    setSelectedUser,
    selectedUser,
    setIsProfileModalOpen,
  } = useChatStore();

  const { onlineUsers } = useAuthStore();

  const [debounceQuery] = useDebounce(inputSearch, 300);

  useEffect(() => {
    if (debounceQuery.trim()) {
      searchUser(debounceQuery);
    }
  }, [debounceQuery, searchUser]);

  if (!inputSearch.trim()) {
    return (
      <p className="flex-1 text-center text-gray-500 text-md font-medium mt-5">
        Seach by username or email
      </p>
    );
  }

  return (
    <div className="sidebar-scrollbar-hidden min-h-0 overflow-y-auto overflow-x-hidden flex-1 mt-5 space-y-1 pb-20">
      {searchResult.map((user, idx) => (
        <div
          key={idx}
          className={`p-3 sm:p-4 flex items-center gap-3 rounded-xl hover:bg-black/10 slide-down cursor-pointer transition-all duration-75 ${selectedUser === user && "bg-black/10"}`}
          onClick={() => {
            setSelectedUser(user);
            setIsProfileModalOpen(false);
            setActiveTab("chatList");
            setInputSearch("");
          }}
        >
          <div
            className={`avatar ${onlineUsers.includes(user._id) && "avatar-online"}`}
          >
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
            <p className="text-sm font-medium text-gray-500">{user.username}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchList;
