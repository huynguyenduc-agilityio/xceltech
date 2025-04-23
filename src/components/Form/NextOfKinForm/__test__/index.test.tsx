import userEvent from '@testing-library/user-event';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Components
import NextOfKinForm from '..';

// Hooks
import { useToast, useUpdateInfoUser } from '@/hooks';

const mockHandleUpdateInfoUser = jest.fn();
const mockHandleUpdateInfoUserError = jest
  .fn()
  .mockRejectedValue(new Error('Network error'));
const mockToast = jest.fn();

jest.mock('@/hooks', () => ({
  useToast: jest.fn(),
  useUpdateInfoUser: jest.fn(),
}));

const renderComponent = () => {
  const queryClient = new QueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <NextOfKinForm />
    </QueryClientProvider>,
  );
};

describe('NextOfKinForm Component', () => {
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
    const { getByPlaceholderText, container, getByRole } = renderComponent();

    const nameInput = getByPlaceholderText('Enter your next of kin name');
    const jobInput = getByPlaceholderText('Enter your job / occupation');
    const phoneInput = getByPlaceholderText('Enter your phone number');
    const addressInput = getByPlaceholderText('Enter your address');
    const relationshipSelect = container.querySelector(
      'select[name="relationship"]',
    ) as HTMLSelectElement;

    const submitButton = getByRole('button', { name: 'Update' });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(jobInput, { target: { value: 'Software Engineer' } });
    fireEvent.change(phoneInput, { target: { value: '0987654321' } });
    fireEvent.change(addressInput, { target: { value: '123 Main Street' } });

    fireEvent.change(relationshipSelect, {
      target: { value: 'relative' },
    });

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockHandleUpdateInfoUser).toHaveBeenCalled();
    });
  });

  it('handles form submit error gracefully', async () => {
    (useUpdateInfoUser as jest.Mock).mockReturnValue({
      isLoading: false,
      handleUpdateInfoUser: mockHandleUpdateInfoUserError,
    });

    const { getByPlaceholderText, container, getByRole } = renderComponent();

    const nameInput = getByPlaceholderText('Enter your next of kin name');
    const jobInput = getByPlaceholderText('Enter your job / occupation');
    const phoneInput = getByPlaceholderText('Enter your phone number');
    const addressInput = getByPlaceholderText('Enter your address');
    const relationshipSelect = container.querySelector(
      'select[name="relationship"]',
    ) as HTMLSelectElement;

    const submitButton = getByRole('button', { name: 'Update' });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(jobInput, { target: { value: 'Software Engineer' } });
    fireEvent.change(phoneInput, { target: { value: '0987654321' } });
    fireEvent.change(addressInput, { target: { value: '123 Main Street' } });

    fireEvent.mouseDown(relationshipSelect);

    fireEvent.change(relationshipSelect, {
      target: { value: 'relative' },
    });

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalled();
    });
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
});
