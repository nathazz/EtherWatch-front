import { Route, Routes } from "react-router-dom";
import HomePage from "../page/Home";
import { NotFoundPage } from "../page/NotfoundPage";
import { RegisterPage } from "../page/RegisterPage";
import { LoginPage } from "../page/LoginPage";

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
