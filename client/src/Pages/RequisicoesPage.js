import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";

const RequisicoesPage = () => {
  const [nomeDocente, setNomeDocente] = useState([]);
  const [nomeProjeto, setNomeProjeto] = useState([]);
  const [dataEntrega, setDataEntrega] = useState([]);
  // Result of search materials
  const [searchMaterial, setsearchMaterial] = useState([]);
  // List of materials 

  const addRequisicao = async (e) => {
    try {
      await httpClient.post("//localhost:5000/addrequisicao", {
        nomeDocente,
        nomeProjeto,
        dataEntrega,
        //requicicaoList,
      });
      window.location.href = "/";
    } catch (e) {
      if (e.response.status === 401) {
        alert("Invalid Requisicao Info");
      }
    }
  };

  return (
    <div>
      <h1>Requisições de Materiais/Kits</h1>
      <form>
        <div>

        </div>
        <button type="button" onClick={addRequisicao}>
          Fazer Requisição
        </button>
      </form>
    </div>
  );
};

export default RequisicoesPage;
