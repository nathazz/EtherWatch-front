import { Link } from "react-router-dom";
import { useDarkMode } from "../../Hooks/DarkMode/useDarkMode";

export const NotFoundPage: React.FC = () => {
   const { theme } = useDarkMode();

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen gap-6 ${theme.bg} ${theme.text}`}
    >
      <div className="w-20 h-20 mb-4">
        <svg
          viewBox="0 0 256 417"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="w-full h-full"
        >
          <polygon points="127.9,0 124.5,11.7 124.5,277.6 127.9,281 255.8,208.4 " />
          <polygon points="127.9,0 0,208.4 127.9,281 127.9,150.1 " />
          <polygon points="127.9,302.4 125.9,304.9 125.9,416.6 127.9,421.6 255.9,231.1 " />
          <polygon points="127.9,421.6 127.9,302.4 0,231.1 " />
          <polygon points="127.9,281 255.8,208.4 127.9,150.1 " fillOpacity="0.3" />
          <polygon points="0,208.4 127.9,281 127.9,150.1 " fillOpacity="0.3" />
        </svg>
      </div>

      <h1 className="text-7xl font-extrabold">404</h1>
      <p className={`text-2xl ${theme.textSecondary}`}>Page Not Found</p>

      <Link
        to="/"
        className={`mt-2 px-6 py-3 rounded-xl border ${theme.hover} ${theme.active} ${theme.text} ${theme.border} transition-transform transform hover:scale-105 active:scale-95`}
      >
        Go Home
      </Link>
    </div>
  );
};
