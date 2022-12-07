import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";

//Teste

const AddmaterialPage = () => {
  const [name, setName] = useState([]);
  const [quantity, setQuantity] = useState([]);

  const addTool = async (e) => {
    try {
      const response = await httpClient.post("//localhost:5000/addtool", {
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
      <h1>Add new tool</h1>
      <form>
        <div>
          <label>Name </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id=""
          />
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
        <button type="button" onClick={addTool}>
          Add
        </button>
      </form>
    </div>
  );
};

export default AddmaterialPage;
