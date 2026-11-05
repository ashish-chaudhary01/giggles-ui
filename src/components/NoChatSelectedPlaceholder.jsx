import { MessageCircle } from "lucide-react";

function NoChatSelectedPlaceholder() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="overflow-hidden flex items-center flex-col max-w-md w-full">
        <div className="flex items-center p-10 bg-linear-to-r from-blue-600 to-purple-600/60 text-white rounded-full mb-6">
          <MessageCircle size={60} />
        </div>
        <h1 className="leading-relaxed text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-blue-600">
          Welcome To Giggles
        </h1>
        <p className="text-gray-500 text-[1.2rem]">
          search a user and start chatting
        </p>
      </div>
    </div>
  );
}

export default NoChatSelectedPlaceholder;
