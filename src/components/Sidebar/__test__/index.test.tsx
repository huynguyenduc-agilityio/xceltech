import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Sidebar from '..';

jest.mock('@/hooks', () => ({
  ...jest.requireActual('@/hooks'),
  useGetInfoUser: () => jest.fn(),
}));

const setup = () => {
  render(
    <BrowserRouter>
      <Sidebar>
        <div>Test Content</div>
      </Sidebar>
    </BrowserRouter>,
  );
};

describe('Sidebar component', () => {
  it('should match snapshot', () => {
    const container = setup();

    expect(container).toMatchSnapshot();
  });
});
