import { useChatStore } from "../store/useChatStore";
import Header from "./Header";

function ChatContainer() {
  const { selectedUser } = useChatStore();
  return (
    <div>
      <Header user={selectedUser} />
    </div>
  );
}

export default ChatContainer;
