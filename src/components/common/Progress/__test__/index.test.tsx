import { render } from '@testing-library/react';

import { Progress } from '..';

describe('Progress component', () => {
  it('should match snapshot', () => {
    const { container } = render(
      <Progress
        value={30}
        indicatorContent={
          <div className="flex items-center justify-between">
            <span className="font-lg">Annual Leave</span>
            <span className="font-lg">10 of 60 day(s)</span>
          </div>
        }
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
