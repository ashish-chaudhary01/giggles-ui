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

  setSelectedUser: (selectedUser) =>
    set({
      selectedUser,
      messages: [],
      isMessagesLoading: Boolean(selectedUser),
    }),

  setIsProfileModalOpen: (value) => set({ isProfileModalOpen: value }),

  getChatUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/chatUsers");
      set({ chatUsers: res.data });
      get().subscribeToNewChatUsers();
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
      set((state) => {
        if (String(state.selectedUser?._id) !== String(userId)) return state;

        const messagesById = new Map(
          res.data.map((message) => [message._id, message]),
        );
        state.messages.forEach((message) => {
          messagesById.set(message._id, message);
        });
        return { messages: [...messagesById.values()] };
      });
    } catch (error) {
      console.log(error.message);
      toast.error(error?.response?.data?.error || "Something went wrong");
    } finally {
      set((state) =>
        String(state.selectedUser?._id) === String(userId)
          ? { isMessagesLoading: false }
          : state,
      );
    }
  },

  sendMessage: async (receiverId, messageData) => {
    const { authUser } = useAuthStore.getState();

    // update sender ui fast so that it does not feel slow
    const msg = {
      _id: new Date(),
      receiverId: receiverId,
      senderId: authUser._id,
      text: messageData.text,
      image: messageData.image,
      status: "sent",
      createdAt: new Date(),
    };
    set({ messages: [...get().messages, msg] });
    try {
      const res = await axiosInstance.post(
        `/message/${receiverId}`,
        messageData,
      );
      // update the state with real response message
      const updatedMessages = get().messages.map((message) =>
        message._id === msg._id ? res.data : message,
      );
      // automatically marks the message status to deliverd
      set({ messages: updatedMessages });
      return true;
    } catch (error) {
      console.log(error.message);
      set({ messages: get().messages.filter((message) => message !== msg) });
      toast.error(
        error.message ||
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Message not sent. Please try again.",
      );
      return false;
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
    if (!socket) return () => {};

    const handleNewMessage = (newMessage) => {
      const { selectedUser } = get();
      const { authUser } = useAuthStore.getState();
      const currentUserId = authUser?._id || authUser?.id;
      const selectedUserId = selectedUser?._id;
      if (!currentUserId || !selectedUserId) return;

      if (
        (String(newMessage.senderId) === String(selectedUserId) &&
          String(newMessage.receiverId) === String(currentUserId)) ||
        (String(newMessage.receiverId) === String(selectedUserId) &&
          String(newMessage.senderId) === String(currentUserId))
      ) {
        let isNewMessage = false;
        set((state) => {
          if (
            state.messages.some((message) => message._id === newMessage._id)
          ) {
            return state;
          }
          isNewMessage = true;
          return { messages: [...state.messages, newMessage] };
        });
        if (isNewMessage) {
          const notificationSound = new Audio("/sounds/notification.mp3");
          notificationSound.play().catch((e) => console.log(e.message));
        }
        // emit the message seen event if receiver is in the chat and receives the real time message
        socket.emit("markMessageSeen", {
          messageId: newMessage._id,
          status: "seen",
        });
      }
    };

    const handleSocketConnect = () => {
      const selectedUser = get().selectedUser;
      if (selectedUser?._id) get().getMessagesByUserId(selectedUser._id);
    };

    const handleMessageStatusUpdate = (data) => {
      set((state) => ({
        messages: state.messages.map((msg) =>
          msg._id === data.messageId ? { ...msg, status: data.status } : msg,
        ),
      }));
    };

    const handleMessageSeenStatus = (data) => {
      set((state) => ({
        messages: state.messages.map((msg) =>
          msg._id === data.messageId ? { ...msg, status: data.status } : msg,
        ),
      }));
      console.log("seen");
    };

    socket.on("newMessage", handleNewMessage);
    socket.on("connect", handleSocketConnect);
    socket.on("messageStatusUpdated", handleMessageStatusUpdate);
    socket.on("messageSeen", handleMessageSeenStatus);
    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.off("connect", handleSocketConnect);
      socket.off("messageStatusUpdated", handleMessageStatusUpdate);
      socket.off("messageSeen", handleMessageSeenStatus);
    };
  },

  // if the sender is messaging receiver for the first time
  // add the sender to the receiver chatList dynamically
  subscribeToNewChatUsers: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.on("updateChatList", (user) => {
      const { chatUsers } = get();
      // set sender to the top of the receiver chatList
      set({
        chatUsers: [user, ...chatUsers.filter((u) => u._id !== user._id)],
      });
      const notificationSound = new Audio("/sounds/notification.mp3");
      notificationSound.play().catch((e) => console.log(e.message));
    });
  },
}));
