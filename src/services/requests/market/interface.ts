export interface IMarketData {
  market_data: {
    market_cap: {
      usd: number;
      brl: number;
      eur: number;
    };
    volume_24h: {
      usd: number;
      brl: number;
      eur: number;
    };
    change_24h_percent: {
      usd: number;
      brl: number;
      eur: number;
    };
    last_updated: number;
  };
}
