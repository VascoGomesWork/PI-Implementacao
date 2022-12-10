import React, {useEffect, useState} from "react";
import ListMaterialItem from "./ListMaterialItem";
import httpClient from "../httpClient";

export default function CreateMaterialsKitsPage(){

    const [nome, setNome] = useState([])
    const [search, setSearch] = useState([])
    const [observacoes, setObservacoes] = useState([])
    const [materiaisList, setMateriaisList] = useState([])
    const [quantityList, setQuantityList] = useState([])

    const [materialsKitList, setMaterialsKitList] = useState([])

    const searchData = async (e) => {

        console.log("e = " + e.target.value)

        setSearch(e.target.value)


        fetch(`//localhost:5000/showmaterialsbyname?search=`+search)
            .then(res => res.json())
            .then(data => {
                console.log("DATA = " + JSON.stringify(data.materials_list))

                //Map is not a function -> https://stackoverflow.com/questions/30142361/react-js-uncaught-typeerror-this-props-data-map-is-not-a-function
                setMateriaisList(data.materials_list)
            })
    }

    console.log("Lista de Materiais = " + JSON.stringify(materiaisList))

    const createMaterialsKit = async (e) => {

        for(let i = 0; i < materialsKitList.length; i++){
            console.log("MATERIALS ID = " + materialsKitList[i].id)
        }

        try {
            await httpClient.post("//localhost:5000/addmaterialskit", {
                nome,
                materialsKitList,
                observacoes
            });
            window.location.href = "/";
        } catch (e) {
            if (e.response.status === 401) {
                alert("Invalid Material Info");
            }
        }
    }

    function evento(id) {
        //console.log("EVENTO")
        //console.log("ID = " + id)
        //Qual Evento que foi selecionado
        for(let i = 0; i < materiaisList.length; i++){
            //console.log("ID Materiais = " + materiaisList[i].id)
            if(materiaisList[i].id === id) {
                //console.log("DATA ID = " + materiaisList[i].id)
                //console.log("DATA NOME = " + materiaisList[i].nome)
                //console.log("DATA QUANTIDADE = " + materiaisList[i].quantidade)

                //Colocar na Lista do kit
                /*materialsKitList.push({
                    nome:materiaisList[i].nome,
                    quantidade:materiaisList[i].quantidade
                })*/

                materialsKitList.push(
                    {
                        id:materiaisList[i].id,
                        nome:materiaisList[i].nome,
                        quantidade:0
                    }
                )

                //Changes prevState to fix 2 bugs:
                //  search variable being the same as the search box withouth a letter "delay"
                //  makes a change in search and makes .map function work
                //If it Works don't mess with it
                setSearch(preState => ({
                    ...preState, "":""
                }))

                console.log("Kit de Materiais = " + JSON.stringify(materialsKitList))
                //console.log("Kit de Materiais 1 Nome = " + materialsKitList[0].nome)
                //console.log("Kit de Materiais 1 Quantidade = " + materialsKitList[0].quantidade)
            }
        }
    }

    function removeMaterial(id){
        /*for(let i = 0; i < materialsKitList.length; i++) {
            if(materialsKitList[i].id === id) {
                materialsKitList.pop(materialsKitList[i].nome)
                materialsKitList.pop(materialsKitList[i].quantidade)
            }
        }*/
    }

    function changeQuantity(id,quantidade){
        /*console.log("CHANGE QUATITY ")
        console.log("Materials List QUANTIDADE = " + materiaisList[0].quantidade)
        console.log("QUANTIDADE = " + quantidade)
        console.log("Materials List ID = " + materiaisList[0].id)
        console.log("ID = " + id)*/
        for(let i = 0; i < materiaisList.length; i++) {
            if (materiaisList[i].id === id && quantidade <= materiaisList[i].quantidade) {
                //console.log("TESTE")
                materialsKitList[i].quantidade = quantidade
            }
        }
        //Changes the value of Quantidade in Materials Kit List to Send to Database
        //materialsKitList.quantidade = quantityList

        //console.log("QUANTITY LIST = " + JSON.stringify(materialsKitList))
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
                        {   //Map not working -> https://stackoverflow.com/questions/69080597/%C3%97-typeerror-cannot-read-properties-of-undefined-reading-map
                            materialsKitList?.map((materialsKitListAtributes) => (
                                <ListMaterialItem materialsAtributes={materialsKitListAtributes} id={2} evento={removeMaterial} evento2={changeQuantity}/>
                            ))}
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
                <button type="button" onClick={createMaterialsKit}>
                    Criar Novo Kit
                </button>
            </form>
        </div>
    );
}