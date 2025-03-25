import { render } from '@testing-library/react';

import DocumentUpload from '..';

describe('DocumentUpload component', () => {
  const mockOnFileChange = jest.fn();

  it('should match snapshot', () => {
    const { container } = render(
      <DocumentUpload onFileChange={mockOnFileChange} />,
    );

    expect(container).toMatchSnapshot();
  });
});
