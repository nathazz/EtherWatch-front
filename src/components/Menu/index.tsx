import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { MenuItems } from "./MenuItems";
import { OptionsNavigation } from "./Options";
import { mainMenuItems } from "../../utils/items";
import { DarkModeButton } from "../DarkModeButton";
import { useDarkMode } from "../../Hooks/DarkMode/useDarkMode";

export const Pages: React.FC = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useDarkMode();

  const handleClick = (id: string) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
  };

  const renderMenuItems = () => (
    <>
      {mainMenuItems.map((item) => (
        <MenuItems
          key={item.id}
          icon={<item.icon />}
          label={item.label}
          id={item.id}
          isActive={activeSection === item.id}
          onClick={() => handleClick(item.id)}
        />
      ))}
    </>
  );

  return (
    <div className={`min-h-screen ${theme.bg} transition-colors duration-300`}>
      <div
        className={`md:hidden ${theme.sidebarBg} p-4 flex items-center justify-between ${theme.shadow} border-b ${theme.border}`}
      >
        <h1 className={`text-2xl font-bold ${theme.text}`}>etherWatch</h1>
        <div className="flex items-center gap-2">
          <DarkModeButton />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`${theme.text} cursor-pointer p-2 ${theme.hover} rounded-lg transition-colors`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className={`${theme.sidebarBg} md:hidden absolute w-full z-40 border-b ${theme.border} ${theme.shadow}`}
        >
          <nav className="flex flex-col p-4 gap-3">{renderMenuItems()}</nav>
        </div>
      )}

      <div className="flex">
        <div
          className={`hidden md:block w-72 ${theme.sidebarBg} min-h-screen fixed left-0 top-0 ${theme.shadow} border-r ${theme.border}`}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <h1 className={`text-2xl font-bold ${theme.text}`}>etherWatch</h1>
              <DarkModeButton />
            </div>
            <nav className="space-y-3">{renderMenuItems()}</nav>
          </div>
        </div>

        <OptionsNavigation activeSection={activeSection} />
      </div>
    </div>
  );
};
