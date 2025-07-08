import { useDarkMode } from "../../Hooks/DarkMode/useDarkMode";

export function Detail({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  const { theme } = useDarkMode();

  return (
    <div className="flex flex-col">
      <span
        className={`uppercase text-xs font-semibold ${theme.textSecondary}`}
      >
        {label}
      </span>
      <span className={`break-all font-medium`}>{value}</span>
    </div>
  );
}
