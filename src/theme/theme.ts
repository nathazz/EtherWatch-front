export interface Theme {
  bg: string;
  cardBg: string;
  sidebarBg: string;
  text: string;
  textSecondary: string;
  border: string;
  hover: string;
  active: string;
  shadow: string;
}

export const getTheme = (isDarkMode: boolean): Theme => ({
  bg: isDarkMode ? "bg-slate-900" : "bg-gray-50",
  cardBg: isDarkMode ? "bg-slate-800" : "bg-white",
  sidebarBg: isDarkMode ? "bg-slate-800" : "bg-white",
  text: isDarkMode ? "text-white" : "text-gray-900",
  textSecondary: isDarkMode ? "text-slate-400" : "text-gray-600",
  border: isDarkMode ? "border-slate-700" : "border-gray-200",
  hover: isDarkMode ? "hover:bg-slate-700" : "hover:bg-gray-100",
  active: isDarkMode ? "bg-slate-700" : "bg-blue-100",
  shadow: isDarkMode ? "" : "shadow-lg",
});
