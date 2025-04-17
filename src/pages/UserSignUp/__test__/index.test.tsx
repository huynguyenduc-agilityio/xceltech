import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Constants
import { MESSAGES } from '@/constants';

// Hooks
import { useRegister } from '@/hooks';

// Page
import UserSignUp from '..';

jest.mock('@/hooks', () => ({
  ...jest.requireActual('@/hooks'),
  useRegister: jest.fn(),
}));

describe('UserSignUp', () => {
  const handleRegisterUser = jest.fn().mockResolvedValue(undefined);

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <UserSignUp />
      </MemoryRouter>,
    );

  beforeEach(() => {
    (useRegister as jest.Mock).mockReturnValue({
      handleRegisterUser,
      isRegisterLoading: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the sign-up page correctly', () => {
    renderComponent();
    expect(
      screen.getByRole('heading', { name: /welcome to xceltech/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/enter first name/i),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter last name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter email/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/enter phone number/i),
    ).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText(/password/i)[0]).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/re-enter password/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /create account/i }),
    ).toBeDisabled();
  });

  it('enables the submit button when fields are valid', async () => {
    renderComponent();
    await userEvent.type(
      screen.getByPlaceholderText(/enter first name/i),
      'John',
    );
    await userEvent.type(
      screen.getByPlaceholderText(/enter last name/i),
      'Doe',
    );
    await userEvent.type(
      screen.getByPlaceholderText(/enter email/i),
      'john.doe@example.com',
    );
    await userEvent.type(
      screen.getByPlaceholderText(/enter phone number/i),
      '1234567890',
    );
    await userEvent.type(
      screen.getAllByPlaceholderText(/password/i)[0],
      'StrongPass1!',
    );
    await userEvent.type(
      screen.getByPlaceholderText(/re-enter password/i),
      'StrongPass1!',
    );
    await userEvent.click(screen.getByLabelText(/i agree to all the/i));
    expect(
      screen.getByRole('button', { name: /create account/i }),
    ).toBeEnabled();
  });

  it('shows error messages for invalid inputs', async () => {
    renderComponent();
    await userEvent.type(
      screen.getByPlaceholderText(/enter email/i),
      'invalid-email',
    );
    await userEvent.tab();
    await userEvent.type(
      screen.getAllByPlaceholderText(/password/i)[0],
      'short',
    );
    await userEvent.tab();
    expect(
      await screen.findByText((content) =>
        content.includes('Please enter a valid email'),
      ),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(MESSAGES.VALIDATE.LIMIT_PASSWORD),
    ).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    renderComponent();
    await userEvent.type(
      screen.getByPlaceholderText(/enter first name/i),
      'John',
    );
    await userEvent.type(
      screen.getByPlaceholderText(/enter last name/i),
      'Doe',
    );
    await userEvent.type(
      screen.getByPlaceholderText(/enter email/i),
      'john.doe@gmail.com',
    );
    await userEvent.type(
      screen.getByPlaceholderText(/enter phone number/i),
      '1234567890',
    );
    await userEvent.type(
      screen.getAllByPlaceholderText(/password/i)[0],
      'StrongPass1!',
    );
    await userEvent.type(
      screen.getByPlaceholderText(/re-enter password/i),
      'StrongPass1!',
    );
    await userEvent.click(screen.getByLabelText(/i agree to all the/i));
    await userEvent.click(
      screen.getByRole('button', { name: /create account/i }),
    );
    await waitFor(() => {
      expect(handleRegisterUser).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@gmail.com',
        phone: '1234567890',
        password: 'StrongPass1!',
        confirmPassword: 'StrongPass1!',
        isReceiveNewsletters: false,
      });
    });
  });
});
