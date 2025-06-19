import React, { useState } from "react";
import { getTheme } from "../../components/theme/theme";
import { MobileLayout } from "../../components/mobile";
import { Sidebar } from "../../components/Sidebar";

const EtherWatch: React.FC = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = getTheme(isDarkMode);

  return (
    <div className={`min-h-screen ${theme.bg} transition-colors duration-300`}>
      <MobileLayout
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        handleNavClick={handleNavClick}
        activeSection={activeSection}
        theme={theme}
      />

      <Sidebar
        activeSection={activeSection}
        handleNavClick={handleNavClick}
        theme={theme}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
    </div>
  );
};

export default EtherWatch;
