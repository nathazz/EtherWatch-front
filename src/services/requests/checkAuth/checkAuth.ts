import api from "../../api";

interface IAuthResponse {
  address: string;
}

export async function checkAuth() {
  const response = await api.get<IAuthResponse>("/check-auth", {
    withCredentials: true,
  });

  return response.data;
}
