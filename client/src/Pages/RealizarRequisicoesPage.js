import React, {useEffect, useState} from "react";
import httpClient from "../httpClient";
//import httpClient from "../httpClient";

export default function RealizarRequisicoesPage(){

    const [nome, setNome] = useState([]);
    const [projeto, setProjeto] = useState([]);
    const [nome_projeto, setNomeProjeto] = useState([]);
    const [search, setSearch] = useState([]);
    const [combobox_material_kit, setComboboxMaterialKit] = useState([]);
    const [material, setMaterial] = useState([]);
    const [quantidade_material, setQuantidadeMaterial] = useState([]);
    const [lista_materiais, setListaMateriais] = useState([]);
    const [data_entrega_prevista, setDataEntregaPrevista] = useState([]);

        //console.log("Nome = " + nome);
        //console.log("Projeto = " + projeto);
        //console.log("Nome Projeto = " + nome_projeto);
        //console.log("Material = " + material);
        //console.log("Quantidade de Material = " + quantidade_material);
        //console.log("Lista de Materiais = " + lista_materiais);
        //console.log("Data Entrega Prevista = " + data_entrega_prevista);

        //Sets Default Value
        useEffect(() => {
            setComboboxMaterialKit("Material")
        }, []);

        const searchMaterial = async (e) => {
            console.log("Search = " + search);



            console.log("Combobox Material Kit = " + combobox_material_kit)
            try{
                await httpClient.post("//localhost:5000/showmaterialsbyname",{
                    search
                })
            } catch (e) {
                if (e.response.status === 401) {
                    alert("Invalid Material Info");
                }
            }
        }

        const fazerRequisicao = async (e) => {

            setListaMateriais(([]) => ([{
                "material":material,
                "quantidade_material":quantidade_material
            }]));

        /*try {

            const response = await httpClient.post("//localhost:5000/realizarrequisicao", {
                nome,
                projeto,
                nome_projeto,
                lista_materiais,
                data_entrega_prevista,
            });
            window.location.href = "/";
        } catch (e) {
            if (e.response.status == 401) {
                alert("Invalid Type Info");
            }
        }*/
    };


    return (
        <div>
            <h1>Realizar Requisição de Material</h1>
            <form>
                <div>
                    <label>Nome Docente ou Aluno </label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        id=""
                    />
                </div>
                <div>
                    <label>Projeto </label>
                    <input
                        type="radio"
                        value={projeto}
                        onChange={(e) => setProjeto("Usar em Projeto")}
                        id=""
                    /><label>Usar em Projeto</label>

                    <input
                        type="radio"
                        value={projeto}
                        onChange={(e) => setProjeto("Não Usar em Projeto")}
                        id=""
                    /><label>Não Usar em Projeto</label>

                </div>
                <div>
                    <label>Nome Projeto </label>
                    <input
                        type="text"
                        value={nome_projeto}
                        onChange={(e) => setNomeProjeto(e.target.value)}
                        id=""
                    />
                </div>
                <div>
                    <label>Search </label>
                    <input
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        id=""
                    />

                    <label>Material ou Kit </label>
                    <select
                        type="search"
                        onChange={(choice) => setComboboxMaterialKit(choice.target.value)}>
                        <option key="Material" value="Material">Material</option>
                        <option key="Kit" value="Kit">Kit</option>
                    </select>

                    <button type="button" onClick={searchMaterial}>
                        Pesquisar Material
                    </button>
                </div>

                <div>
                    <label>Lista de Materiais </label>
                    <ul>
                        <li>
                            <label>Material: </label>
                            <input type="text" value={material} onChange={(e) => setMaterial(e.target.value)}/>
                            <label>Quantidade </label>
                            <input
                            type="text"
                            value={quantidade_material}
                            onChange={(e) => setQuantidadeMaterial(e.target.value)}
                            id=""/>
                            <button type="button" >Apagar</button>
                        </li>
                    </ul>
                </div>
                <div>
                    <label>Data Entrega Prevista </label>
                    <input
                        type="text"
                        value={data_entrega_prevista}
                        onChange={(e) => setDataEntregaPrevista(e.target.value)}
                        id=""
                    />
                </div>
                <button type="button" onClick={fazerRequisicao}>
                    Fazer Requisição
                </button>
            </form>
        </div>
    );
}