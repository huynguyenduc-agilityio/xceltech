import { render, screen } from '@testing-library/react';

// Types
import { StatusLeave } from '@/types';

// Component
import Status from '..';

describe('Status Component', () => {
  it('renders with default status Pending', () => {
    render(<Status />);

    expect(screen.getByText('Pending')).toBeInTheDocument();
  });

  it('renders with Approved status', () => {
    render(<Status type={StatusLeave.Approved} />);

    expect(screen.getByText('Approved')).toBeInTheDocument();
  });

  it('renders with Rejected status', () => {
    render(<Status type={StatusLeave.Rejected} />);

    expect(screen.getByText('Rejected')).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { container } = render(<Status />);

    expect(container).toMatchSnapshot();
  });
});
