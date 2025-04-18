import { fireEvent, render, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { MutationType } from '@/types';

// Components
import GuarantorForm from '..';

const renderComponent = () => {
  const queryClient = new QueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <GuarantorForm mode={MutationType.Edit} />
    </QueryClientProvider>,
  );
};

describe('GuarantorForm Component', () => {
  it('should match snapshot', () => {
    const container = renderComponent();

    expect(container).toMatchSnapshot();
  });

  it('handle input value change and form submit', () => {
    const { getByPlaceholderText, getByRole } = renderComponent();
    const jobTitleInput = getByPlaceholderText(
      'Enter your job title / occupation',
    );
    const phoneInput = getByPlaceholderText('Enter your phone number');
    const nameInput = getByPlaceholderText('Enter your guarantor’s name');
    const submitButton = getByRole('button', { name: 'Update' });

    fireEvent.change(jobTitleInput, { target: { value: 'Developer' } });
    fireEvent.change(phoneInput, { target: { value: '08123456789' } });
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });

    fireEvent.click(submitButton);

    expect(jobTitleInput).toHaveValue('Developer');
    expect(phoneInput).toHaveValue('08123456789');
    expect(nameInput).toHaveValue('John Doe');
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
