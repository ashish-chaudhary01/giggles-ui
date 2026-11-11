import { Image, SendHorizontal, XIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";

function MessageInput() {
  const [inputText, setInputText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const { sendMessage, selectedUser } = useChatStore();
  const fileInputRef = useRef(null);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (isSending || (!inputText.trim() && !imagePreview) || !selectedUser?._id)
      return;

    setIsSending(true);
    try {
      // doing this to clear input fast
      const text = inputText.trim();
      const image = imagePreview;
      setInputText("");
      setImagePreview(null);
      const sent = await sendMessage(selectedUser._id, {
        text: text,
        image: image,
      });
      if (sent) {
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    } finally {
      setIsSending(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select only image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <>
      {imagePreview && (
        <div className="flex items-center justify-start pl-5 border-t pt-5 border-black/10">
          <div className="relative size-25 rounded-lg">
            <img
              src={imagePreview}
              alt="preview-image"
              className="size-full rounded-lg object-cover"
            />
            <span
              onClick={removeImage}
              className="absolute top-0 right-0 translate-x-[50%] translate-y-[-50%] p-0.5 bg-red-500 text-white rounded-full"
            >
              <XIcon size={18} />
            </span>
          </div>
        </div>
      )}
      <form
        onSubmit={handleSendMessage}
        className="flex items-center p-3 gap-1"
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
        />
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`p-2 sm:p-3 cursor-pointer rounded-full bg-blue-100 text-blue-500 duration-100 ${imagePreview ? "bg-blue-500 text-white" : "hover:bg-blue-200"}`}
        >
          <Image />
        </div>
        <input
          type="text"
          placeholder="Type a message"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full px-6 p-2 sm:py-3 outline-none border-2 border-black/15 bg-gray-100 rounded-full focus:border-blue-400"
        />

        <button
          type="submit"
          disabled={isSending}
          className={`${inputText.length > 0 || imagePreview ? "flex" : "hidden"} items-center justify-center p-2 sm:p-3 rounded-full bg-blue-500 text-white cursor-pointer transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60`}
        >
          <SendHorizontal className="transform" />
        </button>
      </form>
    </>
  );
}

export default MessageInput;
