import axios from 'axios';
import toast from 'react-hot-toast';
import { create } from 'zustand';

export const userAuthstore = create((set) => ({
    user: null,
    isSigningUp: false,
    isSigningIn: false,
    isCheckingAuth: true,
    isLoggingOut: false,

    signup: async (credentials) => {
        set({ isSigningUp: true });
        try {
            const response = await axios.post("/api/v1/user/signup", credentials);
            set({ user: response.data.user, isSigningUp: false });
            toast.success("Account created successfully");
            window.location.href = "/";

        } catch (error) {
            toast.error(error.response.data.error || "An error occurred");
            set({ isSigningUp: false, user: null });
        }
    },
    login: async (credentials) => {
        set({ isSigningIn: true });
        try {
            const response = await axios.post("/api/v1/user/login", credentials);
            set({ user: response.data.user, isSigningIn: false });
            toast.success("Logged in successfully");

            // ✅ Redirect to home screen
            window.location.href = "/";
        } catch (error) {
            toast.error(error.response?.data?.error || "An error occurred");
            set({ user: null, isSigningIn: false });
        }
    },

    logout: async () => {
        try {
            await axios.post("/api/v1/user/logout");
            set({ user: null });
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error.response.data.error || "An error occurred");
        }
    },
    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            const response = await axios.get("/api/v1/user/auth");
            set({ user: response.data.user, isCheckingAuth: false });
        } catch (error) {
            set({ isCheckingAuth: false, user: null });
        }
    },
}));