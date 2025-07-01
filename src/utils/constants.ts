export type CurrencyKey = "usd" | "brl" | "eur";

export const currencySymbols: Record<CurrencyKey, string> = {
  usd: "$",
  brl: "R$",
  eur: "€",
};
