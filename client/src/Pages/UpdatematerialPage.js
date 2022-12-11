import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";

const UpdatematerialPage = () => {
  const [stocks, setStocks] = useState([]);
  const [id, setId] = useState([]);
  const [quantidade, setQuantidade] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const stock = await httpClient.get("//localhost:5000/stock");
        setStocks(stock.data.stock);
      } catch (error) {
        console.log("Error getting stocks");
      }
    })();
  }, []);

  const updateStock = async (e) => {
    console.log("id: ", id);
    console.log("qty: ", quantidade);
    try {
      await httpClient.post("//localhost:5000/updatestock", {
        id,
        quantidade,
      });
      window.location.href = "/updatematerial";
    } catch (e) {
      if (e.response.status === 401) {
        alert("Invalid Material Info");
      }
    }
  };

  const exit = async () => {
    window.location.href = "/";
  };

  return (
    <div>
      <h1>Atualizar Stocks</h1>
      <div>
        <table border="1">
          <tbody>
            <tr>
              <th>Material</th>
              <th>Observação</th>
              <th>Data de Aquisição</th>
              <th>Quantidade</th>
              <th>Nova Quantidade</th>
              <th>Atualizar</th>
            </tr>
            {stocks.map((item) => (
              <tr key={item.id}>
                <th>{item.nome}</th>
                <th>{item.observacao}</th>
                <th>{item.data}</th>
                <th>{item.quantidade}</th>
                <th>
                  <input
                    type="number"
                    //value={quantidade}
                    onChange={(e) => {
                      setQuantidade(e.target.value);
                      setId(item.id);
                    }}
                    id=""
                  />
                </th>
                <th>
                  <button type="button" onClick={updateStock}>
                    Atualizar
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />
      <button type="button" key="exitBtn" onClick={exit}>
        Sair
      </button>
    </div>
  );
};

export default UpdatematerialPage;
