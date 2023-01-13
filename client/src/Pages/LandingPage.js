import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";
import TopBar from "./TopBar";
import Nav from "./Nav";
import Scripts from "./Scripts";
import Dashboard from "./Dashboard";

const LandingPage = () => {
  const [user, setUser] = useState([]);
  console.log(user)

  useEffect(() => {
    (async () => {
      try {
        const response = await httpClient.get("//localhost:5000/@me")
        setUser(response.data);
      } catch (error) {
        console.log("Not authenticated")
      }
    })();
  }, []);

  return (
    <div>

      <TopBar />
        <div id="layoutSidenav">
            <Nav />

            <Dashboard />
        </div>

      <Scripts />

    </div>
  );
};

export default LandingPage;
