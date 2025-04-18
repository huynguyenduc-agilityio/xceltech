import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useParams } from 'react-router-dom';

// Hooks
import * as hooks from '@/hooks';

import LeaveRequest from '..';

jest.mock('@/hooks', () => ({
  ...jest.requireActual('@/hooks'),
  useToast: () => ({ toast: jest.fn() }),
  useGetLeave: jest.fn(),
}));

jest.mock('@/components', () => ({
  ...jest.requireActual('@/components'),
  Breadcrumb: ({ items }: { items: { label: string }[] }) => (
    <div data-testid="breadcrumb">
      {items.map((item, index) => (
        <span key={index}>{item.label}</span>
      ))}
    </div>
  ),
  Fallback: () => <div data-testid="fallback">Loading...</div>,
  LeaveForm: ({
    initialValues,
  }: {
    initialValues: Record<string, unknown>;
  }) => (
    <form>
      <label>
        Leave Type
        <input
          aria-label="Leave Type"
          defaultValue={initialValues.type === 'Annual' ? 'Annual Leave' : ''}
        />
      </label>
      <label>
        Reason for leave
        <input
          aria-label="Reason for leave"
          defaultValue={initialValues.reason as string}
        />
      </label>
      <label>
        Duration
        <input
          aria-label="Duration"
          defaultValue={initialValues.durations as number}
        />
      </label>
    </form>
  ),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('LeaveRequest', () => {
  const mockLeaveData = {
    type: 'Annual',
    startDate: '2025-04-18',
    endDate: '2025-04-20',
    durations: 3,
    resumptionDate: '2025-04-21',
    reason: 'Vacation',
    reliefOfficer: 'John Doe',
  };

  const renderComponent = (params = { param: 'annual', id: '1' }) => {
    return render(
      <MemoryRouter initialEntries={[`/leave/${params.param}/${params.id}`]}>
        <Routes>
          <Route path="/leave/:param/:id" element={<LeaveRequest />} />
        </Routes>
      </MemoryRouter>,
    );
  };

  it('renders breadcrumb without param', async () => {
    (hooks.useGetLeave as jest.Mock).mockReturnValue({
      leave: mockLeaveData,
      isLeaveLoading: false,
    });

    (useParams as jest.Mock).mockReturnValue({
      id: '1',
    });

    const { container } = renderComponent();

    expect(container).toBeInTheDocument();
  });

  it('renders breadcrumb correctly', async () => {
    (hooks.useGetLeave as jest.Mock).mockReturnValue({
      leave: mockLeaveData,
      isLeaveLoading: false,
    });

    (useParams as jest.Mock).mockReturnValue({
      param: 'annual',
      id: '1',
    });

    renderComponent();

    const breadcrumb = await screen.findByTestId('breadcrumb');
    expect(breadcrumb).toHaveTextContent('Dashboard');
    expect(breadcrumb).toHaveTextContent('Apply for Leave');
    expect(breadcrumb).toHaveTextContent('Annual Leave');
  });

  it('renders fallback while loading', () => {
    (hooks.useGetLeave as jest.Mock).mockReturnValue({
      leave: null,
      isLeaveLoading: true,
    });

    (useParams as jest.Mock).mockReturnValue({
      param: 'annual',
      id: '1',
    });

    renderComponent();

    expect(screen.getByTestId('fallback')).toBeInTheDocument();
  });

  it('renders LeaveForm with initialValues when data is loaded', async () => {
    (hooks.useGetLeave as jest.Mock).mockReturnValue({
      leave: mockLeaveData,
      isLeaveLoading: false,
    });

    (useParams as jest.Mock).mockReturnValue({
      param: 'annual',
      id: '1',
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByLabelText(/Leave Type/i)).toHaveValue('Annual Leave');
    });

    expect(screen.getByLabelText(/Reason for leave/i)).toHaveValue('Vacation');
    expect(screen.getByLabelText(/Duration/i)).toHaveValue('3');
  });

  it('renders LeaveForm with empty initialValues when leaveDetail is empty', async () => {
    (hooks.useGetLeave as jest.Mock).mockReturnValue({
      leave: null,
      isLeaveLoading: false,
    });

    (useParams as jest.Mock).mockReturnValue({
      param: 'annual',
      id: '1',
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByLabelText(/Leave Type/i)).toHaveValue('');
    });

    expect(screen.getByLabelText(/Reason for leave/i)).toHaveValue('');
    expect(screen.getByLabelText(/Duration/i)).toHaveValue('');
  });

  it('renders LeaveForm with empty initialValues when leaveType is empty', async () => {
    (hooks.useGetLeave as jest.Mock).mockReturnValue({
      leave: null,
      isLeaveLoading: false,
    });

    (useParams as jest.Mock).mockReturnValue({
      param: '',
      id: '1',
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByLabelText(/Leave Type/i)).toHaveValue('');
    });

    expect(screen.getByLabelText(/Reason for leave/i)).toHaveValue('');
    expect(screen.getByLabelText(/Duration/i)).toHaveValue('');
  });
});
