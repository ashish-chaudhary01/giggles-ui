import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  chatUsers: [], // sidebar users
  selectedUser: null, // stores selected user
  messages: [], // messages between user and selectedUser
  isUsersLoading: false,
  isMessagesLoading: false,
  isProfileModalOpen: false,
  isSearchingUser: false,
  searchResult: [],

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

  searchUser: async (query) => {
    set({ isSearchingUser: true });
    try {
      const res = await axiosInstance.get(`/user/search?query=${query}`);
      set({ searchResult: res.data });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message || "Failed to search user");
    } finally {
      set({ isSearchingUser: false });
    }
  },

  resetUser: () => {
    set({
      chatUsers: [],
      selectedUser: null,
      messages: [],
      isUsersLoading: false,
      isMessagesLoading: false,
      isProfileModalOpen: false,
      isSearchingUser: false,
      searchResult: [],
    });
  },

  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const { selectedUser, messages } = get();
      const { authUser } = useAuthStore.getState();
      if (
        (newMessage.senderId === selectedUser?._id &&
          newMessage.receiverId === authUser?._id) ||
        (newMessage.receiverId === selectedUser?._id &&
          newMessage.senderId === authUser?._id)
      ) {
        set({ messages: [...messages, newMessage] });
      }
    });
  },

  unsubscribeFromMessage: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
}));
