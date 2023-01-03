import React, {useEffect, useState} from "react";
import httpClient from "../httpClient";

export default function UpdateMaterialForm(){
    const [stocks, setStocks] = useState([]);
    const [id, setId] = useState([]);
    const [quantidade, setQuantidade] = useState([]);
    const [searchInput, setSearchInput] = useState([]);
    const [typeSearch, setTypeSearch] = useState("nome_material");

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
        try {
            await httpClient.post("//localhost:5000/updatestock", {
                id,
                quantidade,
            });
            window.location.href = "/updatematerial";
        } catch (e) {
            if (e.response.status === 401) {
                alert("Invalid Material Info");
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
                                <div className="col-md-2">
                                    <label>Pesquisa: </label>
                                </div>
                                <div className="col-md-2">
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
                                <div className="col-md-2">
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
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}