import { create } from 'zustand';

interface UiState {
  openAddRequestDetailDrawer: boolean;
  setOpenAddRequestDetailDrawer: (open: boolean) => void;
  openEditRequestDetailDrawer: boolean;
  setOpenEditRequestDetailDrawer: (open: boolean) => void;
  openAlertDialogRequestDetail: boolean;
  setOpenAlertDialogRequestDetail: (open: boolean) => void;
  openEditRequestDrawer: boolean;
  setOpenEditRequestDrawer: (open: boolean) => void;
  openAlertDialogRequest: boolean;
  setOpenAlertDialogRequest: (open: boolean) => void;
}

export const useUiStore = create<UiState>((set, get) => ({
  openAddRequestDetailDrawer: false,
  openEditRequestDetailDrawer: false,
  openAlertDialogRequestDetail: false,
  openEditRequestDrawer: false,
  openAlertDialogRequest: false,

  setOpenAddRequestDetailDrawer: (open) =>
    set({ openAddRequestDetailDrawer: open }),
  setOpenEditRequestDetailDrawer: (open) =>
    set({ openEditRequestDetailDrawer: open }),
  setOpenAlertDialogRequestDetail: (open) =>
    set({ openAlertDialogRequestDetail: open }),
  setOpenEditRequestDrawer: (open) => set({ openEditRequestDrawer: open }),
  setOpenAlertDialogRequest: (open) => set({ openAlertDialogRequest: open }),
}));
