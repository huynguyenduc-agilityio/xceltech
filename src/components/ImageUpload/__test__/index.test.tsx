import { render } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';

import ImageUpload from '..';

describe('ImageUpload component', () => {
  const mockOnFileChange = jest.fn();

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const methods = useForm();
    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  it('should match snapshot', () => {
    const { container } = render(
      <ImageUpload
        imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvtXo0VK1WnuWrlK1tOXQizpHNhvqSJ9hUnQ&s"
        onImageChange={mockOnFileChange}
      />,
      { wrapper: Wrapper },
    );

    expect(container).toMatchSnapshot();
  });
});
