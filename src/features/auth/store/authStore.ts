import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_KEYS } from "../../../constants/storageKeys";
import type { Role } from "../../../constants/roles";

interface User {
  id: number;
  name: string;
  username: string;
  rol: Role;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isHydrated: boolean;
  setAuth: (user: User, token: string, remember: boolean) => void;
  logout: () => void;
  setHydrated: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isHydrated: false,

      setAuth: (user, token, remember) => {
        if (remember) {
          localStorage.setItem(STORAGE_KEYS.TOKEN, token);
          localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
          localStorage.setItem(STORAGE_KEYS.REMEMBER, "true");
        } else {
          localStorage.removeItem(STORAGE_KEYS.REMEMBER);
        }

        set({ user, token });
      },

      logout: () => {
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
        localStorage.removeItem(STORAGE_KEYS.REMEMBER);

        set({ user: null, token: null });
      },

      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: "auth-storage", // Clave explícita para LocalStorage
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);
