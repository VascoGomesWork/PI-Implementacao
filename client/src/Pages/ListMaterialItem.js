import React, {useState} from "react";

export default class ListMaterialItem extends React.Component{

    constructor(props) {
        super(props);
    }

    //this.props.materialsList.nome
    render() {

        function changeQuantity(){

        }

        return (
            //How to solve missing key error -> https://sentry.io/answers/unique-key-prop/
            //How to pass data from child to parent -> https://bobbyhadz.com/blog/react-pass-data-from-child-to-parent
            <li key={this.props.materialsAtributes}>
                <label>Material: </label>

                <input type="text" id={"nome"} defaultValue={this.props.materialsAtributes!==undefined ? this.props.materialsAtributes.nome : this.props.materialsAtributes}/>
                <label>Quantidade </label>
                <input
                    type="text"
                    id={"quantidade"}
                    onChange={changeQuantity}
                    value={this.props.materialsAtributes!==undefined ? this.props.materialsAtributes.quantidade : this.props.materialsAtributes}/>
                <button type="button" onClick={event => this.props.evento(this.props.materialsAtributes.id)}> {this.props.id === 1 ? "1 - Adicionar ao Kit" : "2 - Apagar" } </button>
            </li>
        )
    }
}