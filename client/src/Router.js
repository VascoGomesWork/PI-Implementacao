import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import NotFound from "./Pages/NotFound";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import ShowMaterialsPage from "./Pages/ShowMaterialsPage";
import AddmaterialPage from "./Pages/AddmaterialPage";
import UpdateMaterialPage from "./Pages/UpdateMaterialPage";
import AddProjectPage from "./Pages/AddProjectPage";
import AddMaterialTypePage from "./Pages/AddMaterialTypePage"
import ShowProjectsPage from "./Pages/ShowProjectsPage"
import RealizarRequisicoesPage from "./Pages/RealizarRequisicoesPage";
import RealizarDevolucoesPage from "./Pages/RealizarDevolucoesPage";
//import CreateMaterialsKitsPage from "./Pages/CreateMaterialsKitsPage";
import ShowKitsPage from "./Pages/ShowKitsPage";
//teste criar kits
import CreateKitPage from "./Pages/CreateKitPage";
import HomePage from "./Pages/HomePage";


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<LandingPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/stock" element={<ShowMaterialsPage />} />
        <Route path="/addmaterial" element={<AddmaterialPage />} />
        <Route path="/realizarrequisicoes" element={<RealizarRequisicoesPage />} />
        <Route path="/realizardevolucoes" element={<RealizarDevolucoesPage />} />
        <Route path="/createkits" element={<CreateKitPage />} />
        <Route path="/addproject" element={<AddProjectPage />} />
        <Route path="/updatematerial" element={<UpdateMaterialPage />} />
        <Route path="/addmaterialtype" element={<AddMaterialTypePage />} />
        <Route path="/showprojects" element={<ShowProjectsPage />} />
        <Route path="/showkits" element={<ShowKitsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
