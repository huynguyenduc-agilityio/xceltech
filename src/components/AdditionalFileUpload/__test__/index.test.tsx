import { fireEvent, render } from '@testing-library/react';

// Components
import AdditionalFileUpload from '..';

// Constants
import { MESSAGES } from '@/constants';

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useFormContext: () => ({
    getFieldState: jest.fn(),
    formState: { errors: {} },
  }),
}));

describe('AdditionalFileUpload component', () => {
  const name = 'file';
  const mockOnFileChange = jest.fn();

  it('should match snapshot', () => {
    const { container } = render(
      <AdditionalFileUpload name={name} onFileChange={mockOnFileChange} />,
    );

    expect(container).toMatchSnapshot();
  });

  beforeEach(() => {
    global.URL.createObjectURL = jest.fn(() => 'mock-url');
    global.URL.revokeObjectURL = jest.fn();

    mockOnFileChange.mockReset();
  });

  it('renders correctly with no file', () => {
    const { getByRole } = render(
      <AdditionalFileUpload
        name={name}
        value={null}
        onFileChange={mockOnFileChange}
      />,
    );

    expect(getByRole('button', { name: /upload/i })).toBeInTheDocument();
  });

  it('handles file selection and calls onFileChange', () => {
    const { getByTitle } = render(
      <AdditionalFileUpload
        name={name}
        value={null}
        onFileChange={mockOnFileChange}
      />,
    );

    const input = getByTitle('Upload Additional File');
    const testFile = new File(['dummy content'], 'example.pdf', {
      type: 'application/pdf',
    });

    fireEvent.change(input, {
      target: { files: [testFile] },
    });

    expect(mockOnFileChange).toHaveBeenCalledWith(testFile);
  });

  it('displays the file name when a File is passed as value', () => {
    const file = new File(['file content'], 'resume.pdf', {
      type: 'application/pdf',
    });

    const { getByText, getByRole } = render(
      <AdditionalFileUpload
        name={name}
        value={file}
        onFileChange={mockOnFileChange}
      />,
    );

    const button = getByRole('button', { name: 'Upload' });

    fireEvent.click(button);

    expect(getByText('resume.pdf')).toBeInTheDocument();
  });

  it('renders link when value is a string URL', () => {
    const fileUrl = 'https://example.com/files/contract.pdf';

    const { getByRole } = render(
      <AdditionalFileUpload
        name={name}
        value={fileUrl}
        onFileChange={mockOnFileChange}
      />,
    );

    const link = getByRole('link');
    expect(link).toHaveAttribute('href', fileUrl);
    expect(link).toHaveTextContent('contract.pdf');
  });

  it('displays error message when error is present', () => {
    const { getByText } = render(
      <AdditionalFileUpload
        name={name}
        value={null}
        onFileChange={mockOnFileChange}
        errors={{
          file: {
            message: MESSAGES.VALIDATE.FIELD_REQUIRED('file'),
            type: 'required',
          },
        }}
      />,
    );

    expect(
      getByText(MESSAGES.VALIDATE.FIELD_REQUIRED('file')),
    ).toBeInTheDocument();
    expect(getByText('Please select again!!!')).toBeInTheDocument();
  });
});
