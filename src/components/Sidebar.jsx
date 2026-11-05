import { ArrowLeft, LogOut, Plus, Search } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import ChatList from "./ChatList";
import SearchList from "./SearchList";
import { useState } from "react";

function Sidebar() {
  const [inputSearch, setInputSearch] = useState("");
  const [activeTab, setActiveTab] = useState("chatList");
  const { authUser, logout } = useAuthStore();

  return (
    <aside className="relative p-2 sm:p-4 flex flex-col h-screen overflow-hidden">
      {/* logo and profile */}
      <div className="flex items-center gap-2 p-2 sm:p-0 justify-between">
        <h2 className="text-2xl font-bold text-[#394E6A]">Giggles</h2>
        <div className="flex items-center gap-2 sm:gap-2">
          <div
            onClick={logout}
            className="rounded-full hover:bg-black/10 p-2 duration-200 text-gray-700 hover:text-gray-900 cursor-pointer"
          >
            <LogOut size={23} />
          </div>
          <Link to={"/profile"}>
            <img
              src={authUser?.profilePic || "/avtar.jpg"}
              alt="profile"
              className="size-10 object-cover rounded-full cursor-pointer"
            />
          </Link>
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

      {/* chat list and search list */}
      {activeTab === "chatList" ? (
        <ChatList inputSearch={inputSearch} />
      ) : (
        <SearchList inputSearch={inputSearch} />
      )}

      {/* search list toggle */}
      {activeTab === "chatList" ? (
        <div
          onClick={() => setActiveTab("searchList")}
          className="absolute bottom-5 right-5 text-white/70 cursor-pointer hover:text-white duration-200"
        >
          <Plus className="bg-[#36C571] rounded-full size-12 p-2" />
        </div>
      ) : (
        <div
          onClick={() => setActiveTab("chatList")}
          className="absolute bottom-5 right-5 text-white/70 cursor-pointer hover:text-white duration-200"
        >
          <ArrowLeft className="bg-[#36C571] rounded-full size-12 p-2" />
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
