import { useNavigate, useSearchParams } from 'react-router-dom';
import { CircleCheck } from 'lucide-react';

// Constants
import { AUTHENTICATION_PAGE, MESSAGES } from '@/constants';

// Types
import { ToastStatus } from '@/types';

// Hooks
import { useActivateAccount, useToast } from '@/hooks';

// Components
import { Button } from '@/components';

const ActivateAccount = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const uidb64 = searchParams.get('uidb64');
  const token = searchParams.get('token');

  const { handleActivateUser, isActivateLoading } = useActivateAccount({
    uidb64,
    token,
  });

  const handleActivate = async () => {
    if (!uidb64 || !token) {
      toast({ status: ToastStatus.Error, title: 'Invalid activation' });
      return;
    }

    try {
      await handleActivateUser();

      toast({
        status: ToastStatus.Success,
        title: MESSAGES.AUTHENTICATION.ACTIVATE_SUCCESS,
      });

      navigate(AUTHENTICATION_PAGE.USER_SIGN_IN);
    } catch {
      toast({
        status: ToastStatus.Error,
        title: MESSAGES.AUTHENTICATION.ACTIVATE_FAILED,
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg">
        <div className="flex items-center gap-4">
          <CircleCheck className="mx-auto text-black-default w-12 h-12" />
          <h1 className="text-2xl font-bold">Activate your account</h1>
        </div>
        <p className="text-lg mt-8">Click the button below</p>
        <Button
          className="w-[150px] h-[54px] text-lg mt-4 py-3 "
          onClick={handleActivate}
          isLoading={isActivateLoading}
        >
          ACTIVATE
        </Button>
      </div>
    </div>
  );
};

export default ActivateAccount;
