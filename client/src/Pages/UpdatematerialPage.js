import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";

const UpdatematerialPage = () => {
  const [stocks, setStocks] = useState([]);
  const [id, setId] = useState([]);
  const [quantity, setQuantity] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        await httpClient.get("//localhost:5000/stock");
        setStocks(stocks.data.stock);
      } catch (error) {
        console.log("Error getting stocks");
      }
    })();
  }, []);

  const updateStock = async (e) => {
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
        <table>
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
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
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
        </table>
      </div>
      <button type="button" key="exitBtn" onClick={exit}>
        Exit
      </button>
    </div>
  );
};

export default UpdatematerialPage;
