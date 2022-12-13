import React, { useState } from "react";
import httpClient from "../httpClient";

export default function RealizarDevolucoesPage() {
  const [searchInput, setSearchInput] = useState([]);
  const [searchResultList, setSearchResultList] = useState([]);
  //const [requisicaoKitsList, setRequisicaoKitsList] = useState([]);
  const [requisicaoMaterialsList, setRequisicaoMaterialsList] = useState([]);
  const [typeSearch, setTypeSearch] = useState("nome_projeto");

  const searchMaterials = async () => {
    console.log("SEARCH INPUT = " + searchInput);
    console.log("TYPE MATERIAL = " + typeSearch);
    // if the search is by kit
    if (searchInput.length > 0) {
      fetch(
        "//localhost:5000/showmaterialstoreturn?search=" +
          searchInput +
          "&search_type=" +
          typeSearch
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("DATA => ", JSON.stringify(data));
          setSearchResultList(data.returns_list);
        });
      console.log("SEARCH RESULT => ", JSON.stringify(searchResultList));
    }
  };

  const returnMaterialRequest = async (id, nome, quantidade) => {
    //Fazer Devolução Parcial ou total perguntando ao utilizador se deseja devolver tudo ou apenas o selecionado
    setRequisicaoMaterialsList([
      ...requisicaoMaterialsList,
      {
        id: id,
        nome: nome,
        quantidade: quantidade,
      },
    ]);
  };

  return (
    <div>
      <h1>Realizar Requisição de Material</h1>
      <form>
        <div>
          <label>Pesquisa: </label>
          <input
            type="search"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              searchMaterials();
            }}
            id=""
          />
          <select
            onChange={(e) => {
              setTypeSearch(e.target.value);
            }}
            id=""
          >
            <option value="nome_projeto">Nome Projeto</option>
            <option value="material">Material</option>
            <option value="data_requisicao">Data de Requisicao</option>
            <option value="docente">Docente</option>
            <option value="kit">Kit</option>
          </select>
        </div>
        <br />
        <div>
          <label>Lista de Materiais </label>
          <table border="1">
            <tbody>
              <tr>
                <th>Nome de Projeto</th>
                <th>Material</th>
                <th>Quantidade</th>
                <th>Data de Requisicao</th>
                <th>Docente</th>
                <th>Kit</th>
              </tr>
              {searchResultList?.map((item) => (
                  <tr>
                    <th>{item.nome_projeto}</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
              ))}

            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
}
