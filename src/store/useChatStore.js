import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set) => ({
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
}));
