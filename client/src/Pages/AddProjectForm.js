import React, {useState} from "react";
import httpClient from "../httpClient";
import Alert from "./Alert";

export default function AddProjectForm(){
    const [nome, setNome] = useState([]);
    const [alert, setAlert] = useState(false);
    const [missingData, setMissingData] = useState(false);
    const [observacoes, setObservacoes] = useState([]);
    const [data_inicio, setDataInicio] = useState([]);
    const [data_fim, setDataFim] = useState([]);

    /**
     * @Resume: Function that Resets the State
     */
    function resetState() {
        setNome([])
        setAlert(false)
        setMissingData(false)
        setObservacoes([])
        setDataInicio([])
        setDataFim([])
    }

    /**
     * Resume: Function that Creates a New Project
     * @param e
     * @returns {Promise<void>}
     */
    const addProject = async (e) => {
        console.log("Nome Length = " + nome.length)
        console.log("Observacoes Length = " + observacoes.length)
        console.log("Data Inicio Length = " + data_inicio.length)
        console.log("Data Fim Length = " + data_fim.length)
        if(nome.length <= 0 || observacoes.length <= 0 || data_inicio.length <= 0 || data_fim.length <= 0){
            console.log("TESTE")
            //sets missing data state to the prevState
            setMissingData((prevState) => !prevState);
            //sets the missing data state to the prevState after 3 seconds
            setTimeout(() => {
                setMissingData((prevState) => !prevState);
            }, 3000);
        } else {
            try {
                await httpClient.post("//localhost:5000/addproject", {
                    nome,
                    observacoes,
                    data_inicio,
                    data_fim,
                });
                setTimeout(() => {
                    setAlert((prevState) => !prevState);
                }, 3000);
                //Sets Variables to their initial state
                resetState();
                //Changes the state of the alert
                setAlert((prevState) => !prevState);
            } catch (e) {
                if (e.response.status === 401) {
                    alert("Invalid Project Info");
                }
            }
        }
    };

    return (
        <div id="layoutSidenav_content">
        <div  className="container-fluid px-4">
            <h1>Adicionar Novo Projeto</h1>
            <form>
                <div className="form-floating mb-2">
                    <div className="row">
                        <div className="col-md-2">
                            <label>Nome </label>
                        </div>
                        <div className="col-md-10">
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
                            <label>Observações </label>
                        </div>
                        <div className="col-md-10">
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
                        <div className="col-md-2">
                            <label>Data Inicio </label>
                        </div>
                        <div className="col-md-10">
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
                        <div className="col-md-2">
                            <label>Data Fim </label>
                        </div>
                        <div className="col-md-10">
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
                {alert && (
                    <Alert
                        id="alert"
                        tipo={"success"}
                        props={"Projeto Criado com Sucesso"}
                    />
                )}
                {missingData && (
                    <Alert
                        id="alert"
                        tipo={"danger"}
                        props={"Por Favor Insira Todos os Dados Necessários"}
                    />
                )}
            </form>
        </div>
        </div>
    );
}