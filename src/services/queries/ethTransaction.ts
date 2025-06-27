import { useQuery } from "@tanstack/react-query";
import type { ITransactionResponse } from "../requests/transactions/interface";
import { getTransaction } from "../requests/transactions/tx";

export const useQueryTransaction = (hash: string, enabled = true) => {
  const result = useQuery<ITransactionResponse>({
    queryKey: ["getTx", hash],
    queryFn: () => getTransaction(hash),
    staleTime: Infinity,
    enabled: enabled && !!hash
  });

  return result;
};
