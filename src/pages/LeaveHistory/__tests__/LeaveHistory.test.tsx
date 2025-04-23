import { ReactNode } from 'react';
import userEvent from '@testing-library/user-event';
import { render, RenderResult, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Pages
import LeaveHistory from '..';

// Mocks
import { mockDataSource } from '@/__mocks__';

// Constants
import { MESSAGES } from '@/constants';

let renderResult: RenderResult;
const queryClient = new QueryClient();

const mockUseGetLeaves = jest.fn();
const mockUsePagination = jest.fn();
const mockUseUpdateStatusLeaveRequest = jest.fn();

jest.mock('@/hooks', () => ({
  ...jest.requireActual('@/hooks'),
  useGetLeaves: () => mockUseGetLeaves(),
  usePagination: () => mockUsePagination(),
  useUpdateStatusLeaveRequest: () => mockUseUpdateStatusLeaveRequest(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: () => [new URLSearchParams()],
}));

const Wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('LeaveHistory', () => {
  beforeEach(() => {
    mockUseGetLeaves.mockReturnValue({
      leaves: {
        results: mockDataSource,
        metaData: { totalCount: mockDataSource.length },
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

    mockUseUpdateStatusLeaveRequest.mockReturnValue({
      isLoading: false,
      handleUpdateStatus: jest.fn(),
    });

    renderResult = render(
      <Wrapper>
        <LeaveHistory />
      </Wrapper>,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render successfully', () => {
    expect(renderResult.container).toMatchSnapshot();
  });

  it('handle click button actions', async () => {
    const { getAllByRole, getAllByText, container } = renderResult;

    const actionButton = getAllByRole('button', { name: 'Action' })[0];

    await userEvent.click(actionButton);

    await waitFor(async () => {
      const approvedButton = getAllByText('Approved')[0];
      await userEvent.click(approvedButton);
    });

    await userEvent.click(actionButton);

    await waitFor(async () => {
      const declinedButton = getAllByText('Rejected')[0];

      await userEvent.click(declinedButton);
    });

    expect(container).toBeInTheDocument();
  });

  it('handle click filter dropdown', async () => {
    const { getByTitle, getByRole, container } = renderResult;

    const filterButton = getByTitle('Filter Dropdown');

    await userEvent.click(filterButton);

    await waitFor(async () => {
      const applyButton = getByRole('button', { name: 'OK' });

      await userEvent.click(applyButton);
    });

    expect(container).toBeInTheDocument();
  });

  it('should render empty state when there is no data', () => {
    mockUseGetLeaves.mockReturnValue({
      leaves: {
        results: [],
        metaData: { totalCount: 0 },
      },
      isLeavesLoading: false,
    });

    mockUsePagination.mockReturnValue({
      currentPage: null,
      pageSize: null,
      handleChangeLimit: jest.fn(),
      handleChangePage: jest.fn(),
      isDisableNext: false,
      isDisablePrev: false,
    });

    const { getByText } = render(
      <Wrapper>
        <LeaveHistory />
      </Wrapper>,
    );

    expect(getByText(MESSAGES.COMMON.EMPTY_DATA)).toBeInTheDocument();
  });
});
