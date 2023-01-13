import React from "react";
import Head from "./Head";
import TopBar from "./TopBar";
import Nav from "./Nav";
import Scripts from "./Scripts";
import ShowKitsTable from "./ShowKitsTable";

const ShowKitsPage = () => {
  return (
      <div>
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
