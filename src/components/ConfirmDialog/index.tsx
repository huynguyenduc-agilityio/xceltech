import { useConfirmDialogStore } from '@/stores';

import { Button, DialogContainer } from '../common';

const ConfirmDialog = () => {
  const { isOpen, title, confirmMessage, onConfirm, onCancel, close } =
    useConfirmDialogStore();

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm?.();
    close();
  };

  const handleCancel = () => {
    onCancel?.();
    close();
  };

  return (
    <DialogContainer
      isOpen={isOpen}
      title={title}
      description={confirmMessage}
      footer={
        <>
          <Button
            variant="outline"
            className="text-sm h-fit px-4 py-2"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button className="text-sm h-fit px-4 py-2" onClick={handleConfirm}>
            Confirm
          </Button>
        </>
      }
    />
  );
};

export default ConfirmDialog;
