import Footer from "./Footer";
import React, {useState, useEffect} from "react";

export default function Dashboard(){

    const [totalRequests, setTotalRequests] = useState([]);
    const [totalReturns, setTotalReturns] = useState([]);

    // gets number of returns and requests
    useEffect(() => {
        fetch(
            `//localhost:5000/getrequestsandreturns`
        )
            .then((res) => res.json())
            .then((data) => {
                setTotalRequests(data.total_requests)
                setTotalReturns(data.total_returns)
                //console.log(data)
            });
    }, [totalRequests, totalReturns]);

    return(
        <div id="layoutSidenav_content">

            <div>
                <p>Requisições feitas: {totalRequests}</p>
                <p>Devoluções feitas: {totalReturns}</p>
            </div>

            <main>
                <div className="container-fluid px-4">
                    <h1 className="mt-4">Dashboard</h1>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item active">Dashboard</li>
                    </ol>
                    <div className="row">
                        <div className="col-xl-3 col-md-6">
                            <div className="card bg-primary text-white mb-4">
                                <div className="card-body">Primary Card</div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <button className="small text-white stretched-link" href="#">View Details</button>
                                    <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card bg-warning text-white mb-4">
                                <div className="card-body">Warning Card</div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <button className="small text-white stretched-link" href="#">View Details</button>
                                    <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card bg-success text-white mb-4">
                                <div className="card-body">Success Card</div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <button className="small text-white stretched-link" href="#">View Details</button>
                                    <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card bg-danger text-white mb-4">
                                <div className="card-body">Danger Card</div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <button className="small text-white stretched-link" href="#">View Details</button>
                                    <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}