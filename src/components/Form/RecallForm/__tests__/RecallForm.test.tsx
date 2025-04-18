import { render, fireEvent, waitFor } from '@testing-library/react';

// Hooks
import { useUpdateLeaveRecallRequest, useToast } from '@/hooks';

// Types
import { StatusLeave, ToastStatus } from '@/types';

// Components
import RecallForm from '..';
import userEvent from '@testing-library/user-event';

jest.mock('react-hook-form', () => {
  const actual = jest.requireActual('react-hook-form');
  return {
    ...actual,
    useForm: jest.fn(actual.useForm),
  };
});

jest.mock('@/components', () => {
  const originalModule = jest.requireActual('@/components');
  return {
    ...originalModule,
    DatePicker: ({
      date,
      onSelect,
    }: {
      date: Date | undefined;
      onSelect: (date: Date) => void;
    }) => (
      <input
        type="date"
        value={date?.toISOString().slice(0, 10)}
        onChange={(e) => onSelect(new Date(e.target.value))}
        data-testid="mock-datepicker"
      />
    ),
  };
});

jest.mock('@/hooks', () => ({
  useToast: jest.fn(),
  useUpdateLeaveRecallRequest: jest.fn(),
}));

const mockOnClose = jest.fn();
const mockToast = jest.fn();
const mockHandleUpdateRecallRequest = jest.fn();

const initialValues = {
  id: '123',
  employeeName: 'John Doe',
  department: 'Engineering',
  startDate: new Date('2024-01-01'),
  endDate: new Date('2024-01-10'),
  recallDate: new Date('2024-01-05'),
  reliefOfficerFirstName: 'Jane',
  reliefOfficerLastName: 'Smith',
};

const renderComponent = () => {
  return render(
    <RecallForm initialValues={initialValues} onClose={mockOnClose} />,
  );
};

describe('RecallForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
    (useUpdateLeaveRecallRequest as jest.Mock).mockReturnValue({
      isLoading: false,
      handleUpdateRecallRequest: mockHandleUpdateRecallRequest,
    });
  });

  it('renders when initialValues are no data', () => {
    const { container } = render(<RecallForm onClose={mockOnClose} />);

    expect(container).toBeInTheDocument();
  });

  it('renders all fields correctly', () => {
    const { getByText, getByDisplayValue } = renderComponent();

    expect(getByText('Leave Recall')).toBeInTheDocument();
    expect(getByDisplayValue('John Doe')).toBeInTheDocument();
    expect(getByDisplayValue('Engineering')).toBeInTheDocument();
    expect(getByDisplayValue('Jane Smith')).toBeInTheDocument();
    expect(getByText('Initiate Recall')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
  });

  it('disables submit button initially', () => {
    const { getByText } = renderComponent();
    const submitButton = getByText('Initiate Recall') as HTMLButtonElement;

    expect(submitButton.disabled).toBe(true);
  });

  it('calls onClose when cancel is clicked', () => {
    const { getByText } = renderComponent();
    fireEvent.click(getByText('Cancel'));

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('submits form and calls handleUpdateRecallRequest', async () => {
    const { getByText, getAllByTestId } = renderComponent();

    const submitButton = getByText('Initiate Recall') as HTMLButtonElement;

    fireEvent.change(getAllByTestId('mock-datepicker')[0], {
      target: { value: '2024-01-05' },
    });

    await waitFor(() => {
      expect(submitButton.disabled).toBe(false);
    });

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockHandleUpdateRecallRequest).toHaveBeenCalledWith({
        leaveId: '123',
        data: {
          recallDate: '2024-01-05',
          isRecalled: true,
          recallStatus: StatusLeave.Pending,
        },
      });

      expect(mockToast).toHaveBeenCalledWith({
        status: ToastStatus.Success,
        title: expect.any(String),
      });

      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it('handles submit error gracefully', async () => {
    (useUpdateLeaveRecallRequest as jest.Mock).mockResolvedValue({
      isLoading: false,
      handleUpdateRecallRequest: jest
        .fn()
        .mockRejectedValue(new Error('Network error')),
    });

    const { getByText, getAllByTestId } = renderComponent();
    const submitButton = getByText('Initiate Recall') as HTMLButtonElement;
    fireEvent.change(getAllByTestId('mock-datepicker')[0], {
      target: { value: '2024-01-05' },
    });

    await waitFor(() => {
      expect(submitButton.disabled).toBe(false);
    });

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalled();
    });
  });
});
