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

                            <button className="nav-link sb-sidenav-dark border-0" onClick={realizarRequisicoes}>
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Realizar Requisições
                            </button>

                            <button className="nav-link sb-sidenav-dark border-0" onClick={realizarDevolucoes}>
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Realizar Devoluções
                            </button>

                            <button className="nav-link sb-sidenav-dark border-0" onClick={checkStocks}>
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Lista de Materiais
                            </button>

                            <button className="nav-link sb-sidenav-dark border-0" onClick={atualizarStocks}>
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Atualizar Stocks
                            </button>

                            <button className="nav-link sb-sidenav-dark border-0" onClick={adicionarMaterial}>
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Adicionar Material
                            </button>

                            <button className="nav-link sb-sidenav-dark border-0" onClick={criarKits}>
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Criar Kit de Material
                            </button>

                            <button className="nav-link sb-sidenav-dark border-0" onClick={verKits}>
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Lista de Kits
                            </button>

                            <button className="nav-link sb-sidenav-dark border-0" onClick={adicionarTipoMaterial}>
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Adicionar Tipo Material
                            </button>

                            <button className="nav-link sb-sidenav-dark border-0" onClick={adicionarProjeto}>
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Criar Projeto
                            </button>

                            <button className="nav-link sb-sidenav-dark border-0" onClick={verProjetos}>
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Lista de Projetos
                            </button>

                            <div className="collapse" id="collapsePages" aria-labelledby="headingTwo"
                                 data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                                    <button className="nav-link collapsed" href="#" data-bs-toggle="collapse"
                                       data-bs-target="#pagesCollapseAuth" aria-expanded="false"
                                       aria-controls="pagesCollapseAuth">
                                        Authentication
                                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i>
                                        </div>
                                    </button>
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