import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Layout
import UserLayout from '..';

describe('UserLayout', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <UserLayout />
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
