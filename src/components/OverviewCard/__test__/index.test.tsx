import { render } from '@testing-library/react';

// Components
import OverviewCard from '..';

describe('OverviewCard component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <OverviewCard
        title="Available Leave Days"
        children={
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui ipsum
            unde perspiciatis! Dicta officia veritatis eos expedita iste harum
            ea excepturi delectus iusto blanditiis autem voluptatibus minus
            commodi, repudiandae vero?
          </p>
        }
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
