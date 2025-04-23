import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { MemoryRouter, useParams } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

// Components
import LeaveForm from '..';

// Hooks
import { useGetLeaveAccounts, useLeaveMutation, useToast } from '@/hooks';

// Mocks
import { mockDataAccounts } from '@/__mocks__';

const queryClient = new QueryClient();
const mockHandleLeaveMutation = jest.fn();
const mockHandleLeaveMutationError = jest
  .fn()
  .mockRejectedValue(new Error('Network error'));
const mockToast = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

jest.mock('@/hooks', () => ({
  useToast: jest.fn(),
  useLeaveMutation: jest.fn(),
  useGetLeaveAccounts: jest.fn(),
}));

const renderComponent = () => {
  return render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <LeaveForm />
      </QueryClientProvider>
    </MemoryRouter>,
  );
};

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
        title="Mock DatePicker"
      />
    ),
  };
});

const mockInitialValues = {
  id: '1',
  startDate: new Date('2025-04-15'),
  endDate: new Date('2025-04-30'),
  reason: 'Vacation',
  status: 'Pending',
};

describe('LeaveForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
    (useLeaveMutation as jest.Mock).mockReturnValue({
      isLeaveMutationLoading: false,
      handleLeaveMutation: mockHandleLeaveMutation,
    });
    (useGetLeaveAccounts as jest.Mock).mockReturnValue({
      isLeaveAccountsLoading: false,
      leaveAccounts: mockDataAccounts,
    });
  });

  it('should match snapshot', () => {
    (useParams as jest.Mock).mockReturnValue({});
    const { container, getAllByTitle } = renderComponent();

    fireEvent.change(getAllByTitle('Mock DatePicker')[0], {
      target: { value: '2025-05-05' },
    });

    fireEvent.change(getAllByTitle('Mock DatePicker')[1], {
      target: { value: '2025-05-10' },
    });

    fireEvent.change(getAllByTitle('Mock DatePicker')[2], {
      target: { value: '2025-05-12' },
    });

    expect(container).toMatchSnapshot();
  });

  it('should render edit form', () => {
    const { container } = render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <LeaveForm initialValues={mockInitialValues} />
        </QueryClientProvider>
      </MemoryRouter>,
    );

    expect(container).toBeInTheDocument();
  });

  it('submits form add and calls handleLeaveMutation', async () => {
    (useParams as jest.Mock).mockReturnValue({});

    const {
      getByRole,
      getByPlaceholderText,
      container,
      getByDisplayValue,
      getAllByTitle,
    } = renderComponent();

    const reasonInput = getByPlaceholderText('Enter your reason');
    const selectElement = container.querySelector(
      'select[name="reliefOfficer"]',
    ) as HTMLSelectElement;
    const submitButton = getByRole('button', { name: 'Submit' });

    fireEvent.change(reasonInput, { target: { value: 'Vacation' } });

    fireEvent.change(selectElement, {
      target: { value: '5d8d8eda-47f4-4b2d-ac2c-c4a3012f43b8' },
    });

    fireEvent.change(getAllByTitle('Mock DatePicker')[0], {
      target: { value: '2025-05-05' },
    });

    fireEvent.change(getAllByTitle('Mock DatePicker')[1], {
      target: { value: '2025-05-10' },
    });

    fireEvent.change(getAllByTitle('Mock DatePicker')[2], {
      target: { value: '2025-05-11' },
    });

    expect(getByDisplayValue('Nhan tran')).toBeInTheDocument();

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockHandleLeaveMutation).toHaveBeenCalled();
    });
  });

  it('submits form edit and calls handleLeaveMutation', async () => {
    const { getByRole, getByPlaceholderText, container, getByDisplayValue } =
      renderComponent();

    const reasonInput = getByPlaceholderText('Enter your reason');
    const selectElement = container.querySelector(
      'select[name="reliefOfficer"]',
    ) as HTMLSelectElement;
    const submitButton = getByRole('button', { name: 'Submit' });

    fireEvent.change(reasonInput, { target: { value: 'New Vacation' } });

    fireEvent.change(selectElement, {
      target: { value: '5d8d8eda-47f4-4b2d-ac2c-c4a3012f43b8' },
    });

    expect(getByDisplayValue('Nhan tran')).toBeInTheDocument();

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockHandleLeaveMutation).toHaveBeenCalled();
    });
  });

  it('handle called reset form', async () => {
    const { getByRole, getByPlaceholderText, container, getByDisplayValue } =
      renderComponent();

    const reasonInput = getByPlaceholderText('Enter your reason');
    const selectElement = container.querySelector(
      'select[name="reliefOfficer"]',
    ) as HTMLSelectElement;
    const resetButton = getByRole('button', { name: 'Reset' });

    fireEvent.change(reasonInput, { target: { value: 'New Vacation' } });

    fireEvent.change(selectElement, {
      target: { value: '5d8d8eda-47f4-4b2d-ac2c-c4a3012f43b8' },
    });

    expect(getByDisplayValue('Nhan tran')).toBeInTheDocument();

    await userEvent.click(resetButton);

    await waitFor(() => {
      expect(mockHandleLeaveMutation).not.toHaveBeenCalled();
    });
  });

  it('handles submit error gracefully', async () => {
    (useParams as jest.Mock).mockReturnValue({});
    (useLeaveMutation as jest.Mock).mockReturnValue({
      isLeaveMutationLoading: false,
      handleLeaveMutation: mockHandleLeaveMutationError,
    });

    const { getByRole, getByPlaceholderText, container, getByDisplayValue } =
      renderComponent();

    const reasonInput = getByPlaceholderText('Enter your reason');
    const selectElement = container.querySelector(
      'select[name="reliefOfficer"]',
    ) as HTMLSelectElement;
    const submitButton = getByRole('button', { name: 'Submit' });

    fireEvent.change(reasonInput, { target: { value: 'Vacation' } });

    fireEvent.change(selectElement, {
      target: { value: '5d8d8eda-47f4-4b2d-ac2c-c4a3012f43b8' },
    });

    expect(getByDisplayValue('Nhan tran')).toBeInTheDocument();

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalled();
    });
  });
});
