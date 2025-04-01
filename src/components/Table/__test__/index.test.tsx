import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';

// Types
import { TDataSource } from '@/types';

// Components
import Table from '..';

describe('Table Component', () => {
  const queryClient = new QueryClient();

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  const dataSource: TDataSource[] = [
    {
      id: '1',
      name: 'John Caster',
      duration: 5,
      startDate: '22/04/2022',
      endDate: '28/04/2022',
      type: 'Sick',
      reason: 'Personal',
    },
    {
      id: '2',
      name: 'aman bey',
      duration: 7,
      startDate: '22/04/2022',
      endDate: '28/04/2022',
      type: 'Exam',
      reason: 'Examination',
    },
    {
      id: '3',
      name: 'feven Tesfaye',
      duration: 120,
      startDate: '22/04/2022',
      endDate: '28/04/2022',
      type: 'Maternity',
      reason: 'Child Care',
    },
  ];

  const renderSetup = () =>
    render(
      <Wrapper>
        <Table
          columns={[
            {
              title: 'Name(s)',
              key: 'name',
            },
            {
              title: 'Duration(s)',
              key: 'duration',
            },
            {
              title: 'Start Date',
              key: 'startDate',
            },
            {
              title: 'End Date',
              key: 'endDate',
            },
            {
              title: 'Type',
              key: 'type',
            },
            {
              title: 'Reason(s)',
              key: 'reason',
            },
          ]}
          dataSource={dataSource}
        />
      </Wrapper>,
    );

  it('should match snapshot', () => {
    const { container } = renderSetup();

    expect(container).toMatchSnapshot();
  });
});
