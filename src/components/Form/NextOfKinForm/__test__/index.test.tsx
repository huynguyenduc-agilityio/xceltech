import { fireEvent, render, waitFor } from '@testing-library/react';

// Components
import NextOfKinForm from '..';

const renderComponent = () => {
  return render(<NextOfKinForm />);
};

describe('NextOfKinForm Component', () => {
  it('should match snapshot', () => {
    const container = renderComponent();

    expect(container).toMatchSnapshot();
  });

  it('handle input value change and form submit', () => {
    const { getByPlaceholderText, getByRole } = renderComponent();

    const nameInput = getByPlaceholderText('Enter your next of kin name');
    const jobInput = getByPlaceholderText('Enter your job / occupation');
    const phoneInput = getByPlaceholderText('Enter your phone number');
    const addressInput = getByPlaceholderText('Enter your address');
    const submitButton = getByRole('button', { name: 'Update' });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(jobInput, { target: { value: 'Software Engineer' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.change(addressInput, { target: { value: '123 Main Street' } });

    fireEvent.click(submitButton);

    expect(nameInput).toHaveValue('John Doe');
    expect(jobInput).toHaveValue('Software Engineer');
    expect(phoneInput).toHaveValue('1234567890');
    expect(addressInput).toHaveValue('123 Main Street');
  });

  it('should show error message fields', async () => {
    const { getByPlaceholderText, getByText } = renderComponent();

    const nameInput = getByPlaceholderText('Enter your next of kin name');
    const jobInput = getByPlaceholderText('Enter your job / occupation');
    const phoneInput = getByPlaceholderText('Enter your phone number');
    const addressInput = getByPlaceholderText('Enter your address');

    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.change(jobInput, { target: { value: '' } });
    fireEvent.change(phoneInput, { target: { value: '' } });
    fireEvent.change(addressInput, { target: { value: '' } });

    fireEvent.blur(nameInput);
    fireEvent.blur(jobInput);
    fireEvent.blur(phoneInput);
    fireEvent.blur(addressInput);

    await waitFor(() => {
      expect(getByText('Next of kin name is required!')).toBeInTheDocument();
      expect(getByText('Job / Occupation is required!')).toBeInTheDocument();
      expect(getByText('Phone Number is required!')).toBeInTheDocument();
      expect(getByText('Residential Address is required!')).toBeInTheDocument();
    });
  });

  it('should show error message fields when click submit button', async () => {
    const { getByRole, getByText } = renderComponent();
    const updateButton = getByRole('button', { name: 'Update' });

    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(getByText('Next of kin name is required!')).toBeInTheDocument();
      expect(getByText('Job / Occupation is required!')).toBeInTheDocument();
      expect(getByText('Phone Number is required!')).toBeInTheDocument();
      expect(getByText('Residential Address is required!')).toBeInTheDocument();
    });
  });
});
