export const formatValues = (address: string | null) => {
  if (!address) return "-";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
