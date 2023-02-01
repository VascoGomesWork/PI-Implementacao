import React, { useEffect, useState } from "react";
import httpClient from "../httpClient";
import Alert from "./Alert";

export default function RealizarRequisicoesForm() {
  const [nome, setNome] = useState([]);
  const [projeto, setProjeto] = useState("true");
  //const [nome_projeto, setNomeProjeto] = useState("");
  const [data_entrega_prevista, setDataEntregaPrevista] = useState(0);
  const [comboboxMaterialRequisicao, setComboboxMaterialRequisicao] = useState(
    []
  );
  const [searchInput, setSearchInput] = useState([]);
  const [searchResultList, setSearchResultList] = useState([]);
  const [requisicaoKitsList, setRequisicaoKitsList] = useState([]);
  const [requisicaoMaterialsList, setRequisicaoMaterialsList] = useState([]);
  const [typeSearch, setTypeSearch] = useState(1);
  // list of projects from database
  const [listOfProjects, setListOfProjects] = useState([]);
  const [associatedProject, setAssociatedProject] = useState(1);
  const [alert, setAlert] = useState(false);
  const [wrongQuantity, setWrongQuantity] = useState(false);
  const [wrongQuantityFinal, setWrongQuantityFinal] = useState(false);
  const [wrongName, setWrongName] = useState(false);

  //Sets Default Value
  useEffect(() => {
    (async () => {
      try {
        //gets all types of materials to fill dropwdown box
        const types = await httpClient.get(
          `//localhost:5000/showtypesmaterials`
        );
        setComboboxMaterialRequisicao(types.data.types);
        //Adds Kit to Combobox
        setComboboxMaterialRequisicao((prevData) => [
          ...prevData,
          { tipo: "Kit" },
        ]);

        // gets all projects to fill drop down bos
        const projects = await httpClient.get(`//localhost:5000/showprojects`);
        setListOfProjects(projects.data.projects);
        //console.log("LISTA DE PROJETOS => ", projects);
      } catch (e) {
        console.log("Error getting types of materials");
      }
    })();
  }, []);

  // search bar
  useEffect(() => {
    //checks if search bar has data
    if (searchInput.length > 0) {
      //gets data from the API
      fetch(
        `//localhost:5000/showmaterialsbynamebytype?search=` +
          searchInput +
          "&search_type=" +
          typeSearch
      )
        .then((res) => res.json())
        .then((data) => {
          //sets searchResultList with data that came from the API
          setSearchResultList(data.list_kit_mateirals);
        });
    } else if (searchInput.length <= 0) {
      setSearchResultList([]);
    }
  }, [searchInput, typeSearch]);

  /**
   * @Resume: Function that Adds Materials to Requisicao List
   * @param id
   * @param nome
   * @param quantidade
   * @param quantidade_total
   * @returns {Promise<void>}
   */
  const addMaterialToRequisicao = async (
    id,
    nome,
    quantidade,
    quantidade_total
  ) => {
    //checks if material id exists in requisicaoMaterialList -> https://www.w3schools.com/jsref/jsref_some.asp
    const found = requisicaoMaterialsList.some(
      (material) => material.id === id
    );
    if (!found) {
      //setRequisicaoMaterialList with the previous value and adds an object with some atributes
      setRequisicaoMaterialsList([
        ...requisicaoMaterialsList,
        {
          id: id,
          nome: nome,
          quantidade: quantidade,
          quantidade_total: quantidade_total,
        },
      ]);
    }
  };

  /**
   * @Resume: Function that Adds Kits to Requisicao List
   * @param id
   * @param nome
   * @param quantidadeTotal
   * @param listaMateriais
   * @returns {Promise<void>}
   */
  const addkitToRequisicao = async (
    id,
    nome,
    quantidadeTotal,
    listaMateriais
  ) => {
    console.log(listaMateriais);
    //checks if kit id exists in requisicaoKitList -> https://www.w3schools.com/jsref/jsref_some.asp
    const found = requisicaoKitsList.some((kit) => kit.id === id);
    if (!found) {
      //setRequisicaoKitsList with the previous value and adds an object with some atributes
      setRequisicaoKitsList([
        ...requisicaoKitsList,
        {
          id: id,
          nome: nome,
          quantidadeTotal: quantidadeTotal,
          listaMateriais: listaMateriais,
        },
      ]);
    }
  };

  /**
   * @Resume: Function that Changes Kits Quantity
   * @param id
   * @param quantity
   * @param listaQuantidade
   * @returns {Promise<void>}
   */
  const changeKitsQuantity = async (id, quantity, listaQuantidade) => {
    let quantidade_total = 0;
    let quantidadeKit = 0;

    //loops through listQuantidade
    listaQuantidade.map((material) => {
      material.mat_info.map((specific) => {
        quantidade_total = specific.quantidade;
      });
      quantidadeKit = material.mat_quantidade_kit;
    });

    //multiplies quantity by quantidadeKit and checks if it greater than quantidade_total or if quantity is less than 0
    if (quantity * quantidadeKit > quantidade_total || quantity < 0) {
      setWrongQuantity(true);
    } else {
      setWrongQuantity(false);
    }

    requisicaoKitsList.map((element) => {
      if (element.id === id) {
        element.quantidade = quantity;
        //console.log("element quantiaty => ", element);
      }
    });
  };

  /**
   * @Resume: Function that Changes Materials Quantity
   * @param id
   * @param quantity
   * @param quantidade_total
   * @returns {Promise<void>}
   */
  const changeQuantity = async (id, quantity, quantidade_total) => {
    // Verifies the quantity
    if (quantity > quantidade_total || quantity < 0) {
      setWrongQuantity(true);
    } else {
      setWrongQuantity(false);
    }
    requisicaoMaterialsList.map((element) => {
      if (element.id === id) {
        element.quantidade = quantity;
      }
    });
  };

  /**
   * @Resume: Function that Changes Project from Combobox
   * @param e
   * @returns {Promise<void>}
   */
  const changeProject = async (e) => {
    setProjeto(e.target.value);
    //console.log("EVENT = " + projeto);
  };

  /**
   * @Resume: Function that Removes Kit from List
   * @param id
   * @returns {Promise<void>}
   */
  const removeKitsList = async (id) => {
    setRequisicaoKitsList((requisicaoKitList) =>
      requisicaoKitList.filter((element) => element.id !== id)
    );
  };

  /**
   * @Resume: Function that Removes Material from List
   * @param id
   * @returns {Promise<void>}
   */
  const removeMaterialsList = async (id) => {
    setRequisicaoMaterialsList((requisicaoMaterialsList) =>
      requisicaoMaterialsList.filter((element) => element.id !== id)
    );
  };

  /**
   * @Resume: Function that Resets All States
   */
  function resetState() {
    setNome([]);
    setProjeto(true);
    setDataEntregaPrevista(0);
    setSearchInput([]);
    setSearchResultList([]);
    setRequisicaoKitsList([]);
    setRequisicaoMaterialsList([]);
    setTypeSearch(1);
    setAssociatedProject(1);
    setAlert(false);
  }

  /**
   * @Resume: Function that Makes Materials Requisition
   * @param e
   * @returns {Promise<void>}
   */
  const makeMaterialsRequisition = async (e) => {
    //boolean variable to permit the requesition to happend
    let permit = true;
    //loops throught requisicaoMaterialList
    requisicaoMaterialsList.map((materialsList) => {
      //checks if quantidade is equal to quantidade_total meaning that the quantidade filed has been left empty
      if (materialsList.quantidade === materialsList.quantidade_total) {
        permit = false;
      }
    });
    //if a wrong quantity is input like above the value or a negative number ou the permit is false throws an alert
    if (wrongQuantity === true || permit === false) {
      // show error message
      console.log("quanitades incorretas, n fez commit na db");
      //TODO SHOW ERROR MSG
      //changes wrongQuantity state to false and to true the wrongQuantityFinal
      setWrongQuantity(false);
      setWrongQuantityFinal(true);
      //unsets the timeout to 3 seconds and changes wrongQuantityFinal state to false to make alert disappear
      setTimeout(() => {
        setWrongQuantityFinal(false);
      }, 3000);
    }
    //checks if name input has data or if the requisicaoMaterialsList is empty
    else if (nome.length <= 0 || requisicaoMaterialsList.length === 0) {
      //if it puts wrongName state to true and activates the alert for 3 seconds
      setWrongName(true);
      //deactivates the alert after 3 seconds
      setTimeout(() => {
        setWrongName(false);
      }, 3000);
    } else {
      let project = associatedProject;
      try {
        //Gets the default project name
        if (associatedProject === 1) {
          project = listOfProjects[0].nome;
        }
        //sends data to API
        await httpClient.post("//localhost:5000/makerequest", {
          nome,
          project,
          requisicaoMaterialsList: requisicaoMaterialsList,
          data_entrega_prevista,
        });
        //sets alert to change state after 3 seconds
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

  /**
   * @Resume: Function that Makes Kit Requesition
   * @param e
   * @returns {Promise<void>}
   */
  const makeKitsRequisition = async (e) => {
    //boolean variable to permit the requesition to happend
    let permit = true;
    //loops throught requisicaokitsList
    requisicaoKitsList.map((kitList) => {
      //checks if typeof quantidade is undefined therefore being empty and possibly throwing an error
      if (typeof kitList.quantidade === "undefined") {
        permit = false;
      }
    });
    //checks if a wrong quantity is input like above the value or a negative number ou the permit is false throws an alert
    if (wrongQuantity === true || permit === false) {
      // show error message
      console.log("quanitades incorretas, n fez commit na db");
      //TODO SHOW ERROR MSG
      //changes wrongQuantity state to false and to true the wrongQuantityFinal
      setWrongQuantity(false);
      setWrongQuantityFinal(true);
      //unsets the timeout to 3 seconds and changes wrongQuantityFinal state to false to make alert disappear
      setTimeout(() => {
        setWrongQuantityFinal(false);
      }, 3000);
    }
    //checks if name input has data or if the requisicaoKitsList is empty
    else if (nome.length <= 0 || requisicaoKitsList.length === 0) {
      //if it puts wrongName state to true and activates the alert for 3 seconds
      setWrongName(true);
      //deactivates the alert after 3 seconds
      setTimeout(() => {
        setWrongName(false);
      }, 3000);
    } else {
      let project = associatedProject;
      try {
        //Gets the default project name
        if (associatedProject === 1) {
          project = listOfProjects[0].nome;
        }
        //sends data to API
        await httpClient.post("//localhost:5000/makekitsrequest", {
          nome,
          project,
          requisicaoKitsList,
          data_entrega_prevista,
        });
        //sets alert to change state after 3 seconds
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
          <h1 className="mt-4">Requisição de Material</h1>
          <div>
            <form>
              <div>
                <div className="form-floating mb-2">
                  <div className="row">
                    <div className="card-body">
                      <h6>Para realizar uma requisição efetue uma pesquisa pelo tipo de material que deseja requisitar e pesquise pelo nome do mesmo na caixa de pesquisa. Preencha todos os campos</h6>
                    </div>
                    <div className="col-md-3">
                      <label>Nome Docente ou Aluno </label>
                    </div>
                    <div className="col-md-9">
                      <input
                        className="form-control"
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        id="teste"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div onChange={changeProject}>
                <div className="form-floating mb-2">
                  <div className="row">
                    <div className="col-md-3">
                      <label>Projeto </label>
                    </div>
                    <div className="col-md-2">
                      <input
                        type="radio"
                        name="project"
                        value="false"
                        checked={projeto === "false"}
                        id=""
                        key="radio false"
                        onChange={changeProject}
                      />
                      <label>Usar em Projeto</label>
                    </div>
                    <div className="col-md-3">
                      <input
                        type="radio"
                        name="project"
                        value="true"
                        checked={projeto === "true"}
                        id=""
                        key="radio true"
                        onChange={changeProject}
                      />
                      <label>Não Usar em Projeto</label>
                    </div>
                  </div>
                </div>
              </div>
              {projeto === "false" ? (
                <div className="form-floating mb-2">
                  <div className="row">
                    <div className="col-md-3">
                      <label>Nome Projeto </label>
                    </div>
                    <div className="col-md-7">
                      <select
                        className="form-select"
                        onChange={(e) => {
                          //console.log(e.target.value);
                          setAssociatedProject(e.target.value);
                        }}
                        id=""
                      >
                        {listOfProjects?.map((item) => (
                          <option key={item.nome} value={item.nome}>
                            {item.nome}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="form-floating mb-2">
                <div className="row">
                  <div className="col-md-3">
                    <label>Pesquisa: </label>
                  </div>
                  <div className="col-md-4">
                    <input
                      className="form-control"
                      type="search"
                      value={searchInput}
                      onChange={(e) => {
                        setSearchInput(e.target.value);
                      }}
                      id=""
                    />
                  </div>
                  <div className="col-md-4">
                    <select
                      className="form-select"
                      onChange={(e) => {
                        //console.log(e.target.value);
                        setTypeSearch(e.target.value);
                      }}
                      id=""
                    >
                      {comboboxMaterialRequisicao?.map((item) => (
                        <option key={item.tipo} value={item.id}>
                          {item.tipo}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-floating mb-2">
                <div className="row">
                  <div className="col-md-5">
                    <label>Lista de Materiais </label>
                    <table className="table table-bordered" border="1">
                      <tbody>
                        {typeSearch === "Kit" ? (
                          <tr key="table head kit">
                            <th>Kit</th>
                            <th>Material</th>
                            <th>Quantidade Total Existente em Kit</th>
                            <th>Adicionar</th>
                          </tr>
                        ) : (
                          <tr key="table head material">
                            <th>Material</th>
                            <th>Quantidade Total</th>
                            <th>Adicionar</th>
                          </tr>
                        )}
                        {typeSearch === "Kit"
                          ? searchResultList?.map((kit) => (
                              <tr key={kit.id}>
                                <th>{kit.kit_name}</th>
                                <th>
                                  {kit.mat_list?.map((material) => (
                                    <p key={material.mat_info[0].id}>
                                      {material.mat_info[0].nome}
                                    </p>
                                  ))}
                                </th>
                                <th>
                                  {kit.mat_list?.map((material) => (
                                    <p key={material.mat_info[0].nome}>
                                      {material.mat_quantidade_kit}
                                    </p>
                                  ))}
                                </th>
                                <th>
                                  <button
                                    className="btn btn-primary"
                                    type="button"
                                    onClick={(e) => {
                                      addkitToRequisicao(
                                        kit.kit_id,
                                        kit.kit_name,
                                        kit.mat_quantidade_kit,
                                        kit.mat_list
                                      );
                                    }}
                                  >
                                    Adicionar Kit
                                  </button>
                                </th>
                              </tr>
                            ))
                          : searchResultList?.map((item) => (
                              <tr key={item.id}>
                                <th>{item.nome}</th>
                                <th>{item.quantidade}</th>
                                <th>
                                  <button
                                    className="btn btn-primary"
                                    type="button"
                                    onClick={(e) => {
                                      addMaterialToRequisicao(
                                        item.id,
                                        item.nome,
                                        item.quantidade,
                                        item.quantidade
                                      );
                                    }}
                                  >
                                    Adicionar
                                  </button>
                                </th>
                              </tr>
                            ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="col-md-7">
                    <label>Materiais/Kits para Requisitar </label>
                    <table className="table table-bordered" border="1">
                      <tbody>
                        {typeSearch === "Kit" ? (
                          <tr key="table head kit add">
                            <th>Kit</th>
                            <th>Quantidade Kits Total</th>
                            <th>Adicionar</th>
                          </tr>
                        ) : (
                          <tr key="table head material add">
                            <th>Material</th>
                            <th>Quantidade Material Total</th>
                            <th>Adicionar</th>
                          </tr>
                        )}
                        {typeSearch === "Kit"
                          ? requisicaoKitsList?.map((kit) => (
                              <tr key={kit.id}>
                                <th>{kit.nome}</th>
                                <th>
                                  <input
                                    className="form-control"
                                    type="number"
                                    onChange={(e) =>
                                      changeKitsQuantity(
                                        kit.id,
                                        e.target.value,
                                        kit.listaMateriais
                                      )
                                    }
                                  />
                                </th>

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
                      <Alert
                        id="alert"
                        tipo={"insuccess"}
                        props={"Quantidades Incorretas"}
                      />
                    )}
                    {wrongQuantityFinal && (
                      <Alert
                        id="alert"
                        tipo={"wrong_qty"}
                        props={
                          "Não foi Possível Efetuar a Requisição devido a Quantidades Incorretas"
                        }
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="form-floating mb-2">
                <div className="row">
                  <div className="col-md-3">
                    <label>Data Entrega Prevista </label>
                  </div>
                  <div className="col-md-5">
                    <input
                      className="form-control"
                      type="date"
                      id="start"
                      value={data_entrega_prevista}
                      min="2009-01-01"
                      max="2999-12-31"
                      onChange={(e) => setDataEntregaPrevista(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <br />
              <button
                className="btn btn-primary"
                type="button"
                onClick={
                  typeSearch === "Kit"
                    ? makeKitsRequisition
                    : makeMaterialsRequisition
                }
              >
                Fazer Requisição
              </button>
              {alert && (
                <Alert
                  id="alert"
                  tipo={"success"}
                  props={"Requisição Realizada com Sucesso"}
                />
              )}
              {wrongName && (
                <Alert
                  id="alert"
                  tipo={"danger"}
                  props={"Por favor inserir Nome"}
                />
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
