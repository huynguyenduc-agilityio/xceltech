// Constants
import { END_POINTS, MESSAGES } from '@/constants';

// Types
import { ErrorType, IEmployeeGuarantor } from '@/types';

// Services
import { HttpClient } from '.';

export const getListGuarantors = async (): Promise<IEmployeeGuarantor[]> => {
  try {
    const response = await HttpClient.get(END_POINTS.GUARANTORS);
    return response?.data ?? [];
  } catch (error) {
    throw new Error((error as ErrorType).detail || MESSAGES.COMMON.EMPTY_DATA);
  }
};

export const addGuarantor = async (data: Partial<IEmployeeGuarantor>) => {
  try {
    return (await HttpClient.post(`${END_POINTS.GUARANTORS}`, data)).data;
  } catch (error) {
    throw new Error((error as ErrorType).detail);
  }
};

export const editGuarantor = async (data: Partial<IEmployeeGuarantor>) => {
  try {
    const { id, ...payload } = data;

    return (await HttpClient.patch(`${END_POINTS.GUARANTORS}${id}/`, payload))
      .data;
  } catch (error) {
    throw new Error((error as ErrorType).detail);
  }
};

export const deleteGuarantor = async (id: string) => {
  try {
    return await HttpClient.delete(`${END_POINTS.GUARANTORS}${id}/`);
  } catch (error) {
    throw new Error((error as ErrorType).detail);
  }
};
