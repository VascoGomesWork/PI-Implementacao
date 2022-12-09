import React, {useState} from "react";

export default class ListMaterialItem extends React.Component{

    constructor(props) {
        super(props);
    }

    //this.props.materialsList.nome
    render() {
        return (
            <li>
                <label>Material: </label>

                <input type="text" value={this.props.materialsList!==undefined ? this.props.materialsList["array"][0].nome : this.props.materialsList}/>
                <label>Quantidade </label>
                <input
                    type="text"
                    value={this.props.materialsList!==undefined ? this.props.materialsList["array"][0].quantidade : this.props.materialsList}/>
                <button type="button">Apagar</button>
            </li>
        )
    }
}