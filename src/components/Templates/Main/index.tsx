import { ChangeChartCard } from "../../Chart";
import { GasInfo } from "../../GasInfo";
import { Price } from "../../Price";

export const Main = () => {
  return (
    <div className="p-6 lg:p-8 max-w-screen-lg mx-auto">
      <GasInfo />
      <Price />
      <ChangeChartCard />
    </div>
  );
};
