import { MessageCircle } from "lucide-react";

function NoChatSelectedPlaceholder() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="overflow-hidden flex items-center flex-col max-w-md w-full">
        <div className="flex items-center p-4 bg-blue-100 text-blue-500 rounded-full mb-2">
          <MessageCircle size={40} />
        </div>
        <h2 className="text-xl font-bold text-gray-700">
          Select a conversation
        </h2>
        <p className="leading-relaxed text-gray-400 text-lg">
          search a user and start chatting
        </p>
      </div>
    </div>
  );
}

export default NoChatSelectedPlaceholder;
