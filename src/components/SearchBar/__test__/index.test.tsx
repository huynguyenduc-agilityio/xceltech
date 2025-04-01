import { fireEvent, render } from '@testing-library/react';

// Components
import SearchBar from '..';

const mockOnChange = jest.fn();

describe('SearchBar Component', () => {
  it('should match snapshot', () => {
    const { container } = render(<SearchBar onChange={mockOnChange} />);

    expect(container).toMatchSnapshot();
  });

  it('should render input with placeholder', () => {
    const { getByPlaceholderText } = render(
      <SearchBar onChange={mockOnChange} />,
    );

    expect(getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('Should call onChange function', () => {
    const { getByPlaceholderText } = render(
      <SearchBar onChange={mockOnChange} />,
    );

    const input = getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith('test');
  });
});
