import React, { useEffect, useState } from "react";
import httpClient from "../httpClient";
import Alert from "./Alert";

export default function RealizarRequisicoesForm() {
  const [nome, setNome] = useState([]);
  const [projeto, setProjeto] = useState("true");
  const [nome_projeto, setNomeProjeto] = useState("");
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
    if (searchInput.length > 0) {
      fetch(
        `//localhost:5000/showmaterialsbynamebytype?search=` +
          searchInput +
          "&search_type=" +
          typeSearch
      )
        .then((res) => res.json())
        .then((data) => {
          setSearchResultList(data.list_kit_mateirals);
        });
    } else if (searchInput.length <= 0) {
      setSearchResultList([]);
    }
  }, [searchInput, typeSearch]);

  const addMaterialToRequisicao = async (
    id,
    nome,
    quantidade,
    quantidade_total
  ) => {
    const found = requisicaoMaterialsList.some(
      (material) => material.id === id
    );
    if (!found) {
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

  const addkitToRequisicao = async (id, nome, quantidadeTotal, listaMateriais) => {
    console.log(listaMateriais)
    const found = requisicaoKitsList.some((kit) => kit.id === id);
    if (!found) {
      setRequisicaoKitsList([
        ...requisicaoKitsList,
        {
          id: id,
          nome: nome,
          quantidadeTotal: quantidadeTotal,
          listaMateriais: listaMateriais
        },
      ]);
    }
  };

  const changeKitsQuantity = async (id, quantity, listaQuantidade) => {

    console.log(listaQuantidade)
    let quantidade_total = 0
    let quantidadeKit = 0
    listaQuantidade.map((material) => {
      material.mat_info.map((specific) => {
        console.log("QUANTIDADE TOTAL = " + specific.quantidade);
        quantidade_total=specific.quantidade
      })
      console.log("KIT = " + material.mat_quantidade_kit);
      quantidadeKit = material.mat_quantidade_kit
    })
    console.log(quantity)
    if ((quantity * quantidadeKit) > quantidade_total || quantity < 0) {
      setWrongQuantity(true);
    } else {
      setWrongQuantity(false);
    }

    requisicaoKitsList.forEach((element) => {
      if (element.id === id) {
        element.quantidade = quantity;
        //console.log("element quantiaty => ", element);
      }
    });
  };

  const changeQuantity = async (id, quantity, quantidade_total) => {
    // Verifies the quantity
    if (quantity > quantidade_total || quantity < 0) {
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

  const changeProject = async (e) => {
    setProjeto(e.target.value);
    //console.log("EVENT = " + projeto);
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

  const makeMaterialsRequisition = async (e) => {

    if (wrongQuantity === true) {
      // show error message
      console.log("quanitades incorretas, n fez commit na db")
      //TODO SHOW ERROR MSG
      setWrongQuantity(false)
      setWrongQuantityFinal(true)
      setTimeout(() => { setWrongQuantityFinal(false)}, 3000)

    } else {
      let project = associatedProject;
      try {
        //Gets the default project name
        if (associatedProject === 1) {
          project = listOfProjects[0].nome;
        }
        await httpClient.post("//localhost:5000/makerequest", {
          nome,
          project,
          requisicaoMaterialsList: requisicaoMaterialsList,
          data_entrega_prevista,
        });
        setTimeout(() => {
          setAlert((prevState) => !prevState);
        }, 3000);
        //Sets Variables to their initial state
        resetState();
        //Changes the state of the alert
        setAlert((prevState) => !prevState);

        //window.location.href = "/realizarrequisicoes";
      } catch (e) {
        if (e.response.status === 401) {
          alert("Invalid Type Info");
        }
      }
    }
  };

  const makeKitsRequisition = async (e) => {
    let permit = true
    console.log("KIT LIST = " + JSON.stringify(requisicaoKitsList))
    requisicaoKitsList.map((kitList) =>{
      console.log("KIT LIST = " + typeof kitList.quantidade)
      if(typeof (kitList.quantidade) === "undefined"){
        console.log("ENTROU")
        //setWrongQuantityFinal(true)
        permit = false
      }
    })
    if (wrongQuantity === true || permit === false) {
      // show error message
      console.log("quanitades incorretas, n fez commit na db")
      //TODO SHOW ERROR MSG
      setWrongQuantity(false)
      setWrongQuantityFinal(true)
      setTimeout(() => { setWrongQuantityFinal(false)}, 3000)

    } else {
      let project = associatedProject;
      try {
        //Gets the default project name
        if (associatedProject === 1) {
          project = listOfProjects[0].nome;
        }
        await httpClient.post("//localhost:5000/makekitsrequest", {
          nome,
          project,
          requisicaoKitsList,
          data_entrega_prevista,
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
          <h1 className="mt-4">Realizar Requisição de Material</h1>
          <div>
            <form>
              <div>
                <div className="form-floating mb-2">
                  <div className="row">
                    <div className="col-md-2">
                      <label>Nome Docente ou Aluno </label>
                    </div>
                    <div className="col-md-7">
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
                    <div className="col-md-2">
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
                    <div className="col-md-2">
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
                    <div className="col-md-2">
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
                  <div className="col-md-2">
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
                                      changeKitsQuantity(kit.id, e.target.value, kit.listaMateriais)
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
                        <Alert id="alert" tipo={"insuccess"} props={"Quantidades Incorretas"} />
                    )}
                    {wrongQuantityFinal && (<Alert id="alert" tipo={"wrong_qty"} props={"Não foi Possível Efetuar a Requisição devido a Quantidades Incorretas"} />)}
                  </div>
                </div>
              </div>
              <div className="form-floating mb-2">
                <div className="row">
                  <div className="col-md-2">
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
                <Alert id="alert" tipo={"success"} props={"Requisição Realizada com Sucesso"} />
              )}


            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
