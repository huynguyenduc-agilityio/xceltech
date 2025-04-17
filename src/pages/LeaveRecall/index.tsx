import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Constants
import { MESSAGES, USER_PAGE } from '@/constants';

// Types
import { StatusLeave, ToastStatus } from '@/types';

// Hooks
import {
  useGetNotification,
  useToast,
  useUpdateNotification,
  useUpdateStatusRecall,
} from '@/hooks';

// Icons
import { BookIcon } from '@/icons';

// Stores
import { useUser } from '@/stores';

// Components
import { Breadcrumb, Button, Fallback, Label, Textarea } from '@/components';

const BREADCRUMB_ITEMS = [
  { label: 'Dashboard', href: USER_PAGE.DASHBOARD },
  { label: 'Leave Recall' },
];

const LeaveRecall = () => {
  const navigate = useNavigate();
  const { user } = useUser() || {};
  const { id = '' } = useParams();
  const { toast } = useToast();
  const [reason, setReason] = useState('');

  const { notification, isNotificationLoading } = useGetNotification(id);
  const { handleUpdateStatusRecall, isUpdateLoading } = useUpdateStatusRecall();
  const { handleUpdateNotification } = useUpdateNotification();

  const handleReasonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReason(e.target.value);
  };

  const handleActionStatus = async (status: StatusLeave) => {
    try {
      await handleUpdateStatusRecall({
        recallId: notification.recallId,
        recallStatus: status,
        recallReason: reason,
      });

      await handleUpdateNotification({
        id,
        isRead: true,
      });

      toast({
        status: ToastStatus.Success,
        title: MESSAGES.LEAVE_RECALL.UPDATE_STATUS_SUCCESS(
          status.toLowerCase(),
        ),
      });

      navigate(USER_PAGE.LEAVE);
    } catch {
      toast({
        status: ToastStatus.Error,
        title: MESSAGES.LEAVE_RECALL.UPDATE_STATUS_FAILED(status.toLowerCase()),
      });
    }
  };

  if (isNotificationLoading) {
    return <Fallback />;
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center w-full px-[62px] py-8 bg-white">
        <Breadcrumb items={BREADCRUMB_ITEMS} />
      </div>
      <div className="px-[232px] mt-6">
        <div className="w-full bg-white px-[50px] py-[76px]">
          <div className="flex justify-center items-center gap-4">
            <BookIcon />
            <h2 className="text-3xl text-black-soft">Leave Recall</h2>
          </div>
          <div className="mt-14 px-[68px] py-[74px] bg-blue-light rounded-regular">
            <p className="text-2xl">Dear {user?.username},</p>
            <p className="text-3xl mt-16">{notification?.message}</p>
          </div>

          <div className="w-full mt-[61px] px-6">
            <Label className="text-2xl text-black-soft">
              If No, state reason why ?
            </Label>
            <Textarea
              value={reason}
              onChange={handleReasonChange}
              placeholder="State your reason..."
              className="h-[137px] px-6 text-xl mt-10"
            />
          </div>

          <div className="flex gap-[55px] w-full h-[70px] px-6 mt-16">
            <Button
              type="submit"
              className="w-[364px] text-xl bg-green-primary"
              onClick={() => handleActionStatus(StatusLeave.Approved)}
              isLoading={isUpdateLoading}
              disabled={reason.trim() !== ''}
            >
              Approve
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-[364px] text-xl text-red-primary border-red-deep"
              onClick={() => handleActionStatus(StatusLeave.Rejected)}
              isLoading={isUpdateLoading}
              disabled={reason.trim() === ''}
            >
              Decline
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveRecall;
