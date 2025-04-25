import {
  useNavigate,
  useLocation,
  NavigateFunction,
  Location,
} from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

//Types
import { IActiveUser, IAuthUser } from '@/types';

// Services
import { activateAccount, loginUser, registerUser } from '@/services';

// Stores
import { useUserActions } from '@/stores';

// Constants
import { usersQueryKeys } from '@/constants';

// Constants
import {
  ADMIN_PAGE,
  AUTHENTICATION_PAGE,
  RoleAuthentication,
  USER_PAGE,
} from '@/constants';

const handleLoginSuccess = (
  data: IAuthUser | null,
  location: Location,
  navigate: NavigateFunction,
  setUser: (data: IAuthUser) => void,
) => {
  if (data) {
    const path = location.pathname;
    const role = data.user.role;

    const isAdmin =
      role === RoleAuthentication.Admin &&
      path === AUTHENTICATION_PAGE.ADMIN_SIGN_IN;

    const isUser =
      [
        RoleAuthentication.Employee,
        RoleAuthentication.Candidate,
        RoleAuthentication.Admin,
      ].includes(role as RoleAuthentication) &&
      path === AUTHENTICATION_PAGE.USER_SIGN_IN;

    if (isAdmin) {
      setUser(data);
      navigate(ADMIN_PAGE.DASHBOARD);
    }

    if (isUser) {
      setUser(data);
      navigate(USER_PAGE.DASHBOARD);
    }
  }
};

export const useLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useUserActions();
  const queryClient = useQueryClient();

  const {
    mutateAsync: handleLoginUser,
    isPending: isLoginLoading,
    isError: isLoginError,
  } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: usersQueryKeys.details() });
      handleLoginSuccess(data, location, navigate, setUser);
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
