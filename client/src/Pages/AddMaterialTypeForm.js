import React, {useState} from "react";
import httpClient from "../httpClient";

export default function AddMaterialTypeForm(){
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
        <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">
                    <h1 className="mt-4">Adicionar Novo Tipo de Material</h1>
                    <div>
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
                </div>
            </main>
        </div>
    );
}