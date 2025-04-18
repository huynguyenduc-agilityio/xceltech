import { jwtDecode } from 'jwt-decode';
import axiosMockAdapter from 'axios-mock-adapter';

// Services
import httpClient from '../httpClient';

// Constants
import { USER_KEY } from '@/constants';

jest.mock('jwt-decode', () => ({
  jwtDecode: jest.fn(),
}));

describe('httpClient', () => {
  let mock: axiosMockAdapter;

  beforeEach(() => {
    mock = new axiosMockAdapter(httpClient);
  });

  afterEach(() => {
    mock.reset();
  });

  afterEach(() => {
    mock.reset();
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('attaches Authorization header if token is valid', async () => {
    const token = 'valid.token';
    const futureExp = Math.floor(Date.now() / 1000) + 3600;
    (jwtDecode as jest.Mock).mockReturnValue({ exp: futureExp });

    localStorage.setItem(
      USER_KEY,
      JSON.stringify({ state: { authUser: { access: token } } }),
    );

    mock.onGet('/test').reply((config) => {
      expect(config.headers?.Authorization).toBe(`Bearer ${token}`);
      return [200, { ok: true }];
    });

    const res = await httpClient.get('/test');
    expect(res.data).toEqual({ ok: true });
  });

  it('removes token and rejects if expired', async () => {
    const expiredExp = Math.floor(Date.now() / 1000) - 10;
    (jwtDecode as jest.Mock).mockReturnValue({ exp: expiredExp });

    localStorage.setItem(
      USER_KEY,
      JSON.stringify({ state: { authUser: { access: 'expired.token' } } }),
    );

    await expect(httpClient.get('/test')).rejects.toEqual(
      'Access token expired',
    );
    expect(localStorage.getItem(USER_KEY)).toBeNull();
  });

  it('skips Authorization header if no token exists', async () => {
    mock.onGet('/test').reply((config) => {
      expect(config.headers?.Authorization).toBeUndefined();
      return [200, { result: true }];
    });

    const res = await httpClient.get('/test');
    expect(res.data).toEqual({ result: true });
  });

  it('serializes array params correctly', () => {
    const uri = httpClient.getUri({
      url: '/test',
      params: { ids: [1, 2], status: 'open' },
    });

    expect(uri).toContain('ids=1%2C2');
    expect(uri).toContain('status=open');
  });
});
