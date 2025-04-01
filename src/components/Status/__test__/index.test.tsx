import { render, screen } from '@testing-library/react';

// Types
import { StatusLeave } from '@/types';

// Component
import Status from '..';

describe('Status Component', () => {
  it('renders with default status Pending', () => {
    render(<Status />);

    expect(screen.getByText('pending')).toBeInTheDocument();
  });

  it('renders with Approve status', () => {
    render(<Status type={StatusLeave.Approve} />);

    expect(screen.getByText('approve')).toBeInTheDocument();
  });

  it('renders with Decline status', () => {
    render(<Status type={StatusLeave.Decline} />);

    expect(screen.getByText('decline')).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { container } = render(<Status />);

    expect(container).toMatchSnapshot();
  });
});
