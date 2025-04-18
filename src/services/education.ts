// Constants
import { END_POINTS, MESSAGES } from '@/constants';

// Types
import { ErrorType, IEmployeeEducationInfo } from '@/types';

// Services
import { HttpClient } from '.';

export const getListEducations = async () => {
  try {
    const response = await HttpClient.get(END_POINTS.EDUCATIONS);
    return response?.data ?? [];
  } catch (error) {
    throw new Error((error as ErrorType).detail || MESSAGES.COMMON.EMPTY_DATA);
  }
};

export const addEducation = async (data: Partial<IEmployeeEducationInfo>) => {
  try {
    return (await HttpClient.post(`${END_POINTS.EDUCATIONS}`, data)).data;
  } catch (error) {
    throw new Error((error as ErrorType).detail);
  }
};

export const editEducation = async (data: Partial<IEmployeeEducationInfo>) => {
  try {
    const { id, ...payload } = data;

    return (await HttpClient.patch(`${END_POINTS.EDUCATIONS}${id}/`, payload))
      .data;
  } catch (error) {
    throw new Error((error as ErrorType).detail);
  }
};

export const deleteEducation = async (id: string) => {
  try {
    return await HttpClient.delete(`${END_POINTS.EDUCATIONS}${id}/`);
  } catch (error) {
    throw new Error((error as ErrorType).detail);
  }
};
