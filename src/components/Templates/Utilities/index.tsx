import { useState } from "react";
import { Search, Blocks, User } from "lucide-react";
import { useDarkMode } from "../../../Hooks/DarkMode/useDarkMode";
import { useQueryTransaction } from "../../../services/queries/ethTransaction";
import { useQueryBlock } from "../../../services/queries/ethGetBlock";
import { useQueryEnsProfile } from "../../../services/queries/ethEnsProfile";
import { UtilityCard } from "../../UtilityCard";
import { TransactionDetails } from "../../Details/TxDetails";
import { BlockDetails } from "../../Details/BlockDetails";
import { EnsProfileDetails } from "../../Details/EnsDetails";
import { ethers } from "ethers";
import { isValidBlock, isValidHash } from "../../../utils/validates";

export default function UtilsTemplate() {
  const { theme } = useDarkMode();

  const [transactionHash, setTransactionHash] = useState("");
  const [blockNumber, setBlockNumber] = useState("");
  const [ensAddress, setEnsAddress] = useState("");

  const [queryTransactionKey, setQueryTransactionKey] = useState<string | null>(
    null
  );
  const [queryBlockKey, setQueryBlockKey] = useState<string | null>(null);
  const [queryEnsKey, setQueryEnsKey] = useState<string | null>(null);

  const clearTransactionResult = () => setQueryTransactionKey(null);
  const clearBlockResult = () => setQueryBlockKey(null);
  const clearEnsResult = () => setQueryEnsKey(null);

  const [transactionError, setTransactionError] = useState("");
  const [blockError, setBlockError] = useState("");
  const [ensError, setEnsError] = useState("");

  const { data: transactionData, isLoading: isLoadingTransaction } =
    useQueryTransaction(queryTransactionKey || "", !!queryTransactionKey);

  const { data: blockData, isLoading: isLoadingBlock } = useQueryBlock(
    queryBlockKey || "",
    !!queryBlockKey
  );

  const { data: ensProfileData, isLoading: isLoadingEns } = useQueryEnsProfile(
    queryEnsKey || "",
    !!queryEnsKey
  );

  return (
    <div className={`min-h-screen ${theme.bg} py-16 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1
            className={`text-4xl sm:text-5xl font-bold tracking-tight ${theme.text} mb-4`}
          >
            Utils
          </h1>
        </div>

        <div className="space-y-12">
          <UtilityCard
            icon={<Search className="w-6 h-6 text-white" />}
            title="Get Transaction"
            placeholder="0x4530013..."
            value={transactionHash}
            onChange={setTransactionHash}
            buttonLabel="Search Transaction"
            ringColor="ring-blue-500"
            bgColor="bg-gradient-to-r from-blue-500 to-cyan-500"
            buttonColor="from-blue-600 to-cyan-600"
            onButtonClick={() => {
              if (!isValidHash(transactionHash)) {
                setTransactionError("Invalid transaction hash.");
                return;
              }

              setTransactionError("");
              setQueryTransactionKey(transactionHash);
            }}
            error={transactionError}
            isLoading={isLoadingTransaction}
            copyText={
              transactionData
                ? JSON.stringify(transactionData, null, 2)
                : undefined
            }
            hasQueried={!!queryTransactionKey}
            result={
              transactionData ? (
                <TransactionDetails tx={transactionData} />
              ) : null
            }
            onClearResult={clearTransactionResult}
            showResult={!!queryTransactionKey}
          />

          <UtilityCard
            icon={<Blocks className="w-6 h-6 text-white" />}
            title="Get Block"
            placeholder="22789042"
            value={blockNumber}
            error={blockError}
            onChange={setBlockNumber}
            buttonLabel="Search Block"
            ringColor="ring-purple-500"
            bgColor="bg-purple-600"
            buttonColor="from-purple-600 to-indigo-600"
            onButtonClick={() => {
              if (!isValidBlock(blockNumber)) {
                setBlockError("Invalid Block.");
                return;
              }

              setBlockError("");
              setQueryBlockKey(blockNumber);
            }}
            isLoading={isLoadingBlock}
            copyText={
              blockData ? JSON.stringify(blockData, null, 2) : undefined
            }
            hasQueried={!!queryBlockKey}
            result={blockData ? <BlockDetails block={blockData} /> : null}
            onClearResult={clearBlockResult}
            showResult={!!queryBlockKey}
          />

          <UtilityCard
            icon={<User className="w-6 h-6 text-white" />}
            title="Get ENS profile"
            placeholder="0x4530013..."
            value={ensAddress}
            onChange={setEnsAddress}
            buttonLabel="Search ENS"
            ringColor="ring-green-500"
            bgColor="bg-gradient-to-r from-green-500 to-emerald-500"
            buttonColor="from-green-600 to-emerald-600"
            onButtonClick={() => {
              if (!ethers.isAddress(ensAddress)) {
                setEnsError("Invalid Ethereum address.");
                return;
              }
              setEnsError("");
              setQueryEnsKey(ensAddress);
            }}
            error={ensError}
            isLoading={isLoadingEns}
            copyText={
              ensProfileData
                ? JSON.stringify(ensProfileData, null, 2)
                : undefined
            }
            hasQueried={!!queryEnsKey}
            result={
              ensProfileData ? (
                <EnsProfileDetails profile={ensProfileData} />
              ) : null
            }
            onClearResult={clearEnsResult}
            showResult={!!queryEnsKey}
          />
        </div>
      </div>
    </div>
  );
}
