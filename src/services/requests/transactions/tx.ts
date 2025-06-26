import api from "../../api";
import type { ITransactionResponse } from "./interface";

export async function getTransaction(txHash: string) {
  const { data } = await api.get<ITransactionResponse>(`/tx/${txHash}`);

  return data;
}
