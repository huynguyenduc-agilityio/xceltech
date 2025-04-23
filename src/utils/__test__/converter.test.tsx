// Types
import { THeaderTable } from '@/types';

// Mocks
import { mockColumns, mockDataSource, mockResultTable } from '@/__mocks__';

import { processTableData, snakeToCamel } from '../converter';

describe('processTableData', () => {
  it('should return correct table structure from dataSource and columns', () => {
    const result = processTableData(
      mockColumns as THeaderTable[],
      mockDataSource,
    );

    expect(result).toEqual(mockResultTable);
  });

  it('should return empty array for empty dataSource', () => {
    const result = processTableData(mockColumns as THeaderTable[], []);
    expect(result).toEqual([]);
  });

  it('should return rows with empty cells for empty columns', () => {
    const result = processTableData([], mockDataSource);
    expect(result).toEqual(
      mockDataSource.map(({ id }) => ({
        id,
        cells: [],
      })),
    );
  });
});

describe('snakeToCamel', () => {
  it('should convert snake_case to camelCase', () => {
    expect(snakeToCamel('first_name')).toBe('firstName');
    expect(snakeToCamel('employee_address_city')).toBe('employeeAddressCity');
  });

  it('should return same string if no underscores', () => {
    expect(snakeToCamel('alreadyCamel')).toBe('alreadyCamel');
  });

  it('should handle empty string', () => {
    expect(snakeToCamel('')).toBe('');
  });

  it('should handle strings ending with underscore', () => {
    expect(snakeToCamel('foo_bar_')).toBe('fooBar_');
  });
});
