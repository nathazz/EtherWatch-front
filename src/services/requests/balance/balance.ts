import api from "../../api";
import type { IBalanceResponse } from "./interface";

export async function getBalance(address: string) {
  const { data } = await api.get<IBalanceResponse>(`/balance/${address}`);

  return data;
}
