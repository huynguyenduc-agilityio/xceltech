import { render } from '@testing-library/react';

import ConfirmDialog from '..';

describe('ConfirmDialog components', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<ConfirmDialog />);

    expect(asFragment()).toMatchSnapshot();
  });
});
