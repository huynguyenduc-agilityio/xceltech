import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { MutationType } from '@/types';

// Components
import FinancialForm from '..';

// Hooks
import { useFinancialMutation, useToast } from '@/hooks';

const queryClient = new QueryClient();
const mockHandleFinancialMutation = jest.fn();
const mockHandleFinancialMutationError = jest
  .fn()
  .mockRejectedValue(new Error('Network error'));
const mockToast = jest.fn();
const mockDataEdit = {
  id: '1',
  bankName: 'Test Bank',
  accountNo: 1234567890,
  accountName: 'John Doe',
};

jest.mock('@/hooks', () => ({
  useToast: jest.fn(),
  useFinancialMutation: jest.fn(),
}));

const renderComponent = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <FinancialForm mode={MutationType.Edit} />
    </QueryClientProvider>,
  );
};

describe('FinancialForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
    (useFinancialMutation as jest.Mock).mockReturnValue({
      isFamilyMutationLoading: false,
      handleFinancialMutation: mockHandleFinancialMutation,
    });
  });

  it('should match snapshot', () => {
    const container = renderComponent();

    expect(container).toMatchSnapshot();
  });

  it('handle input value change and form add submit', async () => {
    const { getByPlaceholderText, getByRole } = render(
      <QueryClientProvider client={queryClient}>
        <FinancialForm mode={MutationType.Create} />
      </QueryClientProvider>,
    );
    const bankName = getByPlaceholderText('Enter your bank name');
    const accountNo = getByPlaceholderText('Enter your account number');
    const accountName = getByPlaceholderText('Enter your account name');
    const submitButton = getByRole('button', {
      name: 'Add Account Details',
    });

    fireEvent.change(bankName, { target: { value: 'Test Bank' } });
    fireEvent.change(accountNo, { target: { value: 1234567890 } });
    fireEvent.change(accountName, { target: { value: 'John Doe' } });

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockHandleFinancialMutation).toHaveBeenCalled();
    });
  });

  it('handle input value change and form edit submit', async () => {
    const { getByPlaceholderText, getByRole } = render(
      <QueryClientProvider client={queryClient}>
        <FinancialForm mode={MutationType.Edit} initialValues={mockDataEdit} />
      </QueryClientProvider>,
    );
    const bankName = getByPlaceholderText('Enter your bank name');
    const accountNo = getByPlaceholderText('Enter your account number');
    const accountName = getByPlaceholderText('Enter your account name');
    const submitButton = getByRole('button', {
      name: 'Update Account Details',
    });

    fireEvent.change(bankName, { target: { value: 'Test Bank' } });
    fireEvent.change(accountNo, { target: { value: 1234567891 } });
    fireEvent.change(accountName, { target: { value: 'John Doe' } });

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockHandleFinancialMutation).toHaveBeenCalled();
    });
  });

  it('handles form add submit error gracefully', async () => {
    (useFinancialMutation as jest.Mock).mockReturnValue({
      isLoading: false,
      handleFinancialMutation: mockHandleFinancialMutationError,
    });

    const { getByPlaceholderText, getByRole } = render(
      <QueryClientProvider client={queryClient}>
        <FinancialForm mode={MutationType.Create} />
      </QueryClientProvider>,
    );
    const bankName = getByPlaceholderText('Enter your bank name');
    const accountNo = getByPlaceholderText('Enter your account number');
    const accountName = getByPlaceholderText('Enter your account name');
    const submitButton = getByRole('button', {
      name: 'Add Account Details',
    });

    fireEvent.change(bankName, { target: { value: 'Test Bank' } });
    fireEvent.change(accountNo, { target: { value: 1234567890 } });
    fireEvent.change(accountName, { target: { value: 'John Doe' } });

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalled();
    });
  });

  it('handles form edit submit error gracefully', async () => {
    (useFinancialMutation as jest.Mock).mockReturnValue({
      isLoading: false,
      handleFinancialMutation: mockHandleFinancialMutationError,
    });

    const { getByPlaceholderText, getByRole } = render(
      <QueryClientProvider client={queryClient}>
        <FinancialForm mode={MutationType.Edit} initialValues={mockDataEdit} />
      </QueryClientProvider>,
    );
    const bankName = getByPlaceholderText('Enter your bank name');
    const accountNo = getByPlaceholderText('Enter your account number');
    const accountName = getByPlaceholderText('Enter your account name');
    const submitButton = getByRole('button', {
      name: 'Update Account Details',
    });

    fireEvent.change(bankName, { target: { value: 'Test Bank' } });
    fireEvent.change(accountNo, { target: { value: 1234567891 } });
    fireEvent.change(accountName, { target: { value: 'John Doe' } });

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalled();
    });
  });

  it('should show error message fields', async () => {
    const { getByPlaceholderText, getByText } = renderComponent();
    const bankName = getByPlaceholderText('Enter your bank name');
    const accountNo = getByPlaceholderText('Enter your account number');
    const accountName = getByPlaceholderText('Enter your account name');

    fireEvent.change(bankName, { target: { value: '' } });
    fireEvent.change(accountNo, { target: { value: '' } });
    fireEvent.change(accountName, { target: { value: '' } });

    fireEvent.blur(bankName);
    fireEvent.blur(accountNo);
    fireEvent.blur(accountName);

    await waitFor(() => {
      expect(getByText('Bank Name is required!')).toBeInTheDocument();
      expect(getByText('Account No is required!')).toBeInTheDocument();
      expect(getByText('Account Name is required!')).toBeInTheDocument();
    });
  });
});
