import { ReactNode } from 'react';
import { render, RenderResult, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

// Constants
import { MESSAGES, USER_PAGE } from '@/constants';

// Mocks
import { mockDataSource } from '@/__mocks__';

// Pages
import LeaveApplication from '..';

// Mocks
const mockUseGetLeaves = jest.fn();
const mockUsePagination = jest.fn();
const mockUseDeleteUserLeave = jest.fn();
const mockConfirm = jest.fn();
const mockToast = jest.fn();
const mockNavigate = jest.fn();

jest.mock('@/hooks', () => ({
  ...jest.requireActual('@/hooks'),
  useGetLeaves: () => mockUseGetLeaves(),
  usePagination: () => mockUsePagination(),
  useDeleteUserLeave: () => ({
    handleDeleteUserLeave: mockUseDeleteUserLeave,
  }),
  useConfirm: () => mockConfirm,
  useToast: () => ({
    toast: mockToast,
  }),
}));

jest.mock('@/stores', () => ({
  ...jest.requireActual('@/stores'),
}));

jest.mock('@/components', () => ({
  ...jest.requireActual('@/components'),
  Carousel: ({ listContent }: { listContent: { title: string }[] }) => (
    <div data-testid="carousel">
      {listContent.map((item) => item.title).join(', ')}
    </div>
  ),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const queryClient = new QueryClient();

const Wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>{children}</BrowserRouter>
  </QueryClientProvider>
);

let renderResult: RenderResult;

describe('LeaveApplication', () => {
  beforeEach(() => {
    mockUseGetLeaves.mockReturnValue({
      leaves: {
        results: mockDataSource,
        metaData: { totalCount: mockDataSource.length + 1 },
      },
      isLeavesLoading: false,
    });

    mockUsePagination.mockReturnValue({
      currentPage: 1,
      pageSize: 10,
      handleChangeLimit: jest.fn(),
      handleChangePage: jest.fn(),
      isDisableNext: false,
      isDisablePrev: false,
    });

    renderResult = render(
      <Wrapper>
        <LeaveApplication />
      </Wrapper>,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render LeaveApplication with breadcrumb and carousel', () => {
    const { getByText, getByTestId } = renderResult;

    expect(getByText('Apply for Leave')).toBeInTheDocument();
    expect(getByText('Leave Application')).toBeInTheDocument();
    expect(getByTestId('carousel')).toBeInTheDocument();
  });

  it('should display the leave table and allow action dropdown', async () => {
    const { getAllByRole, getAllByText, container } = renderResult;

    const actionButton = getAllByRole('button', { name: /action/i })[0];
    await userEvent.click(actionButton);

    const editOption = getAllByText('Edit')[0];
    expect(editOption).toBeInTheDocument();

    const deleteOption = getAllByText('Delete')[0];
    expect(deleteOption).toBeInTheDocument();

    expect(container).toBeInTheDocument();
  });

  it('should show empty state when there is no leave data', () => {
    mockUseGetLeaves.mockReturnValue({
      leaves: {
        results: [],
        metaData: { totalCount: 0 },
      },
      isLeavesLoading: false,
    });

    const { getByText } = render(
      <Wrapper>
        <LeaveApplication />
      </Wrapper>,
    );

    expect(getByText(MESSAGES.COMMON.EMPTY_DATA)).toBeInTheDocument();
  });

  it('should handle filter apply', async () => {
    const filterBtn = screen.getByTitle('Filter Dropdown');

    await userEvent.click(filterBtn);

    const okButton = await screen.findByRole('button', { name: 'OK' });
    await userEvent.click(okButton);

    expect(mockUseGetLeaves).toHaveBeenCalled();
  });

  it('should handle delete leave successfully', async () => {
    const confirmHandler = jest.fn((options) => options.onConfirm());

    mockConfirm.mockImplementation(confirmHandler);
    mockUseDeleteUserLeave.mockResolvedValue(undefined);

    const { getAllByRole, getAllByText } = renderResult;

    const actionButton = getAllByRole('button', { name: 'Action' })[0];
    await userEvent.click(actionButton);

    const deleteOption = getAllByText('Delete')[0];
    await userEvent.click(deleteOption);

    await waitFor(() => {
      expect(confirmHandler).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(mockUseDeleteUserLeave).toHaveBeenCalledWith('1');
      expect(mockToast).toHaveBeenCalledWith({
        status: 'success',
        title: 'Leave deleted successfully!',
      });
    });
  });

  it('should navigate to edit leave page when clicking Edit', async () => {
    const { getAllByRole, getAllByText } = renderResult;

    const actionButton = getAllByRole('button', { name: 'Action' })[0];
    await userEvent.click(actionButton);

    const editOption = getAllByText('Edit')[0];
    await userEvent.click(editOption);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(`${USER_PAGE.LEAVE}/sick/1`);
    });
  });

  it('should navigate with LeaveFormEnum.Compassionate when type is Casual', async () => {
    const actionButtons = await screen.findAllByRole('button', {
      name: 'Action',
    });

    await userEvent.click(actionButtons[actionButtons.length - 1]);

    const editButtons = await screen.findAllByText('Edit');
    await userEvent.click(editButtons[editButtons.length - 1]);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(
        `${USER_PAGE.LEAVE}/compassionate/4`,
      );
    });
  });
});
