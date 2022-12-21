import React, {useEffect, useState} from "react";
import httpClient from "../httpClient";
import Head from "./Head";
import TopBar from "./TopBar";
import Nav from "./Nav";
import MainTest from "./MainTest";
import Scripts from "./Scripts";
import RealizarDevolucoesForm from "./RealizarDevolucoesForm";

export default function RealizarDevolucoesPage() {

  return (
      <div>

        <Head />

        <TopBar />
        <div id="layoutSidenav">
          <Nav />

          <RealizarDevolucoesForm />
        </div>

        <Scripts />

      </div>
  );

}
