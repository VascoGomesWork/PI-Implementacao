import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";
import Head from "./Head";
import TopBar from "./TopBar";
import Nav from "./Nav";
import Dashboard from "./Dashboard";
import Scripts from "./Scripts";
import CreateKitForm from "./CreateKitForm";

const CreateKitPage = () => {
  return (
      <div>

        <Head />

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
