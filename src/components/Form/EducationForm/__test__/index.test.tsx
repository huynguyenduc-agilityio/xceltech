import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Types
import { EducationType, MutationType } from '@/types';

// Hooks
import { useEducationMutation, useToast } from '@/hooks';

// Components
import EducationForm from '..';

const queryClient = new QueryClient();
const mockHandleEducationMutation = jest.fn();
const mockHandleEducationMutationError = jest
  .fn()
  .mockRejectedValue(new Error('Network error'));
const mockToast = jest.fn();

jest.mock('@/hooks', () => ({
  useToast: jest.fn(),
  useEducationMutation: jest.fn(),
}));

const mockDataEdit = {
  id: '1',
  institutionName: 'Test Name',
  course: 'Test Course',
  department: 'Test Department',
  location: 'Test Location',
};

const renderComponent = () => {
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
  beforeEach(() => {
    jest.clearAllMocks();
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
    (useEducationMutation as jest.Mock).mockReturnValue({
      isEducationMutationLoading: false,
      handleEducationMutation: mockHandleEducationMutation,
    });
  });

  it('should match snapshot', () => {
    const container = renderComponent();

    expect(container).toMatchSnapshot();
  });

  it('handle input value change and form submit', async () => {
    const { getByPlaceholderText, getByRole } = renderComponent();
    const nameInput = getByPlaceholderText('Enter your institution name');
    const courseInput = getByPlaceholderText('Enter your course');
    const departmentInput = getByPlaceholderText('Enter your department');
    const locationInput = getByPlaceholderText('Enter your location');
    const descriptionInput = getByPlaceholderText('Enter your description');
    const submitButton = getByRole('button', { name: /submit/i });

    fireEvent.change(nameInput, { target: { value: 'Test Name' } });
    fireEvent.change(courseInput, { target: { value: 'Test Course' } });
    fireEvent.change(departmentInput, { target: { value: 'Test Department' } });
    fireEvent.change(locationInput, { target: { value: 'Test Location' } });
    fireEvent.change(descriptionInput, {
      target: { value: 'Test Description' },
    });

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockHandleEducationMutation).toHaveBeenCalled();
    });
  });

  it('handles form add submit error gracefully', async () => {
    (useEducationMutation as jest.Mock).mockReturnValue({
      isEducationMutationLoading: false,
      handleEducationMutation: mockHandleEducationMutationError,
    });

    const { getByPlaceholderText, getByRole } = renderComponent();
    const nameInput = getByPlaceholderText('Enter your institution name');
    const courseInput = getByPlaceholderText('Enter your course');
    const departmentInput = getByPlaceholderText('Enter your department');
    const locationInput = getByPlaceholderText('Enter your location');
    const descriptionInput = getByPlaceholderText('Enter your description');
    const submitButton = getByRole('button', { name: /submit/i });

    fireEvent.change(nameInput, { target: { value: 'Test Name' } });
    fireEvent.change(courseInput, { target: { value: 'Test Course' } });
    fireEvent.change(departmentInput, { target: { value: 'Test Department' } });
    fireEvent.change(locationInput, { target: { value: 'Test Location' } });
    fireEvent.change(descriptionInput, {
      target: { value: 'Test Description' },
    });

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalled();
    });
  });

  it('handles form edit submit error gracefully', async () => {
    (useEducationMutation as jest.Mock).mockReturnValue({
      isEducationMutationLoading: false,
      handleEducationMutation: mockHandleEducationMutationError,
    });

    const { getByPlaceholderText, getByRole } = render(
      <QueryClientProvider client={queryClient}>
        <EducationForm
          mode={MutationType.Edit}
          section={EducationType.Academic}
          initialValues={mockDataEdit}
        />
        ,
      </QueryClientProvider>,
    );
    const nameInput = getByPlaceholderText('Enter your institution name');
    const courseInput = getByPlaceholderText('Enter your course');
    const departmentInput = getByPlaceholderText('Enter your department');
    const locationInput = getByPlaceholderText('Enter your location');
    const descriptionInput = getByPlaceholderText('Enter your description');
    const submitButton = getByRole('button', { name: 'Update' });

    fireEvent.change(nameInput, { target: { value: 'Test Name Edit' } });
    fireEvent.change(courseInput, { target: { value: 'Test Course' } });
    fireEvent.change(departmentInput, { target: { value: 'Test Department' } });
    fireEvent.change(locationInput, { target: { value: 'Test Location' } });
    fireEvent.change(descriptionInput, {
      target: { value: 'Test Description' },
    });

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalled();
    });
  });

  it('handle input value change and form edit submit', async () => {
    const { getByPlaceholderText, getByRole } = render(
      <QueryClientProvider client={queryClient}>
        <EducationForm
          mode={MutationType.Edit}
          section={EducationType.Academic}
          initialValues={mockDataEdit}
        />
        ,
      </QueryClientProvider>,
    );
    const nameInput = getByPlaceholderText('Enter your institution name');
    const courseInput = getByPlaceholderText('Enter your course');
    const departmentInput = getByPlaceholderText('Enter your department');
    const locationInput = getByPlaceholderText('Enter your location');
    const descriptionInput = getByPlaceholderText('Enter your description');
    const submitButton = getByRole('button', { name: 'Update' });

    fireEvent.change(nameInput, { target: { value: 'Test Name Edit' } });
    fireEvent.change(courseInput, { target: { value: 'Test Course' } });
    fireEvent.change(departmentInput, { target: { value: 'Test Department' } });
    fireEvent.change(locationInput, { target: { value: 'Test Location' } });
    fireEvent.change(descriptionInput, {
      target: { value: 'Test Description' },
    });

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockHandleEducationMutation).toHaveBeenCalled();
    });
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
