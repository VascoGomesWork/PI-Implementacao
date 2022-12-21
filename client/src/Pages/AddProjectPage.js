//import React, { useState, useEffect } from "react";
import React, { useState } from "react";
import httpClient from "../httpClient";
import Head from "./Head";
import TopBar from "./TopBar";
import Nav from "./Nav";
import MainTest from "./MainTest";
import Scripts from "./Scripts";
import AddProjectForm from "./AddProjectForm";

//test

const AddProjectPage = () => {
  return (
      <div>

        <Head />

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
