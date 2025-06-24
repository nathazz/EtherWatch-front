import { useState } from "react";
import { ChevronDown, ChevronUp, Wrench } from "lucide-react";
import { MenuItems } from "../Menu/MenuItems";
import { utilsItems } from "../../utils/items";
import { useDarkMode } from "../../Hooks/DarkMode/useDarkMode";

interface IProps {
  activeSection: string;
  handleClick: (id: string) => void;
}

export const DropDown: React.FC<IProps> = ({ activeSection, handleClick }) => {
  const [isUtilsOpen, setIsUtilsOpen] = useState(false);
  const { theme } = useDarkMode();

  return (
    <div>
      <button
        onClick={() => setIsUtilsOpen(!isUtilsOpen)}
        className={`flex items-center w-full gap-3 cursor-pointer p-3 rounded-lg ${theme.hover} transition-colors`}
      >
        <Wrench size={20} className={theme.textSecondary} />
        <span
          className={
            (isUtilsOpen ? `${theme.text}` : `${theme.textSecondary}`) +
            " flex-1 text-left"
          }
        >
          Utils
        </span>
        {isUtilsOpen ? (
          <ChevronUp size={18} className={theme.textSecondary} />
        ) : (
          <ChevronDown size={18} className={theme.textSecondary} />
        )}
      </button>
      {isUtilsOpen && (
        <div className="ml-6 mt-2 flex flex-col gap-2">
          {utilsItems.map((item) => (
            <MenuItems
              key={item.id}
              icon={<item.icon />}
              label={item.label}
              id={item.id}
              isActive={activeSection === item.id}
              onClick={() => handleClick(item.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
