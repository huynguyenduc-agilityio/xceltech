import { render, fireEvent, waitFor } from '@testing-library/react';

// Components
import DropdownNotification from '..';

// Mocks
import { mockDataRecallNotifications } from '@/__mocks__';

jest.mock('@/hooks', () => ({
  useGetNotifications: () => ({
    notifications: mockDataRecallNotifications,
    isNotificationLoading: false,
  }),
}));

describe('DropdownNotification Components', () => {
  it('renders DropdownNotification with trigger and content', () => {
    const { getByTitle, getByText } = render(<DropdownNotification />);

    const notificationButton = getByTitle('Dropdown Notification');
    fireEvent.click(notificationButton);

    waitFor(() => {
      expect(getByText('2025-04-14')).toBeInTheDocument();
    });
  });
});
