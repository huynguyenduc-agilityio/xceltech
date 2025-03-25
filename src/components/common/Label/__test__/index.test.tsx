import { render, screen } from '@testing-library/react';
import { Label, labelVariants } from '..';

describe('Label Component', () => {
  it('renders with default props', () => {
    render(<Label data-testid="test-label">Test Label</Label>);

    const label = screen.getByTestId('test-label');

    expect(label).toHaveClass(
      'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
    );
  });

  it('applies custom className', () => {
    render(
      <Label data-testid="custom-label" className="custom-class">
        Custom Label
      </Label>,
    );

    const label = screen.getByTestId('custom-label');

    expect(label).toHaveClass('custom-class');
  });

  it('generates correct class names with labelVariants', () => {
    const defaultClasses = labelVariants();

    expect(defaultClasses).toContain('text-black-soft');
    expect(defaultClasses).toContain('text-xl');
  });

  it('should match snapshot', () => {
    const { container } = render(<Label>Test Label</Label>);

    expect(container).toMatchSnapshot();
  });
});
