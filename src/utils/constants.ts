export type CurrencyKey = "usd" | "brl" | "eur";

export const currencySymbols: Record<CurrencyKey, string> = {
  usd: "$",
  brl: "R$",
  eur: "€",
};

export const matchTheme =
  window.matchMedia && window.matchMedia("(prefers-color-scheme:dark)").matches;

export const MESSAGE_TYPES = Object.freeze({
  ALL_PENDING_TRANSACTIONS: "allPendingTransactions",
  GET_BALANCE: "getBalance",
  FEE_DATA: "feeData",
});

export const popularCurrencies = [
  "usd",
  "eur",
  "brl",
  "btc",
  "bnb",
  "eth",
  "gbp",
  "cad",
  "jpy",
  "inr",
];
