import { render } from '@testing-library/react';

// Components
import Navbar from '..';

const setup = () => {
  render(<Navbar />);
};

describe('Navbar component', () => {
  it('should match snapshot', () => {
    const container = setup();

    expect(container).toMatchSnapshot();
  });
});
