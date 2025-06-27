import { useQuery } from "@tanstack/react-query";
import type { IBlockResponse } from "../requests/block/interface";
import { getBlock } from "../requests/block/block";

export const useQueryBlock = (block: string, enabled = true) => {
  const result = useQuery<IBlockResponse>({
    queryKey: ["ethBlock", block],
    queryFn: () => getBlock(block),
    staleTime: Infinity,
    enabled:  enabled && !!block
  });

  return result;
};
