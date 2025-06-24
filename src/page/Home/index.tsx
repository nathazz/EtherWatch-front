import React from "react";
import { NavigationPages } from "../../components/Menu";
import { useDarkMode } from "../../Hooks/DarkMode/useDarkMode";

const HomePage: React.FC = () => {
  const { theme } = useDarkMode();

  return (
    <div className={`min-h-screen ${theme.bg} transition-colors duration-300`}>
      <NavigationPages />
    </div>
  );
};

export default HomePage;
