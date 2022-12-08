import React, {useState} from "react";
import ListMaterialItem from "./ListMaterialItem";

export default function CreateMaterialsKitsPage(){

    const [nome, setNome] = useState()
    const [search, setSearch] = useState()
    const [observacoes, setObservacoes] = useState()

    const searchData = async (e) => {

        console.log("e = " + e.target.value)

        const {name, value, type} = e.target

        setSearch(prevState => ({
            ...prevState,
            [search]: e.target.value
        }))

        console.log("Search = " + JSON.stringify(search.search))
        console.log("Search = " + search.search)
    }

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