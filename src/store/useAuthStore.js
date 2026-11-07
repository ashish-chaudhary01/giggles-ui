import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useChatStore } from "./useChatStore";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSignigUp: false,
  isLoggingIn: false,
  socket: null,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth", error.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSignigUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      get().connectSocket();
      toast.success("Account created");
    } catch (err) {
      console.log("Error in signing up", err.message);
      toast.error(
        err.response.data.message ||
          err.response.data.error ||
          "Failed to sign up",
      );
    } finally {
      set({ isSignigUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      get().connectSocket();
      toast.success("Logged in successfully");
    } catch (error) {
      console.log("Error in Logging in", error.message);
      toast.error(
        error.response.data.message ||
          error.response.data.error ||
          "Failed to sign in",
      );
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      const res = await axiosInstance.get("/auth/logout");
      set({ authUser: null });
      get().disconnectSocket();
      useChatStore.getState().resetUser(); // reset every state of useChatStore
      toast.success(res.data.message || "logout successfull");
    } catch (error) {
      console.log(error.message);
      toast.error("Please try again");
    }
  },

  updateProfile: async (data) => {
    try {
      const res = await axiosInstance.post("/auth/updateProfile", data);
      set({ authUser: res.data });
      toast.success("Profile updated");
    } catch (error) {
      console.log(error.message);
      toast.error(
        error.response.data.message ||
          error.response.data.error ||
          "Failed to update profile",
      );
    }
  },

  // socket connection establish
  connectSocket: () => {
    const { authUser, socket: currentSocket } = get();
    if (!authUser || currentSocket?.connected) return;

    const userId = authUser._id || authUser.id;
    if (!userId) return;

    const socket = io(BASE_URL, {
      withCredentials: true,
      query: { userId: String(userId) },
      autoConnect: false,
    });

    set({ socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
    socket.connect();
  },
  // disconnect socket
  disconnectSocket: () => {
    get().socket?.disconnect();
    set({ socket: null, onlineUsers: [] });
  },
}));
