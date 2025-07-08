import { useState } from "react";
import { BanknoteArrowUp } from "lucide-react";
import { useDarkMode } from "../../Hooks/DarkMode/useDarkMode";
import { useAuth } from "../../contexts/Auth/useAuthContext";
import { isAddress } from "ethers"; // ← AQUI

interface Props {
  onCancel: () => void;
}

export const SendTransactionFields: React.FC<Props> = ({ onCancel }) => {
  const [to, setTo] = useState("");
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { theme } = useDarkMode();
  const { sendTransaction, address, balance } = useAuth();

  const handleConfirm = async () => {
    setError(null);

    if (!to.trim() || !value.trim()) {
      setError("Recipient address or value is required.");
      return;
    }

    if (!isAddress(to)) {
      setError("Invalid Ethereum address.");
      return;
    }

    if (to === address) {
      setError("Please, don't send it to you");
      return;
    }

    const ethValue = Number(value);

    if (isNaN(ethValue) || ethValue <= 0) {
      setError("Please enter a valid amount greater than zero.");
      return;
    }

    if (Number(balance) < ethValue) {
      setError("Insufficient balance for this transaction");
      return;
    }

    try {
      await sendTransaction(to, ethValue.toString());
      setTo("");
      setValue("");

      setSuccess("Transaction successfully sent!");
      setTimeout(() => setSuccess(null), 5000);
    } catch (err) {
      setError("Failed to send transaction.");
      console.error(err);
    }
  };

  return (
    <div className="mt-3 space-y-2">
      {error && (
        <div className="text-sm text-red-500 border rounded p-2 bg-red-100">
          {error}
        </div>
      )}

      {success && (
        <div className="text-sm text-green-600 border rounded p-2 bg-green-100">
          {success}
        </div>
      )}

      <input
        type="text"
        placeholder="To (0x...)"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className={`
          w-full px-3 py-2 rounded-lg border
          focus:outline-none focus:ring-2 focus:ring-indigo-500
          text-sm bg-transparent
          ${theme.text} ${theme.border} ${theme.hover}
        `}
      />

      <input
        type="number"
        min="0.0001"
        step="any"
        placeholder="Value (ETH)"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`
          w-full px-3 py-2 rounded-lg border
          focus:outline-none focus:ring-2 focus:ring-indigo-500
          text-sm bg-transparent
          ${theme.text} ${theme.border} ${theme.hover}
        `}
      />

      <div className="flex gap-2">
        <button
          onClick={handleConfirm}
          className={`
            flex-1 px-4 py-2 rounded-lg border
            flex items-center justify-center gap-2
            cursor-pointer
            ${theme.hover} ${theme.text} ${theme.border}
            transition-colors duration-200
          `}
        >
          <BanknoteArrowUp size={15} />
          Confirm
        </button>

        <button
          onClick={onCancel}
          className={`
            flex-1 px-4 py-2 rounded-lg border cursor-pointer
            text-red-500 border-red-400 hover:bg-red-100
            transition-colors duration-200
          `}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
