import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import NotFound from "./Pages/NotFound";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import StockPage from "./Pages/StockPage";
import AddtoolPage from "./Pages/AddtoolPage";
import RemovetoolPage from "./Pages/RemovetoolPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/stock" element={<StockPage />} />
        <Route path="/addtool" element={<AddtoolPage />} />
        <Route path="/removetool" element={<RemovetoolPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
