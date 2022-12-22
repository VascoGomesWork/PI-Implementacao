import React, { useState, useEffect } from "react";
import Head from "./Head";
import TopBar from "./TopBar";
import Nav from "./Nav";
import Dashboard from "./Dashboard";
import Scripts from "./Scripts";
import ShowKitsTable from "./ShowKitsTable";

const ShowKitsPage = () => {
  return (
      <div>

        <Head />

        <TopBar />
        <div id="layoutSidenav">
          <Nav />

          <ShowKitsTable />
        </div>

        <Scripts />

      </div>
  );
};

export default ShowKitsPage;
