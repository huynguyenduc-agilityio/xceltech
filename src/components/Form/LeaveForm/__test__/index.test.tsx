import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Components
import LeaveForm from '..';

const queryClient = new QueryClient();

const renderComponent = () => {
  return render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <LeaveForm />
      </QueryClientProvider>
    </MemoryRouter>,
  );
};

describe('LeaveForm Component', () => {
  it('should match snapshot', () => {
    const container = renderComponent();

    expect(container).toMatchSnapshot();
  });
});
