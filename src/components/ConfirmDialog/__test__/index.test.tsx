import { render, screen, fireEvent } from '@testing-library/react';
import { useConfirmDialogStore } from '@/stores';
import ConfirmDialog from '..';

// Mock the store
jest.mock('@/stores', () => ({
  useConfirmDialogStore: jest.fn(),
}));

describe('ConfirmDialog', () => {
  const mockClose = jest.fn();
  const mockOnConfirm = jest.fn();
  const mockOnCancel = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render snapshot successfully', () => {
    (useConfirmDialogStore as unknown as jest.Mock).mockReturnValue({
      isOpen: true,
      title: 'Delete Item',
      confirmMessage: 'Are you sure you want to delete this?',
      onConfirm: mockOnConfirm,
      onCancel: mockOnCancel,
      close: mockClose,
    });

    const { container } = render(<ConfirmDialog />);

    expect(container).toMatchSnapshot();
  });

  it('should not render when isOpen is false', () => {
    (useConfirmDialogStore as unknown as jest.Mock).mockReturnValue({
      isOpen: false,
    });

    const { container } = render(<ConfirmDialog />);
    expect(container.firstChild).toBeNull();
  });

  it('should render dialog with title and message when open', () => {
    (useConfirmDialogStore as unknown as jest.Mock).mockReturnValue({
      isOpen: true,
      title: 'Delete Item',
      confirmMessage: 'Are you sure you want to delete this?',
      onConfirm: mockOnConfirm,
      onCancel: mockOnCancel,
      close: mockClose,
    });

    render(<ConfirmDialog />);
    expect(screen.getByText('Delete Item')).toBeInTheDocument();
    expect(
      screen.getByText('Are you sure you want to delete this?'),
    ).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });

  it('calls onConfirm and close when Confirm is clicked', () => {
    (useConfirmDialogStore as unknown as jest.Mock).mockReturnValue({
      isOpen: true,
      title: 'Confirm Action',
      confirmMessage: 'Proceed?',
      onConfirm: mockOnConfirm,
      onCancel: mockOnCancel,
      close: mockClose,
    });

    render(<ConfirmDialog />);
    fireEvent.click(screen.getByText('Confirm'));
    expect(mockOnConfirm).toHaveBeenCalled();
    expect(mockClose).toHaveBeenCalled();
  });

  it('calls onCancel and close when Cancel is clicked', () => {
    (useConfirmDialogStore as unknown as jest.Mock).mockReturnValue({
      isOpen: true,
      title: 'Confirm Action',
      confirmMessage: 'Proceed?',
      onConfirm: mockOnConfirm,
      onCancel: mockOnCancel,
      close: mockClose,
    });

    render(<ConfirmDialog />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(mockOnCancel).toHaveBeenCalled();
    expect(mockClose).toHaveBeenCalled();
  });
});
