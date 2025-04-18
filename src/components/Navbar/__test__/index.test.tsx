import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import Navbar from '..';

const queryClient = new QueryClient();

const Wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const setup = () => {
  render(
    <Wrapper>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    </Wrapper>,
  );
};

describe('Navbar component', () => {
  it('should match snapshot', () => {
    const container = setup();

    expect(container).toMatchSnapshot();
  });
});
