import React, { useEffect, useState } from "react";
import httpClient from "../httpClient";
import Head from "./Head";
import TopBar from "./TopBar";
import Nav from "./Nav";
import MainTest from "./MainTest";
import Scripts from "./Scripts";
import RealizarRequisicoesForm from "./RealizarRequisicoesForm";

export default function RealizarRequisicoesPage() {

  return(
      <div>

        <Head />

        <TopBar />
        <div id="layoutSidenav">
          <Nav />

          <RealizarRequisicoesForm />
        </div>

        <Scripts />

      </div>
  )
}
