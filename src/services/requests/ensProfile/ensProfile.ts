import api from "../../api";
import type { IEnsProfile } from "./interface";

export async function getEnsProfile(address: string) {
  const { data } = await api.get<IEnsProfile>(`/ens-profile/${address}`);

  return data;
}
