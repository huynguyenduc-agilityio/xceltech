import { generateBgColor, getInitialsAvatar } from '../avatar';

describe('generateBgColor', () => {
  const colors = [
    'bg-secondary',
    'bg-blue-electric',
    'bg-green-primary',
    'bg-purple-500',
  ];

  it('should return a valid color based on the name', () => {
    const color1 = generateBgColor('Alice');
    const color2 = generateBgColor('Bob');

    expect(colors).toContain(color1);
    expect(colors).toContain(color2);
    expect(color1).not.toBe(color2);
  });

  it('should return a random color when name is empty', () => {
    const color = generateBgColor('');
    expect(colors).toContain(color);
  });

  it('should return the same color for the same name', () => {
    const color1 = generateBgColor('Alice');
    const color2 = generateBgColor('Alice');
    expect(color1).toBe(color2);
  });
});

describe('getInitialsAvatar', () => {
  it('should return initials for a full name', () => {
    expect(getInitialsAvatar('John Caster')).toBe('J C');
  });

  it('should return the first letter for a single name', () => {
    expect(getInitialsAvatar('John')).toBe('J');
  });

  it('should handle multiple spaces in the name', () => {
    expect(getInitialsAvatar('  John   Caster  ')).toBe('J C');
  });

  it('should return an empty string for an empty name', () => {
    expect(getInitialsAvatar('')).toBe('');
  });

  it('should return the first letter for a name with no spaces', () => {
    expect(getInitialsAvatar('A')).toBe('A');
  });
});
