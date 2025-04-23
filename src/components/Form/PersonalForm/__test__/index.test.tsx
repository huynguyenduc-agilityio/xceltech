import { fireEvent, render, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Components
import PersonalForm from '..';

// Hooks
import { useGetJobs, useToast, useUpdateInfoUser } from '@/hooks';

// Mocks
import { mockDataJobs } from '@/__mocks__';
import userEvent from '@testing-library/user-event';

const queryClient = new QueryClient();
jest.mock('@/hooks', () => ({
  useToast: jest.fn(),
  useUpdateInfoUser: jest.fn(),
  useGetJobs: jest.fn(),
}));

const mockToast = jest.fn();
const mockHandleUpdateInfoUser = jest.fn();
const mockHandleUpdateInfoUserError = jest
  .fn()
  .mockRejectedValue(new Error('Network error'));

const renderComponent = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <PersonalForm />
    </QueryClientProvider>,
  );
};

describe('PersonalForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
    (useUpdateInfoUser as jest.Mock).mockReturnValue({
      isLoading: false,
      handleUpdateInfoUser: mockHandleUpdateInfoUser,
    });

    (useGetJobs as jest.Mock).mockReturnValue({
      isJobsLoading: false,
      jobs: mockDataJobs,
    });

    global.URL.createObjectURL = jest.fn(
      () => 'blob:http://localhost/fake-url',
    );
    global.URL.revokeObjectURL = jest.fn();
  });

  it('should match snapshot', () => {
    const container = renderComponent();

    expect(container).toMatchSnapshot();
  });

  it('submits form and calls handleUpdateInfoUser', async () => {
    const { getByRole, getByPlaceholderText, container, getByTitle } =
      renderComponent();
    const firstNameInput = getByPlaceholderText('Enter your first name');
    const lastNameInput = getByPlaceholderText('Enter your last name');
    const departmentInput = getByPlaceholderText('Enter your department');
    const jobSelect = container.querySelector(
      'select[name="id"]',
    ) as HTMLSelectElement;
    const jobCategory = container.querySelector(
      'select[name="jobCategory"]',
    ) as HTMLSelectElement;
    const input = getByTitle('Upload Image');
    const file1 = new File(['dummy content'], 'test1.png', {
      type: 'image/png',
    });

    fireEvent.change(input, {
      target: { files: [file1] },
    });

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(departmentInput, { target: { value: 'IT' } });
    fireEvent.change(jobSelect, {
      target: { value: '1' },
    });
    fireEvent.change(jobCategory, {
      target: { value: 'Full Time' },
    });

    const submitButton = getByRole('button', { name: 'Update' });

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockHandleUpdateInfoUser).toHaveBeenCalled();
    });
  });

  it('handles submit error gracefully', async () => {
    (useUpdateInfoUser as jest.Mock).mockReturnValue({
      isLoading: false,
      handleUpdateInfoUser: mockHandleUpdateInfoUserError,
    });

    const { getByRole, getByPlaceholderText, container } = renderComponent();
    const firstNameInput = getByPlaceholderText('Enter your first name');
    const lastNameInput = getByPlaceholderText('Enter your last name');
    const departmentInput = getByPlaceholderText('Enter your department');
    const jobSelect = container.querySelector(
      'select[name="id"]',
    ) as HTMLSelectElement;
    const jobCategory = container.querySelector(
      'select[name="jobCategory"]',
    ) as HTMLSelectElement;

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(departmentInput, { target: { value: 'IT' } });
    fireEvent.change(jobSelect, {
      target: { value: '1' },
    });
    fireEvent.change(jobCategory, {
      target: { value: 'Full Time' },
    });

    const submitButton = getByRole('button', { name: 'Update' });

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalled();
    });
  });
});
