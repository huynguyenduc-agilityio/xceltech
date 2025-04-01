import { useConfirmDialogStore } from '@/stores';

export const useConfirm = () => {
  return useConfirmDialogStore((state) => state.confirm);
};
