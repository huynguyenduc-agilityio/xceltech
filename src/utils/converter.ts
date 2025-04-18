// Types
import { TDataSource, THeaderTable } from '@/types';

export const processTableData = (
  columns: THeaderTable[],
  dataSource: TDataSource[],
) =>
  dataSource.map((data) => ({
    id: data.id,
    cells: columns.map((column) => ({
      key: `${data.id}-${column.key}`,
      content: column.renderBody
        ? column.renderBody(data)
        : data[column.key as keyof typeof data],
    })),
  }));

export const snakeToCamel = (str: string): string =>
  str.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
