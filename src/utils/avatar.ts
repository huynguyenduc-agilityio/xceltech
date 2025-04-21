export const generateBgColor = (name: string) => {
  const colors = [
    'bg-secondary',
    'bg-blue-electric',
    'bg-green-primary',
    'bg-purple-500',
  ];
  const index = name
    ? name.charCodeAt(0) % colors.length
    : Math.floor(Math.random() * colors.length);
  return colors[index];
};

export const getInitialsAvatar = (name: string) => {
  if (!name) return '';

  const words = name.trim().split(/\s+/);

  if (words.length > 1) {
    const firstInitial = words[0][0].toUpperCase();
    const secondInitial = words[1][0].toUpperCase();

    return `${firstInitial} ${secondInitial}`;
  }

  return words[0][0]?.toUpperCase();
};
