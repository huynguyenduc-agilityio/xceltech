import { fireEvent, render, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';

import { MutationType } from '@/types';

// Components
import FamilyForm from '..';

// Hooks
import { useFamilyMutation, useToast } from '@/hooks';

const queryClient = new QueryClient();
const mockFamilyMutation = jest.fn();
const mockFamilyMutationError = jest
  .fn()
  .mockRejectedValue(new Error('Network error'));
const mockToast = jest.fn();
const mockDataEdit = {
  id: '1',
  fullName: 'John Doe',
  relationship: 'Brother',
  phone: '0987654321',
  address: '123 Main St',
};

jest.mock('@/hooks', () => ({
  useToast: jest.fn(),
  useFamilyMutation: jest.fn(),
}));

const renderComponent = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <FamilyForm mode={MutationType.Edit} />,
    </QueryClientProvider>,
  );
};

describe('FamilyForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
    (useFamilyMutation as jest.Mock).mockReturnValue({
      isFamilyMutationLoading: false,
      handleFamilyMutation: mockFamilyMutation,
    });
  });

  it('should match snapshot', () => {
    const container = renderComponent();

    expect(container).toMatchSnapshot();
  });

  it('handle input value change and form edit submit', async () => {
    const { getByPlaceholderText, getByRole } = render(
      <QueryClientProvider client={queryClient}>
        <FamilyForm mode={MutationType.Edit} initialValues={mockDataEdit} />,
      </QueryClientProvider>,
    );
    const fullNameInput = getByPlaceholderText('Enter your full name');
    const relationshipInput = getByPlaceholderText('Enter your relationship');
    const phoneInput = getByPlaceholderText('Enter your phone number');
    const addressInput = getByPlaceholderText('Enter your address');
    const submitButton = getByRole('button', { name: 'Update' });

    fireEvent.change(fullNameInput, { target: { value: 'John Doe' } });
    fireEvent.change(relationshipInput, { target: { value: 'Brother' } });
    fireEvent.change(phoneInput, { target: { value: '0987654322' } });
    fireEvent.change(addressInput, { target: { value: '123 Main St' } });

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockFamilyMutation).toHaveBeenCalled();
    });
  });

  it('handle input value change and form add submit', async () => {
    const { getByPlaceholderText, getByRole } = render(
      <QueryClientProvider client={queryClient}>
        <FamilyForm mode={MutationType.Create} />,
      </QueryClientProvider>,
    );
    const fullNameInput = getByPlaceholderText('Enter your full name');
    const relationshipInput = getByPlaceholderText('Enter your relationship');
    const phoneInput = getByPlaceholderText('Enter your phone number');
    const addressInput = getByPlaceholderText('Enter your address');
    const submitButton = getByRole('button', { name: 'Submit' });

    fireEvent.change(fullNameInput, { target: { value: 'John Doe' } });
    fireEvent.change(relationshipInput, { target: { value: 'Brother' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.change(addressInput, { target: { value: '123 Main St' } });

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockFamilyMutation).toHaveBeenCalled();
    });
  });

  it('should show error message fields', async () => {
    const { getByPlaceholderText, getByText } = renderComponent();
    const fullNameInput = getByPlaceholderText('Enter your full name');
    const relationshipInput = getByPlaceholderText('Enter your relationship');
    const phoneInput = getByPlaceholderText('Enter your phone number');
    const addressInput = getByPlaceholderText('Enter your address');

    fireEvent.change(fullNameInput, { target: { value: '' } });
    fireEvent.change(relationshipInput, { target: { value: '' } });
    fireEvent.change(phoneInput, { target: { value: '' } });
    fireEvent.change(addressInput, { target: { value: '' } });

    fireEvent.blur(fullNameInput);
    fireEvent.blur(relationshipInput);
    fireEvent.blur(phoneInput);
    fireEvent.blur(addressInput);

    await waitFor(() => {
      expect(getByText('Full Name is required!')).toBeInTheDocument();
      expect(getByText('Relationship is required!')).toBeInTheDocument();
      expect(getByText('Phone No is required!')).toBeInTheDocument();
      expect(getByText('Address is required!')).toBeInTheDocument();
    });
  });

  it('handles form add submit error gracefully', async () => {
    (useFamilyMutation as jest.Mock).mockReturnValue({
      isLoading: false,
      handleFamilyMutation: mockFamilyMutationError,
    });

    const { getByPlaceholderText, getByRole } = render(
      <QueryClientProvider client={queryClient}>
        <FamilyForm mode={MutationType.Create} />,
      </QueryClientProvider>,
    );
    const fullNameInput = getByPlaceholderText('Enter your full name');
    const relationshipInput = getByPlaceholderText('Enter your relationship');
    const phoneInput = getByPlaceholderText('Enter your phone number');
    const addressInput = getByPlaceholderText('Enter your address');
    const submitButton = getByRole('button', { name: 'Submit' });

    fireEvent.change(fullNameInput, { target: { value: 'John Doe' } });
    fireEvent.change(relationshipInput, { target: { value: 'Brother' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.change(addressInput, { target: { value: '123 Main St' } });

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalled();
    });
  });

  it('handles form edit submit error gracefully', async () => {
    (useFamilyMutation as jest.Mock).mockReturnValue({
      isLoading: false,
      handleFamilyMutation: mockFamilyMutationError,
    });

    const { getByPlaceholderText, getByRole } = render(
      <QueryClientProvider client={queryClient}>
        <FamilyForm mode={MutationType.Edit} initialValues={mockDataEdit} />,
      </QueryClientProvider>,
    );
    const fullNameInput = getByPlaceholderText('Enter your full name');
    const relationshipInput = getByPlaceholderText('Enter your relationship');
    const phoneInput = getByPlaceholderText('Enter your phone number');
    const addressInput = getByPlaceholderText('Enter your address');
    const submitButton = getByRole('button', { name: 'Update' });

    fireEvent.change(fullNameInput, { target: { value: 'John Doe' } });
    fireEvent.change(relationshipInput, { target: { value: 'Brother' } });
    fireEvent.change(phoneInput, { target: { value: '0987654322' } });
    fireEvent.change(addressInput, { target: { value: '123 Main St' } });

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalled();
    });
  });
});
