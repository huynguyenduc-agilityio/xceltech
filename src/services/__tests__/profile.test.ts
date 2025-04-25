import axiosMockAdapter from 'axios-mock-adapter';

// Services
import { getListJobs, HttpClient } from '@/services';

// Constants
import { END_POINTS, MESSAGES } from '@/constants';

describe('profileService', () => {
  let mock: axiosMockAdapter;

  beforeEach(() => {
    mock = new axiosMockAdapter(HttpClient);
  });

  afterEach(() => {
    mock.reset();
  });

  it('should get list jobs successfully', async () => {
    const mockResponse = [{ id: 1, job: 'Developer' }];

    mock.onGet(END_POINTS.USER_PROFILE.JOBS).reply(200, mockResponse);

    const result = await getListJobs();

    expect(result).toEqual(mockResponse);
  });

  it('should return empty array if response data is undefined', async () => {
    mock.onGet(END_POINTS.USER_PROFILE.JOBS).reply(200);

    const result = await getListJobs();

    expect(result).toEqual([]);
  });

  it('should handle error when getting list jobs', async () => {
    mock
      .onGet(END_POINTS.USER_PROFILE.JOBS)
      .reply(500, { message: MESSAGES.COMMON.EMPTY_DATA });

    await expect(getListJobs()).rejects.toThrow(MESSAGES.COMMON.EMPTY_DATA);
  });
});
