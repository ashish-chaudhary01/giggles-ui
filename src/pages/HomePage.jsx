import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelectedPlaceholder from "../components/NoChatSelectedPlaceholder";
import ChatContainer from "../components/ChatContainer";

function HomePage() {
  const { getChatUsers, selectedUser } = useChatStore();

  useEffect(() => {
    getChatUsers();
  }, []);
  return (
    <div className="bg-linear-to-b from-base-200 to-base-300 overflow-hidden">
      <div className="min-h-screen grid divide-x divide-black/15 sm:grid-cols-[360px_1fr]">
        {/* desktop sidebar */}
        <div className="hidden sm:block">
          <Sidebar />
        </div>

        {/* mobile view - show sidebar when no user selected - otherwise show chats*/}
        {!selectedUser ? (
          <>
            <div className="sm:hidden">
              <Sidebar />
            </div>
            <div className="hidden sm:block">
              <NoChatSelectedPlaceholder />
            </div>
          </>
        ) : (
          <ChatContainer />
        )}
      </div>
    </div>
  );
}

export default HomePage;
