import React from "react";
import TopBar from "./TopBar";
import Nav from "./Nav";
import Scripts from "./Scripts";
import UpdateMaterialForm from "./UpdateMaterialForm";

const UpdateMaterialPage = () => {
    return (
        <div>
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
