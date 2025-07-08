import { useQuery } from "@tanstack/react-query";
import { getGasFee } from "../requests/getGasFee/gasFee";
import type { IGasFee } from "../requests/getGasFee/interface";

export const useQueryGasFee = () => {
  const result = useQuery<IGasFee>({
    queryKey: ["gasFee"],
    queryFn: getGasFee,
    staleTime: Infinity,
  });

  return result;
};
