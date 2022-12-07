import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";

const AddProjectPage = () => {
  const [nome, setNome] = useState([]);
  const [observacoes, setObservacoes] = useState([]);
  const [data_inicio, setDataInicio] = useState([]);
  const [data_fim, setDataFim] = useState([]);


  const addProject = async (e) => {
    try {
      const response = await httpClient.post("//localhost:5000/addproject", {
        nome,
        observacoes,
        data_inicio,
        data_fim,
      });
      window.location.href = "/stock";
    } catch (e) {
      if (e.response.status == 401) {
        alert("Invalid Project Info");
      }
    }
  };

  return (
    <div>
      <h1>Add New Project</h1>
      <form>
        <div>
          <label>Nome </label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            id=""
          />
        </div>

        <div>
          <label>Observações </label>
          <input
              type="text"
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              id=""
          />
        </div>

        <div>
          <label>Data Inicio </label>
          <input
              type="text"
              value={data_inicio}
              onChange={(e) => setDataInicio(e.target.value)}
              id=""
          />
        </div>

        <div>
          <label>Data Fim </label>
          <input
              type="text"
              value={data_fim}
              onChange={(e) => setDataFim(e.target.value)}
              id=""
          />
        </div>

        <button type="button" onClick={addProject}>Add Project</button>
      </form>
    </div>
  );
};

export default AddProjectPage;
