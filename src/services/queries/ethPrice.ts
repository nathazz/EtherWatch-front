import { useQuery } from "@tanstack/react-query";
import { getEthPrice } from "../requests/price/price";
import type { IEthPrice } from "../requests/price/interface";

export const useQueryPrice = () => {
  const result = useQuery<IEthPrice>({
    queryKey: ["ethPrice"],
    queryFn: getEthPrice,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return result;
};
