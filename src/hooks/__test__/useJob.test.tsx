import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Services
import { getListJobs } from '@/services';

// Types
import { IEmployeeJobInfo } from '@/types';

// Hooks
import { useGetJobs } from '../useJob';

const mockJobs: IEmployeeJobInfo[] = [
  {
    id: '8k2N1KWS95Yu',
    name: 'Developer',
    department: '',
    jobCategory: '',
  },
  {
    id: '1lH8Hv067Ajy',
    name: 'Designer',
    department: '',
    jobCategory: '',
  },
];

jest.mock('@/services', () => ({
  getListJobs: jest.fn(),
}));

describe('useGetJobs', () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('should return mapped jobs list', async () => {
    (getListJobs as jest.Mock).mockResolvedValue(mockJobs);

    const { result } = renderHook(() => useGetJobs(), { wrapper });

    await waitFor(() => {
      expect(result.current.jobs).toBeDefined();
    });

    expect(result.current.jobs).toEqual([
      { id: '8k2N1KWS95Yu', value: '8k2N1KWS95Yu', label: 'Developer' },
      { id: '1lH8Hv067Ajy', value: '1lH8Hv067Ajy', label: 'Designer' },
    ]);
    expect(result.current.isJobsLoading).toBe(false);
  });

  it('should return an empty array if no jobs are returned', async () => {
    (getListJobs as jest.Mock).mockResolvedValue([]);

    const { result } = renderHook(() => useGetJobs(), { wrapper });

    await waitFor(() => {
      expect(result.current.jobs).toEqual([]);
    });
  });
});
