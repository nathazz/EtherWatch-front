import api from "../../api";
import type { IEthPrice } from "./interface";

export async function getEthPrice() {
  const { data } = await api.get<IEthPrice>("/eth_price");
  return data;
}
