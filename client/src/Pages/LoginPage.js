import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";

const LoginPage = () => {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);

  const loginUser = async (e) => {
    //console.log(email, password);

    try {
      const response = await httpClient.post("//localhost:5000/login", {
        email,
        password,
      });
      window.location.href ="/"
    } catch (e) {
      if (e.response.status == 401) {
        alert("Invalid Credentials");
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form>
        <div>
          <label>Email </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id=""
          />
        </div>
        <div>
          <label>Password </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id=""
          />
        </div>
        <button type="button" onClick={loginUser}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
