export function isValidBlock(block: string | number): boolean {
  const isNumber = /^\d+$/.test(String(block));

  const isHash = /^0x([A-Fa-f0-9]{64})$/.test(String(block));

  return isNumber || isHash;
}

export const isValidHash = (transactionHash: string): boolean =>
  /^0x([A-Fa-f0-9]{64})$/.test(transactionHash);
