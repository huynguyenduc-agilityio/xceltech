import { formatDate, formatDateRange, getDaysLeft } from '../time';

describe('formatDate', () => {
  it('should format a Date object to YYYY-MM-DD', () => {
    const date = new Date('2024-05-15T12:00:00Z');
    expect(formatDate(date)).toBe('2024-05-15');
  });

  it('should format a string date to YYYY-MM-DD', () => {
    const dateStr =
      'Wed May 15 2024 12:00:00 GMT+0000 (Coordinated Universal Time)';
    expect(formatDate(dateStr)).toBe('2024-05-15');
  });
});

describe('formatDateRange', () => {
  it('should format range with short month names', () => {
    const start = '2024-01-01';
    const end = '2024-12-31';
    expect(formatDateRange(start, end)).toBe('Jan 2024 - Dec 2024');
  });

  it('should format range with full month names', () => {
    const start = '2024-01-01';
    const end = '2024-12-31';
    expect(formatDateRange(start, end, { fullMonth: true })).toBe(
      'January 2024 - December 2024',
    );
  });

  it('should handle missing dates', () => {
    expect(formatDateRange(undefined, undefined)).toBe(
      'Invalid date - Invalid date',
    );
  });
});

describe('getDaysLeft', () => {
  const today = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  const dateStr = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;

  it('should return 0 if no endDate is provided', () => {
    expect(getDaysLeft(undefined)).toBe(0);
    expect(getDaysLeft(null)).toBe(0);
  });

  it('should return 0 if endDate is invalid', () => {
    expect(getDaysLeft('invalid-date')).toBe(0);
  });

  it('should return 0 if endDate is today', () => {
    expect(getDaysLeft(dateStr)).toBe(0);
  });

  it('should return correct number of days in future', () => {
    const future = new Date();
    future.setDate(today.getDate() + 5);
    expect(getDaysLeft(future)).toBe(5);
  });

  it('should return 0 if endDate is in the past', () => {
    const past = new Date();
    past.setDate(today.getDate() - 3);
    expect(getDaysLeft(past)).toBe(0);
  });
});
