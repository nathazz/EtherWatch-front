import api from "../../api";
import type { IBlockResponse } from "./interface";

export async function getBlock(block: string) {
  const { data } = await api.get<IBlockResponse>(`/block/${block}`);

  return data;
}
