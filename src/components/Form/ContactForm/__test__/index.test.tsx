import { fireEvent, render, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Components
import ContactForm from '..';

const renderComponent = () => {
  const queryClient = new QueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <ContactForm />
    </QueryClientProvider>,
  );
};

describe('ContactForm Component', () => {
  it('should match snapshot', () => {
    const container = renderComponent();

    expect(container).toMatchSnapshot();
  });

  it('handle input value change and form submit', () => {
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

    fireEvent.click(submitButton);

    expect(phone).toHaveValue('1234567890');
    expect(phoneNum2).toHaveValue('9876543210');
    expect(emailInput).toHaveValue('2t6d0@example.com');
    expect(cityInput).toHaveValue('New York');
    expect(addressInput).toHaveValue('123 Main St');
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
