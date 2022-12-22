//import React, { useState, useEffect } from "react";
import React, { useState } from "react";
import httpClient from "../httpClient";
import Head from "./Head";
import TopBar from "./TopBar";
import Nav from "./Nav";
import Dashboard from "./Dashboard";
import Scripts from "./Scripts";
import AddMaterialTypeForm from "./AddMaterialTypeForm";

const AddMaterialTypePage = () => {
  return (
      <div>

        <Head />

        <TopBar />
        <div id="layoutSidenav">
          <Nav />

          <AddMaterialTypeForm />
        </div>

        <Scripts />

      </div>
  );
};

export default AddMaterialTypePage;
