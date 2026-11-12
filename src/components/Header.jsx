import { ArrowLeft, EllipsisVertical, Trash } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

function Header({ user, setIsProfileModalOpen }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  // formatting the users last seen date and time
  function formatLastSeen(date) {
    const lastSeen = new Date(date);
    const now = new Date();
    const diffMs = now - lastSeen; // difference in mili-seconds (1s = 1000ms)
    const diffMin = Math.floor(diffMs / (60 * 1000)); // converting the ms into minutes
    if (diffMin < 1) return "just now";
    if (diffMin < 60) return `${diffMin} min ago`;
    if (diffMin < 1440) return `${diffMin} hour ago`; // there is 1440 minutes in 24 hours
    return lastSeen.toLocaleDateString();
  }

  const handleMessagesDelete = (e) => {
    e.preventDefault();
    try {
      axiosInstance.delete(`/message/${selectedUser._id}`);
      toast.success("Messages deleted");
    } catch (error) {
      console.log(error.message);
      toast.error(
        error.response.data.error ||
          error.response.data.message ||
          "failed to delete messages",
      );
    }
    setSelectedUser(null);
  };

  return (
    <div className="relative flex shrink-0 items-center justify-between bg-linear-to-b from-pink-300/10 via-blue-200/10 to-blue-100/10 px-3 py-5 shadow sm:p-5">
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
              {isOnline ? "Online" : formatLastSeen(user.lastSeenAt)}
            </p>
          </div>
        </div>
      </div>
      {/* right */}
      <div
        onClick={() => setIsModalOpen(!isModalOpen)}
        className="hover:bg-black/10 duration-200 p-2 rounded-full"
      >
        <EllipsisVertical />
      </div>

      {/* more chat settings modal */}
      {isModalOpen && (
        <>
          {/* options container */}
          <div className="absolute select-none rounded-lg boder border-black/20 shadow bg-slate-100 right-5 top-15 z-100 fade-in divide-y">
            <button
              className="btn select-none"
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              <div className="flex items-center gap-1.5 text-sm font-medium text-red-500 py-2.5 px-4 rounded-lg">
                <Trash size={20} />
                <span className="">Delete all messages</span>
              </div>
            </button>
          </div>
          {/* confirmation box */}
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <form onSubmit={handleMessagesDelete} method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button
                  type="button"
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  onClick={() => document.getElementById("my_modal_3").close()}
                >
                  ✕
                </button>
                <h3 className="font-bold text-lg text-red-500">
                  Delete All Messages?
                </h3>
                <p className="py-3">
                  It will delete all the messages between you and{" "}
                  <span className="font-bold">{selectedUser.fullName}, </span>
                  this is not reversible
                </p>
                {/* confirm button */}
                <div className="text-end">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 duration-150">
                    Confirm & Delete
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        </>
      )}
    </div>
  );
}

export default Header;
