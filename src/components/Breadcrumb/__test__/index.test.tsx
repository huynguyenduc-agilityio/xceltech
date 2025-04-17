import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Components
import Breadcrumb from '..';

describe('Breadcrumb component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Apply for Leave' },
          ]}
        />
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
