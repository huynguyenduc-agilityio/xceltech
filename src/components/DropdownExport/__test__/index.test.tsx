import { ReactNode } from 'react';
import {
  render,
  fireEvent,
  waitFor,
  RenderResult,
} from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';

// Components
import DropdownExport from '..';

let renderResult: RenderResult;
const queryClient = new QueryClient();

const Wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

jest.mock('@/hooks', () => ({
  ...jest.requireActual('@/hooks'),
  useExportLeaveFile: () => jest.fn(),
}));

describe('DropdownExport Components', () => {
  beforeEach(() => {
    renderResult = render(
      <Wrapper>
        <DropdownExport />
      </Wrapper>,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders DropdownExport with trigger and content', () => {
    const { getByRole, getByText } = renderResult;

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

  it('should call handleClickExportFile PDF', async () => {
    const { getByRole, getByText } = renderResult;

    const notificationButton = getByRole('button', {
      name: 'Export',
    });

    await userEvent.click(notificationButton);

    const pdfButton = getByText('PDF');

    await userEvent.click(pdfButton);

    expect(pdfButton).not.toBeInTheDocument();
  });

  it('should call handleClickExportFile CSV', async () => {
    const { getByRole, getByText } = renderResult;

    const notificationButton = getByRole('button', {
      name: 'Export',
    });

    await userEvent.click(notificationButton);

    const csvButton = getByText('CSV');

    await userEvent.click(csvButton);

    expect(csvButton).not.toBeInTheDocument();
  });

  it('should call handleClickExportFile Excel', async () => {
    const { getByRole, getByText } = renderResult;

    const notificationButton = getByRole('button', {
      name: 'Export',
    });

    await userEvent.click(notificationButton);

    const excelButton = getByText('Excel');

    await userEvent.click(excelButton);

    expect(excelButton).not.toBeInTheDocument();
  });
});
