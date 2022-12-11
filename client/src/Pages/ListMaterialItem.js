/*import React, {useState} from "react";

export default class ListMaterialItem extends React.Component{

    constructor(props) {
        super(props);
    }


    changeQuantidadeChild(quantidade){

        console.log("QUANTIDADE CHILD = " + quantidade)
        //this.props.id === 2 ? event=> this.props.evento2(this.props.materialsAtributes.id, quantidade) : ""
        this.props.evento2(this.props.materialsAtributes.id, quantidade)
    }

    //this.props.materialsList.nome
    render() {
        let quantidade = undefined
        return (
            //How to solve missing key error -> https://sentry.io/answers/unique-key-prop/
            //How to pass data from child to parent -> https://bobbyhadz.com/blog/react-pass-data-from-child-to-parent
            <li key={this.props.materialsAtributes}>
                <label>Material: </label>

                <input type="text" id={"nome"} defaultValue={this.props.materialsAtributes!==undefined ? this.props.materialsAtributes.nome : this.props.materialsAtributes}/>
                <label>{this.props.id === 1 ? "Quantidade Existente na Base de Dados" : "Quantidade a Adicionar ao Kit"} </label>
                <input
                    type="text"
                    id={"quantidade"}
                    onChange={(e) => this.props.id === 2 ? this.changeQuantidadeChild(e.target.value) : ""}
                    value={this.props.materialsAtributes!==undefined && this.props.id === 1 ? this.props.materialsAtributes.quantidade : undefined}/>
                <button type="button" onClick={event => this.props.evento(this.props.materialsAtributes.id)}> {this.props.id === 1 ? "1 - Adicionar ao Kit" : "2 - Apagar" } </button>
            </li>
        )
    }
}*/