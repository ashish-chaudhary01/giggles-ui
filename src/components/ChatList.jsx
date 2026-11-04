import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";

function ChatList({ inputSearch }) {
  const { chatUsers, getChatUsers } = useChatStore();

  useEffect(() => {
    getChatUsers();
  }, []);

  return (
    <div className="overflow-auto flex-1 mt-5">
      {chatUsers.length === 0 ? <p>No chat user</p> : <p>chatting</p>}
    </div>
  );
}

export default ChatList;
