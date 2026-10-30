import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";

function HomePage() {
  const { getChatUsers } = useChatStore();

  useEffect(() => {
    getChatUsers();
  }, []);
  return (
    <div className="bg-linear-to-b from-base-200 to-base-300">
      <div className="min-h-screen grid sm:grid-cols-[360px_1fr]">
        <div className="hidden sm:block">
          <Sidebar />
        </div>
        <div className="bg-red-500">hello</div>
      </div>
    </div>
  );
}

export default HomePage;
