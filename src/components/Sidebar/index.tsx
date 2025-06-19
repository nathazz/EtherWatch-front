import React from "react";
import { Home, MapPin, Eye, Sun, Moon } from "lucide-react";
import type { Theme } from "../theme/theme";
import { NavItem } from "../NavItems";
import { OptionsSideBar } from "./OptionsSidebar";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

interface IProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  handleNavClick: (id: string) => void;
  activeSection: string;
  theme: Theme;
}

export const Sidebar: React.FC<IProps> = ({
  isDarkMode,
  toggleTheme,
  handleNavClick,
  activeSection,
  theme,
}) => {
  return (
    <div className="flex">
      <div
        className={`hidden md:block w-72 ${theme.sidebarBg} min-h-screen fixed left-0 top-0 ${theme.shadow} border-r ${theme.border}`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className={`text-2xl font-bold ${theme.text}`}>etherWatch</h1>
            <button
              onClick={toggleTheme}
              className={`p-2 ${theme.hover} cursor-pointer rounded-lg transition-colors`}
            >
              {isDarkMode ? (
                <Sun className={theme.textSecondary} size={20} />
              ) : (
                <Moon className={theme.textSecondary} size={20} />
              )}
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
              label="Pending TX Watch"
              id="pending_tx"
              isActive={activeSection === "pending_tx"}
              onClick={() => handleNavClick("pending_tx")}
              theme={theme}
            />
            <NavItem
              icon={<Eye size={20} />}
              label="Balance Watch"
              id="balance_watch"
              isActive={activeSection === "balance_watch"}
              onClick={() => handleNavClick("balance_watch")}
              theme={theme}
            />

            <GoogleLogin
              shape="circle"
              size="large"
              type="standard"
              width={240}
              auto_select={true}
              onSuccess={(credentialResponse) => {
                const decodeAccount = jwtDecode(
                  credentialResponse.credential ?? " ",
                );
                console.log(decodeAccount);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </nav>
        </div>
      </div>

      <OptionsSideBar
        activeSection={activeSection}
        isDarkMode={isDarkMode}
        theme={theme}
      />
    </div>
  );
};
