import { useState } from "react";
import { useDarkMode } from "../../../Hooks/DarkMode/useDarkMode";
import type { IEnsProfile } from "../../../services/requests/ensProfile/interface";

export function EnsProfileDetails({ profile }: { profile: IEnsProfile }) {
  const { theme } = useDarkMode();
  const [isZoomed, setIsZoomed] = useState(false);

  const toggleZoom = () => {
    setIsZoomed((prev) => !prev);
  };

  return (
    <>
      {isZoomed && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-60 z-40"
          onClick={toggleZoom}
        />
      )}

      <div className={`flex items-center gap-4 ${theme.text} relative z-50`}>
        {profile.ens.avatar && (
          <img
            src={profile.ens.avatar}
            alt="ENS Avatar"
            onClick={toggleZoom}
            className={`
              w-20 h-20 rounded-full border border-white/20 shadow-md
              cursor-zoom-in transition-transform duration-300 ease-in-out
              ${isZoomed ? "w-30 h-30 scale-150 cursor-zoom-out" : "scale-100"}
            `}
            style={{ transformOrigin: "center" }}
          />
        )}
        <div>
          <p className="text-sm">
            <span
              className={`uppercase text-xs font-semibold ${theme.textSecondary}`}
            >
              Name:
            </span>
            <br />
            <span className="font-medium">{profile.ens.name}</span>
          </p>
        </div>
      </div>
    </>
  );
}
