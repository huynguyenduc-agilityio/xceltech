import { useUser } from '@/stores';
import { AuthorizeRoute } from './authorizeRoute';
import { AUTHENTICATION_PAGE, RoleAuthentication } from '@/constants';

export const DynamicAuthorizeRoute = () => {
  const authUser = useUser();
  return (
    <AuthorizeRoute
      allowedRoles={authUser?.user.role as RoleAuthentication}
      redirectPath={AUTHENTICATION_PAGE.USER_SIGN_IN}
    />
  );
};
