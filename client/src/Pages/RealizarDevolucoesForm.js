import React, { useEffect, useState } from "react";
import httpClient from "../httpClient";
import Alert from "./Alert";

export default function RealizarDevolucoesForm() {
  const [alert, setAlert] = useState(false);
  const [searchInput, setSearchInput] = useState([]);
  const [searchResultList, setSearchResultList] = useState([]);
  const [requisicaoKitsList, setRequisicaoKitsList] = useState([]);
  const [requisicaoMaterialsList, setRequisicaoMaterialsList] = useState([]);
  const [typeSearch, setTypeSearch] = useState("nome_projeto");
  const [wrongQuantity, setWrongQuantity] = useState(false);
  const [wrongQuantityFinal, setWrongQuantityFinal] = useState(false);

  function resetState() {
    setAlert(false)
    setSearchInput([])
    setSearchResultList([])
    setRequisicaoKitsList([])
    setRequisicaoMaterialsList([])
    setWrongQuantity(false)
    setWrongQuantityFinal(false)
  }

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
        });
    } else if (searchInput.length <= 0) {
      setSearchResultList([]);
    }
  }, [searchInput, typeSearch]);

  const changeKitsQuantity = async (id, quantity, totalQuantity) => {
    if (quantity > totalQuantity || quantity < 0) {
      setWrongQuantity(true);
    } else {
      setWrongQuantity(false);
    }

    requisicaoKitsList.forEach((element) => {
      if (element.id === id) {
        element.quantidade = quantity;
        console.log("element quantiaty => ", element);
      }
    });
  };

  const changeQuantity = async (id, quantity, totalQuantity) => {
    // Verifies the quantity
    if (quantity > totalQuantity || quantity < 0) {
      setWrongQuantity(true);
    } else {
      setWrongQuantity(false);
    }

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

  function addMaterialToReturn(
    id,
    projeto,
    nome,
    quantidade,
    data_requisicao,
    docente,
    kit,
    quantidade_total
  ) {
    const found = requisicaoMaterialsList.some(
      (material) => material.id === id
    );
    if (!found) {
      setRequisicaoMaterialsList([
        ...requisicaoMaterialsList,
        {
          id: id,
          projeto: projeto,
          nome: nome,
          quantidade: quantidade,
          quantidade_total: quantidade_total,
          data_requisicao: data_requisicao,
          docente: docente,
          kit: kit,
        },
      ]);
    }
  }

  const addkitToReturn = async (
    id,
    nome,
    quantidade,
    data_requisicao,
    docente,
    kit,
    quantidade_total,
  ) => {
    const found = requisicaoKitsList.some((kit) => kit.id === id);
    if (!found) {
      setRequisicaoKitsList([
        ...requisicaoKitsList,
        {
          id: id,
          nome: nome,
          quantidade: quantidade,
          data_requisicao: data_requisicao,
          docente: docente,
          kit: kit,
          quantidade_total: quantidade_total,
        },
      ]);
    }
    //console.log("REQUISICAO KIT KIT = " + JSON.stringify(requisicaoKitsList))
  };

  const makeMaterialsReturn = async (e) => {
    let permit = true
    requisicaoMaterialsList.forEach((materialsList) =>{
      if(materialsList.quantidade === materialsList.quantidade_total){
        permit = false
      }
    })

    if (wrongQuantity === true || permit === false) {
      // show error message
      console.log("quanitades incorretas, n fez commit na db");
      setWrongQuantity(false)
      setWrongQuantityFinal(true)
      setTimeout(() => { setWrongQuantityFinal(false)}, 3000)
    } else {
      //Fazer UPDATE NA TABELA
      try {
        await httpClient.post("//localhost:5000/makereturn", {
          requisicaoMaterialsList: requisicaoMaterialsList,
        });
        setTimeout(() => {
          setAlert((prevState) => !prevState);
        }, 3000);
        //Sets Variables to their initial state
        resetState();
        //Changes the state of the alert
        setAlert((prevState) => !prevState);
      } catch (e) {
        if (e.response.status === 401) {
          alert("Invalid Type Info");
        }
      }
    }
  };

  const makeKitsReturn = async (e) => {
    let permit = true
    requisicaoKitsList.forEach((materialsList) =>{
      if(materialsList.quantidade === materialsList.quantidade_total){
        permit = false
      }
    })
    //Fazer UPDATE NA TABELA
    if (wrongQuantity === true || permit === false) {
      // show error message
      //console.log("quanitades incorretas, n fez commit na db");
      setWrongQuantity(false)
      setWrongQuantityFinal(true)
      setTimeout(() => { setWrongQuantityFinal(false)}, 3000)
    } else {
      try {
        await httpClient.post("//localhost:5000/makereturn", {
          requisicaoMaterialsList: requisicaoKitsList,
        });
        setTimeout(() => {
          setAlert((prevState) => !prevState);
        }, 3000);
        //Sets Variables to their initial state
        resetState();
        //Changes the state of the alert
        setAlert((prevState) => !prevState);
      } catch (e) {
        if (e.response.status === 401) {
          alert("Invalid Type Info");
        }
      }
    }
  };

  return (
    <div id="layoutSidenav_content">
      <main>
        <div className="container-fluid px-4">
          <h1 className="mt-4">Devoluções de Material</h1>
          <div>
            <form>
              <div>
                <div className="form-floating mb-2">
                  <div className="row">
                    <div className="card-body">
                      <h6>Para realizar uma devolução efetue uma pesquisa pelos atributos presentes na caixa de pesquisa e selecione a quantidade que deseja devolver.
                        Podem ser efetuadas devoluções parciais.
                        Preencha todos os campos!</h6>
                    </div>
                    <br/>
                    <div className="col-md-1">
                      <label>Pesquisa: </label>
                    </div>
                    <div className="col-md-5">
                      <input
                        className="form-control"
                        type="search"
                        value={searchInput}
                        onChange={(e) => {
                          setSearchInput(e.target.value);
                          //searchMaterials();
                        }}
                        id=""
                      />
                    </div>
                    <div className="col-md-6">
                      <select
                        className="form-select"
                        onChange={(e) => {
                          setTypeSearch(e.target.value);
                        }}
                        id=""
                      >
                        <option value="nome_projeto">Nome Projeto</option>
                        <option value="material">Material</option>
                        <option value="data_requisicao">
                          Data de Requisicao
                        </option>
                        <option value="docente">Docente</option>
                        <option value="kit">Kit</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div className="form-floating mb-2">
                <div className="row">
                  <label>Lista de Materiais </label>
                </div>
                <div className="form-floating mb-2">
                  <table className="table table-bordered" border="1">
                    <tbody>
                      {typeSearch !== "kit" ? (
                        <tr>
                          <th>Nome de Projeto</th>
                          <th>Material</th>
                          <th>Quantidade</th>
                          <th>Data de Requisicao</th>
                          <th>Docente</th>
                          <th>Kit</th>
                          <th>Devolver</th>
                        </tr>
                      ) : (
                        <tr>
                          <th>Kit</th>
                          <th>Material</th>
                          <th>Quantidade</th>
                          <th>Data de Requisicao</th>
                          <th>Docente</th>
                          <th>Devolver</th>
                        </tr>
                      )}
                      {
                        // How to use If Statement inside map function in React -> https://stackoverflow.com/questions/44969877/if-condition-inside-of-map-react
                        typeSearch === "kit"
                          ? searchResultList?.map((object) =>
                              //console.log("JSON Stringify = " + JSON.stringify(object)),
                              object.map((atribute) => (
                                //console.log("ATRIBUTE = " + " QUANTIDADE " + atribute["quantidade"] + atribute["kit"][0].nome),
                                <tr>
                                  <th>
                                    {atribute["kit"][0] !== undefined
                                      ? atribute["kit"][0].nome
                                      : ""}
                                  </th>
                                  <th>
                                    {atribute["material"][0] !== undefined
                                      ? atribute["material"][0].nome
                                      : ""}
                                  </th>
                                  <th>{atribute["quantidade"]}</th>
                                  <th>
                                    {atribute["data_requisicao"].substr(0, 10)}
                                  </th>
                                  <th>{atribute["user"][0].nome}</th>
                                  <th>
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      onClick={(e) => {
                                        addkitToReturn(
                                          atribute["id"],
                                          atribute["material"][0].nome,
                                          atribute["quantidade"],
                                          atribute["data_requisicao"],
                                          atribute["user"][0].nome,
                                          atribute["kit"][0].nome,
                                          atribute["quantidade"]
                                        );
                                      }}
                                    >
                                      Realizar Devolução
                                    </button>
                                  </th>
                                </tr>
                              ))
                            )
                          : searchResultList?.map((object) =>
                              //console.log("JSON Stringify = " + JSON.stringify(object)),
                              object.map((atribute) => (
                                //console.log("KIT = " + atribute["kit"]),
                                <tr>
                                  <th>{atribute["nome_projeto"]}</th>
                                  <th>
                                    {atribute["material"][0] !== undefined
                                      ? atribute["material"][0].nome
                                      : ""}
                                  </th>
                                  <th>{atribute["quantidade"]}</th>
                                  <th>
                                    {atribute["data_requisicao"].substr(0, 10)}
                                  </th>
                                  <th>{atribute["user"][0].nome}</th>
                                  <th>
                                    {atribute["kit"][0] !== undefined
                                      ? atribute["kit"][0].nome
                                      : "Não Existe Kit"}
                                  </th>
                                  <th>
                                    <button
                                      className="btn btn-primary"
                                      type="button"
                                      onClick={(e) => {
                                        addMaterialToReturn(
                                          atribute["id"],
                                          atribute["nome_projeto"],
                                          atribute["material"][0].nome,
                                          atribute["quantidade"],
                                          atribute["data_requisicao"],
                                          atribute["user"][0].nome,
                                          atribute["kit"][0] !== undefined
                                            ? atribute["kit"][0].nome
                                            : "Não Existe Kit",
                                          atribute["quantidade"]
                                        );
                                      }}
                                    >
                                      Realizar Devolução
                                    </button>
                                  </th>
                                </tr>
                              ))
                            )
                      }
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <div className="form-floating mb-2">
                  <div className="row">
                    <label>Materiais/Kits para Devolver </label>
                  </div>
                  <div className="form-floating mb-2">
                    <table className="table table-bordered" border="1">
                      <tbody>
                        {typeSearch === "kit" ? (
                          <tr key="table head kit add">
                            <th>Kit</th>
                            <th>Material</th>
                            <th>Quantidade a Devolver</th>
                            <th>Data de Requisição</th>
                            <th>Docente</th>
                            <th>Remover</th>
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
                        {typeSearch === "kit"
                          ? requisicaoKitsList?.map((kit) => (
                              <tr key={kit.id}>
                                <th>{kit.kit}</th>
                                <th>{kit.nome}</th>
                                <th>
                                  <input
                                    className="form-control"
                                    type="number"
                                    onChange={(e) =>
                                      changeKitsQuantity(kit.id, e.target.value, kit.quantidade_total)
                                    }
                                    id=""
                                  />
                                </th>
                                <th>{kit.data_requisicao.substr(0, 10)}</th>
                                <th>{kit.docente}</th>
                                <th>
                                  <button
                                    className="btn btn-primary"
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
                                    className="form-control"
                                    type="number"
                                    onChange={(e) =>
                                      changeQuantity(
                                        item.id,
                                        e.target.value,
                                        item.quantidade_total
                                      )
                                    }
                                    id=""
                                  />
                                </th>
                                <th>{item.data_requisicao.substr(0, 10)}</th>
                                <th>{item.docente}</th>
                                <th>{item.kit}</th>
                                <th>
                                  <button
                                    className="btn btn-primary"
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
                    {wrongQuantity && (
                        <Alert id="alert" tipo={"insuccess"} props={"Quantidades Incorretas"} />
                    )}
                    {wrongQuantityFinal && (<Alert id="alert" tipo={"wrong_qty"} props={"Não foi Possível Efetuar a Requisição devido a Quantidades Incorretas"} />)}
                  </div>
                </div>
              </div>
              <div className="form-floating mb-2">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={
                    typeSearch === "kit" ? makeKitsReturn : makeMaterialsReturn
                  }
                >
                  Fazer Devolucao
                </button>
              </div>
              {alert && (
                  <Alert id="alert" tipo={"success"} props={"Requisição Realizada com Sucesso"} />
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
