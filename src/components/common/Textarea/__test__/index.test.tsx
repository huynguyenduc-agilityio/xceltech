import { render } from '@testing-library/react';

// Components
import { Textarea } from '..';

describe('Textarea component', () => {
  it('should match snapshot', () => {
    const { container } = render(<Textarea placeholder="Description" />);

    expect(container).toMatchSnapshot();
  });
});
