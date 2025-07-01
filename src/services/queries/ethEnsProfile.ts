import { useQuery } from "@tanstack/react-query";
import { getEnsProfile } from "../requests/ensProfile/ensProfile";
import type { IEnsProfile } from "../requests/ensProfile/interface";

export const useQueryEnsProfile = (address: string, enabled = true) => {
  const result = useQuery<IEnsProfile>({
    queryKey: ["ensProfile", address],
    queryFn: () => getEnsProfile(address),
    staleTime: Infinity,
    enabled: enabled && !!address,
  });

  return result;
};
