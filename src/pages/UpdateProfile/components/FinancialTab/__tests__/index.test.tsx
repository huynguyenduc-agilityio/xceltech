import { fireEvent, render, screen, waitFor } from '@testing-library/react';

// Hooks
import { useConfirm, useDeleteFinancial, useGetFinancials } from '@/hooks';

import FinancialTab from '..';

jest.mock('@/hooks', () => ({
  ...jest.requireActual('@/hooks'),
  useToast: () => ({
    toast: jest.fn(),
  }),
  useConfirm: jest.fn(),
  useGetFinancials: jest.fn(),
  useDeleteFinancial: jest.fn(),
  useFinancialMutation: () => ({
    handleFinancialMutation: jest.fn(),
    isFinancialMutationLoading: false,
  }),
}));

const mockFinancials = [
  { id: '1', accountName: 'John Doe', accountNo: '12345', bankName: 'Bank A' },
  { id: '2', accountName: 'Jane Doe', accountNo: '67890', bankName: 'Bank B' },
];

describe('FinancialTab', () => {
  beforeEach(() => {
    (useConfirm as jest.Mock).mockReturnValue(jest.fn());
    (useGetFinancials as jest.Mock).mockReturnValue({
      financials: mockFinancials,
      isFinancialsLoading: false,
    });
    (useDeleteFinancial as jest.Mock).mockReturnValue({
      handleDeleteFinancial: jest.fn(),
      isDeleteLoading: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders financial details', () => {
    render(<FinancialTab />);

    expect(screen.getByText('Financial Details')).toBeInTheDocument();

    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Jane Doe/i)).toBeInTheDocument();
  });

  it('calls handleAdd when Add button is clicked', () => {
    render(<FinancialTab />);

    const addButton = screen.getByTitle('add-financial-button');
    fireEvent.click(addButton);

    expect(
      screen.getByPlaceholderText('Enter your bank name'),
    ).toBeInTheDocument();
  });

  it('calls handleEdit when edit button is clicked', () => {
    render(<FinancialTab />);

    const editButtons = screen.getAllByTitle('update-card')[0];
    fireEvent.click(editButtons);

    expect(screen.getByText(/Edit Financial/i)).toBeInTheDocument();
  });

  it('calls handleDelete when delete button is clicked and confirm is triggered', async () => {
    const confirmMock = jest.fn();

    (useConfirm as jest.Mock).mockReturnValue(confirmMock);

    render(<FinancialTab />);

    const deleteButton = screen.getAllByTitle('delete-card')[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(confirmMock).toHaveBeenCalledWith({
        title: 'Delete Financial',
        confirmMessage: 'Are you sure you want to delete this Bank A?',
        onConfirm: expect.any(Function),
      });
    });
  });
});
