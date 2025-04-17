import { fireEvent, render, waitFor } from '@testing-library/react';

// Components
import GuarantorForm from '..';

const renderComponent = () => {
  return render(<GuarantorForm />);
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

  it('should show error message fields when click submit button', async () => {
    const { getByRole, getByText } = renderComponent();
    const updateButton = getByRole('button', { name: 'Update' });

    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(
        getByText('Job Title / Occupation is required!'),
      ).toBeInTheDocument();
      expect(getByText('Phone No is required!')).toBeInTheDocument();
      expect(getByText('Guarantor name is required!')).toBeInTheDocument();
    });
  });
});
