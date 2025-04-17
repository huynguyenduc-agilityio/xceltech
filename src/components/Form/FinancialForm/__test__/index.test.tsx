import { fireEvent, render, waitFor } from '@testing-library/react';

// Components
import FinancialForm from '..';

const renderComponent = () => {
  return render(<FinancialForm />);
};

describe('FinancialForm Component', () => {
  it('should match snapshot', () => {
    const container = renderComponent();

    expect(container).toMatchSnapshot();
  });

  it('handle input value change and form submit', () => {
    const { getByPlaceholderText, getByRole } = renderComponent();
    const bankName = getByPlaceholderText('Enter your bank name');
    const accountNumber = getByPlaceholderText('Enter your account number');
    const accountName = getByPlaceholderText('Enter your account name');
    const submitButton = getByRole('button', {
      name: 'Update Account Details',
    });

    fireEvent.change(bankName, { target: { value: 'Test Bank' } });
    fireEvent.change(accountNumber, { target: { value: 1234567890 } });
    fireEvent.change(accountName, { target: { value: 'John Doe' } });

    fireEvent.click(submitButton);

    expect(bankName).toHaveValue('Test Bank');
    expect(accountNumber).toHaveValue(1234567890);
    expect(accountName).toHaveValue('John Doe');
  });

  it('should show error message fields', async () => {
    const { getByPlaceholderText, getByText } = renderComponent();
    const bankName = getByPlaceholderText('Enter your bank name');
    const accountNumber = getByPlaceholderText('Enter your account number');
    const accountName = getByPlaceholderText('Enter your account name');

    fireEvent.change(bankName, { target: { value: '' } });
    fireEvent.change(accountNumber, { target: { value: 0 } });
    fireEvent.change(accountName, { target: { value: '' } });

    fireEvent.blur(bankName);
    fireEvent.blur(accountNumber);
    fireEvent.blur(accountName);

    await waitFor(() => {
      expect(getByText('Bank Name is required!')).toBeInTheDocument();
      expect(getByText('Account No is required!')).toBeInTheDocument();
      expect(getByText('Account Name is required!')).toBeInTheDocument();
    });
  });

  it('should show error message fields when click submit button', async () => {
    const { getByRole, getByText } = renderComponent();
    const submitButton = getByRole('button', {
      name: 'Update Account Details',
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText('Bank Name is required!')).toBeInTheDocument();
      expect(getByText('Account No is required!')).toBeInTheDocument();
      expect(getByText('Account Name is required!')).toBeInTheDocument();
    });
  });
});
