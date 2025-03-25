import { render } from '@testing-library/react';

// Components
import InfoTile from '..';

describe('InfoTile component', () => {
  it('renders the InfoTile with props', () => {
    const { getByText } = render(
      <InfoTile title="Messages" count={4} icon={<span>icon</span>} />,
    );
    expect(getByText('Messages')).toBeInTheDocument();
    expect(getByText('4')).toBeInTheDocument();
    expect(getByText('icon')).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { asFragment } = render(
      <InfoTile title="Messages" count={4} icon={<span>icon</span>} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
