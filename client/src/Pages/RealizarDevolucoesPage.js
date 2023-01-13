import React from "react";
import TopBar from "./TopBar";
import Nav from "./Nav";
import Scripts from "./Scripts";
import RealizarDevolucoesForm from "./RealizarDevolucoesForm";

export default function RealizarDevolucoesPage() {
  return (
    <div>

      <TopBar />
      <div id="layoutSidenav">
        <Nav />

        <RealizarDevolucoesForm />
      </div>

      <Scripts />
    </div>
  );
}
