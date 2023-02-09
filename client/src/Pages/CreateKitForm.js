import React, {useEffect, useState} from "react";
import httpClient from "../httpClient";
import Alert from "./Alert";

export default function CreateKitForm(){
    const [nomeKit, setNomeKit] = useState([]);
    const [observacao, setObservacao] = useState([]);
    const [searchInput, setSearchInput] = useState([]);
    const [searchResultList, setSearchResultList] = useState([]);
    const [kitMaterialsList, setKitMaterialsList] = useState([]);
    const [alert, setAlert] = useState(false);
    const [missingData, setMissingData] = useState(false);

    /**
     * @Resume: Function that Resets the State
     */
    function resetState() {
        setNomeKit([])
        setObservacao([])
        setSearchInput([])
        setSearchResultList([])
        setKitMaterialsList([])
        setAlert(false)
        setMissingData(false)
    }

    /**
     * @Resume: Function the Create Kit
     * @param e
     * @returns {Promise<void>}
     */
    const createKit = async (e) => {

        if(nomeKit.length <= 0 || observacao.length <= 0 || kitMaterialsList.length <= 0){
            //sets missing data state to the prevState
            setMissingData((prevState) => !prevState);
            //sets the missing data state to the prevState after 3 seconds
            setTimeout(() => {
                setMissingData((prevState) => !prevState);
            }, 3000);
        } else {
            try {
                await httpClient.post("//localhost:5000/addkit", {
                    nomeKit,
                    observacao,
                    kitMaterialsList,
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
                    alert("Invalid Kit Info");
                }
            }
        }
    };

    useEffect(() => {
        if (searchInput.length > 0) {
            fetch(`//localhost:5000/showmaterialsbyname?search=` + searchInput)
                .then((res) => res.json())
                .then((data) => {
                    setSearchResultList(data.materials_list);
                });
            console.log("search com valores =>", searchInput);
        } else if (searchInput.length <= 1) {
            console.log("serach sem valores =>", searchInput);
            setSearchResultList([]);
        }
    }, [searchInput]);

    const addMaterialToKit = async (id, nome, quantidade) => {
        //  checks if the item is already in the kit list
        const found = kitMaterialsList.some((material) => material.id === id);
        if (!found) {
            setKitMaterialsList([
                ...kitMaterialsList,
                {
                    id: id,
                    nome: nome,
                    quantidade: quantidade,
                },
            ]);
        }
    };

    const changeQuantity = async (id, quantity) => {
        console.log("ID => ", id, "QUANITY =>", quantity);

        kitMaterialsList.forEach((element) => {
            if (element.id === id) {
                element.quantidade = quantity;
            }
        });
        console.log("CHANGING AMOUNTS => ", kitMaterialsList);
    };

    const removeMaterial = async (id) => {
        setKitMaterialsList((kitMaterialsList) =>
            kitMaterialsList.filter((element) => element.id !== id)
        );
    };

    return (
        <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">
                    <h1 className="mt-4">Adicionar Novo Kit de Materiais</h1>
                    <div>
                        <form>
                            <div className="form-floating mb-2">
                                <div className="row">
                                    <div className="card-body">
                                        <h6>Adicione um novo kit preenchendo todos os campos do formulário abaixo.
                                            Efetue a pesquisa de materiais na caixa de pesquisa.</h6>
                                    </div>
                                    <div className="col-md-2">
                                        <label>Nome</label>
                                    </div>
                                    <div className="col-md-10">
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={nomeKit}
                                            onChange={(e) => setNomeKit(e.target.value)}
                                            id=""
                                        />
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="form-floating mb-2">
                                <div className="row">
                                    <div className="col-md-2">
                                        <label>Pesquisa: </label>
                                    </div>
                                    <div className="col-md-10">
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
                                </div>
                            </div>
                            <div className="form-floating mb-2">
                                <div className="row">
                                    <div className="col-md-2">
                                        <label>Lista de Materiais </label>
                                    </div>
                                    <div className="col-md-10">
                                        <table className="table table-bordered" border="1">
                                            <tbody>
                                            <tr>
                                                <th>Designação</th>
                                                <th>Quantidade Total</th>
                                                <th>Adicionar</th>
                                            </tr>
                                            {searchResultList?.map((item) => (
                                                <tr key={item.id}>
                                                    <th>{item.nome}</th>
                                                    <th>{item.quantidade}</th>
                                                    <th>
                                                        <button
                                                            className="btn btn-primary"
                                                            type="button"
                                                            onClick={(e) => {
                                                                addMaterialToKit(item.id, item.nome, item.quantidade);
                                                            }}
                                                        >
                                                            Adicionar
                                                        </button>
                                                    </th>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="form-floating mb-2">
                                <div className="row">
                                    <div className="col-md-2">
                                        <label>Materiais no Kit </label>
                                    </div>
                                    <div className="col-md-10">
                                        <table className="table table-bordered" border="1">
                                            <tbody>
                                            <tr>
                                                <th>Designação</th>
                                                <th>Quantidade no Kit</th>
                                                <th>Adicionar</th>
                                            </tr>
                                            {kitMaterialsList?.map((item) => (
                                                <tr key={item.id}>
                                                    <th>{item.nome}</th>
                                                    <th>
                                                        <input
                                                            className="form-control"
                                                            type="number"
                                                            onChange={(e) => changeQuantity(item.id, e.target.value)}
                                                            id=""
                                                        />
                                                    </th>
                                                    <th>
                                                        <button
                                                            className="btn btn-primary"
                                                            type="button"
                                                            onClick={(e) => {
                                                                removeMaterial(item.id);
                                                            }}
                                                        >
                                                            Remover
                                                        </button>
                                                    </th>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="form-floating mb-2">
                                <div className="row">
                                    <div className="col-md-3">
                                        <label>Observações Kit de Material </label>
                                    </div>
                                    <div className="col-md-9">
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
                            <br />
                            <button className="btn btn-primary" type="button" onClick={createKit}>
                                Adicionar Kit
                            </button>
                            {alert && (
                                <Alert
                                    id="alert"
                                    tipo={"success"}
                                    props={"Kit de Materiais Criado com Sucesso"}
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