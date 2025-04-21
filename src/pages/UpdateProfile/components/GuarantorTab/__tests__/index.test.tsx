import { Suspense } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Hooks
import { useConfirm } from '@/hooks';

import GuarantorTab from '..';

jest.mock('@/hooks', () => ({
  ...jest.requireActual('@/hooks'),
  useGetGuarantors: () => ({
    guarantors: [
      { id: '1', name: 'John Doe', job: 'Developer', phone: '123-456-7890' },
    ],
    isGuarantorsLoading: false,
  }),
  useDeleteGuarantor: () => ({
    handleDeleteGuarantor: jest.fn(),
    isDeleteLoading: false,
  }),
  useConfirm: jest.fn(),
  useToast: () => ({
    toast: jest.fn(),
  }),
  useGuarantorMutation: () => ({
    handleGuarantorMutation: jest.fn(),
    isGuarantorMutationLoading: false,
  }),
}));

const queryClient = new QueryClient();

const renderComponent = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>
        <GuarantorTab />
      </Suspense>
    </QueryClientProvider>,
  );

describe('GuarantorTab Unit Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders a list of guarantors', () => {
    renderComponent();

    expect(screen.getByText(/guarantor details/i)).toBeInTheDocument();
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    expect(screen.getByText(/developer - 123-456-7890/i)).toBeInTheDocument();
  });

  it('navigates to form on Add button click', async () => {
    renderComponent();

    fireEvent.click(screen.getByTitle('add-guarantor'));

    await waitFor(() => {
      expect(screen.getByText(/submit/i)).toBeInTheDocument();
    });
  });

  it('navigates to form on Edit button click', async () => {
    renderComponent();

    fireEvent.click(screen.getByTitle('update-card'));

    await waitFor(() => {
      expect(screen.getByText(/edit/i)).toBeInTheDocument();
    });
  });

  it('shows a confirmation dialog on delete button click', async () => {
    const confirmMock = jest.fn();

    (useConfirm as jest.Mock).mockReturnValue(confirmMock);

    renderComponent();

    fireEvent.click(screen.getByTitle('delete-card'));

    await waitFor(() => {
      expect(confirmMock).toHaveBeenCalledWith({
        title: 'Delete Guarantor',
        confirmMessage: 'Are you sure you want to delete this John Doe?',
        onConfirm: expect.any(Function),
      });
    });
  });

  it('navigates back from the form to the guarantor list', async () => {
    renderComponent();

    fireEvent.click(screen.getByTitle('add-guarantor'));

    await waitFor(() => {
      expect(screen.getByText(/submit/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /guarantor details/i }));

    await waitFor(() => {
      expect(screen.getByText(/guarantor details/i)).toBeInTheDocument();
    });
  });
});
