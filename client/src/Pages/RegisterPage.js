import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";

const RegisterPage = () => {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);

  const registerUser = async (e) => {
    try {
      const response = await httpClient.post("//localhost:5000/register", {
        email,
        password,
      });
      window.location.href = "/";
    } catch (e) {
      if (e.response.status == 401) {
        alert("Invalid Credentials");
      }
    }
  };

  return (
    <div>
      <h1>Register new User</h1>
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
        <button type="button" onClick={registerUser}>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
