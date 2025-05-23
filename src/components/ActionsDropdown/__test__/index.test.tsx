import { render } from '@testing-library/react';

// Icons
import { CircleDownIcon } from '@/icons';

// Components
import { Button } from '@/components/common';
import ActionsDropdown from '..';

describe('ActionsDropdown component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <ActionsDropdown
        items={[
          {
            key: 'approve',
            label: 'Approve',
            onClick: () => console.log('Approved'),
          },
          {
            key: 'decline',
            label: 'Decline',
            onClick: () => console.log('Declined'),
            disabled: true,
          },
          {
            key: 'view',
            label: 'View Details',
            onClick: () => console.log('View Details'),
          },
        ]}
      >
        <Button className="w-[195px] h-14 shadow-md">
          Export
          <CircleDownIcon className="ml-4" />
        </Button>
      </ActionsDropdown>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
