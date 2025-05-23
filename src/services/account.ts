// Constants
import { END_POINTS } from '@/constants';

// Services
import { HttpClient } from '.';

const getAccounts = async () => {
  return (await HttpClient.get(END_POINTS.ACCOUNTS.BASE)).data;
};

export { getAccounts };
