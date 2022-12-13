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
import RealizarDevolucoesPage from "./Pages/RealizarDevolucoesPage";
//import CreateMaterialsKitsPage from "./Pages/CreateMaterialsKitsPage";
import ShowKitsPage from "./Pages/ShowKitsPage";
//teste criar kits
import CreateKitPage from "./Pages/CreateKitPage";


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
        <Route path="/realizarrequisicoes" element={<RealizarRequisicoesPage />} />
        <Route path="/realizardevolucoes" element={<RealizarDevolucoesPage />} />
        <Route path="/createkits" element={<CreateKitPage />} />
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
