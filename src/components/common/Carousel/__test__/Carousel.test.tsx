import { createRef } from 'react';
import { render } from '@testing-library/react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselRoot,
} from '..';
import '@testing-library/jest-dom';

jest.mock('embla-carousel-react', () => {
  return () => {
    const ref = createRef<HTMLDivElement>();
    return [
      ref,
      {
        scrollPrev: jest.fn(),
        scrollNext: jest.fn(),
        canScrollPrev: () => true,
        canScrollNext: () => true,
        on: jest.fn(),
        off: jest.fn(),
      },
    ];
  };
});

describe('Carousel component', () => {
  const mockContent = [
    { key: '1', content: <div>Slide 1</div> },
    { key: '2', content: <div>Slide 2</div> },
    { key: '3', content: <div>Slide 3</div> },
  ];

  it('renders all slides', () => {
    const { getByText } = render(<Carousel listContent={mockContent} />);

    expect(getByText('Slide 1')).toBeInTheDocument();
    expect(getByText('Slide 2')).toBeInTheDocument();
    expect(getByText('Slide 3')).toBeInTheDocument();
  });

  it('renders navigation buttons when isAction is true', () => {
    const { getByRole } = render(
      <Carousel listContent={mockContent} isAction />,
    );
    expect(
      getByRole('button', { name: /previous slide/i }),
    ).toBeInTheDocument();
    expect(getByRole('button', { name: /next slide/i })).toBeInTheDocument();
  });

  it('does not render navigation buttons when isAction is false', () => {
    const { queryByRole } = render(<Carousel listContent={mockContent} />);

    expect(
      queryByRole('button', { name: /previous slide/i }),
    ).not.toBeInTheDocument();
    expect(
      queryByRole('button', { name: /next slide/i }),
    ).not.toBeInTheDocument();
  });

  it('applies vertical orientation classes and renders vertical controls', () => {
    const { getByText, getByTitle } = render(
      <CarouselRoot orientation="vertical">
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
        </CarouselContent>
        <CarouselPrevious title="Prev Button" />
        <CarouselNext title="Next Button" />
      </CarouselRoot>,
    );

    const track = getByText('Slide 1').parentElement!;

    expect(track.className).toMatch(/flex-col/);

    const item = getByText('Slide 1');

    expect(item).toHaveClass('pt-4');
    expect(item).not.toHaveClass('pl-8');

    const prevButton = getByTitle('Prev Button');
    const nextButton = getByTitle('Next Button');

    expect(prevButton).toHaveClass('-top-12', 'rotate-90');
    expect(nextButton).toHaveClass('-bottom-12', 'rotate-90');
  });

  it('infers vertical orientation from opts.axis = "y"', () => {
    const { getByText } = render(
      <CarouselRoot
        orientation={null as unknown as 'horizontal' | 'vertical' | undefined}
        opts={{ axis: 'y' }}
      >
        <CarouselContent>
          <CarouselItem>Slide Fallback</CarouselItem>
        </CarouselContent>
        <CarouselPrevious title="Prev Button" />
        <CarouselNext title="Next Button" />
      </CarouselRoot>,
    );

    const track = getByText('Slide Fallback').parentElement!;

    expect(track.className).toMatch('flex -mt-4 flex-col');
  });

  it('infers vertical orientation from opts.axis = "x"', () => {
    const { getByText } = render(
      <CarouselRoot
        orientation={null as unknown as 'horizontal' | 'vertical' | undefined}
        opts={{ axis: 'x' }}
      >
        <CarouselContent>
          <CarouselItem>Slide Fallback</CarouselItem>
        </CarouselContent>
        <CarouselPrevious title="Prev Button" />
        <CarouselNext title="Next Button" />
      </CarouselRoot>,
    );

    const track = getByText('Slide Fallback').parentElement!;

    expect(track.className).toMatch('flex -ml-4');
  });
});
