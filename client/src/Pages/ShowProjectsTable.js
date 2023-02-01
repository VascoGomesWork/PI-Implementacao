import React, {useEffect, useState} from "react";

export default function ShowProjectsTable(){
    const [projects, setProjects] = useState([]);
    const [searchInput, setSearchInput] = useState([]);
    const [typeSearch, setTypeSearch] = useState("nome_projeto");

    // search bar
    useEffect(() => {
        fetch(
            `//localhost:5000/showprojectbyname?search=` +
            searchInput +
            "&search_type=" +
            typeSearch
        )
            .then((res) => res.json())
            .then((data) => {
                setProjects(data.projects);
            });
    }, [searchInput, typeSearch]);

    return (
        <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">
                    <h1 className="mt-4">Lista de Projetos</h1>
                    <div>
                        <div>
                            <div className="form-floating mb-2">
                                <div className="row">
                                    <label>Efetue a pesquisa de projetos selecionando um dos atributos da caixa de pesquisa pelo qual deseja pesquisar</label>
                                    <div className="col-md-2">
                                        <label>Pesquisa: </label>
                                    </div>
                                    <div className="col-md-5">
                                        <input
                                            className="form-control"
                                            type="search"
                                            value={searchInput}
                                            onChange={(e) => {
                                                setSearchInput(e.target.value);
                                            }}
                                            id=""
                                        />
                                    </div>
                                    <div className="col-md-5">
                                        <select
                                            className="form-select"
                                            onChange={(e) => {
                                                console.log(e.target.value);
                                                setTypeSearch(e.target.value);
                                            }}
                                            id=""
                                        >
                                            <option value="nome_projeto">Nome Projeto</option>
                                            <option value="data_inicio">Data de Incio</option>
                                            <option value="data_fim">Data de Fim</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-floating mb-2">
                                <div className="row">
                                    <div className="col-md-12">
                                    <table className="table table-bordered" border="1">
                                        <tbody>
                                        <tr>
                                            <th>Projeto</th>
                                            <th>Observações</th>
                                            <th>Data de Inicio</th>
                                            <th>Data de Fim</th>
                                        </tr>
                                        {projects?.map((item) => (
                                            <tr key={item.id}>
                                                <th>{item.nome}</th>
                                                <th>{item.observacoes}</th>
                                                <th>{item.data_inicio.substr(0,10)}</th>
                                                <th>{item.data_fim.substr(0,10)}</th>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}