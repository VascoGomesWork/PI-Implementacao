import React from "react";
import TopBar from "./TopBar";
import Nav from "./Nav";
import Scripts from "./Scripts";
import RealizarRequisicoesForm from "./RealizarRequisicoesForm";

export default function RealizarRequisicoesPage() {
  return (
    <div>
      <TopBar />
      <div id="layoutSidenav">
        <Nav />
        <RealizarRequisicoesForm />
      </div>
      <Scripts />
    </div>
  );
}
