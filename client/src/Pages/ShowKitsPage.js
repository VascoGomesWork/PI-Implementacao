import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";

const ShowKitsPage = () => {
  const [kits, setKits] = useState([]);
  const [nomeKits, setNomeKits] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const kits = await httpClient.get("//localhost:5000/getkits");
        setKits(kits.data.kits);
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
            {kits.map((item) => (
              <tr key={item.id}>
                {nomeKits.map((x) =>(
                  x.id === item.id_kit_material ? <th>{x.nome}</th> : null
                ))}
                <th>{item.nome}</th>
                <th>{item.quantidade}</th>
                <th>{item.observacao}</th>
              </tr>
            ))}
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
