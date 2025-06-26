import api from "../../api";
import type { IMarketData } from "./interface";

export async function getMarketData() {
  const { data } = await api.get<IMarketData>("/eth_market");
  return data;
}
