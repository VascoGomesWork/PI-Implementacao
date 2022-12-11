import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";

const ShowProjectsPage = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const projects = await httpClient.get("//localhost:5000/showprojects");
        setProjects(projects.data.projects);
      } catch (error) {
        console.log("Error getting projects");
      }
    })();
  }, []);

  const exit = async () => {
    window.location.href = "/";
  };

  return (
    <div>
      <div>
        <h1>Listar Projetos </h1>
        <div>
          <table border="1">
            <tbody>
              <tr>
                <th>Projeto</th>
                <th>Observações</th>
                <th>Data de Inicio</th>
                <th>Data de Fim</th>
              </tr>
              {projects.map((item) => (
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
