import { render } from '@testing-library/react';

// Components
import Breadcrumb from '..';

describe('Breadcrumb component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <Breadcrumb
        items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Apply for Leave' },
        ]}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
