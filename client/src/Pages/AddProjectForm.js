import React, {useState} from "react";
import httpClient from "../httpClient";

export default function AddProjectForm(){
    const [nome, setNome] = useState([]);
    const [observacoes, setObservacoes] = useState([]);
    const [data_inicio, setDataInicio] = useState([]);
    const [data_fim, setDataFim] = useState([]);

    const addProject = async (e) => {
        try {
            await httpClient.post("//localhost:5000/addproject", {
                nome,
                observacoes,
                data_inicio,
                data_fim,
            });
            window.location.href = "/addproject";
        } catch (e) {
            if (e.response.status === 401) {
                alert("Invalid Project Info");
            }
        }
    };

    return (
        <div id="layoutSidenav_content">
        <div  className="container-fluid px-4">
            <h1>Adicionar novo projeto</h1>
            <form>
                <div className="form-floating mb-2">
                    <div className="row">
                        <div className="col-md-3">
                            <label>Nome </label>
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
                        <div className="col-md-3">
                            <label>Observações </label>
                        </div>
                        <div className="col-md-2">
                            <input
                                className="form-control"
                                type="text"
                                value={observacoes}
                                onChange={(e) => setObservacoes(e.target.value)}
                                id=""
                            />
                        </div>
                    </div>
                </div>
                <div className="form-floating mb-2">
                    <div className="row">
                        <div className="col-md-3">
                            <label>Data Inicio </label>
                        </div>
                        <div className="col-md-2">
                            <input
                                className="form-control"
                                type="date"
                                id="start"
                                name="trip-start"
                                value={data_inicio}
                                min="2009-01-01"
                                max="2999-12-31"
                                onChange={(e) => setDataInicio(e.target.value)}
                            ></input>
                        </div>
                    </div>
                </div>
                <div className="form-floating mb-2">
                    <div className="row">
                        <div className="col-md-3">
                            <label>Data Fim </label>
                        </div>
                        <div className="col-md-2">
                            <input
                                className="form-control"
                                type="date"
                                id="end"
                                name="trip-start"
                                value={data_fim}
                                min="2009-01-01"
                                max="2999-12-31"
                                onChange={(e) => {setDataFim(e.target.value); console.log(data_fim)}}
                            ></input>
                        </div>
                    </div>
                </div>
                <br />
                <button className="btn btn-primary" type="button" onClick={addProject}>
                    Add Project
                </button>
            </form>
        </div>
        </div>
    );
}