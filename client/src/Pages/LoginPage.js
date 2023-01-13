import React, { useState } from "react";
import httpClient from "../httpClient";

const LoginPage = () => {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);

  const loginUser = async (e) => {
    //console.log(email, password);

    try {
      await httpClient.post("//localhost:5000/login", {
        email,
        password,
      });
      window.location.href ="/dashboard"
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
                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3></div>
                    <div className="card-body">
                      <form>
                        <div className="form-floating mb-3">
                          <input
                              class="form-control"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              id="inputEmail"
                          />
                          <label htmlFor="inputEmail">Email</label>
                        </div>
                        <div className="form-floating mb-3">
                          <input
                              class="form-control"
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              id="inputPassword"
                          />
                          <label htmlFor="inputPassword">Password</label>
                        </div>

                        <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                          <a className="btn btn-primary" onClick={loginUser}>Login</a>
                        </div>
                      </form>
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

export default LoginPage;
