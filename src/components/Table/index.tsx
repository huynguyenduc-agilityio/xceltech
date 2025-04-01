import { useMemo } from 'react';

// Types
import { TDataSource, THeaderTable } from '@/types';

// Utils
import { cn, processTableData } from '@/utils';

// Components
import { TableBase, TableHeader, TableBody, TableRow, TableCell } from './base';
import FilterMenu from '../FilterMenu';

type TableProps = {
  title?: string;
  isLoading?: boolean;
  columns?: THeaderTable[];
  dataSource?: TDataSource[];
};

const Table = ({
  title = 'Leave History',
  isLoading,
  columns = [],
  dataSource = [],
}: TableProps) => {
  const processedData = useMemo(
    () => processTableData(columns, dataSource),
    [columns, dataSource],
  );

  return (
    <div className="w-full overflow-hidden">
      <div className="flex justify-between px-5 py-6">
        <h2 className="text-xl font-bold">{title}</h2>
        {/* TODO: Apply filter */}
        <FilterMenu options={['type']} onApply={() => {}} />
        {/* TODO: Add Button Export  */}
      </div>

      <TableBase>
        <TableHeader>
          <TableRow className="bg-blue-light">
            {columns.map(({ key, title }) => (
              <TableCell key={key} className="py-6 text-center">
                {title}
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {processedData.length ? (
            processedData.map((row, index) => (
              <TableRow
                key={row.id}
                className={cn(
                  'px-5',
                  index % 2 === 0 ? 'bg-white' : 'bg-blue-light',
                )}
              >
                {row.cells.map((cell) => (
                  <TableCell key={cell.key} className="py-6 text-center">
                    {cell.content}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                {isLoading ? 'Loading...' : 'Empty data'}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </TableBase>
    </div>
  );
};

export default Table;
