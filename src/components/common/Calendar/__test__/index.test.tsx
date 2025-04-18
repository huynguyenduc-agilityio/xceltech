import { render } from '@testing-library/react';

import { Calendar } from '..';

describe('Calendar component', () => {
  it('should match snapshot', () => {
    const fixedDate = new Date('2025-03-18');

    const { asFragment } = render(<Calendar selected={fixedDate} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
