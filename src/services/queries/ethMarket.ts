import { useQuery } from "@tanstack/react-query";
import type { IMarketData } from "../requests/market/interface";
import { getMarketData } from "../requests/market/marketData";

export const useQueryMarketData = () => {
  const result = useQuery<IMarketData>({
    queryKey: ["ethMarket"],
    queryFn: getMarketData,
    staleTime: Infinity,
  });

  return result;
};
