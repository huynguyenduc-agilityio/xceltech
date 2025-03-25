import { render } from '@testing-library/react';

import AdditionalFileUpload from '..';

describe('AdditionalFileUpload component', () => {
  const mockOnFileChange = jest.fn();

  it('should match snapshot', () => {
    const { container } = render(
      <AdditionalFileUpload name="test" onFileChange={mockOnFileChange} />,
    );

    expect(container).toMatchSnapshot();
  });
});
