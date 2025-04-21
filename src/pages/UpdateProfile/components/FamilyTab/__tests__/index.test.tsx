import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// Hooks
import { useConfirm, useDeleteFamily, useGetFamilies } from '@/hooks';

import FamilyTab from '..';

jest.mock('@/hooks', () => ({
  ...jest.requireActual('@/hooks'),
  useToast: () => ({ toast: jest.fn() }),
  useConfirm: jest.fn(),
  useGetFamilies: jest.fn(),
  useDeleteFamily: jest.fn(),
  useFamilyMutation: () => ({
    handleFamilyMutation: jest.fn(),
    isFamilyMutationLoading: false,
  }),
}));

const mockFamilies = [
  {
    id: '1',
    fullName: 'John Smith',
    relationship: 'Father',
    phone: '123456',
    address: '123 Street',
  },
];

describe('FamilyTab', () => {
  beforeEach(() => {
    (useGetFamilies as jest.Mock).mockReturnValue({
      families: mockFamilies,
      isFamiliesLoading: false,
    });
    (useDeleteFamily as jest.Mock).mockReturnValue({
      handleDeleteFamily: jest.fn(),
      isDeleteLoading: false,
    });
    (useConfirm as jest.Mock).mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders family list', () => {
    render(<FamilyTab />);
    expect(screen.getByText(/Family Details/i)).toBeInTheDocument();
    expect(screen.getByText(/John Smith/i)).toBeInTheDocument();
  });

  it('calls handleAdd when Add button is clicked', () => {
    render(<FamilyTab />);

    const addButton = screen.getByTitle('add-family-button');
    fireEvent.click(addButton);

    expect(screen.getByText(/View Family Details/i)).toBeInTheDocument();
  });

  it('calls handleEdit when edit button is clicked', () => {
    render(<FamilyTab />);
    const editButton = screen.getByTitle('update-card');

    fireEvent.click(editButton);

    expect(screen.getByText(/Edit Family/i)).toBeInTheDocument();
  });

  it('calls handleDelete with confirm dialog', async () => {
    const confirmMock = jest.fn();
    (useConfirm as jest.Mock).mockReturnValue(confirmMock);

    render(<FamilyTab />);
    const deleteButton = screen.getByTitle('delete-card');

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(confirmMock).toHaveBeenCalledWith({
        title: 'Delete Family',
        confirmMessage: 'Are you sure you want to delete this John Smith?',
        onConfirm: expect.any(Function),
      });
    });
  });
});
