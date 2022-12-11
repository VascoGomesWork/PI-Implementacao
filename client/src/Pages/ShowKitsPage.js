import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";

const ShowKitsPage = () => {
  const [kits, setKits] = useState([]);
  const [nomeKits, setNomeKits] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const kits = await httpClient.get("//localhost:5000/getkits");
        //console.log("Data Array = " + JSON.stringify(data_array))
        setKits(kits.data.data_array);
      } catch (error) {
        console.log("Error getting kits");
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const nomeKits = await httpClient.get("//localhost:5000/getkitsnames");
        setNomeKits(nomeKits.data.kits_names);
      } catch (error) {
        console.log("Error getting kits names");
      }
    })();
  }, []);

  const exit = async () => {
    window.location.href = "/";
  };

  return (
    <div>
      <div>
        <h1>Listar Kits de Materiais </h1>
        <div>
          <table border="1">
            <tr key="0">
              <th>Nome do Kit</th>
              <th>Material</th>
              <th>Quantidade</th>
              <th>Observações</th>
            </tr>
            {kits.map((kit_item) => (
                <tr key={kit_item.id}>
                  <th>{kit_item.nome_kit_material}</th>
                  <th>{kit_item.nome_material}</th>
                  <th>{kit_item.quantidade}</th>
                  <th>{kit_item.observacoes}</th>
                </tr>
            ))}
            {console.log("DATA ARRAY = " + JSON.stringify(kits))}
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
