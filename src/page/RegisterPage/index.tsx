import { Link } from "react-router-dom";
import { useDarkMode } from "../../Hooks/DarkMode/useDarkMode";
import { EtherIcon } from "../../components/@icons/EthIcon";

export const RegisterPage: React.FC = () => {
  const { theme } = useDarkMode();

  return (
    <div
      className={`flex items-center justify-center min-h-screen ${theme.bg} ${theme.text}`}
    >
      <div
        className={`w-full max-w-xs sm:max-w-sm md:max-w-md px-4 sm:px-6 md:px-8 py-8 rounded-2xl border ${theme.cardBg} ${theme.border} ${theme.shadow}`}
      >
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16">
            <EtherIcon />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>

        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className={`w-full px-4 py-3 rounded-xl border ${theme.border} ${theme.bg} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <input
            type="email"
            placeholder="Email"
            className={`w-full px-4 py-3 rounded-xl border ${theme.border} ${theme.bg} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <input
            type="password"
            placeholder="Password"
            className={`w-full px-4 py-3 rounded-xl border ${theme.border} ${theme.bg} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <button
            type="submit"
            className={`mt-2 px-6 py-3 rounded-xl border ${theme.hover} ${theme.active} ${theme.text} ${theme.border} transition-transform transform hover:scale-105 active:scale-95`}
          >
            Sign Up
          </button>
        </form>

        <p className={`mt-4 text-center ${theme.textSecondary}`}>
          Already have an account?{" "}
          <Link to="/login" className="underline hover:text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
