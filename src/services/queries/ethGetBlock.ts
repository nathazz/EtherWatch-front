import { useQuery } from "@tanstack/react-query";
import type { IBlockResponse } from "../requests/block/interface";
import { getBlock } from "../requests/block/block";

export const useQueryBlock = (block: string, enabled = true) => {
  const result = useQuery<IBlockResponse>({
    queryKey: ["ethBlock"],
    queryFn: () => getBlock(block),
    staleTime: Infinity,
    enabled
  });

  return result;
};
