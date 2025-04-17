import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Layout
import AdminLayout from '..';

jest.mock('@/hooks', () => ({
  ...jest.requireActual('@/hooks'),
  useGetInfoUser: () => jest.fn(),
}));

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
