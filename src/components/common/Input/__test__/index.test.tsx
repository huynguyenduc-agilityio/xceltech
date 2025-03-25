import { render, screen } from '@testing-library/react';
import { Input } from '..';

describe('Input Component', () => {
  it('renders input element correctly', () => {
    render(<Input placeholder="Enter text" />);

    const input = screen.getByTestId('input-element');

    expect(input).toBeInTheDocument();
  });

  it('handles different variants correctly', () => {
    const { rerender } = render(<Input variant="primary" />);

    expect(screen.getByTestId('input-element')).toHaveClass('bg-blue-light');

    rerender(<Input variant="secondary" />);

    expect(screen.getByTestId('input-element')).toHaveClass(
      'border-gray-muted',
    );
  });

  it('applies custom className correctly', () => {
    render(<Input className="custom-class" />);

    expect(screen.getByTestId('input-element')).toHaveClass('custom-class');
  });

  it('handles disabled state correctly', () => {
    render(<Input disabled />);

    const input = screen.getByTestId('input-element');

    expect(input).toBeDisabled();
  });

  it('should match snapshot', () => {
    const { container } = render(<Input placeholder="Enter text" />);

    expect(container).toMatchSnapshot();
  });
});
