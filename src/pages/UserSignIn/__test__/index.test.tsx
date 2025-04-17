import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Constants
import { MESSAGES } from '@/constants';

// Hooks
import { useLogin } from '@/hooks';

// Page
import UserSignIn from '..';

jest.mock('@/hooks', () => ({
  ...jest.requireActual('@/hooks'),
  useLogin: jest.fn(),
}));

describe('UserSignIn', () => {
  const handleLoginUser = jest.fn().mockResolvedValue(undefined);

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <UserSignIn />
      </MemoryRouter>,
    );

  beforeEach(() => {
    (useLogin as jest.Mock).mockReturnValue({
      handleLoginUser,
      isLoginLoading: false,
      isLoginError: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the sign-in page correctly', () => {
    renderComponent();
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/enter email address/i),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeDisabled();
  });

  it('enables the submit button when fields are valid', async () => {
    renderComponent();
    const emailInput = screen.getByPlaceholderText(/enter email address/i);
    const passwordInput = screen.getByPlaceholderText(/enter password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    await userEvent.type(emailInput, 'user@gmail.com');
    await userEvent.type(passwordInput, 'Abc@1234');

    expect(submitButton).toBeEnabled();
  });

  it('shows error messages for invalid inputs', async () => {
    renderComponent();
    const emailInput = screen.getByPlaceholderText(/enter email address/i);
    const passwordInput = screen.getByPlaceholderText(/enter password/i);

    await userEvent.type(emailInput, 'invalid-email');
    await userEvent.tab();
    await userEvent.type(passwordInput, 'short');
    await userEvent.tab();

    expect(
      await screen.findByText(MESSAGES.VALIDATE.FIELD_VALID('email address')),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(MESSAGES.VALIDATE.LIMIT_PASSWORD),
    ).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    renderComponent();
    const emailInput = screen.getByPlaceholderText(/enter email address/i);
    const passwordInput = screen.getByPlaceholderText(/enter password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    await userEvent.type(emailInput, 'user@gmail.com');
    await userEvent.type(passwordInput, 'Abc@1234');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(handleLoginUser).toHaveBeenCalledWith({
        email: 'user@gmail.com',
        password: 'Abc@1234',
      });
    });
  });

  it('shows error message when login fails', async () => {
    (useLogin as jest.Mock).mockReturnValue({
      handleLoginUser,
      isLoginLoading: false,
      isLoginError: true,
    });
    renderComponent();

    expect(
      screen.getByText(MESSAGES.AUTHENTICATION.LOGIN_FAILED),
    ).toBeInTheDocument();
  });
});
