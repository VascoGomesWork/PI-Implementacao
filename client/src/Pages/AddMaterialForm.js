import React, {useEffect, useState} from "react";
import httpClient from "../httpClient";

export default function AddMaterialForm(){
    const [nome, setNome] = useState([]);
    const [quantidade, setQuantidade] = useState([]);
    const [observacao, setObservacao] = useState([]);
    // FKs
    const [tipo_material, setTipo_material] = useState([]);
    const [projeto, setProjeto] = useState([]);
    // List of Projects and types of materials
    const [tipos, setTipos] = useState([]);
    const [projetos, setProjetos] = useState([]);

    const addMaterial = async (e) => {
        try {
            await httpClient.post("//localhost:5000/addmaterial", {
                nome,
                quantidade,
                observacao,
                tipo_material,
                projeto
            });
            window.location.href = "/";
        } catch (e) {
            if (e.response.status === 401) {
                alert("Invalid Material Info");
            }
        }
    };

    //get list of types of materials
    useEffect(() => {
        (async () => {
            try {
                const types = await httpClient.get("//localhost:5000/showtypesmaterials");
                // default choice
                setTipo_material(1)
                setTipos(types.data.types);
            } catch (error) {
                console.log("Error getting types of materials");
            }
        })();
    }, []);

    //get list of projects
    useEffect(() => {
        (async () => {
            try {
                const projects = await httpClient.get("//localhost:5000/showprojects");
                // default choice
                setProjeto("0")
                setProjetos(projects.data.projects);
            } catch (error) {
                console.log("Error getting projects");
            }
        })();
    }, []);

    return (
        <div>
            <h1>Adiconar novo material</h1>
            <form>
                <div>
                    <label>Nome do Material </label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        id=""
                    />
                </div>
                <div>
                    <label>Quantidade </label>
                    <input
                        type="number"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                        id=""
                    />
                </div>
                <div>
                    <label>Observações </label>
                    <input
                        type="text"
                        value={observacao}
                        onChange={(e) => setObservacao(e.target.value)}
                        id=""
                    />
                </div>
                <div>
                    <label>Tipo de Material </label>
                    <select onChange={(choice) => setTipo_material(choice.target.value)}>
                        {tipos.map((item) => (
                            <option key={item.id} value={item.id}>{item.tipo}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Associar a Projeto </label>
                    <select onChange={(choice) => setProjeto(choice.target.value)}>
                        <option key="0" value="0">Não associar</option>
                        {projetos.map((item) => (
                            <option key={item.id} value={item.id}>{item.nome}</option>
                        ))}
                    </select>
                </div>
                <button type="button" onClick={addMaterial}>
                    Adicionar Material
                </button>
            </form>
        </div>
    );
}