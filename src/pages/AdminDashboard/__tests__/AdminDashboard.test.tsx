import { render } from '@testing-library/react';

// Pages
import AdminDashboard from '..';

jest.mock('@/pages/AdminDashboard/InfoTileList', () => () => (
  <div>InfoTileList</div>
));

describe('AdminDashboard', () => {
  it('should render successfully', () => {
    const { container } = render(<AdminDashboard />);
    expect(container).toMatchSnapshot();
  });
});
