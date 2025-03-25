import { render } from '@testing-library/react';

// Components
import LeaveTile from '..';

describe('LeaveTile component', () => {
  it('renders the Button with children', () => {
    const { getByText } = render(<LeaveTile title="Annual Leave" count={60} />);

    expect(getByText('Annual Leave')).toBeInTheDocument();
    expect(getByText('60')).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { asFragment } = render(
      <LeaveTile title="Annual Leave" count={60} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
