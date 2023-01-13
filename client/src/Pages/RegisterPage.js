//import React, { useState, useEffect } from "react";
import React, { useState } from "react";
import httpClient from "../httpClient";

const RegisterPage = () => {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [repeatPassword, setRepeatPassword] = useState([]);
  const [nome, setNome] = useState([]);
  const [telefone, setTelefone] = useState([]);

  const registerUser = async (e) => {
    try {
      await httpClient.post("//localhost:5000/register", {
        email,
        password,
        nome,
        telefone
      });
      window.location.href = "/";
    } catch (e) {
      if (e.response.status === 401) {
        alert("Invalid Credentials");
      }
    }
  };

  return (

      <body className="bg-primary">
      <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
          <main>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <div className="card shadow-lg border-0 rounded-lg mt-5">
                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Registar Novo Utilizador</h3></div>
                    <div className="card-body">
                      <form>
                        <div className="form-floating mb-3">
                          <input
                              className="form-control"
                              type="text"
                              value={nome}
                              onChange={(e) => setNome(e.target.value)}
                              id="inputNome"
                          />
                          <label htmlFor="inputNome">Nome</label>
                        </div>

                        <div className="form-floating mb-3">
                          <input
                              className="form-control"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              id="inputEmail"
                          />
                          <label htmlFor="inputEmail">Email</label>
                        </div>

                        <div className="form-floating mb-3">
                          <input
                              className="form-control"
                              type="number"
                              value={telefone}
                              onChange={(e) => setTelefone(e.target.value)}
                              id="inputTelefone"
                          />
                          <label htmlFor="inputTelefone">Telefone</label>
                        </div>

                        <div className="form-floating mb-3">
                          <input
                              className="form-control"
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              id="inputPassword"
                          />
                          <label htmlFor="inputPassword">Password</label>
                        </div>

                        <div className="form-floating mb-3">
                          <input
                              className="form-control"
                              type="password"
                              value={repeatPassword}
                              onChange={(e) => setRepeatPassword(e.target.value)}
                              id="inputRepeatPassword"
                          />
                          <label htmlFor="inputRepeatPassword">Repetir Password</label>
                        </div>

                        <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                          <button className="btn btn-primary" onClick={registerUser}>Registar Utilizador</button>
                        </div>
                      </form>
                    </div>
                    <div className="card-footer text-center py-3">
                      <div className="small"><a href="register.html">Need an account? Sign up!</a></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      </body>
  );
};

export default RegisterPage;
