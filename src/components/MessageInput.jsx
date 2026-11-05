import { SendHorizontal } from "lucide-react";
import { useState } from "react";

function MessageInput() {
  const [inputText, setInputText] = useState("");
  return (
    <div className="flex items-center p-3 gap-1">
      <input
        type="text"
        placeholder="Type a message"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="flex-1 px-6 py-2.5 outline-none border-2 border-black/15 bg-gray-100 rounded-full focus:border-blue-400"
      />

      <button
        className={`${inputText.length > 0 ? "flex" : "hidden"} items-center justify-center p-2.5 rounded-full bg-blue-500 text-white transition-all duration-200`}
      >
        <SendHorizontal className="transform" />
      </button>
    </div>
  );
}

export default MessageInput;
