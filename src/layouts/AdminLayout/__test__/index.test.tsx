import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Layout
import AdminLayout from '..';

describe('AdminLayout', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <AdminLayout />
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
