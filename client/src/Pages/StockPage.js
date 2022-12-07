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

  const addTool = async () => {
    window.location.href = "/addtool";
  };

  const removeTool = async () => {
    window.location.href = "/removetool";
  };

  const exit = async () => {
    window.location.href = "/";
  };

  return (
    <div>
      <div>
        <h1>Current Stock: </h1>
        {stocks.map((item) => (
          <p key={item.id}>
            {item.name} = {item.quantity}
          </p>
        ))}
      </div>
      <button type="button" key="addBtn" onClick={addTool}>
        Add tool
      </button>
      <button type="button" key="removeBtn" onClick={removeTool}>
        Update tool
      </button>
      <button type="button" key="exitBtn" onClick={exit}>
        Exit
      </button>
    </div>
  );
};

export default StockPage;
