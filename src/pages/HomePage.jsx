import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelectedPlaceholder from "../components/NoChatSelectedPlaceholder";
import ChatContainer from "../components/ChatContainer";

function HomePage() {
  const { selectedUser } = useChatStore();
  return (
    <div className="h-dvh overflow-hidden bg-linear-to-b from-pink-100/20 via-blue-300/15 to-blue-500/10">
      <div className="grid h-full min-h-0 grid-rows-[minmax(0,1fr)] divide-x divide-black/15 sm:grid-cols-[250px_1fr] md:grid-cols-[320px_1fr] lg:grid-cols-[360px_1fr]">
        {/* desktop sidebar */}
        <div className="hidden min-h-0 overflow-hidden sm:block">
          <Sidebar />
        </div>

        {/* mobile view - show sidebar when no user selected - otherwise show chats*/}
        {!selectedUser ? (
          <>
            <div className="min-h-0 overflow-hidden sm:hidden">
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
