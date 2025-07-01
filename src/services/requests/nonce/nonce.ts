import api from "../../api";

interface INonceResponse {
  nonce: string;
}

export async function generateNonce(address: string) {
  const { data } = await api.post<INonceResponse>("/nonce", { address });
  return data;
}
