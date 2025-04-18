import axiosMockAdapter from 'axios-mock-adapter';

// Services
import {
  activateAccount,
  HttpClient,
  loginUser,
  registerUser,
} from '@/services';

// Constants
import { END_POINTS } from '@/constants';

// Types
import { IRegisterUser } from '@/types';

describe('authService', () => {
  let mock: axiosMockAdapter;

  beforeEach(() => {
    mock = new axiosMockAdapter(HttpClient);
  });

  afterEach(() => {
    mock.reset();
  });

  it('should login user successfully', async () => {
    const user = { email: 'john.doe@gmail.com', password: 'password' };
    const mockAuthResponse = { token: 'mock_token' };

    mock.onPost(END_POINTS.LOGIN).reply(200, mockAuthResponse);

    const result = await loginUser(user);

    expect(result).toEqual(mockAuthResponse);
  });

  it('should register user successfully', async () => {
    const user: IRegisterUser = {
      firstName: 'Jane',
      lastName: 'Doe',
      phone: '1234567890',
      confirmPassword: 'password',
      password: 'password',
      email: 'jane@doe.com',
    };
    const mockRegisterResponse = { id: '1', username: 'jane.doe' };

    mock.onPost(END_POINTS.REGISTER).reply(200, mockRegisterResponse);

    const result = await registerUser(user);

    expect(result).toEqual(mockRegisterResponse);
  });

  it('should activate user account successfully', async () => {
    const mockActivateResponse = { success: true };
    const uidb64 = 'some_uidb64';
    const token = 'some_token';

    mock
      .onGet(`${END_POINTS.ACTIVE}/${uidb64}/${token}/`)
      .reply(200, mockActivateResponse);

    const result = await activateAccount({ uidb64, token });

    expect(result).toEqual(mockActivateResponse);
  });

  it('should handle login failure gracefully', async () => {
    const user = { email: 'wrong.user@gmail.com', password: 'wrongpassword' };

    mock
      .onPost(END_POINTS.LOGIN)
      .reply(400, { message: 'Invalid credentials' });

    await expect(loginUser(user)).rejects.toThrow(
      'Request failed with status code 400',
    );
  });

  it('should handle activation failure gracefully', async () => {
    const uidb64 = 'invalid_uidb64';
    const token = 'invalid_token';

    mock
      .onGet(`${END_POINTS.ACTIVE}/${uidb64}/${token}/`)
      .reply(400, { message: 'Activation failed' });

    await expect(activateAccount({ uidb64, token })).rejects.toThrow(
      'Request failed with status code 400',
    );
  });
});
