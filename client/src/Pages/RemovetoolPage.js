import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";

const RemovetoolPage = () => {
  const [name, setName] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const stock = await httpClient.get("//localhost:5000/stock");
        setOptions(stock.data.stock);
      } catch (error) {
        console.log("Error getting stocks");
      }
    })();
  }, []);

  const removeTool = async (e) => {
    console.log("TOOL NNAME => ", name);
    try {
      const response = await httpClient.post("//localhost:5000/removetool", {
        name,
        quantity,
      });
      window.location.href = "/stock";
    } catch (e) {
      if (e.response.status == 401) {
        alert("Invalid Tool Info");
      }
    }
  };

  return (
    <div>
      <h1>Update Stock</h1>
      <form>
        <div>
          <label>Name </label>
          <select onChange={(choice) => setName(choice.target.value)}>
            {options.map((item) => (
              <option key={item.id} value={item.name}>{item.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Quantity </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            id=""
          />
        </div>
        <button type="button" onClick={removeTool}>
          Update
        </button>
      </form>
    </div>
  );
};

export default RemovetoolPage;
