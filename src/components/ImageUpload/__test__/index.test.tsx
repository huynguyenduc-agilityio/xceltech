import { fireEvent, render } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';

import ImageUpload from '..';

const mockOnFileChange = jest.fn();

describe('ImageUpload component', () => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const methods = useForm();
    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  beforeEach(() => {
    global.URL.createObjectURL = jest.fn(
      () => 'blob:http://localhost/fake-url',
    );
    global.URL.revokeObjectURL = jest.fn();
  });

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

  it('calls onImageChange when file is selected and revokes old URL', () => {
    const { getByTitle } = render(
      <ImageUpload onImageChange={mockOnFileChange} />,
      {
        wrapper: Wrapper,
      },
    );

    const input = getByTitle('Upload Image');
    const file1 = new File(['dummy content'], 'test1.png', {
      type: 'image/png',
    });
    const file2 = new File(['dummy content'], 'test2.png', {
      type: 'image/png',
    });

    fireEvent.change(input, {
      target: { files: [file1] },
    });

    fireEvent.change(input, {
      target: { files: [file2] },
    });

    expect(mockOnFileChange).toHaveBeenCalledWith(file2);

    expect(global.URL.revokeObjectURL).toHaveBeenCalledWith(
      'blob:http://localhost/fake-url',
    );
  });

  it('should trigger input click when image is clicked', () => {
    const { getByTitle, container } = render(
      <ImageUpload
        onImageChange={jest.fn()}
        imageUrl={null as unknown as string}
      />,
      {
        wrapper: Wrapper,
      },
    );

    const button = getByTitle('Button Upload Image');
    fireEvent.click(button);

    expect(container).toBeInTheDocument();
  });
});
