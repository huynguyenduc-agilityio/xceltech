// Constants
import { END_POINTS } from '@/constants';

// Types
import { IInfoUser } from '@/types';

// Services
import { HttpClient } from '.';

const getInfoUser = async (): Promise<IInfoUser> => {
  return (await HttpClient.get(END_POINTS.USER_DETAIL)).data;
};

const editInfoUser = async (data: Partial<IInfoUser>) =>
  (
    await HttpClient.patch(END_POINTS.USER_DETAIL, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  ).data;

export { getInfoUser, editInfoUser };
