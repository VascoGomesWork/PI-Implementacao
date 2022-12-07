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
  console.log(projects);

  const exit = async () => {
    window.location.href = "/";
  };

  return (
    <div>
      <div>
        <h1>Listar Projetos: </h1>
        {projects.map((item) => (
          <p key={item.id}>
            <table>
            <td>
                <tr>{item.nome}</tr>
                <tr>{item.observacoes}</tr>
                <tr>{item.data_inicio}</tr>
                <tr>{item.data_fim}</tr>
            </td>
            </table>
          </p>
        ))}
      </div>
      <button type="button" key="exitBtn" onClick={exit}>
        Sair
      </button>
    </div>
  );
};

export default ShowProjectsPage;
