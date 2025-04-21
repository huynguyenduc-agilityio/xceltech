import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';

// Types
import { IEmployeeJobInfo } from '@/types';

import JobDetailTab from '..';

jest.mock('@/hooks', () => ({
  ...jest.requireActual('@/hooks'),
  useGetDocuments: () => ({
    documents: [
      {
        documentType: 'offer_letter',
        documentFile: 'https://example.com/file1.pdf',
      },
    ],
    isDocumentsLoading: false,
  }),
}));

const queryClient = new QueryClient();

const renderComponent = (jobInfo?: Partial<IEmployeeJobInfo>) =>
  render(
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading fallback...</div>}>
        <JobDetailTab jobInfo={jobInfo} />
      </Suspense>
    </QueryClientProvider>,
  );

const mockJobInfo = {
  name: 'Frontend Developer',
  department: 'Engineering',
  lineManagement: 'Jane Doe',
  description: 'Responsible for building UI components.',
};

describe('JobDetailTab - Integration Test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders Job tab with correct info', () => {
    renderComponent(mockJobInfo);

    expect(screen.getByText(/view job details/i)).toBeInTheDocument();
    expect(screen.getByText(/frontend developer/i)).toBeInTheDocument();
    expect(screen.getByText(/engineering/i)).toBeInTheDocument();
    expect(screen.getByText(/jane doe/i)).toBeInTheDocument();
    expect(
      screen.getByText(/responsible for building ui components/i),
    ).toBeInTheDocument();
  });

  it('navigates to UploadDocuments and shows fields', async () => {
    renderComponent(mockJobInfo);

    fireEvent.click(screen.getByRole('button', { name: /upload documents/i }));

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /upload documents/i }),
      ).toBeInTheDocument();
    });
  });

  it('navigates to ViewDocument and shows file', async () => {
    renderComponent(mockJobInfo);

    fireEvent.click(screen.getByRole('button', { name: /view documents/i }));

    await waitFor(() => {
      expect(screen.getByText(/view documents/i)).toBeInTheDocument();
      expect(screen.getByText(/file1.pdf/i)).toBeInTheDocument();
    });
  });

  it('goes back to Job tab from UploadDocuments', async () => {
    renderComponent(mockJobInfo);

    fireEvent.click(screen.getByRole('button', { name: /upload documents/i }));

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /upload documents/i }),
      ).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/job details/i));

    await waitFor(() => {
      expect(screen.getByText(/view job details/i)).toBeInTheDocument();
    });
  });
});
