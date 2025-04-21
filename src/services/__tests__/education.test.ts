import axiosMockAdapter from 'axios-mock-adapter';
import { HttpClient } from '@/services';
import {
  getListEducations,
  addEducation,
  editEducation,
  deleteEducation,
} from '@/services';

import { END_POINTS, MESSAGES } from '@/constants';
import { IEmployeeEducationInfo } from '@/types';

describe('educationService', () => {
  let mock: axiosMockAdapter;

  beforeEach(() => {
    mock = new axiosMockAdapter(HttpClient);
  });

  afterEach(() => {
    mock.reset();
  });

  it('should get list of educations successfully', async () => {
    const mockData: IEmployeeEducationInfo[] = [
      {
        id: '1',
        name: 'Harvard University',
        course: 'Computer Science',
        startDate: '2015-09-01',
        department: 'Engineering',
        location: 'USA',
        endDate: '2019-06-01',
        description: 'Studied advanced computer science topics.',
      },
    ];

    mock.onGet(END_POINTS.EDUCATIONS).reply(200, mockData);

    const result = await getListEducations();
    expect(result).toEqual(mockData);
  });

  it('should return empty array when response is null', async () => {
    mock.onGet(END_POINTS.EDUCATIONS).reply(200, null);

    const result = await getListEducations();
    expect(result).toEqual([]);
  });

  it('should throw error when getListEducations fails', async () => {
    mock.onGet(END_POINTS.EDUCATIONS).reply(500, {
      detail: 'No data found',
    });

    await expect(getListEducations()).rejects.toThrow('No data found');
  });

  it('should add education successfully', async () => {
    const education: Partial<IEmployeeEducationInfo> = {
      name: 'MIT',
      course: 'AI',
      startDate: '2020-01-01',
      endDate: '2022-01-01',
      department: 'CS',
      location: 'USA',
      description: 'Master in Artificial Intelligence',
    };

    const mockResponse = { id: '2', ...education };

    mock.onPost(END_POINTS.EDUCATIONS).reply(201, mockResponse);

    const result = await addEducation(education);
    expect(result).toEqual(mockResponse);
  });

  it('should throw error when addEducation fails', async () => {
    mock.onPost(END_POINTS.EDUCATIONS).reply(400, {
      detail: 'Invalid data',
    });

    await expect(addEducation({})).rejects.toBeInstanceOf(Error);
  });

  it('should edit education successfully', async () => {
    const education: Partial<IEmployeeEducationInfo> = {
      id: '3',
      name: 'Stanford University',
    };

    const mockResponse = {
      id: '3',
      name: 'Stanford University',
    };

    mock
      .onPatch(`${END_POINTS.EDUCATIONS}${education.id}/`)
      .reply(200, mockResponse);

    const result = await editEducation(education);
    expect(result).toEqual(mockResponse);
  });

  it('should throw error when editEducation fails', async () => {
    mock.onPatch(`${END_POINTS.EDUCATIONS}3/`).reply(400, {
      detail: 'Update failed',
    });

    await expect(
      editEducation({ id: '3', name: 'Invalid University' }),
    ).rejects.toThrow(MESSAGES.COMMON.UPDATE_FAILED('Education'));
  });

  it('should delete education successfully', async () => {
    mock.onDelete(`${END_POINTS.EDUCATIONS}3/`).reply(204);

    const response = await deleteEducation('3');
    expect(response.status).toBe(204);
  });

  it('should throw error when deleteEducation fails', async () => {
    mock.onDelete(`${END_POINTS.EDUCATIONS}3/`).reply(404, {
      detail: 'Not found',
    });

    await expect(deleteEducation('3')).rejects.toThrow(
      MESSAGES.COMMON.DELETE_FAILED('Education'),
    );
  });
});
