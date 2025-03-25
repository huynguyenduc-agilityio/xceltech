import { render } from '@testing-library/react';

import { Calendar } from '..';

describe('Calendar component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<Calendar />);

    expect(asFragment()).toMatchSnapshot();
  });
});
