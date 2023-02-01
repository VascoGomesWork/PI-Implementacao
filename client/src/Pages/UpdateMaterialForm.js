import React, {useEffect, useState} from "react";
import httpClient from "../httpClient";
import Alert from "./Alert";

export default function UpdateMaterialForm(){
    const [stocks, setStocks] = useState([]);
    const [id, setId] = useState([]);
    const [quantidade, setQuantidade] = useState([]);
    const [searchInput, setSearchInput] = useState([]);
    const [typeSearch, setTypeSearch] = useState("nome_material");
    const [alert, setAlert] = useState(false);
    const [missingData, setMissingData] = useState(false);

    /**
     * @Resume: Function that Resets the State
     */
    function resetState() {
        setStocks([])
        setId([])
        setQuantidade([])
        setSearchInput([])
        setTypeSearch("nome_material")
        setAlert(false)
        setMissingData(false)
    }

    // search bar
    useEffect(() => {
        fetch(
            `//localhost:5000/showstockbyname?search=` +
            searchInput +
            "&search_type=" +
            typeSearch
        )
            .then((res) => res.json())
            .then((data) => {
                setStocks(data.materials_list);
            });
    }, [searchInput, typeSearch]);

    const updateStock = async (e) => {
        console.log("id: ", id);
        console.log("qty: ", quantidade);

        if(quantidade.length <= 0){
            //sets missing data state to the prevState
            setMissingData((prevState) => !prevState);
            //sets the missing data state to the prevState after 3 seconds
            setTimeout(() => {
                setMissingData((prevState) => !prevState);
            }, 3000);
        } else {
            try {
                await httpClient.post("//localhost:5000/updatestock", {
                    id,
                    quantidade,
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
                    alert("Invalid Material Info");
                }
            }
        }
    };

    return (
        <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">
                    <h1 className="mt-4">Atualizar Stocks</h1>
                    <div>
                        <div className="form-floating mb-2">
                            <div className="row">
                                <div className="card-body">
                                    <h6>Atualize os stocks dos materiais efetuando uma pesquisa pelos atributos presentes na caixa de seleçao e insira a nova quantidade desejada</h6>
                                </div>
                                <div className="col-md-2">
                                    <label>Pesquisa: </label>
                                </div>
                                <div className="col-md-5">
                                    <input
                                        className="form-control"
                                        type="search"
                                        value={searchInput}
                                        onChange={(e) => {
                                            setSearchInput(e.target.value);
                                        }}
                                        id=""
                                    />
                                </div>
                                <div className="col-md-5">
                                    <select
                                        className="form-select"
                                        onChange={(e) => {
                                            console.log(e.target.value);
                                            setTypeSearch(e.target.value);
                                        }}
                                        id=""
                                    >
                                        <option value="nome_material">Nome Material</option>
                                        <option value="quantidade">Quantidade</option>
                                        <option value="data_requisicao">Data de Requisicao</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="form-floating mb-2">
                            <table className="table table-bordered" border="1">
                                <tbody>
                                <tr>
                                    <th>Material</th>
                                    <th>Observação</th>
                                    <th>Data de Aquisição</th>
                                    <th>Quantidade</th>
                                    <th>Nova Quantidade</th>
                                    <th>Atualizar</th>
                                </tr>
                                {stocks.map((item) => (
                                    <tr key={item.id}>
                                        <th>{item.nome}</th>
                                        <th>{item.observacao}</th>
                                        <th>{item.data.substr(0,10)}</th>
                                        <th>{item.quantidade}</th>
                                        <th>
                                            <input
                                                className="form-control"
                                                type="number"
                                                //value={quantidade}
                                                onChange={(e) => {
                                                    setQuantidade(e.target.value);
                                                    setId(item.id);
                                                }}
                                                id=""
                                            />
                                        </th>
                                        <th>
                                            <button className="btn btn-primary" type="button" onClick={updateStock}>
                                                Atualizar
                                            </button>
                                        </th>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            {alert && (
                                <Alert
                                    id="alert"
                                    tipo={"success"}
                                    props={"Material Atualizado com Sucesso"}
                                />
                            )}
                            {missingData && (
                                <Alert
                                    id="alert"
                                    tipo={"danger"}
                                    props={"Por Favor Insira Todos os Dados Necessários"}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}