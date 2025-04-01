import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm, FormProvider } from 'react-hook-form';
import TextField from '..';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();

  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('TextField Component', () => {
  const mockOnChange = jest.fn();

  const commonProps = {
    label: 'Username',
    placeholder: 'Enter your username',
    onChange: mockOnChange,
  };

  it('renders the component with label and input field', () => {
    render(
      <Wrapper>
        <TextField {...commonProps} />
      </Wrapper>,
    );

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/enter your username/i),
    ).toBeInTheDocument();
  });

  it('calls onChange when input value changes', async () => {
    render(
      <Wrapper>
        <TextField {...commonProps} />
      </Wrapper>,
    );

    const input = screen.getByLabelText(/username/i);

    await userEvent.type(input, 'Hello');

    expect(mockOnChange).toHaveBeenCalledTimes(5);
    expect(mockOnChange).toHaveBeenLastCalledWith('Hello');
  });

  it('shows error message when errorMessage is provided', () => {
    render(
      <Wrapper>
        <TextField {...commonProps} errorMessage="Invalid input" />
      </Wrapper>,
    );

    expect(screen.getByText(/invalid input/i)).toBeInTheDocument();
    expect(screen.getByText(/invalid input/i)).toHaveClass('text-red-500');
  });

  it('does not show error message when errorMessage is not provided', () => {
    render(
      <Wrapper>
        <TextField {...commonProps} />
      </Wrapper>,
    );

    expect(screen.queryByText(/invalid input/i)).not.toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { asFragment } = render(
      <Wrapper>
        <TextField {...commonProps} />
      </Wrapper>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
