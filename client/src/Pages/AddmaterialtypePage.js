//import React, { useState, useEffect } from "react";
import React, { useState } from "react";
import httpClient from "../httpClient";

const AddmaterialtypePage = () => {
  const [tipo, setTipo] = useState([]);

  const addMaterialType = async (e) => {
    try {
      await httpClient.post("//localhost:5000/addmaterialtype", {
        tipo,
      });
      window.location.href = "/";
    } catch (e) {
      if (e.response.status === 401) {
        alert("Invalid Type Info");
      }
    }
  };

  return (
    <div>
      <h1>Adiocionar Novo Tipo de Material</h1>
      <form>
        <div>
          <label>Nome </label>
          <input
            type="text"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            id=""
          />
        </div>
        <button type="button" onClick={addMaterialType}>
          Adicionar
        </button>
      </form>
    </div>
  );
};

export default AddmaterialtypePage;
