import axiosMockAdapter from 'axios-mock-adapter';

// Services
import { getAccounts, HttpClient } from '@/services';

// Constants
import { END_POINTS } from '@/constants';

describe('accountService', () => {
  let mock: axiosMockAdapter;

  beforeEach(() => {
    mock = new axiosMockAdapter(HttpClient);
  });

  afterEach(() => {
    mock.reset();
  });

  it('should get accounts successfully', async () => {
    const mockResponse = { accounts: [{ id: 1, username: 'john.doe' }] };

    mock.onGet(END_POINTS.ACCOUNTS.BASE).reply(200, mockResponse);

    const result = await getAccounts();

    expect(result).toEqual(mockResponse);
  });

  it('should handle error when getting accounts', async () => {
    mock
      .onGet(END_POINTS.ACCOUNTS.BASE)
      .reply(500, { message: 'Internal Server Error' });

    await expect(getAccounts()).rejects.toThrow(
      'Request failed with status code 500',
    );
  });
});
