import React from "react";
import Head from "./Head";
import TopBar from "./TopBar";
import Nav from "./Nav";
import Scripts from "./Scripts";
import CreateKitForm from "./CreateKitForm";

const CreateKitPage = () => {
  return (
      <div>

        <TopBar />
        <div id="layoutSidenav">
          <Nav />

          <CreateKitForm />
        </div>

        <Scripts />

      </div>
  );
};

export default CreateKitPage;
