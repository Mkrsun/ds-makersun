export const isValidHexColor = (color: string): boolean => {
  const hexColorRegex = /^#([0-9A-Fa-f]{3}){1,2}$/;
  return hexColorRegex.test(color);
};

export const hexToRgba = (hex: string, alpha = 1) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const rgba = `rgba(${r}, ${g}, ${b}, ${alpha})`;
  return rgba;
};

export const getDeltaPercentage = (size: number, delta: number) => {
  return Math.ceil((delta * 100) / size);
};
