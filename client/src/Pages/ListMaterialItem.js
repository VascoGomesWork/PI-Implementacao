import React, {useState} from "react";

export default function ListMaterialItem(){

    const [material, setMaterial] = useState()
    const [quantidade_material, setQuantidadeMaterial] = useState()

    return(
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
    )
}