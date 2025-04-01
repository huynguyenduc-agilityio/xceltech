import { getRecordRange } from '../pagination';

describe('getRecordRange', () => {
  it('returns correct range for a middle page within total records', () => {
    const result = getRecordRange(2, 10, 50);
    expect(result).toBe('11 - 20 of 50 Leaves');
  });

  it('returns correct range for the last page when total records are less than pageSize', () => {
    const result = getRecordRange(5, 10, 45);
    expect(result).toBe('41 - 45 of 45 Leaves');
  });

  it('returns correct range for the first page', () => {
    const result = getRecordRange(1, 10, 50);
    expect(result).toBe('1 - 10 of 50 Leaves');
  });

  it('returns "1 - 0 of 0" when there are no records', () => {
    const result = getRecordRange(1, 10, 0);
    expect(result).toBe('1 - 0 of 0 Leaves');
  });

  it('returns correct range when the last page has fewer records than pageSize', () => {
    const result = getRecordRange(3, 10, 25);
    expect(result).toBe('21 - 25 of 25 Leaves');
  });

  it('returns correct range when total records exactly match pageSize', () => {
    const result = getRecordRange(5, 10, 50);
    expect(result).toBe('41 - 50 of 50 Leaves');
  });

  it('handles a single record case correctly', () => {
    const result = getRecordRange(1, 10, 1);
    expect(result).toBe('1 - 1 of 1 Leave');
  });
});
