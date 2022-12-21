import React, { useState, useEffect } from "react";
import Head from "./Head";
import TopBar from "./TopBar";
import Nav from "./Nav";
import MainTest from "./MainTest";
import Scripts from "./Scripts";
import ShowMaterialsTable from "./ShowMaterialsTable";

const ShowMaterialsPage = () => {
  return (
      <div>

        <Head />

        <TopBar />
        <div id="layoutSidenav">
          <Nav />

          <ShowMaterialsTable />
        </div>

        <Scripts />

      </div>
  );
};

export default ShowMaterialsPage;
