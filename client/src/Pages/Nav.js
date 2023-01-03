import React, {useEffect, useState} from "react";
import httpClient from "../httpClient";

export default function Nav(){

    const [user, setUser] = useState([]);
    //console.log(user)



    useEffect(() => {
        (async () => {
            try {
                const response = await httpClient.get("//localhost:5000/@me")
                setUser(response.data);
            } catch (error) {
                console.log("Not authenticated")
            }
        })();
    }, []);

    /**
     *
     *
     *
     <button onClick={logoutUser}>Logout</button>
     <br />
     */

    const logoutUser = async () => {
        await httpClient.post("//localhost:5000/logout");
        window.location.href = "/";
    };

    const checkStocks = async () => {
        window.location.href = "/stock";
    };

    const realizarRequisicoes = async () => {
        window.location.href = "/realizarrequisicoes";
    };

    const realizarDevolucoes = async () => {
        window.location.href = "/realizardevolucoes";
    };

    const criarKits = async () => {
        window.location.href = "/createkits";
    };

    const adicionarMaterial = async () => {
        window.location.href = "/addmaterial";
    };

    const atualizarStocks = async () => {
        window.location.href = "/updatematerial";
    };

    const adicionarProjeto = async () => {
        window.location.href = "/addproject";
    };

    const adicionarTipoMaterial = async () => {
        window.location.href = "/addmaterialtype";
    };

    const verProjetos = async () => {
        window.location.href = "/showprojects";
    };

    const verKits = async () => {
        window.location.href = "/showkits";
    };

    return(
            <div id="layoutSidenav_nav">
                <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div className="sb-sidenav-menu">
                        <div className="nav">

                            <div className="sb-sidenav-menu-heading">Operações do Sistema</div>
                            <a className="nav-link" onClick={realizarRequisicoes}>
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Realizar Requisições
                            </a>

                            <a className="nav-link" onClick={realizarDevolucoes}>
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Realizar Devoluções
                            </a>

                            <a className="nav-link" onClick={checkStocks}>
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Lista de Materiais
                            </a>

                            <a className="nav-link" onClick={atualizarStocks}>
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Atualizar Stocks
                            </a>

                            <a className="nav-link" onClick={adicionarMaterial}>
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Adicionar Material
                            </a>

                            <a className="nav-link" onClick={criarKits}>
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Criar Kit de Material
                            </a>

                            <a className="nav-link" onClick={verKits}>
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Lista de Kits
                            </a>

                            <a className="nav-link" onClick={adicionarTipoMaterial}>
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Adicionar Tipo Material
                            </a>

                            <a className="nav-link" onClick={adicionarProjeto}>
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Criar Projeto
                            </a>

                            <a className="nav-link" onClick={verProjetos}>
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Lista de Projetos
                            </a>

                            <div className="collapse" id="collapsePages" aria-labelledby="headingTwo"
                                 data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse"
                                       data-bs-target="#pagesCollapseAuth" aria-expanded="false"
                                       aria-controls="pagesCollapseAuth">
                                        Authentication
                                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i>
                                        </div>
                                    </a>
                                    <div className="collapse" id="pagesCollapseAuth" aria-labelledby="headingOne"
                                         data-bs-parent="#sidenavAccordionPages">
                                        <nav className="sb-sidenav-menu-nested nav">
                                            <a className="nav-link" href="login.html">Login</a>
                                            <a className="nav-link" href="register.html">Register</a>
                                            <a className="nav-link" href="password.html">Forgot Password</a>
                                        </nav>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="sb-sidenav-footer">
                        <div className="small">Logged in as:</div>
                            <div>
                                <h6>Nome: {user.nome}</h6>
                                <button className="btn btn-danger" onClick={logoutUser}>Logout</button>
                            </div>
                    </div>
                </nav>
            </div>
    )
}