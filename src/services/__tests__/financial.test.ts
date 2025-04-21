import axiosMockAdapter from 'axios-mock-adapter';
import { HttpClient } from '@/services';
import {
  getListFinancials,
  addFinancial,
  editFinancial,
  deleteFinancial,
} from '@/services';

import { END_POINTS, MESSAGES } from '@/constants';
import { IEmployeeFinancialInfo } from '@/types';

describe('financialService', () => {
  let mock: axiosMockAdapter;

  beforeEach(() => {
    mock = new axiosMockAdapter(HttpClient);
  });

  afterEach(() => {
    mock.reset();
  });

  it('should get list of financials successfully', async () => {
    const mockData: IEmployeeFinancialInfo[] = [
      {
        id: '1',
        bankName: 'Bank A',
        accountName: 'John Doe',
        accountNo: 1234567890,
      },
    ];

    mock.onGet(END_POINTS.FINANCIALS).reply(200, mockData);

    const result = await getListFinancials();
    expect(result).toEqual(mockData);
  });

  it('should return empty array when response is null', async () => {
    mock.onGet(END_POINTS.FINANCIALS).reply(200, null);

    const result = await getListFinancials();
    expect(result).toEqual([]);
  });

  it('should throw error when getListFinancials fails', async () => {
    mock.onGet(END_POINTS.FINANCIALS).reply(500, {
      detail: 'Server Error',
    });

    await expect(getListFinancials()).rejects.toThrow('No data found');
  });

  it('should add financial successfully', async () => {
    const financial: Partial<IEmployeeFinancialInfo> = {
      bankName: 'Bank A',
      accountName: 'John Doe',
      accountNo: 1234567890,
    };

    const mockResponse = { id: '2', ...financial };

    mock.onPost(END_POINTS.FINANCIALS).reply(201, mockResponse);

    const result = await addFinancial(financial);
    expect(result).toEqual(mockResponse);
  });

  it('should throw error when addFinancial fails', async () => {
    mock.onPost(END_POINTS.FINANCIALS).reply(400, {
      detail: 'Invalid data',
    });

    await expect(addFinancial({})).rejects.toBeInstanceOf(Error);
  });

  it('should edit financial successfully', async () => {
    const financial: Partial<IEmployeeFinancialInfo> = {
      id: '3',
      bankName: 'Bank B',
    };

    const mockResponse = {
      id: '3',
      bankName: 'Bank B',
    };

    mock
      .onPatch(`${END_POINTS.FINANCIALS}${financial.id}/`)
      .reply(200, mockResponse);

    const result = await editFinancial(financial);
    expect(result).toEqual(mockResponse);
  });

  it('should throw error when editFinancial fails', async () => {
    mock.onPatch(`${END_POINTS.FINANCIALS}3/`).reply(400, {
      detail: 'Update failed',
    });

    await expect(
      editFinancial({ id: '3', bankName: 'Invalid' }),
    ).rejects.toThrow(MESSAGES.COMMON.UPDATE_FAILED('Financial'));
  });

  it('should delete financial successfully', async () => {
    mock.onDelete(`${END_POINTS.FINANCIALS}3/`).reply(204);

    const response = await deleteFinancial('3');
    expect(response.status).toBe(204);
  });

  it('should throw error when deleteFinancial fails', async () => {
    mock.onDelete(`${END_POINTS.FINANCIALS}3/`).reply(404, {
      detail: 'Not found',
    });

    await expect(deleteFinancial('3')).rejects.toThrow(
      MESSAGES.COMMON.DELETE_FAILED('Financial'),
    );
  });
});
