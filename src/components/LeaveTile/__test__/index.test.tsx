import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Components
import LeaveTile from '..';

const renderLeaveTile = () =>
  render(
    <MemoryRouter>
      <LeaveTile title="Annual Leave" count={60} path="" />
    </MemoryRouter>,
  );

describe('LeaveTile component', () => {
  it('renders the Button with children', () => {
    const { getByText } = renderLeaveTile();

    expect(getByText('Annual Leave')).toBeInTheDocument();
    expect(getByText('60')).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { asFragment } = renderLeaveTile();

    expect(asFragment()).toMatchSnapshot();
  });
});
