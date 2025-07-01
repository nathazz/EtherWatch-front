import { Home, Wrench, Cctv, HandCoins } from "lucide-react";

export const mainMenuItems = [
  {
    id: "home",
    label: "Home",
    icon: () => <Home size={20} />,
  },
  {
    id: "pending_tx",
    label: "Pending TX Watch",
    icon: () => <Cctv size={20} />,
  },
  {
    id: "balance_watch",
    label: "Balance Watch",
    icon: () => <HandCoins size={20} />,
  },
  {
    id: "utils",
    label: "Utils",
    icon: () => <Wrench size={20} />,
  },
];
