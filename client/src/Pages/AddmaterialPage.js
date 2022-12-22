import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";
import Head from "./Head";
import TopBar from "./TopBar";
import Nav from "./Nav";
import Dashboard from "./Dashboard";
import Scripts from "./Scripts";
import AddMaterialForm from "./AddMaterialForm";

const AddmaterialPage = () => {
  return (
      <div>

        <Head />

        <TopBar />
        <div id="layoutSidenav">
          <Nav />

          <AddMaterialForm />
        </div>

        <Scripts />

      </div>
  );
};

export default AddmaterialPage;
