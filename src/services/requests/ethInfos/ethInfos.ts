import api from "../../api";
import type { IEthereumInfoResponse } from "./interfaces";

export async function getEthInfos() {
  const { data } = await api.get<IEthereumInfoResponse>("/eth_infos");

  return data;
}
