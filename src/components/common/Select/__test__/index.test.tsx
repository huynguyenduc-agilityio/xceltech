import { render } from '@testing-library/react';

import { Select } from '..';

const mockOption = [
  {
    value: 'sick',
    label: 'Sick',
  },
  {
    value: 'exam',
    label: 'Exam',
  },
];

describe('Select component', () => {
  const commonProps = {
    option: mockOption,
    placeholder: 'Select your relief officer ',
    className: 'bg-blue-light',
    onChange: () => {},
  };

  it('should match snapshot', () => {
    const { asFragment } = render(<Select {...commonProps} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
