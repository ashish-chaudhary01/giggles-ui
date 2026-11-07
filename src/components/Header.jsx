import { ArrowLeft } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

function Header({ user, setIsProfileModalOpen }) {
  const { setSelectedUser, selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        setSelectedUser(null);
      }
    };
    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  return (
    <div className="flex shrink-0 items-center justify-between bg-linear-to-b from-pink-300/10 via-blue-200/10 to-blue-100/10 px-3 py-5 shadow sm:p-5">
      {/* left */}
      <div className="flex items-center gap-2">
        {/* back */}
        <div
          onClick={() => setSelectedUser(null)}
          className="p-2 rounded-full hover:bg-black/10 duration-200 cursor-pointer"
        >
          <ArrowLeft size={20} />
        </div>

        <div
          onClick={() => {
            setIsProfileModalOpen(true);
          }}
          className="cursor-pointer flex items-center gap-2"
        >
          <div className="size-10 overflow-hidden rounded-full">
            <img
              src={user.profilePic || "/avtar.jpg"}
              alt="userPic"
              className="size-full object-cover rounded-full"
            />
          </div>
          <div>
            <h2 className="text-md font-bold capitalize leading-4.5">
              {user.fullName}
            </h2>
            <p
              className={`leading-relaxed tracking-wide text-sm text-gray-500 ${isOnline && "text-green-500"}`}
            >
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>
      </div>
      {/* right */}
    </div>
  );
}

export default Header;
