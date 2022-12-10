import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import NotFound from "./Pages/NotFound";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import StockPage from "./Pages/StockPage";
import AddmaterialPage from "./Pages/AddmaterialPage";
import UpdatematerialPage from "./Pages/UpdatematerialPage";
import AddProjectPage from "./Pages/AddProjectPage";
import AddmaterialtypePage from "./Pages/AddmaterialtypePage"
import ShowProjectsPage from "./Pages/ShowProjectsPage"
import RealizarRequisicoesPage from "./Pages/RealizarRequisicoesPage";
import ReturnMaterialsPage from "./Pages/ReturnsMaterialsPage";
import CreateMaterialsKitsPage from "./Pages/CreateMaterialsKitsPage";
import ShowKitsPage from "./Pages/ShowKitsPage";
//teste de requisicoes
import RequisicoesPage from "./Pages/RequisicoesPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/stock" element={<StockPage />} />
        <Route path="/addmaterial" element={<AddmaterialPage />} />
        <Route path="/realizarrequisicoes" element={<RequisicoesPage />} />
        <Route path="/createkits" element={<CreateMaterialsKitsPage />} />
        <Route path="/returnmaterials" element={<ReturnMaterialsPage />} />
        <Route path="/addproject" element={<AddProjectPage />} />
        <Route path="/updatematerial" element={<UpdatematerialPage />} />
        <Route path="/addmaterialtype" element={<AddmaterialtypePage />} />
        <Route path="/showprojects" element={<ShowProjectsPage />} />
        <Route path="/showkits" element={<ShowKitsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
