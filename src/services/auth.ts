// Constants
import { END_POINTS } from '@/constants';

// Types
import { ILoginUser, IAuthUser, IRegisterUser, IActiveUser } from '@/types';

// Services
import { HttpClient } from '.';

const loginUser = async (user: ILoginUser): Promise<IAuthUser> =>
  (await HttpClient.post(END_POINTS.LOGIN, user)).data;

const registerUser = async (user: IRegisterUser): Promise<IRegisterUser> =>
  (await HttpClient.post(END_POINTS.REGISTER, user)).data;

const activateAccount = async ({ uidb64, token }: IActiveUser) =>
  (await HttpClient.get(`${END_POINTS.ACTIVE}/${uidb64}/${token}/`)).data;

export { loginUser, registerUser, activateAccount };
