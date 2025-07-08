import api from "../../api";
import type { IGasFee } from "./interface";

export async function getGasFee() {
  const { data } = await api.get<IGasFee>("/eth_feeData");
  return data;
}
