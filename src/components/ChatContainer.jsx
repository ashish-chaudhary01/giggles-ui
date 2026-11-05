import { useChatStore } from "../store/useChatStore";
import Header from "./Header";
import UserProfileModal from "./UserProfileModal";

function ChatContainer() {
  const { selectedUser, isProfileModalOpen, setIsProfileModalOpen } =
    useChatStore();

  return (
    <div className="relative">
      <Header
        user={selectedUser}
        setIsProfileModalOpen={setIsProfileModalOpen}
      />

      {/* user profile modal view */}
      {isProfileModalOpen && (
        <UserProfileModal
          selectedUser={selectedUser}
          setIsProfileModalOpen={setIsProfileModalOpen}
        />
      )}
    </div>
  );
}

export default ChatContainer;
