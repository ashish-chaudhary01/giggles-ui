import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
  chatUsers: [], // sidebar users
  selectedUser: null, // stores selected user
  messages: [], // messages between user and selectedUser
  isUsersLoading: false,
  isMessagesLoading: false,
  isProfileModalOpen: false,

  setSelectedUser: (selectedUser) => set({ selectedUser }),
  setIsProfileModalOpen: (value) => set({ isProfileModalOpen: value }),

  getChatUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/chatUsers");
      set({ chatUsers: res.data });
    } catch (error) {
      console.log(error.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessagesByUserId: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      console.log(error.message);
      toast.error(error?.response?.data?.error || "Something went wrong");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (receiverId, messageData) => {
    const { messages } = get();
    try {
      const res = await axiosInstance.post(
        `/message/${receiverId}`,
        messageData,
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      console.log(error.message);
      toast.error("Message Not Send");
    }
  },
}));
