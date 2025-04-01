import { render } from '@testing-library/react';

import { Checkbox } from '..';

describe('Avatar component', () => {
  it('should match snapshot', () => {
    const { container } = render(<Checkbox />);

    expect(container).toMatchSnapshot();
  });
});
