import { create } from 'zustand';

interface UIState {
  isLogSessionModalOpen: boolean;
  openLogSessionModal: () => void;
  closeLogSessionModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isLogSessionModalOpen: false,
  openLogSessionModal: () => set({ isLogSessionModalOpen: true }),
  closeLogSessionModal: () => set({ isLogSessionModalOpen: false }),
}));