import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

function Navbar() {
  const { authUser } = useAuthStore();
  return (
    <nav className="hidden fixed top-0 left-0 right-0 p-3 bg-bas-100 backdrop-blur-xl border-b border-black/10 shadow md:flex justify-between items-center gap-2 sm:gap-10 z-1000">
      {/* left */}
      <div className="ml-0 sm:ml-4">
        <Link to="/" className="flex items-center gap-2">
          <span>
            <MessageCircle className="text-blue-500" />
          </span>
          <span className="text-xl font-bold text-[#394E6A]">Giggles</span>
        </Link>
      </div>
      {/* right */}
      <div className="flex items-center gap-1 sm:gap-2">
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
    </nav>
  );
}

export default Navbar;
