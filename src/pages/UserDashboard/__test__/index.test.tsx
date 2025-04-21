import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

// Hooks
import { useGetInfoUser } from '@/hooks';

// Stores
import { useUser } from '@/stores';

import UserDashboard from '..';

jest.mock('@/hooks', () => ({
  useGetInfoUser: jest.fn(),
}));

jest.mock('@/stores', () => ({
  useUser: jest.fn(),
}));

const renderWithRouter = (children: ReactNode) => {
  return render(<MemoryRouter>{children}</MemoryRouter>);
};

describe('UserDashboard', () => {
  beforeEach(() => {
    (useUser as jest.Mock).mockReturnValue({ userId: '123' });
    (useGetInfoUser as jest.Mock).mockReturnValue({
      userInfo: {
        firstName: 'John',
        lastName: 'Doe',
        avatar: '/avatar.jpg',
        job: {
          name: 'Software Engineer',
        },
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly and matches snapshot', () => {
    const { asFragment } = renderWithRouter(<UserDashboard />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('handles undefined userInfo gracefully', () => {
    (useGetInfoUser as jest.Mock).mockReturnValue({
      userInfo: undefined,
    });

    renderWithRouter(<UserDashboard />);

    const spans = screen.queryAllByText((content, element) => {
      return element?.tagName.toLowerCase() === 'span' && content.trim() === '';
    });

    expect(spans.length).toBeGreaterThan(0);
  });

  it('handles empty userInfo object', () => {
    (useGetInfoUser as jest.Mock).mockReturnValue({
      userInfo: {},
    });

    const { container } = renderWithRouter(<UserDashboard />);

    expect(container).toBeInTheDocument();
    expect(screen.queryByText('Software Engineer')).not.toBeInTheDocument();
  });

  it('displays user information correctly', () => {
    renderWithRouter(<UserDashboard />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
  });

  it('renders QuickAction component', () => {
    renderWithRouter(<UserDashboard />);
    expect(screen.getByText('Quick Actions')).toBeInTheDocument();
  });

  it('renders OverviewSection component', () => {
    renderWithRouter(<UserDashboard />);
    expect(screen.getByText('Available Leave Days')).toBeInTheDocument();
  });
});
