import userEvent from '@testing-library/user-event';
import { render, RenderResult, waitFor } from '@testing-library/react';

// Types
import { LeaveType } from '@/types';

// Components
import FilterMenu from '..';

let renderResult: RenderResult;
const mockProps = {
  options: { type: Object.values(LeaveType) },
  onApply: jest.fn(),
};

describe('FilterMenu component', () => {
  beforeEach(() => {
    renderResult = render(<FilterMenu {...mockProps} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', async () => {
    const { container } = renderResult;

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });

  it('should call onApply when Apply button is clicked', async () => {
    const filterButton = renderResult.getByTitle('Filter Dropdown');

    await userEvent.click(filterButton);

    const checkboxFilter = renderResult.getByText('Annual');

    await userEvent.click(checkboxFilter);

    const applyButton = renderResult.getByRole('button', { name: 'OK' });

    await userEvent.click(applyButton);

    expect(mockProps.onApply).toHaveBeenCalledTimes(1);
  });

  it('should call resetFilters when Reset button is clicked', async () => {
    const filterButton = renderResult.getByTitle('Filter Dropdown');

    await userEvent.click(filterButton);

    const annualCheckboxFilter = renderResult.getByText('Annual');
    const casualCheckboxFilter = renderResult.getByText('Casual');
    const sickCheckboxFilter = renderResult.getByText('Sick');

    await userEvent.click(annualCheckboxFilter);
    await userEvent.click(casualCheckboxFilter);
    await userEvent.click(sickCheckboxFilter);

    const resetButton = renderResult.getByRole('button', { name: 'Reset' });

    await userEvent.click(resetButton);

    expect(mockProps.onApply).toHaveBeenCalledTimes(1);
  });

  it('should render options filter when null', async () => {
    const { container, getAllByTitle } = render(
      <FilterMenu onApply={jest.fn()} options={{ Annual: 'Annual' }} />,
    );
    const filterButton = getAllByTitle('Filter Dropdown')[0];

    await userEvent.click(filterButton);

    const casualCheckboxFilter = renderResult.getByText('Casual');
    const sickCheckboxFilter = renderResult.getByText('Sick');

    await userEvent.click(casualCheckboxFilter);
    await userEvent.click(sickCheckboxFilter);

    expect(container).toBeInTheDocument();
  });
});
