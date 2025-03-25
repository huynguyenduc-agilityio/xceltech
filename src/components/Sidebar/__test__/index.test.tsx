import { render } from '@testing-library/react';

import Sidebar from '..';

const setup = () => {
  render(
    <Sidebar>
      <div>Test Content</div>
    </Sidebar>,
  );
};

describe('Sidebar component', () => {
  it('should match snapshot', () => {
    const container = setup();

    expect(container).toMatchSnapshot();
  });
});
