import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";
import Head from "./Head";
import TopBar from "./TopBar";
import Nav from "./Nav";
import MainTest from "./MainTest";
import Scripts from "./Scripts";
import UpdateMaterialForm from "./UpdateMaterialForm";

const UpdateMaterialPage = () => {
    return (
        <div>

            <Head />

            <TopBar />
            <div id="layoutSidenav">
                <Nav />

                <UpdateMaterialForm />
            </div>

            <Scripts />

        </div>
    );
};

export default UpdateMaterialPage;
