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
  bg: isDarkMode ? "bg-[#0e1117]" : "bg-slate-50",
  cardBg: isDarkMode ? "bg-[#161b22]" : "bg-white",
  sidebarBg: isDarkMode ? "bg-[#1c2128]" : "bg-slate-100",
  text: isDarkMode ? "text-slate-100" : "text-slate-800",
  textSecondary: isDarkMode ? "text-slate-400" : "text-slate-500",
  border: isDarkMode ? "border-slate-700" : "border-slate-300",
  hover: isDarkMode ? "hover:bg-[#21262d]" : "hover:bg-slate-200",
  active: isDarkMode ? "bg-[#30363d]" : "bg-slate-200",
  shadow: isDarkMode ? "shadow-xl shadow-black/50" : "shadow-md",
});
