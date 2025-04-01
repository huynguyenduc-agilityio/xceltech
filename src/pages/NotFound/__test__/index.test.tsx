import { render } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

// Pages
import NotFound from '..';

describe('NotFound Page', () => {
  test('should match snapshot', () => {
    const view = render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    );

    expect(view).toMatchSnapshot();
  });

  test('renders NotFound component correctly', () => {
    const { getByText, getByRole } = render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    expect(getByText(/Oops! Page not found/i)).toBeInTheDocument();
    expect(
      getByText(
        /The page you are looking for might have been removed or temporarily unavailable/i,
      ),
    ).toBeInTheDocument();
    expect(
      getByRole('button', { name: /Back to Dashboard/i }),
    ).toBeInTheDocument();
  });
});
