import React from "react";
import TopBar from "./TopBar";
import Nav from "./Nav";
import Scripts from "./Scripts";
import ShowMaterialsTable from "./ShowMaterialsTable";

const ShowMaterialsPage = () => {
  return (
      <div>
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
