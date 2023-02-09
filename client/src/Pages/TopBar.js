import React from "react";

export default function TopBar(){
    return(
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <a className="navbar-brand ps-3" href="\dashboard"><img alt="" id="logo" src="../../img/logo_sepsi.png"/> Sistema de Gestão SEPSI de Stocks</a>
            <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><span
                className="navbar-toggler-icon"></span></button>
        </nav>
    )
}