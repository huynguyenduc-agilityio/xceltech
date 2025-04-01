import { create } from 'zustand';

interface ConfirmDialogState {
  isOpen: boolean;
  title: string;
  confirmMessage: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirm: (options: {
    title: string;
    confirmMessage: string;
    onConfirm?: () => void;
    onCancel?: () => void;
  }) => void;
  close: () => void;
}

export const useConfirmDialogStore = create<ConfirmDialogState>((set) => ({
  isOpen: false,
  title: '',
  confirmMessage: '',
  onConfirm: undefined,
  onCancel: undefined,
  confirm: ({ title, confirmMessage, onConfirm, onCancel }) =>
    set({ isOpen: true, title, confirmMessage, onConfirm, onCancel }),
  close: () => set({ isOpen: false }),
}));
