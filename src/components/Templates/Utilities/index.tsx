import { useState } from "react";
import { Search, Blocks, User, CircleDollarSign } from "lucide-react";
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
import { useQueryBalance } from "../../../services/queries/getBalance";
import { BalanceDetail } from "../../Details/BalanceDetails";

export default function UtilsTemplate() {
  const { theme } = useDarkMode();

  const [transaction, setTransaction] = useState({
    input: "",
    error: "",
    queryKey: null as string | null,
  });

  const [block, setBlock] = useState({
    input: "",
    error: "",
    queryKey: null as string | null,
  });

  const [ens, setEns] = useState({
    input: "",
    error: "",
    queryKey: null as string | null,
  });

  const [balance, setBalance] = useState({
    input: "",
    error: "",
    queryKey: null as string | null,
  });

  const { data: transactionData, isLoading: isLoadingTransaction } =
    useQueryTransaction(transaction.queryKey || "", !!transaction.queryKey);

  const { data: blockData, isLoading: isLoadingBlock } = useQueryBlock(
    block.queryKey || "",
    !!block.queryKey,
  );

  const { data: ensProfileData, isLoading: isLoadingEns } = useQueryEnsProfile(
    ens.queryKey || "",
    !!ens.queryKey,
  );

  const { data: balanceData, isLoading: isLoadingBalance } = useQueryBalance(
    balance.queryKey || "",
    !!balance.queryKey,
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
            value={transaction.input}
            onChange={(val) =>
              setTransaction((prev) => ({ ...prev, input: val }))
            }
            buttonLabel="Search Transaction"
            ringColor="ring-blue-500"
            bgColor="bg-blue-500"
            buttonColor="from-blue-600 to-cyan-600"
            onButtonClick={() => {
              if (!isValidHash(transaction.input)) {
                setTransaction((prev) => ({
                  ...prev,
                  error: "Invalid transaction hash.",
                }));
                return;
              }

              setTransaction((prev) => ({
                ...prev,
                error: "",
                queryKey: prev.input,
              }));
            }}
            error={transaction.error}
            isLoading={isLoadingTransaction}
            copyText={
              transactionData
                ? JSON.stringify(transactionData, null, 2)
                : undefined
            }
            hasQueried={!!transaction.queryKey}
            result={
              transactionData ? (
                <TransactionDetails tx={transactionData} />
              ) : null
            }
            onClearResult={() =>
              setTransaction((prev) => ({ ...prev, queryKey: null }))
            }
          />

          <UtilityCard
            icon={<CircleDollarSign className="w-6 h-6 text-white" />}
            title="Get Balance"
            placeholder="0x4530013..."
            value={balance.input}
            onChange={(val) => setBalance((prev) => ({ ...prev, input: val }))}
            buttonLabel="Search Balance"
            ringColor="ring-yellow-500"
            bgColor="bg-yellow-500"
            buttonColor="bg-yellow-500"
            onButtonClick={() => {
              if (!ethers.isAddress(balance.input)) {
                setBalance((prev) => ({
                  ...prev,
                  error: "Invalid Ethereum address.",
                }));
                return;
              }
              setBalance((prev) => ({
                ...prev,
                error: "",
                queryKey: prev.input,
              }));
            }}
            error={balance.error}
            isLoading={isLoadingBalance}
            copyText={
              balanceData ? JSON.stringify(balanceData, null, 2) : undefined
            }
            hasQueried={!!balance.queryKey}
            result={
              balanceData ? <BalanceDetail balance={balanceData} /> : null
            }
            onClearResult={() =>
              setBalance((prev) => ({ ...prev, queryKey: null }))
            }
          />

          <UtilityCard
            icon={<Blocks className="w-6 h-6 text-white" />}
            title="Get Block"
            placeholder="22789042"
            value={block.input}
            error={block.error}
            onChange={(val) =>
              setBlock((prev) => ({
                ...prev,
                input: val,
              }))
            }
            buttonLabel="Search Block"
            ringColor="ring-purple-500"
            bgColor="bg-purple-600"
            buttonColor="from-purple-600 to-indigo-600"
            onButtonClick={() => {
              if (!isValidBlock(block.input)) {
                setBlock((prev) => ({
                  ...prev,
                  error: "Invalid Block.",
                }));
                return;
              }

              setBlock((prev) => ({
                ...prev,
                error: "",
                queryKey: prev.input,
              }));
            }}
            isLoading={isLoadingBlock}
            copyText={
              blockData ? JSON.stringify(blockData, null, 2) : undefined
            }
            hasQueried={!!block.queryKey}
            result={blockData ? <BlockDetails block={blockData} /> : null}
            onClearResult={() =>
              setBlock((prev) => ({
                ...prev,
                queryKey: null,
              }))
            }
          />

          <UtilityCard
            icon={<User className="w-6 h-6 text-white" />}
            title="Get ENS profile"
            placeholder="0x4530013..."
            value={ens.input}
            onChange={(val) =>
              setEns((prev) => ({
                ...prev,
                input: val,
              }))
            }
            buttonLabel="Search ENS"
            ringColor="ring-green-500"
            bgColor="bg-green-500"
            buttonColor="from-green-600 to-emerald-600"
            onButtonClick={() => {
              if (!ethers.isAddress(ens.input)) {
                setEns((prev) => ({
                  ...prev,
                  error: "Invalid Ethereum address.",
                }));
                return;
              }

              setEns((prev) => ({
                ...prev,
                error: "",
                queryKey: prev.input,
              }));
            }}
            error={ens.error}
            isLoading={isLoadingEns}
            copyText={
              ensProfileData
                ? JSON.stringify(ensProfileData, null, 2)
                : undefined
            }
            hasQueried={!!ens.queryKey}
            result={
              ensProfileData ? (
                <EnsProfileDetails profile={ensProfileData} />
              ) : null
            }
            onClearResult={() =>
              setEns((prev) => ({
                ...prev,
                queryKey: null,
              }))
            }
          />
        </div>
      </div>
    </div>
  );
}
