import { render } from '@testing-library/react';

import DatePicker from '..';

describe('DatePicker component', () => {
  const mockOnSelect = jest.fn();

  it('should match snapshot', () => {
    const { asFragment } = render(
      <DatePicker date={new Date()} onSelect={mockOnSelect} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
