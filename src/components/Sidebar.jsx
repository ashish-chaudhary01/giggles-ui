import { EllipsisVertical } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

function Sidebar() {
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

      {/* chat users */}
    </aside>
  );
}

export default Sidebar;
