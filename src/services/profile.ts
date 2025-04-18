import { END_POINTS, MESSAGES } from '@/constants';

import { ErrorType } from '@/types';

import { HttpClient } from '.';

export const getListJobs = async () => {
  try {
    const response = await HttpClient.get(END_POINTS.JOB);
    return response?.data ?? [];
  } catch (error) {
    throw new Error((error as ErrorType).detail || MESSAGES.COMMON.EMPTY_DATA);
  }
};
