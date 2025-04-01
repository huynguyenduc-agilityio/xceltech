import { render } from '@testing-library/react';

import ImageUpload from '..';

describe('ImageUpload component', () => {
  const mockOnFileChange = jest.fn();

  it('should match snapshot', () => {
    const { container } = render(
      <ImageUpload onImageChange={mockOnFileChange} />,
    );

    expect(container).toMatchSnapshot();
  });
});
