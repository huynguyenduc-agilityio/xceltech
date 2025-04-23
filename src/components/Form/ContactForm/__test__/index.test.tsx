import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Components
import ContactForm from '..';

// Hooks
import { useToast, useUpdateInfoUser } from '@/hooks';

const mockHandleUpdateInfoUser = jest.fn();
const mockToast = jest.fn();
const mockHandleUpdateInfoUserError = jest
  .fn()
  .mockRejectedValue(new Error('Network error'));

jest.mock('@/hooks', () => ({
  useToast: jest.fn(),
  useUpdateInfoUser: jest.fn(),
}));

const renderComponent = () => {
  const queryClient = new QueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <ContactForm />
    </QueryClientProvider>,
  );
};

describe('ContactForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
    (useUpdateInfoUser as jest.Mock).mockReturnValue({
      isFamilyMutationLoading: false,
      handleUpdateInfoUser: mockHandleUpdateInfoUser,
    });
  });

  it('should match snapshot', () => {
    const container = renderComponent();

    expect(container).toMatchSnapshot();
  });

  it('handle input value change and form submit', async () => {
    const { getByPlaceholderText, getByRole } = renderComponent();
    const phone = getByPlaceholderText('Enter your phone number 1');
    const phoneNum2 = getByPlaceholderText('Enter your phone number 2');
    const emailInput = getByPlaceholderText('Enter your email address');
    const cityInput = getByPlaceholderText('Enter your city of residence');
    const addressInput = getByPlaceholderText('Enter your address');
    const submitButton = getByRole('button', { name: 'Update' });

    fireEvent.change(phone, { target: { value: '1234567890' } });
    fireEvent.change(phoneNum2, { target: { value: '9876543210' } });
    fireEvent.change(emailInput, { target: { value: '2t6d0@example.com' } });
    fireEvent.change(cityInput, { target: { value: 'New York' } });
    fireEvent.change(addressInput, { target: { value: '123 Main St' } });

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockHandleUpdateInfoUser).toHaveBeenCalled();
    });
  });

  it('handles submit error gracefully', async () => {
    (useUpdateInfoUser as jest.Mock).mockReturnValue({
      isLoading: false,
      handleUpdateInfoUser: mockHandleUpdateInfoUserError,
    });

    const { getByPlaceholderText, getByRole } = renderComponent();
    const phone = getByPlaceholderText('Enter your phone number 1');
    const phoneNum2 = getByPlaceholderText('Enter your phone number 2');
    const emailInput = getByPlaceholderText('Enter your email address');
    const cityInput = getByPlaceholderText('Enter your city of residence');
    const addressInput = getByPlaceholderText('Enter your address');
    const submitButton = getByRole('button', { name: 'Update' });

    fireEvent.change(phone, { target: { value: '1234567890' } });
    fireEvent.change(phoneNum2, { target: { value: '9876543210' } });
    fireEvent.change(emailInput, { target: { value: '2t6d0@example.com' } });
    fireEvent.change(cityInput, { target: { value: 'New York' } });
    fireEvent.change(addressInput, { target: { value: '123 Main St' } });

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalled();
    });
  });

  it('should show error message fields', async () => {
    const { getByPlaceholderText, getByText } = renderComponent();
    const phone = getByPlaceholderText('Enter your phone number 1');
    const phoneNum2 = getByPlaceholderText('Enter your phone number 2');
    const emailInput = getByPlaceholderText('Enter your email address');
    const cityInput = getByPlaceholderText('Enter your city of residence');
    const addressInput = getByPlaceholderText('Enter your address');

    fireEvent.change(phone, { target: { value: '' } });
    fireEvent.change(phoneNum2, { target: { value: '' } });
    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.change(cityInput, { target: { value: '' } });
    fireEvent.change(addressInput, { target: { value: '' } });

    fireEvent.blur(phone);
    fireEvent.blur(phoneNum2);
    fireEvent.blur(emailInput);
    fireEvent.blur(cityInput);
    fireEvent.blur(addressInput);

    await waitFor(() => {
      expect(getByText('Phone Number 1 is required!')).toBeInTheDocument();
      expect(getByText('Email is required!')).toBeInTheDocument();
      expect(getByText('City of residence is required!')).toBeInTheDocument();
      expect(getByText('Residential Address is required!')).toBeInTheDocument();
    });
  });
});
