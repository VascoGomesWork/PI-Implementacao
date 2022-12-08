import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";

const StockPage = () => {
  const [stocks, setStocks] = useState([]);

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
  //console.log(stocks);
  const exit = async () => {
    window.location.href = "/";
  };

  return (
    <div>
      <div>
        <h1>Current Stock: </h1>
        <div>
          <table border="1">
            <tr>
              <th>Material</th>
              <th>Quantidade</th>
              <th>Observações</th>
              <th>Data de Aquisição</th>
            </tr>
            {stocks.map((item) => (
              <tr key={item.id}>
                <th>{item.nome}</th>
                <th>{item.quantidade}</th>
                <th>{item.observacao}</th>
                <th>{item.data}</th>
              </tr>
            ))}
          </table>
        </div>
      </div>
      <br />
      <button type="button" key="exitBtn" onClick={exit}>
        Exit
      </button>
    </div>
  );
};

export default StockPage;
