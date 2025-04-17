import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Layout
import UserLayout from '..';

const queryClient = new QueryClient();

const Wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('UserLayout', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Wrapper>
          <UserLayout />
        </Wrapper>
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
