//import React, { useState, useEffect } from "react";
import React from "react";
import TopBar from "./TopBar";
import Nav from "./Nav";
import Scripts from "./Scripts";
import AddMaterialTypeForm from "./AddMaterialTypeForm";

const AddMaterialTypePage = () => {
  return (
      <div>
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
