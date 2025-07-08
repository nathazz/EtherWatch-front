export const getGasLevel = (value?: string) => {
  const num = parseFloat(value || "0");

  if (num < 0.1) return { label: "Very Low", color: "bg-emerald-700" };
  if (num < 1) return { label: "Low", color: "bg-green-600" };
  if (num < 5) return { label: "Medium", color: "bg-yellow-500" };
  if (num < 10) return { label: "High", color: "bg-orange-500" };
  return { label: "Very High", color: "bg-red-700" };
};
