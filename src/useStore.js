import { create } from 'zustand';

export const useStore = create((set) => ({
    isOpen: false,
    updateIsOpen: (isOpen) => set({ isOpen }),
}));
