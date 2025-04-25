// Constants
import { END_POINTS, MESSAGES } from '@/constants';

// Types
import { ErrorType, IInfoUser } from '@/types';

// Services
import { HttpClient } from '.';

const getInfoUser = async (): Promise<IInfoUser> => {
  return (await HttpClient.get(END_POINTS.ACCOUNTS.ME)).data;
};

const editInfoUser = async (data: Partial<IInfoUser>) => {
  try {
    return (
      await HttpClient.patch(END_POINTS.ACCOUNTS.ME, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    ).data;
  } catch (error) {
    throw new Error(
      (error as ErrorType).detail || MESSAGES.COMMON.UPDATE_FAILED('User'),
    );
  }
};

export { getInfoUser, editInfoUser };
