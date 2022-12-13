import React, { useEffect, useState } from "react";
import httpClient from "../httpClient";
//import httpClient from "../httpClient";

export default function RealizarDevolucoesPage() {

  const [comboboxMaterialRequisicao, setComboboxMaterialRequisicao] = useState(
    []
  );

  const [searchInput, setSearchInput] = useState([]);
  const [searchResultList, setSearchResultList] = useState([]);
  const [requisicaoKitsList, setRequisicaoKitsList] = useState([]);
  const [requisicaoMaterialsList, setRequisicaoMaterialsList] = useState([]);
  const [typeSearch, setTypeSearch] = useState("nome_projeto");

  //Sets Default Value
  /*useEffect(() => {
    (async () => {
      try {
        //Vai buscar tipos de materiais e preenche a dropdown
        const types = await httpClient.get(
          `//localhost:5000/showtypesmaterials`
        );
        //console.log("TIPOS MATERIAIS = " + JSON.stringify(types.data))
        /*
         * 1º types -> nome da variavel
         * data -> todos os json vem com data
         * 2º types -> nome do json que vem do servidor
         * */
        /*setComboboxMaterialRequisicao(types.data.types);
        //Adds Kit to Combobox
        //console.log(JSON.stringify(comboboxMaterialRequisicao))
        setComboboxMaterialRequisicao((prevData) => [
          ...prevData,
          { tipo: "Kit" },
        ]);
      } catch (e) {
        console.log("Error getting types of materials");
      }
    })();
    //console.log("COMBOBOX = " + JSON.stringify(comboboxMaterialRequisicao))
  }, []);*/

  const searchMaterials = async () => {
    //console.log("TYPE MATERIAL = " + JSON.stringify(typeSearch) + " | " + comboboxMaterialRequisicao[0].id)

    console.log("SEARCH INPUT = " + searchInput)
    console.log("TYPE MATERIAL = " + typeSearch);

    // if the search is by kit
    if (searchInput.length > 0) {
      fetch(
        `//localhost:5000/showrequeststoreturn?search=` +
          searchInput +
          "&search_type=" +
          typeSearch
      )
        .then((res) => res.json())
        .then((data) => {
          setSearchResultList(data.list_kit_mateirals);
        });
      //console.log("SEARCH RESULT => ", searchResultList);
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
                    <tr key={item.id}>
                      <th>{item.nome}</th>
                      <th>{item.quantidade}</th>
                      <th>
                        <button
                          type="button"
                          onClick={(e) => {
                            returnMaterialRequest(
                              item.id,
                              item.nome,
                              item.quantidade
                            );
                          }}
                        >
                          Devolver
                        </button>
                      </th>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
}
