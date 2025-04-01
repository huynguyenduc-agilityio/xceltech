import { render, screen } from '@testing-library/react';

import { Button, buttonVariants } from '..';

describe('Button component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<Button>Snapshot Button</Button>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with default variant and size', () => {
    render(<Button data-testid="test-button">Default Button</Button>);
    const button = screen.getByTestId('test-button');
    expect(button).toHaveClass('bg-primary text-white');
    expect(button).toHaveClass('h-[70px] py-6');
  });

  it('renders with loading state', () => {
    render(<Button isLoading>Loading Button</Button>);
    const loaderIcon = screen.getByTestId('loader-button');
    expect(loaderIcon).toBeInTheDocument();
    expect(loaderIcon).toHaveClass('animate-spin');
  });

  it('applies custom className', () => {
    render(
      <Button data-testid="custom-button" className="custom-class">
        Custom Button
      </Button>,
    );
    const button = screen.getByTestId('custom-button');
    expect(button).toHaveClass('custom-class');
  });

  it('renders as a child component when asChild is true', () => {
    render(
      <Button asChild>
        <a data-testid="link-button" href="#">
          Link Button
        </a>
      </Button>,
    );
    const link = screen.getByTestId('link-button');
    expect(link).toHaveClass('bg-primary text-white');
  });

  it('generates correct class names with buttonVariants', () => {
    const defaultClasses = buttonVariants();
    expect(defaultClasses).toContain('bg-primary');
    expect(defaultClasses).toContain('text-white');
  });

  it('applies different variants and sizes', () => {
    render(
      <>
        <Button data-testid="outline-button" variant="outline">
          Outline
        </Button>
        <Button data-testid="secondary-button" variant="secondary">
          Secondary
        </Button>
        <Button data-testid="ghost-button" variant="ghost">
          Ghost
        </Button>
        <Button data-testid="small-button" size="sm">
          Small
        </Button>
      </>,
    );

    expect(screen.getByTestId('outline-button')).toHaveClass(
      'border-[3px] border-primary text-primary bg-background hover:bg-accent',
    );
    expect(screen.getByTestId('secondary-button')).toHaveClass(
      'bg-secondary text-black-default hover:bg-secondary/80',
    );
    expect(screen.getByTestId('ghost-button')).toHaveClass(
      'hover:bg-accent hover:text-accent-foreground',
    );
    expect(screen.getByTestId('small-button')).toHaveClass(
      'h-10 rounded-[23px]',
    );
  });
});
