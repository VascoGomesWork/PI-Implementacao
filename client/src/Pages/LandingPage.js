import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";
import Head from "./Head";
import TopBar from "./TopBar";
import Nav from "./Nav";
import Scripts from "./Scripts";
import MainTest from "./MainTest";

const LandingPage = () => {
  const [user, setUser] = useState([]);
  //console.log(user)



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

      <Head />

      <TopBar />
        <div id="layoutSidenav">
            <Nav />

            <MainTest />
        </div>

      <Scripts />

    </div>
  );
};

export default LandingPage;
