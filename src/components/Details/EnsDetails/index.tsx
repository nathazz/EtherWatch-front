
import { useDarkMode } from "../../../Hooks/DarkMode/useDarkMode";
import type { IEnsProfile } from "../../../services/requests/ensProfile/interface";

export function EnsProfileDetails({ profile }: { profile: IEnsProfile }) {
  const { theme } = useDarkMode();

  return (
    <div className={`flex items-center gap-4 ${theme.text}`}>
      {profile.ens.avatar && (
        <img
          src={profile.ens.avatar}
          alt="ENS Avatar"
          className="w-14 h-14 rounded-full border border-white/20 shadow-md"
        />
      )}
      <div>
        <p className="text-sm">
          <span className={`uppercase text-xs font-semibold ${theme.textSecondary}`}>
            Name:
          </span>
          <br />
          <span className="font-medium">{profile.ens.name}</span>
        </p>
      </div>
    </div>
  );
}
