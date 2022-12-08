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
  console.log(stocks);

  const exit = async () => {
    window.location.href = "/";
  };

  return (
    <div>
      <div>
        <h1>Current Stock: </h1>
        {stocks.map((item) => (
          <p key={item.id}>
            {item.nome} = {item.quantidade} = {item.observacao}
          </p>
        ))}
      </div>
      <button type="button" key="exitBtn" onClick={exit}>
        Exit
      </button>
    </div>
  );
};

export default StockPage;
