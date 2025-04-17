import { render } from '@testing-library/react';

// Types
import { LeaveType } from '@/types';

// Components
import FilterMenu from '..';

describe('FilterMenu component', () => {
  const mockProps = {
    options: { type: Object.values(LeaveType) },
    onApply: jest.fn(),
  };

  it('should match snapshot', () => {
    const { asFragment } = render(<FilterMenu {...mockProps} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
