import { render, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

// Components
import DropdownExport from '..';

const queryClient = new QueryClient();

const Wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('DropdownExport Components', () => {
  it('renders DropdownExport with trigger and content', () => {
    const { getByRole, getByText } = render(
      <Wrapper>
        <DropdownExport />
      </Wrapper>,
    );

    const notificationButton = getByRole('button', {
      name: 'Export',
    });
    fireEvent.click(notificationButton);

    waitFor(() => {
      expect(getByText('PDF')).toBeInTheDocument();
      expect(getByText('CSV')).toBeInTheDocument();
      expect(getByText('Excel')).toBeInTheDocument();
    });
  });
});
