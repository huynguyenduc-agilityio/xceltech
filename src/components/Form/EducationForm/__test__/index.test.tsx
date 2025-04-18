import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, waitFor } from '@testing-library/react';

// Types
import { EducationType, MutationType } from '@/types';

// Components
import EducationForm from '..';

const renderComponent = () => {
  const queryClient = new QueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <EducationForm
        mode={MutationType.Create}
        section={EducationType.Academic}
      />
      ,
    </QueryClientProvider>,
  );
};

describe('EducationForm Component', () => {
  it('should match snapshot', () => {
    const container = renderComponent();

    expect(container).toMatchSnapshot();
  });

  it('handle input value change and form submit', () => {
    const { getByPlaceholderText, getByRole } = renderComponent();
    const nameInput = getByPlaceholderText('Enter your institution name');
    const courseInput = getByPlaceholderText('Enter your course');
    const departmentInput = getByPlaceholderText('Enter your department');
    const locationInput = getByPlaceholderText('Enter your location');
    const submitButton = getByRole('button', { name: /submit/i });

    fireEvent.change(nameInput, { target: { value: 'Test Name' } });
    fireEvent.change(courseInput, { target: { value: 'Test Course' } });
    fireEvent.change(departmentInput, { target: { value: 'Test Department' } });
    fireEvent.change(locationInput, { target: { value: 'Test Location' } });

    fireEvent.click(submitButton);

    expect(nameInput).toHaveValue('Test Name');
    expect(courseInput).toHaveValue('Test Course');
    expect(departmentInput).toHaveValue('Test Department');
    expect(locationInput).toHaveValue('Test Location');
  });

  it('should show error message fields', async () => {
    const { getByPlaceholderText, getByText } = renderComponent();
    const nameInput = getByPlaceholderText('Enter your institution name');
    const courseInput = getByPlaceholderText('Enter your course');
    const departmentInput = getByPlaceholderText('Enter your department');
    const locationInput = getByPlaceholderText('Enter your location');

    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.change(courseInput, { target: { value: '' } });
    fireEvent.change(departmentInput, { target: { value: '' } });
    fireEvent.change(locationInput, { target: { value: '' } });

    fireEvent.blur(nameInput);
    fireEvent.blur(courseInput);
    fireEvent.blur(departmentInput);
    fireEvent.blur(locationInput);

    await waitFor(() => {
      expect(getByText('Name of Institution is required!')).toBeInTheDocument();
      expect(getByText('Course is required!')).toBeInTheDocument();
      expect(getByText('Department is required!')).toBeInTheDocument();
      expect(getByText('Location is required!')).toBeInTheDocument();
    });
  });
});
