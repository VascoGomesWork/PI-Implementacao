import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";

const LandingPage = () => {
  const [user, setUser] = useState([]);
  //console.log(user)

  const logoutUser = async () => {
    await httpClient.post("//localhost:5000/logout");
    window.location.href = "/";
  };

  const checkStocks = async () => {
    window.location.href = "/stock";
  };

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
      <h1>Welcome to this React App</h1>
      {user.length != 0 ? (
        <div>
          <h2>Logged in!</h2>
          <h3>Email: {user.email}</h3>
          <h3>ID: {user.id}</h3>

          <button onClick={checkStocks}>Check Stocks</button>
          <button onClick={logoutUser}>Logout</button>
        </div>
      ) : (
        <div>
          <br />
          <p>You're not logged in...</p>
          <div>
            <a href="/login">
              <button>Login</button>
            </a>
            <a href="/register">
              <button>Register</button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
