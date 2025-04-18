import { Button } from '@/components';
import { PhoneIcon } from '@/icons';

interface ReasonRecallProps {
  reason: string;
  onClose: () => void;
}

const ReasonRecall = ({ reason, onClose }: ReasonRecallProps) => {
  return (
    <div className="max-w-[500px] min-w-96 flex flex-col items-center gap-5">
      <div className="flex flex-col items-center gap-3">
        <PhoneIcon />
        <h2 className="text-3xl font-bold text-black-soft">Leave Recall</h2>
      </div>

      <p className="text-center text-black-soft">{reason}</p>

      <Button
        type="button"
        variant="outline"
        className="w-full text-red-primary border-red-deep mt-3 py-0"
        onClick={onClose}
      >
        Close
      </Button>
    </div>
  );
};

export default ReasonRecall;
