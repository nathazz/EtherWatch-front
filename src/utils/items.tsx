import { Home, MapPin, Eye, Wrench, ClipboardCheck } from "lucide-react";

export const mainMenuItems = [
  {
    id: "home",
    label: "Home",
    icon: () => <Home size={20} />,
  },
  {
    id: "pending_tx",
    label: "Pending TX Watch",
    icon: () => <MapPin size={20} />,
  },
  {
    id: "balance_watch",
    label: "Balance Watch",
    icon: () => <Eye size={20} />,
  },
];

export const utilsItems = [
  {
    id: "gas_tracker",
    label: "Gas Tracker",
    icon: () => <Wrench size={18} />,
  },
  {
    id: "tx_decoder",
    label: "Tx Decoder",
    icon: () => <ClipboardCheck size={18} />,
  },
];
