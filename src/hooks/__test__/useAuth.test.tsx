import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, useLocation, useNavigate } from 'react-router-dom';

// Hooks
import { useLogin, useRegister, useActivateAccount } from '@/hooks';

// Services
import { activateAccount, loginUser, registerUser } from '@/services';

// Stores
import { useUserActions } from '@/stores';

// Constants
import { AUTHENTICATION_PAGE, RoleAuthentication } from '@/constants';

jest.mock('@/services');
jest.mock('@/stores');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

const mockNavigate = jest.fn();
const mockSetUser = jest.fn();
const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <MemoryRouter>{children}</MemoryRouter>
  </QueryClientProvider>
);

describe('useLogin', () => {
  beforeEach(() => {
    (useUserActions as jest.Mock).mockReturnValue({
      setUser: mockSetUser,
    });
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('logs in as Admin and navigates to admin dashboard', async () => {
    const mockData = {
      user: { role: RoleAuthentication.Admin },
    };
    (loginUser as jest.Mock).mockResolvedValue(mockData);
    (useLocation as jest.Mock).mockReturnValue({
      pathname: AUTHENTICATION_PAGE.ADMIN_SIGN_IN,
    });

    const { result } = renderHook(() => useLogin(), { wrapper });

    await act(async () => {
      await result.current.handleLoginUser({
        email: 'admin@gmail.com',
        password: '1@DZXcvb',
      });
    });

    expect(mockSetUser).toHaveBeenCalledWith(mockData);
    expect(mockNavigate).toHaveBeenCalledWith('/admin/dashboard');
  });

  it('logs in as User and navigates to user dashboard', async () => {
    const mockData = {
      user: { role: RoleAuthentication.Employee },
    };
    (loginUser as jest.Mock).mockResolvedValue(mockData);
    (useLocation as jest.Mock).mockReturnValue({
      pathname: AUTHENTICATION_PAGE.USER_SIGN_IN,
    });

    const { result } = renderHook(() => useLogin(), { wrapper });

    await act(async () => {
      await result.current.handleLoginUser({
        email: 'admin@gmail.com',
        password: '1@DZXcvb',
      });
    });

    expect(mockSetUser).toHaveBeenCalledWith(mockData);
    expect(mockNavigate).toHaveBeenCalledWith('/user/dashboard');
  });
});

describe('useRegister', () => {
  it('calls registerUser service', async () => {
    const registerUserMock = registerUser as jest.Mock;
    registerUserMock.mockResolvedValue({ message: 'Success' });

    const { result } = renderHook(() => useRegister(), { wrapper });

    await act(async () => {
      await result.current.handleRegisterUser({
        firstName: 'admin',
        lastName: 'vo',
        phone: '0941321231',
        confirmPassword: '1@DZXcvb',
        email: 'admin@gmail.com',
        password: '1@DZXcvb',
      });
    });

    expect(registerUserMock).toHaveBeenCalled();
  });
});

describe('useActivateAccount', () => {
  it('activates account with uidb64 and token', async () => {
    const activateMock = activateAccount as jest.Mock;
    activateMock.mockResolvedValue({ success: true });

    const { result } = renderHook(
      () =>
        useActivateAccount({
          uidb64: 'uid123',
          token: 'token123',
        }),
      { wrapper },
    );

    await act(async () => {
      await result.current.handleActivateUser();
    });

    expect(activateMock).toHaveBeenCalledWith({
      uidb64: 'uid123',
      token: 'token123',
    });
  });
});
