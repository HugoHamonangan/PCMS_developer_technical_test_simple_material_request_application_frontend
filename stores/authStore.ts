'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface User {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  role: string;
  department_id: number;
  position_id: number;
  status: string;
}

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: 'userStorage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
