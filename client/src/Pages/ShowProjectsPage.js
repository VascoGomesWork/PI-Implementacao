import React from "react";
import TopBar from "./TopBar";
import Nav from "./Nav";
import Scripts from "./Scripts";
import ShowProjectsTable from "./ShowProjectsTable";

const ShowProjectsPage = () => {
  return (
      <div>
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
