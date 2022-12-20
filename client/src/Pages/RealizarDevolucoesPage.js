import React, {useEffect, useState} from "react";
import httpClient from "../httpClient";

export default function RealizarDevolucoesPage() {
  const [searchInput, setSearchInput] = useState([]);
  const [searchResultList, setSearchResultList] = useState([]);
  const [requisicaoKitsList, setRequisicaoKitsList] = useState([]);
  const [requisicaoMaterialsList, setRequisicaoMaterialsList] = useState([]);
  const [typeSearch, setTypeSearch] = useState("nome_projeto");

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

  const changeKitsQuantity = async (id, quantity) => {
    requisicaoKitsList.forEach((element) => {
      if (element.id === id) {
        element.quantidade = quantity;
        console.log("element quantiaty => ", element);
      }
    });
  };

  const changeQuantity = async (id, quantity) => {
    console.log("QTY = " + quantity)
    requisicaoMaterialsList.forEach((element) => {
      if (element.id === id) {
        element.quantidade = quantity;
      }
    });
  };

  const removeKitsList = async (id) => {
    setRequisicaoKitsList((requisicaoKitList) =>
        requisicaoKitList.filter((element) => element.id !== id)
    );
  };

  const removeMaterialsList = async (id) => {
    setRequisicaoMaterialsList((requisicaoMaterialsList) =>
        requisicaoMaterialsList.filter((element) => element.id !== id)
    );
  };

  function addMaterialToReturn(id, projeto, nome, quantidade, data_requisicao, docente, kit){
    //console.log("TESTE INSIDE FUNCTION")
    console.log("ID = " + id)
    console.log("NOME = " + nome)
    console.log("QUANTIDADE = " + quantidade)
    console.log("DATA REQUISIÇÃO = " + data_requisicao)
    console.log("DOCENTE = " + docente)
    console.log("KIT = " + kit)
    const found = requisicaoMaterialsList.some((material) => material.id === id);
    if (!found) {
      setRequisicaoMaterialsList([
        ...requisicaoMaterialsList,
        {
          id: id,
          projeto: projeto,
          nome: nome,
          quantidade: quantidade,
          data_requisicao: data_requisicao,
          docente: docente,
          kit: kit,
        },
      ]);
    }
  };

  const addkitToReturn = async (id, nome) => {
    const found = requisicaoKitsList.some((kit) => kit.id === id);
    if (!found) {
      setRequisicaoKitsList([
        ...requisicaoKitsList,
        {
          id: id,
          nome: nome,
        },
      ]);
    }
  };

  const returnMaterialRequest = async (/*id, materialId*/) => {
    //Fazer Devolução Parcial ou total perguntando ao utilizador se deseja devolver tudo ou apenas o selecionado

    //Verificar se o que foi selecionado foi um kit
    /*setRequisicaoMaterialsList([
      ...requisicaoMaterialsList,
      {
        id: id
      },
    ]);*/
  };

  const makeMaterialsReturn = async (e) => {
    //Fazer UPDATE NA TABELA
    try {
      await httpClient.post("//localhost:5000/makereturn", {
        requisicaoMaterialsList: requisicaoMaterialsList,
      });
      window.location.href = "/";
    } catch (e) {
      if (e.response.status === 401) {
        alert("Invalid Type Info");
      }
    }
  };

  const makeKitsRequisition = async (e) => {
    /*try {
      await httpClient.post("//localhost:5000/makekitsrequest", {
        nome,
        nome_projeto,
        requisicaoKitsList,
        data_entrega_prevista,
      });
      window.location.href = "/";
    } catch (e) {
      if (e.response.status === 401) {
        alert("Invalid Type Info");
      }
    }*/
  };

  return (
      <div>
        <h1>Realizar Devoluções de Material</h1>
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
                <th>Devolver</th>
              </tr>
              {
                // How to use If Statement inside map function in React -> https://stackoverflow.com/questions/44969877/if-condition-inside-of-map-react
                typeSearch === "kit" ? searchResultList?.map((object) => (
                    console.log("JSON Stringify = " + JSON.stringify(object)),
                        object.map((atribute) => (
                            //console.log("ATRIBUTE = " + " QUANTIDADE " + atribute["quantidade"] + atribute["kit"][0].nome),
                            <tr>
                              <th>{atribute["kit"][0].nome}</th>
                              <th>{atribute["material"][0] !== undefined ? atribute["material"][0].nome : ""}</th>
                              <th>{atribute["quantidade"]}</th>
                              <th>{atribute["data_requisicao"]}</th>
                              <th>{atribute["user"][0].nome}</th>
                              <th>{atribute["kit"][0].nome}</th>
                              <th><button>{atribute["kit"][0].id + " " + atribute["material"][0].id}</button></th>
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
                                      <th><button type="button" onClick={(e) => {addMaterialToReturn(atribute["id"], atribute["nome_projeto"], atribute["material"][0].nome, atribute["quantidade"], atribute["data_requisicao"], atribute["user"][0].nome, atribute["kit"][0].nome)}}>Realizar Devolução</button></th>
                                    </tr>
                            )
                        )))
              }

              </tbody>
            </table>
          </div>

          <div>
            <label>Materiais/Kits para Devolver </label>
            <table border="1">
              <tbody>
              {typeSearch === "Kit" ? (
                  <tr key="table head kit add">
                    <th>Kit</th>
                    <th>Quantidade Total</th>
                    <th>Adicionar</th>
                  </tr>
              ) : (
                  <tr key="table head material add">
                    <th>Nome de Projeto</th>
                    <th>Material</th>
                    <th>Quantidade a Devolver</th>
                    <th>Data de Requisição</th>
                    <th>Docente</th>
                    <th>Kit</th>
                    <th>Remover</th>
                  </tr>
              )}
              {typeSearch === "Kit"
                  ? requisicaoKitsList?.map((kit) => (
                      <tr key={kit.id}>
                        <th>{kit.nome}</th>
                        <th>
                          <input
                              type="number"
                              onChange={(e) =>
                                  changeKitsQuantity(kit.id, e.target.value)
                              }
                          />
                        </th>

                        <th>
                          <button
                              type="button"
                              onClick={(e) => {
                                removeKitsList(kit.id);
                              }}
                          >
                            Remover
                          </button>
                        </th>
                      </tr>
                  ))
                  : requisicaoMaterialsList?.map((item) => (
                      <tr key={item.id}>
                        <th>{item.projeto}</th>
                        <th>{item.nome}</th>
                        <th>
                          <input
                              type="number"
                              onChange={(e) =>
                                  changeQuantity(item.id, e.target.value)
                              }
                              id=""
                          />
                        </th>
                        <th>{item.data_requisicao}</th>
                        <th>{item.docente}</th>
                        <th>{item.kit}</th>
                        <th>
                          <button
                              type="button"
                              onClick={(e) => {
                                removeMaterialsList(item.id);
                              }}
                          >
                            Remover
                          </button>
                        </th>
                      </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <button
              type="button"
              onClick={
                typeSearch === "Kit"
                    ? makeKitsRequisition
                    : makeMaterialsReturn
              }
          >
            Fazer Devolucao
          </button>
        </form>
      </div>
  );
}
