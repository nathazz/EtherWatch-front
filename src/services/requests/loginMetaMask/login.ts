import type { HttpStatusCode } from "axios";
import api from "../../api";

interface ILoginResponse {
  msg: string;
  status: HttpStatusCode;
}

export async function loginMetMask(signature: string, nonce: string) {
  const { data } = await api.post<ILoginResponse>(
    `/login`,
    {
      signature,
      nonce,
    },
    { withCredentials: true },
  );

  return data;
}

interface ILogout {
  msg: string;
}

export async function logoutMetaMask() {
  const { data } = await api.post<ILogout>(`/logout`);

  return data;
}
