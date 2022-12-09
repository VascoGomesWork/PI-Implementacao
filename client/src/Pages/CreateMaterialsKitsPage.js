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


        fetch(`//localhost:5000/showmaterialsbyname?search=`+search)
            .then(res => res.json())
            .then(data => {
                console.log("DATA = " + JSON.stringify(data.materials_list))
                console.log("NOME = " + data.materials_list[0].nome)
                console.log("QUANTIDADE = " + data.materials_list[0].quantidade)

                setMateriaisList(prevData => ({
                    ...prevData,
                    array:[{
                        nome:data.materials_list[0].nome,
                        quantidade:data.materials_list[0].quantidade }]
                }))
            })


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

    console.log("Lista de Materiais = " + JSON.stringify(materiaisList))

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
                        <ListMaterialItem materialsList={materiaisList}/>
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