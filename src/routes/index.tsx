import { Route, Routes } from "react-router-dom";
import HomePage from "../page/Home";
import { NotFoundPage } from "../page/NotfoundPage";

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
