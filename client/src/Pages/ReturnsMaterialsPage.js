import React, {useEffect, useState} from "react";

export default function ReturnMaterialsPage(){

    const [search, setSearch] = useState()
    const [search_option, setSearchOption] = useState()

    //Sets Default Value
    useEffect(() => {
        setSearchOption("Nome_Projeto")
    }, []);

    const searchMaterial = async (e) => {
        console.log("Search = " + search)
        console.log("Search Option = " + search_option)
    }

    return(
        <div>
            <div>
                <label>Search </label>
                <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    id=""
                />

                <select
                    type="search"
                    onChange={(choice) => setSearchOption(choice.target.value)}>
                    <option value="Nome_Projeto">Nome Projeto</option>
                    <option value="Material">Material</option>
                    <option value="Data_Requisição">Data de Requisição</option>
                    <option value="Docente">Docente</option>
                    <option value="Kit">Kit</option>
                </select>

                <button type="button" onClick={searchMaterial}>
                    Pesquisar Material
                </button>
            </div>



            <h2>HTML Table</h2>

            <table>
                <tr>
                    <th>Nome Projeto</th>
                    <th>Material</th>
                    <th>Quantidade</th>
                    <th>Data Requisição</th>
                    <th>Docente</th>
                    <th>Kit</th>
                    <th>Devolver</th>
                </tr>
                <tr>
                    <td>Alfreds Futterkiste</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                </tr>

            </table>
        </div>
    )
}