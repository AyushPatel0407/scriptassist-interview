import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  email: string;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

export const useAppStore = create<AuthState>(
  persist(
    (set) => ({
      isAuthenticated: false, // Initial value: not authenticated

      // Simulating login logic
      login: (email: string, password: string): boolean => {
        // Replace this with actual authentication logic (e.g., API call)
        if (email === 'ayush@gmail.com' && password === 'Password@123') {
          set({ isAuthenticated: true,email,password });
          return true; // Success
        }
        return false; // Failure
      },

      // Logout clears the auth state
      logout: (): void => {
        set({ isAuthenticated: false });
      },
    }),
    {
      name: 'userData', // Key for localStorage (change if needed)
      getStorage: () => localStorage, // Using localStorage to persist the state
    }
  )
);