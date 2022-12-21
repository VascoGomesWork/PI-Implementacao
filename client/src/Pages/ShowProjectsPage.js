import React, { useState, useEffect } from "react";
import Head from "./Head";
import TopBar from "./TopBar";
import Nav from "./Nav";
import MainTest from "./MainTest";
import Scripts from "./Scripts";
import ShowProjectsTable from "./ShowProjectsTable";

const ShowProjectsPage = () => {
  return (
      <div>

        <Head />

        <TopBar />
        <div id="layoutSidenav">
          <Nav />

          <ShowProjectsTable />
        </div>

        <Scripts />

      </div>
  );
};

export default ShowProjectsPage;
