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
            <main>
                <div className="container-fluid px-4">
                    <h1 className="mt-4">Dashboard</h1>
                    <div className="row">
                        <div className="col-xl-6 col-md-6">
                            <div className="card bg-primary text-white mb-4" id="card">
                                <div className="card-body">Requisições: {totalRequests}</div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-md-6">
                            <div className="card bg-success text-white mb-4" id="card">
                                <div className="card-body">Devoluções: {totalReturns}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}