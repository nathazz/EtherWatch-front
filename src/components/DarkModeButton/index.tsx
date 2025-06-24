import { Moon, Sun } from "lucide-react";
import { useDarkMode } from "../../Hooks/DarkMode/useDarkMode";

export const DarkModeButton = () => {
  const { isDarkMode, toggleDarkMode, theme } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className={`p-2 ${theme.hover} cursor-pointer rounded-lg transition-colors`}
    >
      {isDarkMode ? (
        <Sun className={theme.textSecondary} size={20} />
      ) : (
        <Moon className={theme.textSecondary} size={20} />
      )}
    </button>
  );
};
