import { fireEvent, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Types
import { IInfoUser } from '@/types';

// Utils
import { getInitialsAvatar } from '@/utils';

import PersonalDetailTab from '..';

const mockUserInfo: Partial<IInfoUser> = {
  firstName: 'John',
  lastName: 'Doe',
  avatar: '',
  job: {
    department: 'Engineering',
    name: 'Software Engineer',
    jobCategory: 'Full-time',
  },
};

jest.mock('@/utils', () => ({
  ...jest.requireActual('@/utils'),
  getInitialsAvatar: jest.fn(),
  generateBgColor: jest.fn(),
}));

jest.mock('@hookform/resolvers/zod', () => ({
  zodResolver: () => () => ({}),
}));

const queryClient = new QueryClient();

const renderWithQueryClient = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
};

describe('PersonalDetailTab', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders user info when not in edit mode', () => {
    renderWithQueryClient(<PersonalDetailTab userInfo={mockUserInfo} />);

    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();

    expect(screen.getByText('Employee Name')).toBeInTheDocument();
    expect(screen.getByText('Department')).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toBeInTheDocument();

    expect(screen.getByText('Job Title')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Job Category')).toBeInTheDocument();
    expect(screen.getByText('Full-time')).toBeInTheDocument();
  });

  it('calls getInitialsAvatar for fallback avatar when no avatar is provided', () => {
    renderWithQueryClient(<PersonalDetailTab userInfo={mockUserInfo} />);

    expect(getInitialsAvatar).toHaveBeenCalledWith('John Doe');
  });

  it('handles empty userInfo and renders fallback values', () => {
    const { container } = renderWithQueryClient(<PersonalDetailTab />);

    expect(screen.getByText('Employee Name')).toBeInTheDocument();
    expect(screen.getByText('Department')).toBeInTheDocument();
    expect(screen.getByText('Job Title')).toBeInTheDocument();
    expect(screen.getByText('Job Category')).toBeInTheDocument();

    expect(container).toBeInTheDocument();
  });

  it('handles empty string userInfo and renders fallback values', () => {
    const emptyStringUserInfo: Partial<IInfoUser> = {
      firstName: '',
      lastName: '',
      avatar: '',
    };

    const { container } = renderWithQueryClient(
      <PersonalDetailTab userInfo={emptyStringUserInfo} />,
    );

    expect(screen.getByText('Employee Name')).toBeInTheDocument();
    expect(screen.getByText('Department')).toBeInTheDocument();
    expect(screen.getByText('Job Title')).toBeInTheDocument();
    expect(screen.getByText('Job Category')).toBeInTheDocument();

    expect(container).toBeInTheDocument();
  });

  it('triggers toggleEdit when edit button is clicked', () => {
    renderWithQueryClient(<PersonalDetailTab userInfo={mockUserInfo} />);
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    expect(screen.getByRole('button', { name: /update/i })).toBeInTheDocument();
  });
});
