import axiosMockAdapter from 'axios-mock-adapter';
import { HttpClient } from '@/services';
import {
  getListFamilies,
  addFamily,
  editFamily,
  deleteFamily,
} from '@/services';
import { END_POINTS, MESSAGES } from '@/constants';
import { IEmployeeFamilyInfo } from '@/types';

describe('familyService', () => {
  let mock: axiosMockAdapter;

  beforeEach(() => {
    mock = new axiosMockAdapter(HttpClient);
  });

  afterEach(() => {
    mock.reset();
  });

  it('should get list of families successfully', async () => {
    const mockData: IEmployeeFamilyInfo[] = [
      {
        id: '1',
        fullName: 'Jane Doe',
        relationship: 'Mother',
        phone: '1234567890',
        address: '123 Main St',
      },
    ];

    mock.onGet(END_POINTS.USER_PROFILE.FAMILIES).reply(200, mockData);

    const result = await getListFamilies();
    expect(result).toEqual(mockData);
  });

  it('should return empty array when response is null', async () => {
    mock.onGet(END_POINTS.USER_PROFILE.FAMILIES).reply(200, null);

    const result = await getListFamilies();
    expect(result).toEqual([]);
  });

  it('should throw error when getListFamilies fails', async () => {
    mock.onGet(END_POINTS.USER_PROFILE.FAMILIES).reply(500, {
      detail: 'Server Error',
    });

    await expect(getListFamilies()).rejects.toThrow('No data found');
  });

  it('should add family successfully', async () => {
    const family: Partial<IEmployeeFamilyInfo> = {
      fullName: 'John Doe',
      relationship: 'Father',
      phone: '0987654321',
      address: '456 Second St',
    };

    const mockResponse = { id: '2', ...family };

    mock.onPost(END_POINTS.USER_PROFILE.FAMILIES).reply(201, mockResponse);

    const result = await addFamily(family);
    expect(result).toEqual(mockResponse);
  });

  it('should handle addFamily failure (without checking error message)', async () => {
    mock.onPost(END_POINTS.USER_PROFILE.FAMILIES).reply(400);

    await expect(addFamily({})).rejects.toThrow();
  });

  it('should edit family successfully', async () => {
    const family: Partial<IEmployeeFamilyInfo> = {
      id: '3',
      fullName: 'Alice Smith',
      phone: '1112223333',
    };

    const mockResponse = {
      id: '3',
      fullName: 'Alice Smith',
      phone: '1112223333',
    };

    mock
      .onPatch(`${END_POINTS.USER_PROFILE.FAMILIES}${family.id}/`)
      .reply(200, mockResponse);

    const result = await editFamily(family);
    expect(result).toEqual(mockResponse);
  });

  it('should throw error when editFamily fails', async () => {
    mock.onPatch(`${END_POINTS.USER_PROFILE.FAMILIES}3/`).reply(400, {
      detail: 'Update failed',
    });

    await expect(editFamily({ id: '3', fullName: 'Invalid' })).rejects.toThrow(
      MESSAGES.COMMON.UPDATE_FAILED('Family'),
    );
  });

  it('should delete family successfully', async () => {
    mock.onDelete(`${END_POINTS.USER_PROFILE.FAMILIES}3/`).reply(204);

    const response = await deleteFamily('3');
    expect(response.status).toBe(204);
  });

  it('should throw error when deleteFamily fails', async () => {
    mock.onDelete(`${END_POINTS.USER_PROFILE.FAMILIES}3/`).reply(404, {
      detail: 'Not found',
    });

    await expect(deleteFamily('3')).rejects.toThrow(
      MESSAGES.COMMON.DELETE_FAILED('Family'),
    );
  });
});
