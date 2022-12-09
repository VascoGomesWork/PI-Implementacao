import React, {useEffect, useState} from "react";
import ListMaterialItem from "./ListMaterialItem";
import httpClient from "../httpClient";

export default function CreateMaterialsKitsPage(){

    const [nome, setNome] = useState()
    const [search, setSearch] = useState()
    const [observacoes, setObservacoes] = useState()
    const [materiaisList, setMateriaisList] = useState()

    const searchData = async (e) => {

        console.log("e = " + e.target.value)

        setSearch(e.target.value)

        console.log("Search = " + search)

        /*try {
            await httpClient.post("//localhost:5000/showmaterialsbyname", {
                search
            }, config);
        } catch (e) {
            if (e.response.status === 401) {
                alert("Invalid Material Info");
            }
        }*/
    }

    //get list of materials
    useEffect(() => {
        (async () => {
            try {
                const materials = await httpClient.get("//localhost:5000/showmaterialsbyname");
                // default choice
                setSearch(search)
                setMateriaisList(materials.data.material)
            } catch (error) {
                console.log("Error getting materials");
            }
        })();
    }, []);

    console.log("Lista de Materiais = " + materiaisList)

    const criarKit = async (e) => {

    }

    return (
        <div>
            <h1>Criar Kit de Material</h1>
            <form>
                <div>
                    <label>Nome Kit de Material </label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        id=""
                    />
                </div>

                <div>
                    <label>Search </label>
                    <input
                        type="search"
                        onChange={searchData}
                        id=""
                    />

                </div>

                <div>
                    <label>Lista de Materiais </label>
                    <ul>
                        <ListMaterialItem />
                    </ul>
                </div>
                <div>
                    <label>Observações </label>
                    <input
                        type="text"
                        value={observacoes}
                        onChange={(e) => setObservacoes(e.target.value)}
                        id=""
                    />
                </div>
                <button type="button" onClick={criarKit}>
                    Criar Novo Kit
                </button>
            </form>
        </div>
    );
}