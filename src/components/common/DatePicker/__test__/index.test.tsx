import { render } from '@testing-library/react';

import DatePicker from '..';

describe('DatePicker component', () => {
  const mockOnSelect = jest.fn();
  const fixedDate = new Date('2025-03-18');

  it('should match snapshot', () => {
    const { asFragment } = render(
      <DatePicker date={fixedDate} onSelect={mockOnSelect} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
