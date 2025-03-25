import { render } from '@testing-library/react';

import { Avatar } from '..';

describe('Avatar component', () => {
  it('should match snapshot', () => {
    const { container } = render(
      <Avatar src="https://github.com/shadcn.png" size={100} />,
    );

    expect(container).toMatchSnapshot();
  });
});
