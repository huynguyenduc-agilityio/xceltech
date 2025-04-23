import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { MutationType } from '@/types';

// Components
import GuarantorForm from '..';

// Hooks
import { useGuarantorMutation, useToast } from '@/hooks';

const queryClient = new QueryClient();
const mockHandleGuarantorMutation = jest.fn();
const mockHandleGuarantorMutationError = jest
  .fn()
  .mockRejectedValue(new Error('Network error'));
const mockToast = jest.fn();
const mockDataEdit = {
  id: '1',
  name: 'John Doe',
  job: 'Developer',
  phone: '08123456789',
};

jest.mock('@/hooks', () => ({
  useToast: jest.fn(),
  useGuarantorMutation: jest.fn(),
}));

const renderComponent = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <GuarantorForm mode={MutationType.Edit} />
    </QueryClientProvider>,
  );
};

describe('GuarantorForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
    (useGuarantorMutation as jest.Mock).mockReturnValue({
      isFamilyMutationLoading: false,
      handleGuarantorMutation: mockHandleGuarantorMutation,
    });
  });

  it('should match snapshot', () => {
    const container = renderComponent();

    expect(container).toMatchSnapshot();
  });

  it('handle input value change and form edit submit', async () => {
    const { getByPlaceholderText, getByRole } = render(
      <QueryClientProvider client={queryClient}>
        <GuarantorForm mode={MutationType.Edit} initialValues={mockDataEdit} />
      </QueryClientProvider>,
    );
    const jobTitleInput = getByPlaceholderText(
      'Enter your job title / occupation',
    );
    const phoneInput = getByPlaceholderText('Enter your phone number');
    const nameInput = getByPlaceholderText('Enter your guarantor’s name');
    const submitButton = getByRole('button', { name: 'Update' });

    fireEvent.change(jobTitleInput, { target: { value: 'Developer' } });
    fireEvent.change(phoneInput, { target: { value: '08123456782' } });
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockHandleGuarantorMutation).toHaveBeenCalled();
    });
  });

  it('handle input value change and form submit', async () => {
    const { getByPlaceholderText, getByRole } = render(
      <QueryClientProvider client={queryClient}>
        <GuarantorForm mode={MutationType.Create} />
      </QueryClientProvider>,
    );
    const jobTitleInput = getByPlaceholderText(
      'Enter your job title / occupation',
    );
    const phoneInput = getByPlaceholderText('Enter your phone number');
    const nameInput = getByPlaceholderText('Enter your guarantor’s name');
    const submitButton = getByRole('button', { name: 'Submit' });

    fireEvent.change(jobTitleInput, { target: { value: 'Developer' } });
    fireEvent.change(phoneInput, { target: { value: '08123456789' } });
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockHandleGuarantorMutation).toHaveBeenCalled();
    });
  });

  it('handles form add submit error gracefully', async () => {
    (useGuarantorMutation as jest.Mock).mockReturnValue({
      isLoading: false,
      handleGuarantorMutation: mockHandleGuarantorMutationError,
    });

    const { getByPlaceholderText, getByRole } = render(
      <QueryClientProvider client={queryClient}>
        <GuarantorForm mode={MutationType.Create} />
      </QueryClientProvider>,
    );
    const jobTitleInput = getByPlaceholderText(
      'Enter your job title / occupation',
    );
    const phoneInput = getByPlaceholderText('Enter your phone number');
    const nameInput = getByPlaceholderText('Enter your guarantor’s name');
    const submitButton = getByRole('button', { name: 'Submit' });

    fireEvent.change(jobTitleInput, { target: { value: 'Developer' } });
    fireEvent.change(phoneInput, { target: { value: '08123456789' } });
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalled();
    });
  });

  it('handles form edit submit error gracefully', async () => {
    (useGuarantorMutation as jest.Mock).mockReturnValue({
      isLoading: false,
      handleGuarantorMutation: mockHandleGuarantorMutationError,
    });

    const { getByPlaceholderText, getByRole } = render(
      <QueryClientProvider client={queryClient}>
        <GuarantorForm mode={MutationType.Edit} initialValues={mockDataEdit} />
      </QueryClientProvider>,
    );
    const jobTitleInput = getByPlaceholderText(
      'Enter your job title / occupation',
    );
    const phoneInput = getByPlaceholderText('Enter your phone number');
    const nameInput = getByPlaceholderText('Enter your guarantor’s name');
    const submitButton = getByRole('button', { name: 'Update' });

    fireEvent.change(jobTitleInput, { target: { value: 'Developer' } });
    fireEvent.change(phoneInput, { target: { value: '08123456782' } });
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalled();
    });
  });

  it('should show error message fields', async () => {
    const { getByPlaceholderText, getByText } = renderComponent();

    const jobTitleInput = getByPlaceholderText(
      'Enter your job title / occupation',
    );
    const phoneInput = getByPlaceholderText('Enter your phone number');
    const nameInput = getByPlaceholderText('Enter your guarantor’s name');

    fireEvent.change(jobTitleInput, { target: { value: '' } });
    fireEvent.change(phoneInput, { target: { value: '' } });
    fireEvent.change(nameInput, { target: { value: '' } });

    fireEvent.blur(jobTitleInput);
    fireEvent.blur(phoneInput);
    fireEvent.blur(nameInput);

    await waitFor(() => {
      expect(
        getByText('Job Title / Occupation is required!'),
      ).toBeInTheDocument();
      expect(getByText('Phone No is required!')).toBeInTheDocument();
      expect(getByText('Guarantor name is required!')).toBeInTheDocument();
    });
  });
});
