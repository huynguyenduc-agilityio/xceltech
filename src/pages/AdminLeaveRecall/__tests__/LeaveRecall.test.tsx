import { ReactNode } from 'react';
import {
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';

// Mocks
import { mockDataSource } from '@/__mocks__';

// Constants
import { MESSAGES } from '@/constants';

// Pages
import AdminLeaveRecall from '..';

const queryClient = new QueryClient();
let renderResult: RenderResult;

const mockUseGetLeaves = jest.fn();
const mockUsePagination = jest.fn();
const mockUseUpdateStatusLeaveRequest = jest.fn();

jest.mock('@/hooks', () => ({
  ...jest.requireActual('@/hooks'),
  useGetLeaves: () => mockUseGetLeaves(),
  usePagination: () => mockUsePagination(),
  useUpdateStatusLeaveRequest: () => mockUseUpdateStatusLeaveRequest(),
}));

const Wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('AdminLeaveRecall', () => {
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
        <AdminLeaveRecall />
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
    const {
      getAllByRole,
      getByRole,
      container,
      getByText,
      getByPlaceholderText,
    } = renderResult;

    const actionButton = getAllByRole('button', { name: 'Recall' })[0];
    await userEvent.click(actionButton);

    waitFor(() => {
      expect(getByText('Leave Recall')).toBeInTheDocument();
      const resumptionDate = getByPlaceholderText('Pick a Date');

      fireEvent.change(resumptionDate, {
        target: { value: '2025-04-15' },
      });
    });

    waitFor(async () => {
      const recallButton = getByRole('button', { name: 'Recall' });
      await userEvent.click(recallButton);
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
        <AdminLeaveRecall />
      </Wrapper>,
    );

    expect(getByText(MESSAGES.COMMON.EMPTY_DATA)).toBeInTheDocument();
  });
});
