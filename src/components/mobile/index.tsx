import React from "react";
import { Home, MapPin, Eye, Menu, X, Sun, Moon } from "lucide-react";
import type { Theme } from "../theme/theme";
import { NavItem } from "../NavItems";

interface MobileLayoutProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (value: boolean) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  handleNavClick: (id: string) => void;
  activeSection: string;
  theme: Theme;
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  isDarkMode,
  toggleTheme,
  handleNavClick,
  activeSection,
  theme,
}) => {
  return (
    <>
      <div
        className={`md:hidden ${theme.sidebarBg} p-4 flex items-center justify-between ${theme.shadow} border-b ${theme.border}`}
      >
        <h1 className={`text-2xl font-bold ${theme.text}`}>etherWatch</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className={`p-2 ${theme.hover} rounded-lg transition-colors`}
          >
            {isDarkMode ? (
              <Sun className={theme.textSecondary} size={20} />
            ) : (
              <Moon className={theme.textSecondary} size={20} />
            )}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`${theme.text} p-2 ${theme.hover} rounded-lg transition-colors`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className={`${theme.sidebarBg} w-72 h-full p-6 ${theme.shadow}`}>
            <div className="flex items-center justify-between mb-8">
              <h1 className={`text-2xl font-bold ${theme.text}`}>etherWatch</h1>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className={`${theme.text} p-2 ${theme.hover} rounded-lg transition-colors`}
              >
                <X size={24} />
              </button>
            </div>
            <nav className="space-y-3">
              <NavItem
                icon={<Home size={20} />}
                label="Home"
                id="home"
                isActive={activeSection === "home"}
                onClick={() => handleNavClick("home")}
                theme={theme}
              />
              <NavItem
                icon={<MapPin size={20} />}
                label="Pending"
                id="address"
                isActive={activeSection === "address"}
                onClick={() => handleNavClick("address")}
                theme={theme}
              />
              <NavItem
                icon={<Eye size={20} />}
                label="Mempool Watch"
                id="mempool"
                isActive={activeSection === "mempool"}
                onClick={() => handleNavClick("mempool")}
                theme={theme}
              />
            </nav>
          </div>
        </div>
      )}
    </>
  );
};
