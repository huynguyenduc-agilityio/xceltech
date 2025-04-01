import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Components
import Pagination from '..';

const onPageChangeMock = jest.fn();
const onChangeLimitMock = jest.fn();

describe('Pagination render', () => {
  it('should match snapshot', () => {
    const { container } = render(
      <Pagination
        currentPage={1}
        isDisabledNext={true}
        isDisabledPrev={true}
        onChangeLimit={onChangeLimitMock}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('Handle next page', async () => {
    const { getByRole } = render(
      <Pagination onPageChange={onPageChangeMock} />,
    );

    const nextPage = getByRole('button', { name: /next/i });

    await userEvent.click(nextPage);
    expect(onPageChangeMock).toHaveBeenCalled();
  });

  it('Handle prev page', async () => {
    const { getByRole } = render(
      <Pagination currentPage={2} onPageChange={onPageChangeMock} />,
    );

    const prevPage = getByRole('button', { name: /prev/i });

    await userEvent.click(prevPage);
    expect(onPageChangeMock).toHaveBeenCalled();
  });

  it('should render default value correctly', () => {
    const { container } = render(<Pagination />);

    expect(container).toBeInTheDocument();
  });
});
