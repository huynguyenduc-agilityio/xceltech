import {
  decimalPartMocker,
  minMetricPrefixLimit,
  numberMocker,
} from '@/__mocks__';

import { formatNumberWithMetricPrefix } from '../number';

describe('formatNumberWithMetricPrefix function', () => {
  const expectedMetricPrefix = {
    zero: '0',
    million: '365.3m',
    millionWithSecondDecimal: '365.26m',
    millionWithThirdDecimal: '365.259m',
    thousandWithSecondDecimal: '365.26k',
    hundred: '365',
  };

  it('should return 0 if parameter is undefined', () => {
    const result = formatNumberWithMetricPrefix(Number(undefined), undefined);

    expect(result).toBe(expectedMetricPrefix.zero);
  });

  it('should return 0 if the parameter num is undefined', () => {
    const result = formatNumberWithMetricPrefix(
      Number(undefined),
      decimalPartMocker.secondDigit,
    );

    expect(result).toBe(expectedMetricPrefix.zero);
  });

  it('should return a string formatted to a number with a metric prefix is million and no decimals if the digit parameter is undefined', () => {
    const result = formatNumberWithMetricPrefix(
      numberMocker.million,
      undefined,
    );

    expect(result).toBe(expectedMetricPrefix.million);
  });

  it('should return a string formatted to real numbers consisting 2 decimal places and a metric prefix is million if the digit is 2', () => {
    const result = formatNumberWithMetricPrefix(
      numberMocker.million,
      decimalPartMocker.secondDigit,
    );

    expect(result).toBe(expectedMetricPrefix.millionWithSecondDecimal);
  });

  it('should return a string formatted to real numbers consisting 3 decimal places and a metric prefix is million if the digit is 3', () => {
    const result = formatNumberWithMetricPrefix(
      numberMocker.million,
      decimalPartMocker.thirdDigit,
    );

    expect(result).toBe(expectedMetricPrefix.millionWithThirdDecimal);
  });

  it('should return a string formatted to real numbers consisting 2 decimal places and a metric prefix is thousand if the digit is 2', () => {
    const result = formatNumberWithMetricPrefix(
      numberMocker.thousand,
      decimalPartMocker.secondDigit,
    );

    expect(result).toBe(expectedMetricPrefix.thousandWithSecondDecimal);
  });

  it('should return the default string number if the num parameter is not more than 1000', () => {
    const result = formatNumberWithMetricPrefix(
      numberMocker.hundred,
      decimalPartMocker.secondDigit,
    );

    expect(Number(result)).toBeLessThan(minMetricPrefixLimit);
    expect(result).toBe(expectedMetricPrefix.hundred);
  });
});
