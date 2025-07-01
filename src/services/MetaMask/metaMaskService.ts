import { BrowserProvider } from "ethers";
import { generateNonce } from "../requests/nonce/nonce";
import { loginMetMask } from "../requests/loginMetaMask/login";
import { HttpStatusCode } from "axios";

export async function getMetaMaskProvider() {
  if (!window.ethereum) throw new Error("No MetaMask found!");

  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  const account = accounts[0];

  const nonce = await generateNonce(account);

  const message = `nonce:${nonce.nonce}`;

  const signature = await window.ethereum.request({
    method: "personal_sign",
    params: [message, account],
  });

  const response = await loginMetMask(signature, nonce.nonce);

  if (response.status !== HttpStatusCode.Ok) {
    throw new Error("MetaMask login failed!");
  }

  const provider = new BrowserProvider(window.ethereum);

  provider.on("network", (oldNetwork) => {
    if (oldNetwork) window.location.reload();
  });

  const signer = await provider.getSigner();
  const address = await signer.getAddress();

  return { provider, signer, address, signature };
}
