import { Home, Wrench, Cctv, BookOpenText } from "lucide-react";

export const mainMenuItems = [
  {
    id: "home",
    label: "Home",
    icon: () => <Home size={20} />,
  },
  {
    id: "eth_infos",
    label: "Ethereum Infos",
    icon: () => <BookOpenText size={20} />,
  },
  {
    id: "pending_tx",
    label: "Pending TX Watch",
    icon: () => <Cctv size={20} />,
  },
  {
    id: "utils",
    label: "Utils",
    icon: () => <Wrench size={20} />,
  },
];
