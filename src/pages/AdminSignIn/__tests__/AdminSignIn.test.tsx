import { ReactNode } from 'react';
import {
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Page
import AdminSignIn from '..';
import { MESSAGES } from '@/constants';

let renderResult: RenderResult;
const queryClient = new QueryClient();
const mockHandleLoginUser = jest.fn().mockResolvedValue({
  user: {
    id: 1,
    email: 'admin@gmail.com',
    role: 'admin',
  },
});
const mockUseLogin = jest.fn();

const Wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

jest.mock('@/hooks', () => ({
  ...jest.requireActual('@/hooks'),
  useLogin: () => mockUseLogin(),
}));

describe('AdminSignIn', () => {
  beforeEach(() => {
    mockUseLogin.mockReturnValue({
      handleLoginUser: mockHandleLoginUser,
      isLoginLoading: false,
      isLoginError: false,
    });

    renderResult = render(
      <BrowserRouter>
        <Wrapper>
          <AdminSignIn />
        </Wrapper>
      </BrowserRouter>,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    expect(renderResult.container).toMatchSnapshot();
  });

  it('handle change value and form submit', async () => {
    const { getByPlaceholderText, getByRole } = renderResult;

    const emailInput = getByPlaceholderText('Enter email address');
    const passwordInput = getByPlaceholderText('Enter password');
    const submitButton = getByRole('button', { name: 'Sign In' });

    fireEvent.change(emailInput, { target: { value: 'admin@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: '1@Dzxcvb' } });

    await userEvent.click(submitButton);

    expect(emailInput).toHaveValue('admin@gmail.com');
    expect(passwordInput).toHaveValue('1@Dzxcvb');

    expect(submitButton).toBeInTheDocument();
  });

  it('should show error message when email is invalid', async () => {
    const { getByPlaceholderText, getByText } = renderResult;

    const emailInput = getByPlaceholderText('Enter email address');
    const passwordInput = getByPlaceholderText('Enter password');

    fireEvent.change(emailInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: '' } });

    fireEvent.blur(emailInput);
    fireEvent.blur(passwordInput);

    await waitFor(() => {
      expect(
        getByText('Please enter a valid email address.'),
      ).toBeInTheDocument();

      expect(getByText('Password is required!')).toBeInTheDocument();
    });
  });

  it('should show error message when authentication fails', async () => {
    mockUseLogin.mockReturnValue({
      handleLoginUser: jest.fn().mockRejectedValue(new Error('Failed')),
      isLoginLoading: false,
      isLoginError: true,
    });

    const { getByText } = render(
      <BrowserRouter>
        <Wrapper>
          <AdminSignIn />
        </Wrapper>
      </BrowserRouter>,
    );

    expect(getByText(MESSAGES.AUTHENTICATION.LOGIN_FAILED)).toBeInTheDocument();
  });
});
