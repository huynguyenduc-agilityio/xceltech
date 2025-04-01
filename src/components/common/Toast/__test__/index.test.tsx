import { render } from '@testing-library/react';
import { Toast } from '@/components';
import { useToast } from '@/hooks';
import { ToastStatus } from '@/types';

jest.mock('@/hooks', () => ({
  useToast: jest.fn(),
}));

describe('Toast Component', () => {
  it('renders success toast correctly', () => {
    (useToast as jest.Mock).mockReturnValue({
      toasts: [
        {
          id: '1',
          status: ToastStatus.Success,
          title: 'Success!',
          description: 'Your action was successful.',
        },
      ],
    });

    const { asFragment } = render(<Toast />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders error toast correctly', () => {
    (useToast as jest.Mock).mockReturnValue({
      toasts: [
        {
          id: '2',
          status: ToastStatus.Error,
          title: 'Error!',
          description: 'Something went wrong.',
        },
      ],
    });

    const { asFragment } = render(<Toast />);
    expect(asFragment()).toMatchSnapshot();
  });
});
