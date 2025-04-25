import { render, fireEvent, waitFor } from '@testing-library/react';

// Components
import DropdownNotification from '..';

// Mocks
import { mockDataRecallNotifications } from '@/__mocks__';
import { BrowserRouter } from 'react-router-dom';

jest.mock('@/hooks', () => ({
  useGetNotifications: () => ({
    notifications: mockDataRecallNotifications,
    isNotificationLoading: false,
  }),
}));

describe('DropdownNotification Components', () => {
  it('renders DropdownNotification with trigger and content', () => {
    const { getByTitle, getByText } = render(
      <BrowserRouter>
        <DropdownNotification />
      </BrowserRouter>,
    );

    const notificationButton = getByTitle('Dropdown Notification');
    fireEvent.click(notificationButton);

    waitFor(() => {
      expect(getByText('2025-04-14')).toBeInTheDocument();
    });
  });
});
