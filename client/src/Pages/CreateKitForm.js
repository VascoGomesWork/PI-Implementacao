import React, {useEffect, useState} from "react";
import httpClient from "../httpClient";

export default function CreateKitForm(){
    const [nomeKit, setNomeKit] = useState([]);
    const [observacao, setObservacao] = useState([]);
    const [searchInput, setSearchInput] = useState([]);
    const [searchResultList, setSearchResultList] = useState([]);
    const [kitMaterialsList, setKitMaterialsList] = useState([]);

    const createKit = async (e) => {
        try {
            await httpClient.post("//localhost:5000/addkit", {
                nomeKit,
                observacao,
                kitMaterialsList,
            });
            window.location.href = "/";
        } catch (e) {
            if (e.response.status === 401) {
                alert("Invalid Kit Info");
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
                    <h1 className="mt-4">Adiconar novo Kit de Materiais</h1>
                    <div>
                        <form>
                            <div>
                                <label>Nome Kit de Material </label>
                                <input
                                    type="text"
                                    value={nomeKit}
                                    onChange={(e) => setNomeKit(e.target.value)}
                                    id=""
                                />
                            </div>
                            <br />
                            <div>
                                <label>Pesquisa: </label>
                                <input
                                    type="search"
                                    value={searchInput}
                                    onChange={(e) => {
                                        setSearchInput(e.target.value);
                                    }}
                                    id=""
                                />
                            </div>
                            <div>
                                <label>Lista de Materiais </label>
                                <table border="1">
                                    <tbody>
                                    <tr>
                                        <th>Material</th>
                                        <th>Quantidade Total</th>
                                        <th>Adicionar</th>
                                    </tr>
                                    {searchResultList?.map((item) => (
                                        <tr key={item.id}>
                                            <th>{item.nome}</th>
                                            <th>{item.quantidade}</th>
                                            <th>
                                                <button
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
                            <br />
                            <div>
                                <label>Materiais no Kit </label>
                                <table border="1">
                                    <tbody>
                                    <tr>
                                        <th>Material</th>
                                        <th>Quantidade no Kit</th>
                                        <th>Adicionar</th>
                                    </tr>
                                    {kitMaterialsList?.map((item) => (
                                        <tr key={item.id}>
                                            <th>{item.nome}</th>
                                            <th>
                                                <input
                                                    type="number"
                                                    onChange={(e) => changeQuantity(item.id, e.target.value)}
                                                    id=""
                                                />
                                            </th>
                                            <th>
                                                <button
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
                            <br />
                            <div>
                                <label>Observações Kit de Material </label>
                                <input
                                    type="text"
                                    value={observacao}
                                    onChange={(e) => setObservacao(e.target.value)}
                                    id=""
                                />
                            </div>
                            <br />
                            <button type="button" onClick={createKit}>
                                Adicionar Kit
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}