import { render } from '@testing-library/react';

// Components
import FilterMenu from '..';

describe('FilterMenu component', () => {
  const mockProps = {
    options: ['Name', 'Type'],
    onApply: jest.fn(),
  };

  it('should match snapshot', () => {
    const { asFragment } = render(<FilterMenu {...mockProps} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
