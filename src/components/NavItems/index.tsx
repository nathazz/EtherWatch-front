import React from "react";
import type { Theme } from "../theme/theme";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  id: string;
  isActive: boolean;
  onClick: () => void;
  theme: Theme;
}

export const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  isActive,
  onClick,
  theme,
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
        isActive
          ? `${theme.active} ${theme.text} shadow-md`
          : `${theme.textSecondary} ${theme.hover} hover:${theme.text}`
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
};
