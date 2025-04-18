import { fireEvent, render, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { MutationType } from '@/types';

// Components
import FinancialForm from '..';

const renderComponent = () => {
  const queryClient = new QueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <FinancialForm mode={MutationType.Edit} />
    </QueryClientProvider>,
  );
};

describe('FinancialForm Component', () => {
  it('should match snapshot', () => {
    const container = renderComponent();

    expect(container).toMatchSnapshot();
  });

  it('handle input value change and form submit', () => {
    const { getByPlaceholderText, getByRole } = renderComponent();
    const bankName = getByPlaceholderText('Enter your bank name');
    const accountNo = getByPlaceholderText('Enter your account number');
    const accountName = getByPlaceholderText('Enter your account name');
    const submitButton = getByRole('button', {
      name: 'Update Account Details',
    });

    fireEvent.change(bankName, { target: { value: 'Test Bank' } });
    fireEvent.change(accountNo, { target: { value: 1234567890 } });
    fireEvent.change(accountName, { target: { value: 'John Doe' } });

    fireEvent.click(submitButton);

    expect(bankName).toHaveValue('Test Bank');
    expect(accountNo).toHaveValue(1234567890);
    expect(accountName).toHaveValue('John Doe');
  });

  it('should show error message fields', async () => {
    const { getByPlaceholderText, getByText } = renderComponent();
    const bankName = getByPlaceholderText('Enter your bank name');
    const accountNo = getByPlaceholderText('Enter your account number');
    const accountName = getByPlaceholderText('Enter your account name');

    fireEvent.change(bankName, { target: { value: '' } });
    fireEvent.change(accountNo, { target: { value: 0 } });
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
