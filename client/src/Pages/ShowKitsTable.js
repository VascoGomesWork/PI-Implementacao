import React, {useEffect, useState} from "react";

export default function ShowKitsTable(){
    const [kits, setKits] = useState([]);
    const [searchInput, setSearchInput] = useState([]);
    const [typeSearch, setTypeSearch] = useState("nome_kit");

    /*useEffect(() => {
      (async () => {
        try {
          const kits = await httpClient.get("//localhost:5000/getkits");
          setKits(kits.data.data_array);
        } catch (error) {
          console.log("Error getting kits");
        }
      })();
    }, []);*/

    // search bar
    useEffect(() => {
        fetch(
            `//localhost:5000/getkitsbyname?search=` +
            searchInput +
            "&search_type=" +
            typeSearch
        )
            .then((res) => res.json())
            .then((data) => {
                setKits(data.mat_list);
            });
    }, [searchInput, typeSearch]);

    return (
        <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">
                    <h1 className="mt-4">Listar Kits de Materiais</h1>
                    <div>
                        <div>
                            <div className="form-floating mb-2">
                                <div className="row">
                                    <label>Efetue a pesquisa de kits selecionando um dos atributos da caixa de pesquisa pelo qual deseja pesquisar</label>
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
                                            <option value="nome_kit">Nome Kit</option>
                                            <option value="nome_material">Nome Material</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="form-floating mb-2">
                                <div className="row">
                                    <div className="col-md-12">
                                    <table className="table table-bordered" border="1" key={"table"}>
                                        <tbody>
                                        <tr key={"0"}>
                                            <th>Nome do Kit</th>
                                            <th>Material</th>
                                            <th>Quantidade</th>
                                            <th>Observações</th>
                                        </tr>
                                        {kits?.map((kit_item) => (
                                            <tr key={kit_item.id}>
                                                <th>{kit_item.nome_kit}</th>
                                                <th>
                                                    {kit_item.materiais?.map((item) => (
                                                        <p key={item.nome_material + kit_item.id}>{item.nome_material}</p>
                                                    ))}
                                                </th>
                                                <th>
                                                    {kit_item.materiais?.map((item) => (
                                                        <p key={item.quantidade + kit_item.id + item.nome_material}>{item.quantidade}</p>
                                                    ))}
                                                </th>
                                                <th>{kit_item.observacao}</th>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}