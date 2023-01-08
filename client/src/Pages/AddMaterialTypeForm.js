import React, {useState} from "react";
import httpClient from "../httpClient";
import Alert from "./Alert";

export default function AddMaterialTypeForm(){

    const [tipo, setTipo] = useState([]);
    const [alert, setAlert] = useState(false);
    const [missingData, setMissingData] = useState(false);

    /**
     * @Resume: Function that Resets the State
     */
    function resetState() {
        setTipo([])
        setAlert(false)
        setMissingData(false)
    }

    const addMaterialType = async (e) => {

        if(tipo.length <= 0){
            //sets missing data state to the prevState
            setMissingData((prevState) => !prevState);
            //sets the missing data state to the prevState after 3 seconds
            setTimeout(() => {
                setMissingData((prevState) => !prevState);
            }, 3000);
        } else {
            try {
                await httpClient.post("//localhost:5000/addmaterialtype", {
                    tipo,
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
                    alert("Invalid Type Info");
                }
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
                            <div className="form-floating mb-2">
                                <div className="row">
                                    <div className="col-md-2">
                                        <label>Nome </label>
                                    </div>
                                    <div className="col-md-2">
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={tipo}
                                            onChange={(e) => setTipo(e.target.value)}
                                            id=""
                                        />
                                    </div>
                                </div>
                            </div>
                            <button className="btn btn-primary" type="button" onClick={addMaterialType}>
                                Adicionar
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
            </main>
        </div>
    );
}