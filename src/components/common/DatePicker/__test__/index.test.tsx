import { render } from '@testing-library/react';

import DatePicker from '..';

describe('DatePicker component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<DatePicker />);

    expect(asFragment()).toMatchSnapshot();
  });
});
