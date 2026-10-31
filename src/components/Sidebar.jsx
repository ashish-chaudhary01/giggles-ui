import { EllipsisVertical, Search } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";

function Sidebar() {
  const [inputSearch, setInputSearch] = useState("");
  const { authUser } = useAuthStore();
  return (
    <aside className="p-4 min-h-screen overflow-hidden">
      {/* logo and profile */}
      <div className="flex items-center gap-2 justify-between">
        <h2 className="text-xl font-bold text-[#394E6A]">Giggles</h2>
        <div className="flex items-center gap-2 sm:gap-2">
          <div className="rounded-full hover:bg-black/10 p-2 duration-200">
            <EllipsisVertical />
          </div>
          <div>
            {authUser?.profilePic ? (
              <img
                src={authUser?.profilePic}
                alt="profile"
                className="size-10 object-cover rounded-full"
              />
            ) : (
              <div className="size-10 flex items-center justify-center text-md rounded-full bg-black text-white">
                {authUser.fullName.charAt(0)}
              </div>
            )}
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
    </aside>
  );
}

export default Sidebar;
