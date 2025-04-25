// Constants
import { END_POINTS, MESSAGES } from '@/constants';

// Types
import { ErrorType, IEmployeeEducationInfo } from '@/types';

// Services
import { HttpClient } from '.';

export const getListEducations = async () => {
  try {
    const response = await HttpClient.get(END_POINTS.USER_PROFILE.EDUCATIONS);
    return response?.data ?? [];
  } catch (error) {
    throw new Error((error as ErrorType).detail || MESSAGES.COMMON.EMPTY_DATA);
  }
};

export const addEducation = async (data: Partial<IEmployeeEducationInfo>) => {
  try {
    return (
      await HttpClient.post(`${END_POINTS.USER_PROFILE.EDUCATIONS}`, data)
    ).data;
  } catch (error) {
    throw new Error((error as ErrorType).detail);
  }
};

export const editEducation = async (data: Partial<IEmployeeEducationInfo>) => {
  try {
    const { id, ...payload } = data;

    return (
      await HttpClient.patch(
        `${END_POINTS.USER_PROFILE.EDUCATIONS}${id}/`,
        payload,
      )
    ).data;
  } catch (error) {
    throw new Error(
      (error as ErrorType).detail || MESSAGES.COMMON.UPDATE_FAILED('Education'),
    );
  }
};

export const deleteEducation = async (id: string) => {
  try {
    return await HttpClient.delete(
      `${END_POINTS.USER_PROFILE.EDUCATIONS}${id}/`,
    );
  } catch (error) {
    throw new Error(
      (error as ErrorType).detail || MESSAGES.COMMON.DELETE_FAILED('Education'),
    );
  }
};
