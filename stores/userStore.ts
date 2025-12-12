import { create } from 'zustand';
import { toast } from 'sonner';

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
  user: User;
  selected: User | null;
  openAdd: boolean;
  openEdit: boolean;
  openDetail: boolean;
  openDelete: boolean;
  deleteId: number | null;
  isDeleting: boolean;

  setUser: (user: User) => void;
  setSelected: (user: User | null) => void;
  setOpenAdd: (open: boolean) => void;
  setOpenEdit: (open: boolean) => void;
  setOpenDetail: (open: boolean) => void;
  setOpenDelete: (open: boolean) => void;
  setDeleteId: (id: number | null) => void;

  openDetailDialog: (user: User) => void;
  openEditDialog: (user: User) => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: {} as User,
  selected: null,
  openAdd: false,
  openEdit: false,
  openDetail: false,
  openDelete: false,
  deleteId: null,
  isDeleting: false,

  setUser: (user) => set({ user: user }),
  setSelected: (user) => set({ selected: user }),
  setOpenAdd: (open) => set({ openAdd: open }),
  setOpenEdit: (open) => set({ openEdit: open }),
  setOpenDetail: (open) => set({ openDetail: open }),
  setOpenDelete: (open) => set({ openDelete: open }),
  setDeleteId: (id) => set({ deleteId: id }),

  openDetailDialog: (user) => set({ selected: user, openDetail: true }),
  openEditDialog: (user) => set({ selected: user, openEdit: true }),
}));
