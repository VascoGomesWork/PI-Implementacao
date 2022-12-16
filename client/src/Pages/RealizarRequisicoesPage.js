import React, { useEffect, useState } from "react";
import httpClient from "../httpClient";

export default function RealizarRequisicoesPage() {
  const [nome, setNome] = useState([]);
  const [projeto, setProjeto] = useState("true");
  const [nome_projeto, setNomeProjeto] = useState("");
  const [data_entrega_prevista, setDataEntregaPrevista] = useState([]);
  const [comboboxMaterialRequisicao, setComboboxMaterialRequisicao] = useState(
    []
  );
  const [searchInput, setSearchInput] = useState([]);
  const [searchResultList, setSearchResultList] = useState([]);
  const [requisicaoKitsList, setRequisicaoKitsList] = useState([]);
  const [requisicaoMaterialsList, setRequisicaoMaterialsList] = useState([]);
  const [typeSearch, setTypeSearch] = useState("0");
  //const [quantidadeKitRequisicao, setQuantidadeKitRequisicao] = useState([]);

  //Sets Default Value
  useEffect(() => {
    (async () => {
      console.log("render use effect...")
      try {
        //Vai buscar tipos de materiais e preenche a dropdown
        const types = await httpClient.get(
          `//localhost:5000/showtypesmaterials`
        );
        setComboboxMaterialRequisicao(types.data.types);
        //console.log("dropdown 1 => ", comboboxMaterialRequisicao)
        //Adds Kit to Combobox
        setComboboxMaterialRequisicao((prevData) => [
          ...prevData,
          { tipo: "Kit" },
        ]);
        //console.log("dropdown 2 => ", comboboxMaterialRequisicao)
        //setTypeSearch(comboboxMaterialRequisicao[0].id);
      } catch (e) {
        console.log("Error getting types of materials");
      }
    })();
  }, []);

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
      //console.log("search com valores =>", searchInput);
    } else if (searchInput.length <= 0) {
      //console.log("serach sem valores =>", searchInput);
      setSearchResultList([]);
    }
  }, [searchInput, typeSearch]);

  const addMaterialToRequisicao = async (id, nome, quantidade) => {
    setRequisicaoMaterialsList([
      ...requisicaoMaterialsList,
      {
        id: id,
        nome: nome,
        quantidade: quantidade,
      },
    ]);
  };

  const addkitToRequisicao = async (id, nome) => {
    console.log("ID = ", id);
    console.log("NOME = ", nome);
    setRequisicaoKitsList([
      ...requisicaoKitsList,
      {
        id: id,
        nome: nome,
      },
    ]);
    console.log("REQUISIÇAO DE KIT FEITA", JSON.stringify(requisicaoKitsList));
    console.log();
  };

  const changeKitsQuantity = async (id, quantity) => {
    requisicaoKitsList.forEach((element) => {
      if (element.id === id) {
        element.quantidade = quantity;
        console.log("element quantiaty => ", element);
      }
    });
  };

  const changeQuantity = async (id, quantity) => {
    requisicaoMaterialsList.forEach((element) => {
      if (element.id === id) {
        element.quantidade = quantity;
      }
    });
  };

  const changeProject = async (e) => {
    setProjeto(e.target.value);
    console.log("EVENT = " + projeto);
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

  const makeMaterialsRequisition = async (e) => {
    try {
      await httpClient.post("//localhost:5000/makerequest", {
        nome,
        nome_projeto,
        requisicaoMaterialsList: requisicaoMaterialsList,
        data_entrega_prevista,
      });
      window.location.href = "/";
    } catch (e) {
      if (e.response.status === 401) {
        alert("Invalid Type Info");
      }
    }
  };

  const makeKitsRequisition = async (e) => {
    //console.log("NOME = " + nome);
    //console.log("PROJETO = " + projeto);
    //console.log("NOME PROJETO = " + nome_projeto);
    console.log("Requisicao Kits List = " + JSON.stringify(requisicaoKitsList));
    //console.log("DATA ENTREGA PREVISTA = " + data_entrega_prevista);

    try {
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
    }
  };

  return (
    <div>
      <h1>Realizar Requisição de Material</h1>
      <form>
        <div>
          <label>Nome Docente ou Aluno </label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            id=""
          />
        </div>
        <div onChange={changeProject}>
          <label>Projeto </label>
          <input
            type="radio"
            name="project"
            value="false"
            checked={projeto === "false"}
            id=""
          />
          <label>Usar em Projeto</label>
          <input
            type="radio"
            name="project"
            value="true"
            checked={projeto === "true"}
            id=""
          />
          <label>Não Usar em Projeto</label>
        </div>
        {projeto === "false" ? (
          <div>
            <label>Nome Projeto </label>
            <input
              type="text"
              value={nome_projeto}
              onChange={(e) => setNomeProjeto(e.target.value)}
              id=""
            />
          </div>
        ) : (
          ""
        )}
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
            {comboboxMaterialRequisicao?.map((item) => (
              <option value={item.id}>{item.tipo}</option>
            ))}
          </select>
        </div>
        <br />
        <div>
          <label>Lista de Materiais </label>
          <table border="1">
            <tbody>
              {typeSearch === "Kit" ? (
                <tr>
                  <th>Kit</th>
                  <th>Material</th>
                  <th>Quantidade Total</th>
                  <th>Adicionar</th>
                </tr>
              ) : (
                <tr>
                  <th>Material</th>
                  <th>Quantidade Total</th>
                  <th>Adicionar</th>
                </tr>
              )}
              {typeSearch === "Kit"
                ? searchResultList?.map((kit) =>
                    kit.mat_list?.map((material) => (
                      <tr>
                        <th>{kit.kit_name}</th>
                        <th>{material.mat_info[0].nome}</th>

                        <th>{material.mat_quantidade_kit}</th>
                        <th>
                          <button
                            type="button"
                            onClick={(e) => {
                              addkitToRequisicao(kit.kit_id, kit.kit_name);
                            }}
                          >
                            Adicionar
                          </button>
                        </th>
                      </tr>
                    ))
                  )
                : searchResultList?.map((item) => (
                    <tr key={item.id}>
                      <th>{item.nome}</th>
                      <th>{item.quantidade}</th>
                      <th>
                        <button
                          type="button"
                          onClick={(e) => {
                            addMaterialToRequisicao(
                              item.id,
                              item.nome,
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
        <br />
        <div>
          <label>Materiais/Kits para Requisitar </label>
          <table border="1">
            <tbody>
              {typeSearch === "Kit" ? (
                <tr>
                  <th>Kit</th>
                  <th>Quantidade Total</th>
                  <th>Adicionar</th>
                </tr>
              ) : (
                <tr>
                  <th>Material</th>
                  <th>Quantidade Total</th>
                  <th>Adicionar</th>
                </tr>
              )}
              {typeSearch === "Kit"
                ? requisicaoKitsList?.map((kit) => (
                    <tr>
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
        <br />
        <div>
          <label>Data Entrega Prevista </label>
          <input
            type="date"
            id="start"
            value={data_entrega_prevista}
            min="2009-01-01"
            max="2999-12-31"
            onChange={(e) => setDataEntregaPrevista(e.target.value)}
          />
        </div>
        <br />
        <button
          type="button"
          onClick={
            typeSearch === "Kit"
              ? makeKitsRequisition
              : makeMaterialsRequisition
          }
        >
          Fazer Requisição
        </button>
      </form>
    </div>
  );
}
