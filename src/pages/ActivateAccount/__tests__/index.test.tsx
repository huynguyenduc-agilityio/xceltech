import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// Constants
import { AUTHENTICATION_PAGE, MESSAGES } from '@/constants';

// Types
import { ToastStatus } from '@/types';

import ActivateAccount from '..';

let mockSearchParams = new URLSearchParams({
  uidb64: 'mockUid',
  token: 'mockToken',
});
const mockNavigate = jest.fn();
const mockToast = jest.fn();
const mockHandleActivateUser = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useSearchParams: () => [mockSearchParams],
}));

jest.mock('@/hooks', () => ({
  useToast: () => ({ toast: mockToast }),
  useActivateAccount: () => ({
    handleActivateUser: mockHandleActivateUser,
    isActivateLoading: false,
  }),
}));

describe('ActivateAccount', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSearchParams = new URLSearchParams({
      uidb64: 'mockUid',
      token: 'mockToken',
    });
  });

  it('renders correctly and matches snapshot', () => {
    const { container } = render(<ActivateAccount />);
    expect(container).toMatchSnapshot();
  });

  it('activates account successfully and navigates', async () => {
    mockHandleActivateUser.mockResolvedValueOnce(undefined);

    render(<ActivateAccount />);
    fireEvent.click(screen.getByRole('button', { name: /activate/i }));

    await waitFor(() => {
      expect(mockHandleActivateUser).toHaveBeenCalled();
      expect(mockToast).toHaveBeenCalledWith({
        status: ToastStatus.Success,
        title: MESSAGES.AUTHENTICATION.ACTIVATE_SUCCESS,
      });
      expect(mockNavigate).toHaveBeenCalledWith(
        AUTHENTICATION_PAGE.USER_SIGN_IN,
      );
    });
  });

  it('shows error toast on activation failure', async () => {
    mockHandleActivateUser.mockRejectedValueOnce(new Error('Failed'));

    render(<ActivateAccount />);
    fireEvent.click(screen.getByRole('button', { name: /activate/i }));

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        status: ToastStatus.Error,
        title: MESSAGES.AUTHENTICATION.ACTIVATE_FAILED,
      });
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  it('shows error toast when uidb64 or token is missing', async () => {
    mockSearchParams = new URLSearchParams();

    render(<ActivateAccount />);
    fireEvent.click(screen.getByRole('button', { name: /activate/i }));

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        status: ToastStatus.Error,
        title: 'Invalid activation',
      });
      expect(mockHandleActivateUser).not.toHaveBeenCalled();
    });
  });
});
