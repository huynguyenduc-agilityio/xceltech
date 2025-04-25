import axiosMockAdapter from 'axios-mock-adapter';
import { HttpClient } from '@/services';
import {
  getListGuarantors,
  addGuarantor,
  editGuarantor,
  deleteGuarantor,
} from '@/services';

import { END_POINTS, MESSAGES } from '@/constants';
import { IEmployeeGuarantor } from '@/types';

describe('guarantorService', () => {
  let mock: axiosMockAdapter;

  beforeEach(() => {
    mock = new axiosMockAdapter(HttpClient);
  });

  afterEach(() => {
    mock.reset();
  });

  it('should get list of guarantors successfully', async () => {
    const mockData: IEmployeeGuarantor[] = [
      {
        id: '1',
        name: 'Jane Doe',
        phone: '123456789',
        job: 'Software Engineer',
      },
    ];

    mock.onGet(END_POINTS.USER_PROFILE.GUARANTORS).reply(200, mockData);

    const result = await getListGuarantors();
    expect(result).toEqual(mockData);
  });

  it('should return empty array when response is null', async () => {
    mock.onGet(END_POINTS.USER_PROFILE.GUARANTORS).reply(200, null);

    const result = await getListGuarantors();
    expect(result).toEqual([]);
  });

  it('should throw error when getListGuarantors fails', async () => {
    mock.onGet(END_POINTS.USER_PROFILE.GUARANTORS).reply(500, {
      detail: 'Server Error',
    });

    await expect(getListGuarantors()).rejects.toThrow('No data found');
  });

  it('should add guarantor successfully', async () => {
    const guarantor: Partial<IEmployeeGuarantor> = {
      name: 'John Doe',
      phone: '987654321',
      job: 'Project Manager',
    };

    const mockResponse = { id: '2', ...guarantor };

    mock.onPost(END_POINTS.USER_PROFILE.GUARANTORS).reply(201, mockResponse);

    const result = await addGuarantor(guarantor);
    expect(result).toEqual(mockResponse);
  });

  it('should throw error when addGuarantor fails', async () => {
    mock.onPost(END_POINTS.USER_PROFILE.GUARANTORS).reply(400, {
      detail: 'Invalid data',
    });

    await expect(addGuarantor({})).rejects.toBeInstanceOf(Error);
  });

  it('should edit guarantor successfully', async () => {
    const guarantor: Partial<IEmployeeGuarantor> = {
      id: '3',
      name: 'Sarah Smith',
    };

    const mockResponse = {
      id: '3',
      name: 'Sarah Smith',
    };

    mock
      .onPatch(`${END_POINTS.USER_PROFILE.GUARANTORS}${guarantor.id}/`)
      .reply(200, mockResponse);

    const result = await editGuarantor(guarantor);
    expect(result).toEqual(mockResponse);
  });

  it('should throw error when editGuarantor fails', async () => {
    mock.onPatch(`${END_POINTS.USER_PROFILE.GUARANTORS}3/`).reply(400, {
      detail: 'Update failed',
    });

    await expect(editGuarantor({ id: '3', name: 'Invalid' })).rejects.toThrow(
      MESSAGES.COMMON.UPDATE_FAILED('Guarantor'),
    );
  });

  it('should delete guarantor successfully', async () => {
    mock.onDelete(`${END_POINTS.USER_PROFILE.GUARANTORS}3/`).reply(204);

    const response = await deleteGuarantor('3');
    expect(response.status).toBe(204);
  });

  it('should throw error when deleteGuarantor fails', async () => {
    mock.onDelete(`${END_POINTS.USER_PROFILE.GUARANTORS}3/`).reply(404, {
      detail: 'Not found',
    });

    await expect(deleteGuarantor('3')).rejects.toThrow(
      MESSAGES.COMMON.DELETE_FAILED('Guarantor'),
    );
  });
});
