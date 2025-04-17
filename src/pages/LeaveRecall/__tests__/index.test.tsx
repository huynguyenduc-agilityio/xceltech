import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LeaveRecall from '@/pages/LeaveRecall';
import { BrowserRouter } from 'react-router-dom';
import { StatusLeave, ToastStatus } from '@/types';
import { MESSAGES } from '@/constants';

const mockToast = jest.fn();
const mockHandleUpdateStatusRecall = jest.fn();
const mockHandleUpdateNotification = jest.fn();
const mockIsUpdateLoading = false;
const mockNotification = {
  message: 'You are requested to come back.',
  recallId: 'recall-123',
};

jest.mock('@/hooks', () => ({
  ...jest.requireActual('@/hooks'),
  useToast: () => ({ toast: mockToast }),
  useUpdateStatusRecall: () => ({
    handleUpdateStatusRecall: mockHandleUpdateStatusRecall,
    isUpdateLoading: mockIsUpdateLoading,
  }),
  useUpdateNotification: () => ({
    handleUpdateNotification: mockHandleUpdateNotification,
  }),
  useGetNotification: () => ({
    isNotificationLoading: false,
    notification: mockNotification,
  }),
}));

jest.mock('@/stores', () => ({
  ...jest.requireActual('@/stores'),
  useUser: () => ({ user: { username: 'JohnDoe' } }),
}));

const renderWithRouter = () => {
  return render(
    <BrowserRouter>
      <LeaveRecall />
    </BrowserRouter>,
  );
};

describe('LeaveRecall', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders notification and handles textarea', async () => {
    renderWithRouter();

    expect(screen.getByText(/Dear JohnDoe/i)).toBeInTheDocument();
    expect(
      screen.getByText(/You are requested to come back./i),
    ).toBeInTheDocument();

    const textarea = screen.getByPlaceholderText(/State your reason/i);

    await userEvent.type(textarea, 'Because I cannot');

    expect(textarea).toHaveValue('Because I cannot');
  });

  it('toggles Approve and Decline buttons based on reason', async () => {
    renderWithRouter();

    const approveBtn = screen.getByRole('button', { name: /Approve/i });
    const declineBtn = screen.getByRole('button', { name: /Decline/i });

    expect(approveBtn).toBeEnabled();
    expect(declineBtn).toBeDisabled();

    await userEvent.type(
      screen.getByPlaceholderText(/State your reason/i),
      'Unavailable',
    );

    expect(approveBtn).toBeDisabled();
    expect(declineBtn).toBeEnabled();
  });

  it('calls update and toast on Approve when no reason is provided', async () => {
    renderWithRouter();

    const approveBtn = screen.getByRole('button', { name: /Approve/i });
    expect(approveBtn).toBeEnabled();

    await userEvent.click(approveBtn);

    await waitFor(() => {
      expect(mockHandleUpdateStatusRecall).toHaveBeenCalledWith({
        recallId: 'recall-123',
        recallStatus: StatusLeave.Approved,
        recallReason: '',
      });

      expect(mockHandleUpdateNotification).toHaveBeenCalledWith({
        id: '',
        isRead: true,
      });

      expect(mockToast).toHaveBeenCalledWith({
        status: ToastStatus.Success,
        title: MESSAGES.LEAVE_RECALL.UPDATE_STATUS_SUCCESS('approved'),
      });
    });
  });

  it('calls error toast if handleUpdateStatusRecall throws', async () => {
    mockHandleUpdateStatusRecall.mockRejectedValueOnce(new Error('Failed'));

    renderWithRouter();
    const approveBtn = screen.getByRole('button', { name: /Approve/i });

    expect(approveBtn).toBeEnabled();
    await userEvent.click(approveBtn);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        status: ToastStatus.Error,
        title: MESSAGES.LEAVE_RECALL.UPDATE_STATUS_FAILED('approved'),
      });
    });
  });
});
