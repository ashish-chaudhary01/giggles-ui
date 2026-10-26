import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const userAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSignigUp: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
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

      // toast
      toast.success("Account created");
    } catch (err) {
      console.log("Error in signing up", err.message);
      toast.error(err.response.data.error);
    } finally {
      set({ isSignigUp: false });
    }
  },
}));
