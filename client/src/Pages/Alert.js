import React from "react";

export default function Alert(props){
    let classType=""
    if(props.tipo === "success"){
        classType = "alert alert-success"
    } else if(props.tipo === "insuccess"){
        classType = "alert alert-warning"
    } else {
        classType = "alert alert-danger"
    }
    return(
        <div className={classType} role="alert">
            <h4 className="alert-heading">Alerta</h4>
            <p>{props.props}</p>
        </div>
    )
}