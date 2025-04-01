import { render } from '@testing-library/react';

// Component
import Fallback from '..';

describe('Fallback Component', () => {
  it('should match snapshot', () => {
    const element = render(<Fallback />);

    expect(element).toMatchSnapshot();
  });
});
