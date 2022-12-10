import React, {useEffect, useState} from "react";
import ListMaterialItem from "./ListMaterialItem";
import httpClient from "../httpClient";

export default function CreateMaterialsKitsPage(){

    const [nome, setNome] = useState()
    const [search, setSearch] = useState()
    const [observacoes, setObservacoes] = useState()
    const [materiaisList, setMateriaisList] = useState()

    const [materialsKitList, setMaterialsKitList] = useState()

    const searchData = async (e) => {

        console.log("e = " + e.target.value)

        setSearch(e.target.value)


        fetch(`//localhost:5000/showmaterialsbyname?search=`+search)
            .then(res => res.json())
            .then(data => {
                console.log("DATA = " + JSON.stringify(data.materials_list))

                //Map is not a function -> https://stackoverflow.com/questions/30142361/react-js-uncaught-typeerror-this-props-data-map-is-not-a-function
                setMateriaisList(data.materials_list)

                //Adds Elements to an Object
                /*materialsArray.push()
                materialsArray[i] = {
                    ...ingredientsArray[i],
                    imagem: data.image,
                    consistencia: data.consistency
                }*/
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

    function evento(id) {
        console.log("EVENTO")
        console.log("ID = " + id)
        //Qual Evento que foi selecionado

        //Dar Ordem para adicionar os materiais ao kit no componente parent
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
                        {   //Map not working -> https://stackoverflow.com/questions/69080597/%C3%97-typeerror-cannot-read-properties-of-undefined-reading-map
                            materiaisList?.map((materialsAtributes) => (
                                <ListMaterialItem materialsAtributes={materialsAtributes} id={1} evento={evento}/>
                            ))}
                    </ul>
                </div>

                <div>
                    <label>Lista de Materiais Presentes no Kit</label>
                    <ul>
                        <ListMaterialItem materialsList={materiaisList} id={2}/>
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