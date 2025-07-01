import React from "react";
import { OptionsPages } from "../../components/Menu";
import { useDarkMode } from "../../Hooks/DarkMode/useDarkMode";

const HomePage: React.FC = () => {
  const { theme } = useDarkMode();

  return (
    <div className={`min-h-screen ${theme.bg} transition-colors duration-300`}>
      <OptionsPages />
    </div>
  );
};

export default HomePage;
