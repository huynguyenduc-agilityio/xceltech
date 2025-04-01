import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

//Types
import { IActiveUser } from '@/types';

// Constants
import { USER_PAGE } from '@/constants';

// Services
import { activateAccount, loginUser, registerUser } from '@/services';

// Stores
import { useUserActions } from '@/stores';

export const useLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useUserActions();

  const {
    mutateAsync: handleLoginUser,
    isPending: isLoginLoading,
    isError: isLoginError,
  } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Save data in local storage
      if (data) {
        setUser(data);
        navigate(USER_PAGE.DASHBOARD);
      }
    },
  });

  return { isLoginLoading, isLoginError, handleLoginUser };
};

export const useRegister = () => {
  const { mutateAsync: handleRegisterUser, isPending: isRegisterLoading } =
    useMutation({
      mutationFn: registerUser,
    });

  return {
    handleRegisterUser,
    isRegisterLoading,
  };
};

export const useActivateAccount = ({ uidb64, token }: IActiveUser) => {
  const { mutateAsync: handleActivateUser, isPending: isActivateLoading } =
    useMutation({
      mutationFn: () => activateAccount({ uidb64, token }),
    });

  return {
    handleActivateUser,
    isActivateLoading,
  };
};
