import { useQuery } from "@tanstack/react-query";
import { getBalance } from "../requests/balance/balance";
import type { IBalanceResponse } from "../requests/balance/interface";

export const useQueryBalance = (address: string, enabled = true) => {
  const result = useQuery<IBalanceResponse>({
    queryKey: ["ethBalance", address],
    queryFn: () => getBalance(address),
    staleTime: Infinity,
    enabled: enabled && !!address,
  });

  return result;
};
