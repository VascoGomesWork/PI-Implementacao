import React, { useState, useEffect } from "react";

const ShowKitsPage = () => {
  const [kits, setKits] = useState([]);
  const [searchInput, setSearchInput] = useState([]);
  const [typeSearch, setTypeSearch] = useState("nome_kit");

  /*useEffect(() => {
    (async () => {
      try {
        const kits = await httpClient.get("//localhost:5000/getkits");
        setKits(kits.data.data_array);
      } catch (error) {
        console.log("Error getting kits");
      }
    })();
  }, []);*/

  // search bar
  useEffect(() => {
    fetch(
      `//localhost:5000/getkitsbyname?search=` +
        searchInput +
        "&search_type=" +
        typeSearch
    )
      .then((res) => res.json())
      .then((data) => {
        setKits(data.mat_list);
      });
  }, [searchInput, typeSearch]);

  const exit = async () => {
    window.location.href = "/";
  };

  return (
    <div>
      <div>
        <h1>Listar Kits de Materiais</h1>
        <div>
          <label>Pesquisa: </label>
          <input
            type="search"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
            id=""
          />

          <select
            onChange={(e) => {
              console.log(e.target.value);
              setTypeSearch(e.target.value);
            }}
            id=""
          >
            <option value="nome_kit">Nome Kit</option>
            <option value="nome_material">Nome Material</option>
          </select>
        </div>
        <br />
        <div>
          <table border="1" key={"table"}>
            <tbody>
              <tr key={"0"}>
                <th>Nome do Kit</th>
                <th>Material</th>
                <th>Quantidade</th>
                <th>Observações</th>
              </tr>
              {kits?.map((kit_item) => (
                <tr key={kit_item.id}>
                  <th>{kit_item.nome_kit}</th>
                  <th>
                    {kit_item.materiais?.map((item) => (
                      <p key={item.nome_material + kit_item.id}>{item.nome_material}</p>
                    ))}
                  </th>
                  <th>
                    {kit_item.materiais?.map((item) => (
                      <p key={item.quantidade + kit_item.id + item.nome_material}>{item.quantidade}</p>
                    ))}
                  </th>
                  <th>{kit_item.observacao}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <br />
      <button type="button" key="exitBtn" onClick={exit}>
        Sair
      </button>
    </div>
  );
};

export default ShowKitsPage;
