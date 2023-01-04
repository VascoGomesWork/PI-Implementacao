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
    // Date
    const [dataAquisicao, setDataAquisicao] = useState([]);

    const addMaterial = async (e) => {
        try {
            await httpClient.post("//localhost:5000/addmaterial", {
                nome,
                quantidade,
                observacao,
                tipo_material,
                projeto,
                dataAquisicao
            });
            window.location.href = "/addmaterial";
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
        <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">
                    <h1 className="mt-4">Adiconar Novo Material</h1>
                    <div>
                        <form>
                            <div className="form-floating mb-2">
                                <div className="row">
                                    <div className="col-md-2">
                                        <label>Nome do Material </label>
                                    </div>
                                    <div className="col-md-2">
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={nome}
                                            onChange={(e) => setNome(e.target.value)}
                                            id=""
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-floating mb-2">
                                <div className="row">
                                    <div className="col-md-2">
                                        <label>Quantidade </label>
                                    </div>
                                    <div className="col-md-2">
                                        <input
                                            className="form-control"
                                            type="number"
                                            value={quantidade}
                                            onChange={(e) => setQuantidade(e.target.value)}
                                            id=""
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-floating mb-2">
                                <div className="row">
                                    <div className="col-md-2">
                                        <label>Observações </label>
                                    </div>
                                    <div className="col-md-2">
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={observacao}
                                            onChange={(e) => setObservacao(e.target.value)}
                                            id=""
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-floating mb-2">
                                <div className="row">
                                    <div className="col-md-2">
                                        <label>Tipo de Material </label>
                                    </div>
                                    <div className="col-md-2">
                                        <select className="form-select" onChange={(choice) => setTipo_material(choice.target.value)}>
                                            {tipos.map((item) => (
                                                <option key={item.id} value={item.id}>{item.tipo}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-floating mb-2">
                                <div className="row">
                                    <div className="col-md-2">
                                        <label>Associar a Projeto </label>
                                    </div>
                                    <div className="col-md-2">
                                        <select className="form-select" onChange={(choice) => setProjeto(choice.target.value)}>
                                            <option key="0" value="0">Não associar</option>
                                            {projetos.map((item) => (
                                                <option key={item.id} value={item.id}>{item.nome}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-floating mb-2">
                            <div className="row">
                                <div className="col-md-2">
                                    <label>Data de Aquisição </label>
                                </div>
                                <div className="col-md-5">
                                    <input
                                        className='form-control'
                                        type="date"
                                        id="start"
                                        value={dataAquisicao}
                                        min="2009-01-01"
                                        max="2999-12-31"
                                        onChange={(e) => setDataAquisicao(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                            <button className="btn btn-primary" type="button" onClick={addMaterial}>
                                Adicionar Material
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}