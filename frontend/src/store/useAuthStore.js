import { create } from "zustand";
import axiosInstance from "../utils/axios";

const useAuthStore = create((set) => ({
  user: (() => {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null; // Safely parse user
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      localStorage.removeItem("user"); // Remove invalid data
      return null; // Fallback to null
    }
  })(),
  accessToken: localStorage.getItem("accessToken") || null,
  isAuthenticated: !!localStorage.getItem("accessToken"),
  isLoading: false,

  login: (user, token) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(user)); // Store user as JSON string
    set({ user, accessToken: token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  setLoading: (loading) => set({ isLoading: loading }),

  setAuthData: (user, token) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(user)); // Ensure user is stored as JSON string
    set({
      user,
      accessToken: token,
      isAuthenticated: true,
    });
  },

  clearAuthData: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
    });
  },

  refreshAccessToken: async () => {
    try {
      const response = await axiosInstance.post("/auth/refresh-token");
      const { accessToken, user } = response.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(user)); // Ensure user is stored as JSON string

      set({
        accessToken,
        isAuthenticated: true,
        user,
      });

      console.log("Tokens refreshed successfully");
    } catch (error) {
      console.error("Error refreshing token", error.response?.data || error);
      set({ isAuthenticated: false, user: null });
    }
  },
}));

export default useAuthStore;
