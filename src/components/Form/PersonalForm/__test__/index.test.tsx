import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Components
import PersonalForm from '..';

const queryClient = new QueryClient();

const renderComponent = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <PersonalForm />
    </QueryClientProvider>,
  );
};

describe('PersonalForm Component', () => {
  it('should match snapshot', () => {
    const container = renderComponent();

    expect(container).toMatchSnapshot();
  });
});
