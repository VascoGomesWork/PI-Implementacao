import React, { useState, useEffect } from "react";

const ShowProjectsPage = () => {
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

  const exit = async () => {
    window.location.href = "/";
  };

  return (
    <div>
      <div>
        <h1>Listar Projetos </h1>
        <div>
          <label>Pesquisa: </label>
          <input
            type="search"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
            id=""
          />

          <select
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
        <div>
          <table border="1">
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
                  <th>{item.data_inicio}</th>
                  <th>{item.data_fim}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <br />
      <button type="button" key="exitBtn" onClick={exit}>
        Sair
      </button>
    </div>
  );
};

export default ShowProjectsPage;
