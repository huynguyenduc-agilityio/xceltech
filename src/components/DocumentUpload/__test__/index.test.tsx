import { fireEvent, render } from '@testing-library/react';

import DocumentUpload from '..';

describe('DocumentUpload component', () => {
  const mockOnFileChange = jest.fn();

  it('should match snapshot', () => {
    const { container } = render(
      <DocumentUpload onFileChange={mockOnFileChange} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders correctly and allows file selection', () => {
    const mockOnFileChange = jest.fn();
    const testFile = new File(['dummy content'], 'testfile.pdf', {
      type: 'application/pdf',
    });

    const { getByText, getByLabelText } = render(
      <DocumentUpload fileUrl={null} onFileChange={mockOnFileChange} />,
    );

    const label = getByText('Choose File');
    expect(label).toBeInTheDocument();

    const input = getByLabelText('Choose File') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [testFile] } });

    expect(mockOnFileChange).toHaveBeenCalledWith(testFile);
  });

  it('displays the selected file name', () => {
    const file = new File(['data'], 'selected-file.png', { type: 'image/png' });

    const { getByText } = render(
      <DocumentUpload fileUrl={file} onFileChange={jest.fn()} />,
    );

    expect(getByText('selected-file.png')).toBeInTheDocument();
  });
});
