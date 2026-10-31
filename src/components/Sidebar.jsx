import { LogOut, Search } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";

function Sidebar() {
  const [inputSearch, setInputSearch] = useState("");
  const { authUser, logout } = useAuthStore();
  const { chatUsers, getChatUsers } = useChatStore();

  useEffect(() => {
    getChatUsers();
  }, []);
  return (
    <aside className="p-4 flex flex-col max-h-screen overflow-hidden">
      {/* logo and profile */}
      <div className="flex items-center gap-2 justify-between">
        <h2 className="text-xl font-bold text-[#394E6A]">Giggles</h2>
        <div className="flex items-center gap-2 sm:gap-2">
          <div
            onClick={logout}
            className="rounded-full hover:bg-black/10 p-2 duration-200 text-gray-700 hover:text-gray-900 cursor-pointer"
          >
            <LogOut size={23} />
          </div>
          <div>
            <img
              src={authUser?.profilePic || "/avtar.jpg"}
              alt="profile"
              className="size-10 object-cover rounded-full cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* search bar */}
      <div className="flex items-center w-full border-2 border-black/30 rounded-full mt-4 bg-white/70 focus-within:border-black duration-150 focus-within:bg-black/2">
        <span className="ml-4 text-gray-700">
          <Search size={20} />
        </span>
        <input
          type="text"
          placeholder="Search"
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
          className="px-4 py-1.5 flex-1 outline-none border-none"
        />
      </div>

      {/* chat users */}
      <div className="overflow-auto flex-1 mt-5">
        {chatUsers.length === 0 ? <p>No chat user</p> : <p>chatting</p>}
      </div>
    </aside>
  );
}

export default Sidebar;
