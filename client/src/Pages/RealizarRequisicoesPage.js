import React, { useEffect, useState } from "react";
import httpClient from "../httpClient";
//import httpClient from "../httpClient";

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
  const [requisicaoMaterialsList, setRequisicaoMaterialsList] = useState([]);
  const [typeSearch, setTypeSearch] = useState([]);

  //Sets Default Value
  useEffect(() => {
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
        setComboboxMaterialRequisicao(types.data.types);
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
  }, []);

  const searchMaterials = async () => {
    //console.log("TYPE MATERIAL = " + JSON.stringify(typeSearch) + " | " + comboboxMaterialRequisicao[0].id)

    if (typeSearch.length === 0) {
      setTypeSearch(comboboxMaterialRequisicao[0].id);
    }
    console.log("TYPE MATERIAL = " + typeSearch);

    // if the search is by kit
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
      //console.log("SEARCH RESULT => ", searchResultList);
      console.log("SEARCH RESULT => ", JSON.stringify(searchResultList));
    }
  };

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

  const addkitToRequisicao = async (id) => {
    console.log("REQUISIÇAO DE KIT FEITA");
  };

  const changeQuantity = async (id, quantity) => {
    console.log("ID => ", id, "QUANITY =>", quantity);

    requisicaoMaterialsList.forEach((element) => {
      if (element.id === id) {
        element.quantidade = quantity;
      }
    });
    console.log("CHANGING AMOUNTS => ", requisicaoMaterialsList);
  };

  const changeProject = async (e) => {
    setProjeto(e.target.value);
    console.log("EVENT = " + projeto);
  };

  const removeMaterial = async (id, nome, quantidade) => {
    requisicaoMaterialsList.forEach((element) => {
      if (element.id === id) {
        console.log("ELEMENT ID = " + element.id);
        console.log(
          "REMOVE ID = " +
            id +
            " NOME = " +
            nome +
            " QUANTIDADE = " +
            quantidade
        );
        //How to remove elements from array in javascript -> https://sentry.io/answers/remove-specific-item-from-array/
        requisicaoMaterialsList.splice(
          requisicaoMaterialsList.indexOf(element),
          1
        );
      }
    });
    console.log("CHANGING KIT LIST => ", requisicaoMaterialsList);
    setRequisicaoMaterialsList(requisicaoMaterialsList);
    //Temporary Fix
    setSearchInput("");
  };

  const makeRequisition = async (e) => {
    console.log("NOME = " + nome);
    console.log("PROJETO = " + projeto);
    console.log("NOME PROJETO = " + nome_projeto);
    console.log(
      "Requisicao Material List = " + JSON.stringify(requisicaoMaterialsList)
    );
    console.log("DATA ENTREGA PREVISTA = " + data_entrega_prevista);
    try {
      await httpClient.post("//localhost:5000/makerequest", {
        nome,
        nome_projeto,
        requisicaoMaterialsList,
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
                              addkitToRequisicao(kit.kit_id);
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
              <tr>
                <th>Material/Kit</th>
                <th>Quantidade no Kit</th>
                <th>Adicionar</th>
              </tr>
              {requisicaoMaterialsList?.map((item) => (
                <tr key={item.id}>
                  <th>{item.nome}</th>
                  <th>
                    <input
                      type="number"
                      onChange={(e) => changeQuantity(item.id, e.target.value)}
                      id=""
                    />
                  </th>
                  <th>
                    <button
                      type="button"
                      onClick={(e) => {
                        removeMaterial(item.id, item.nome, item.quantidade);
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
        <button type="button" onClick={makeRequisition}>
          Fazer Requisição
        </button>
      </form>
    </div>
  );
}
