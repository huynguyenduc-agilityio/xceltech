import axiosMockAdapter from 'axios-mock-adapter';

// Services
import { editInfoUser, getInfoUser, HttpClient } from '@/services';

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

  it('should get info user successfully', async () => {
    const mockResponse = [{ id: 1, firstName: 'John', lastName: 'Doe' }];

    mock.onGet(END_POINTS.USER_DETAIL).reply(200, mockResponse);

    const result = await getInfoUser();

    expect(result).toEqual(mockResponse);
  });

  it('should edit info user successfully', async () => {
    const mockRequest = { id: '1', firstName: 'John', lastName: 'Davis' };

    mock.onPatch(END_POINTS.USER_DETAIL).reply(200, mockRequest);

    const result = await editInfoUser(mockRequest);

    expect(result).toEqual(mockRequest);
  });

  it('should edit info user failed', async () => {
    const mockRequest = { id: '1', firstName: 'John', lastName: 'Davis' };

    mock
      .onGet(END_POINTS.USER_DETAIL)
      .reply(500, MESSAGES.COMMON.UPDATE_FAILED('User'));

    await expect(editInfoUser(mockRequest)).rejects.toThrow(
      MESSAGES.COMMON.UPDATE_FAILED('User'),
    );
  });
});
