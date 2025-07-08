import React from "react";
import UtilsTemplate from "../../Templates/Utilities";
import { Main } from "../../Templates/Main";
import { PendingTX } from "../../Templates/PendingTx";
import { EthInformations } from "../../Templates/EthInformations";

interface IProps {
  activeSection: string;
}

export const OptionsNavigation: React.FC<IProps> = ({ activeSection }) => {
  const renderContent = () => {
    switch (activeSection) {
      case "eth_infos":
        return <EthInformations />;
      case "pending_tx":
        return <PendingTX />;
      case "utils":
        return <UtilsTemplate />;
      default:
        return <Main />;
    }
  };

  return <div className="flex-1 md:ml-72">{renderContent()}</div>;
};
