import React, {useEffect, useState} from "react";
import httpClient from "../httpClient";

export default function RealizarDevolucoesPage() {
  const [searchInput, setSearchInput] = useState([]);
  const [searchResultList, setSearchResultList] = useState([]);
  //const [requisicaoKitsList, setRequisicaoKitsList] = useState([]);
  const [requisicaoMaterialsList, setRequisicaoMaterialsList] = useState([]);
  const [typeSearch, setTypeSearch] = useState("nome_projeto");
  const [counter, setCounter] = useState(0);
  const [counter2, setCounter2] = useState(0);

  useEffect(() => {
    if (searchInput.length > 0) {
      fetch(
          `//localhost:5000/showmaterialstoreturn?search=` +
          searchInput +
          "&search_type=" +
          typeSearch
      )
          .then((res) => res.json())
          .then((data) => {
            setSearchResultList(data.returns_list);
            //console.log("DATA = " + data.returns_list[0][0].nome_projeto)
          });

      //console.log("search com valores =>", searchInput);
    } else if (searchInput.length <= 0) {
      //console.log("serach sem valores =>", searchInput);
      setSearchResultList([]);
    }
  }, [searchInput]);

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
                  //searchMaterials();
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
              {
                // How to use If Statement inside map function in React -> https://stackoverflow.com/questions/44969877/if-condition-inside-of-map-react
                typeSearch === "kit" ? searchResultList?.map((object) => (
                    console.log("JSON Stringify = " + JSON.stringify(object)),
                        object.map((atribute) => (
                            //console.log("ATRIBUTE = " + " QUANTIDADE " + atribute["quantidade"] + atribute["kit"][0].nome),
                            <tr>
                              <th>{atribute["kit"][0].nome}</th>
                              <th>{atribute["material"][0].nome}</th>
                              <th>{atribute["quantidade"]}</th>
                              <th>{atribute["data_requisicao"]}</th>
                              <th>{atribute["user"][0].nome}</th>
                              <th>{atribute["kit"][0].nome}</th>
                            </tr>
                        ))
                )) : searchResultList?.map((object) => (
                    console.log("JSON Stringify = " + JSON.stringify(object)),
                        object.map((atribute) => (
                                console.log("KIT = " + atribute["kit"]),
                                    <tr>
                                      <th>{atribute["nome_projeto"]}</th>
                                      <th>{atribute["material"][0] !== undefined ? atribute["material"][0].nome : ""}</th>
                                      <th>{atribute["quantidade"]}</th>
                                      <th>{atribute["data_requisicao"]}</th>
                                      <th>{atribute["user"][0].nome}</th>
                                      <th>{atribute["kit"][0] !== undefined ? atribute["kit"][0].nome : "Não Existe Kit"}</th>
                                    </tr>
                            )
                        )))
              }

              </tbody>
            </table>
          </div>
        </form>
      </div>
  );
}
