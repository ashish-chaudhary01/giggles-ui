import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 left-0 right-0 p-3 sm:p-4 bg-bas-100 backdrop-blur-xl border-b border-black/10 shadow flex justify-between items-center gap-2 sm:gap-10 z-1000">
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
        <a href="/login" className="btn btn-ghost text-[1rem] rounded-lg px-2 sm:px-4 py-6">
          Sign In
        </a>
        <a
          href="/signup"
          className="btn btn-active text-[1rem] btn-primary bg-blue-500 outline-none border-none rounded-lg px-3 sm:px-6 py-6"
        >
          Get Started
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
