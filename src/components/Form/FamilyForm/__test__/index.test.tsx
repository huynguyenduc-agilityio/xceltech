import { fireEvent, render, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { MutationType } from '@/types';

// Components
import FamilyForm from '..';

const renderComponent = () => {
  const queryClient = new QueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <FamilyForm mode={MutationType.Edit} />,
    </QueryClientProvider>,
  );
};

describe('FamilyForm Component', () => {
  it('should match snapshot', () => {
    const container = renderComponent();

    expect(container).toMatchSnapshot();
  });

  it('handle input value change and form submit', () => {
    const { getByPlaceholderText, getByRole } = renderComponent();
    const fullNameInput = getByPlaceholderText('Enter your full name');
    const relationshipInput = getByPlaceholderText('Enter your relationship');
    const phoneInput = getByPlaceholderText('Enter your phone number');
    const addressInput = getByPlaceholderText('Enter your address');
    const submitButton = getByRole('button', { name: 'Update' });

    fireEvent.change(fullNameInput, { target: { value: 'John Doe' } });
    fireEvent.change(relationshipInput, { target: { value: 'Brother' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.change(addressInput, { target: { value: '123 Main St' } });

    fireEvent.click(submitButton);

    expect(fullNameInput).toHaveValue('John Doe');
    expect(relationshipInput).toHaveValue('Brother');
    expect(phoneInput).toHaveValue('1234567890');
    expect(addressInput).toHaveValue('123 Main St');
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
});
