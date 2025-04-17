import { useMemo } from 'react';

// Constants
import { MESSAGES } from '@/constants';

// Types
import { TDataSource, THeaderTable } from '@/types';

// Utils
import { cn, processTableData } from '@/utils';

// Components
import { TableBase, TableHeader, TableBody, TableRow, TableCell } from './base';
import Fallback from '../Fallback';

type TableProps = {
  isLoading?: boolean;
  columns?: THeaderTable[];
  dataSource?: TDataSource[];
};

const Table = ({ isLoading, columns = [], dataSource = [] }: TableProps) => {
  const processedData = useMemo(
    () => processTableData(columns, dataSource),
    [columns, dataSource],
  );

  return (
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
          <></>
        )}

        {!processedData.length && !isLoading && (
          <TableRow className="h-[200px]">
            <TableCell colSpan={columns.length} className="text-center">
              {MESSAGES.COMMON.EMPTY_DATA}
            </TableCell>
          </TableRow>
        )}

        {!!processedData.length && isLoading && (
          <TableRow className="absolute top-1/2 left-1/2">
            <TableCell colSpan={columns.length} className="w-full text-center ">
              <Fallback />
            </TableCell>
          </TableRow>
        )}

        {!processedData.length && isLoading && (
          <TableRow className="h-[200px]">
            <TableCell colSpan={columns.length} className="text-center">
              <Fallback />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </TableBase>
  );
};

export default Table;
