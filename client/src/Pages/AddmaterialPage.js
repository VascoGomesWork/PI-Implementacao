import React from "react";
import Head from "./Head";
import TopBar from "./TopBar";
import Nav from "./Nav";
import Scripts from "./Scripts";
import AddMaterialForm from "./AddMaterialForm";

const AddmaterialPage = () => {
  return (
      <div>

        <TopBar />
        <div id="layoutSidenav">
          <Nav />

          <AddMaterialForm />
        </div>

        <Scripts />

      </div>
  );
};

export default AddmaterialPage;
