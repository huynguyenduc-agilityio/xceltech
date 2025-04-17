import { render } from '@testing-library/react';

// Pages
import AdminLeave from '..';

describe('AdminLeave', () => {
  it('should render successfully', () => {
    const { container } = render(<AdminLeave />);

    expect(container).toMatchSnapshot();
  });
});
