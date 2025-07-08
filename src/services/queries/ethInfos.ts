import { useQuery } from "@tanstack/react-query";
import type { IEthereumInfoResponse } from "../requests/ethInfos/interfaces";
import { getEthInfos } from "../requests/ethInfos/ethInfos";

export const useQueryEthInfos = () => {
  const result = useQuery<IEthereumInfoResponse>({
    queryKey: ["ethInfos"],
    queryFn: getEthInfos,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return result;
};
