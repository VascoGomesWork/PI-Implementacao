import React, {useEffect, useState} from "react";

export default function ShowMaterialsTable(){
    const [stocks, setStocks] = useState([]);
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

    //console.log(stocks);
    const exit = async () => {
        window.location.href = "/";
    };

    return (
        <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">
                    <h1 className="mt-4">Lista de Materiais</h1>
                    <div>
                        <div>
                            <div className="form-floating mb-2">
                                <div className="row">
                                    <div className="col-md-2">
                                        <label>Pesquisa: </label>
                                    </div>
                                    <div className="col-md-2">
                                        <input
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
                                            onChange={(e) => {
                                                console.log(e.target.value);
                                                setTypeSearch(e.target.value);
                                            }}
                                            id="">
                                            <option value="nome_material">Nome Material</option>
                                            <option value="quantidade">Quantidade</option>
                                            <option value="data_requisicao">Data de Requisicao</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="form-floating mb-2">
                                <table border="1">
                                    <tbody>
                                    <tr>
                                        <th>Material</th>
                                        <th>Quantidade</th>
                                        <th>Observações</th>
                                        <th>Data de Aquisição</th>
                                    </tr>
                                    {stocks?.map((item) => (
                                        <tr key={item.id}>
                                            <th>{item.nome}</th>
                                            <th>{item.quantidade}</th>
                                            <th>{item.observacao}</th>
                                            <th>{item.data}</th>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <br />
                        <div className="form-floating mb-2">
                            <button className="btn btn-primary" type="button" key="exitBtn" onClick={exit}>
                                Sair
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}