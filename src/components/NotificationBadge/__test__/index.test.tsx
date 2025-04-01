import { render } from '@testing-library/react';

// Components
import NotificationBadge from '..';
import { Bell } from 'lucide-react';

describe('NotificationBadge component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <NotificationBadge
        icon={<Bell className="text-white w-6 h-6" />}
        count={13}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
