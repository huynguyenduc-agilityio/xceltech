// Constants
import { END_POINTS, MESSAGES } from '@/constants';

// Types
import { ErrorType, IEmployeeFamilyInfo } from '@/types';

// Services
import { HttpClient } from '.';

export const getListFamilies = async (): Promise<IEmployeeFamilyInfo[]> => {
  try {
    const response = await HttpClient.get(END_POINTS.FAMILIES);

    return response?.data ?? [];
  } catch (error) {
    throw new Error((error as ErrorType).detail || MESSAGES.COMMON.EMPTY_DATA);
  }
};

export const addFamily = async (data: Partial<IEmployeeFamilyInfo>) => {
  try {
    return (await HttpClient.post(`${END_POINTS.FAMILIES}`, data)).data;
  } catch (error) {
    throw new Error((error as ErrorType).detail);
  }
};

export const editFamily = async (data: Partial<IEmployeeFamilyInfo>) => {
  try {
    const { id, ...payload } = data;

    return (await HttpClient.patch(`${END_POINTS.FAMILIES}${id}/`, payload))
      .data;
  } catch (error) {
    throw new Error(
      (error as ErrorType).detail || MESSAGES.COMMON.UPDATE_FAILED('Family'),
    );
  }
};

export const deleteFamily = async (id: string) => {
  try {
    return await HttpClient.delete(`${END_POINTS.FAMILIES}${id}/`);
  } catch (error) {
    throw new Error(
      (error as ErrorType).detail || MESSAGES.COMMON.DELETE_FAILED('Family'),
    );
  }
};
