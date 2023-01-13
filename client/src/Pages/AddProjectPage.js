//import React, { useState, useEffect } from "react";
import React  from "react";
import Head from "./Head";
import TopBar from "./TopBar";
import Nav from "./Nav";
import Scripts from "./Scripts";
import AddProjectForm from "./AddProjectForm";

//test

const AddProjectPage = () => {
  return (
      <div>

        <TopBar />
        <div id="layoutSidenav">
          <Nav />

          <AddProjectForm />
        </div>

        <Scripts />

      </div>
  );
};

export default AddProjectPage;
