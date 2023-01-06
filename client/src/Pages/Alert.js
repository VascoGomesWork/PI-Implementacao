import React from "react";

export default function Alert(props){
    return(
        <div classs="container p-5">
            <div className="row no-gutters">
                <div className="col-lg-5 col-md-12">
                    <div className="alert alert-success fade show" role="alert">
                        <h4 className="alert-heading">{props.props}</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}