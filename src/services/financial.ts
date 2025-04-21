// Constants
import { END_POINTS, MESSAGES } from '@/constants';

// Types
import { ErrorType, IEmployeeFinancialInfo } from '@/types';

// Services
import { HttpClient } from '.';

export const getListFinancials = async (): Promise<
  IEmployeeFinancialInfo[]
> => {
  try {
    const response = await HttpClient.get(END_POINTS.FINANCIALS);

    return response?.data ?? [];
  } catch (error) {
    throw new Error((error as ErrorType).detail || MESSAGES.COMMON.EMPTY_DATA);
  }
};

export const addFinancial = async (data: Partial<IEmployeeFinancialInfo>) => {
  try {
    return (await HttpClient.post(`${END_POINTS.FINANCIALS}`, data)).data;
  } catch (error) {
    throw new Error((error as ErrorType).detail);
  }
};

export const editFinancial = async (data: Partial<IEmployeeFinancialInfo>) => {
  try {
    const { id, ...payload } = data;

    return (await HttpClient.patch(`${END_POINTS.FINANCIALS}${id}/`, payload))
      .data;
  } catch (error) {
    throw new Error(
      (error as ErrorType).detail || MESSAGES.COMMON.UPDATE_FAILED('Financial'),
    );
  }
};

export const deleteFinancial = async (id: string) => {
  try {
    return await HttpClient.delete(`${END_POINTS.FINANCIALS}${id}/`);
  } catch (error) {
    throw new Error(
      (error as ErrorType).detail || MESSAGES.COMMON.DELETE_FAILED('Financial'),
    );
  }
};
