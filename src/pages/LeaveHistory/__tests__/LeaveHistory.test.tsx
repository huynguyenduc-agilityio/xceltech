import { render, RenderResult, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

// Pages
import LeaveHistory from '..';

// Mocks
import { mockDataSource } from '@/__mocks__';

let renderResult: RenderResult;
const queryClient = new QueryClient();
const mockLeaves = { results: mockDataSource, metaData: { totalCount: 1 } };

jest.mock('@/hooks', () => ({
  ...jest.requireActual('@/hooks'),
  useGetLeaves: () => ({
    leaves: mockLeaves,
    isLeavesLoading: false,
  }),

  usePagination: () => ({
    currentPage: 1,
    pageSize: 10,
    handleChangeLimit: jest.fn(),
    handleChangePage: jest.fn(),
    isDisableNext: false,
    isDisablePrev: false,
  }),

  useUpdateStatusLeaveRequest: () => ({
    isLoading: false,
    handleUpdateStatus: jest.fn(),
  }),
}));

const Wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('LeaveHistory', () => {
  beforeEach(() => {
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
});
