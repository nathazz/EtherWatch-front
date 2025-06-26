import { Home, MapPin, Eye, Wrench } from "lucide-react";

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
  {
    id: "utils",
    label: "Utils",
    icon: () => <Wrench size={20} />
  }
];