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

  const realizarRequisicoes = async () => {
    window.location.href = "/realizarrequisicoes";
  };

  const realizarDevolucoes = async () => {
    window.location.href = "/returnmaterials";
  };

  const criarKits = async () => {
    window.location.href = "/createkits";
  };

  const adicionarMaterial = async () => {
    window.location.href = "/addmaterial";
  };

  const atualizarStocks = async () => {
    window.location.href = "/updatematerial";
  };

  const adicionarProjeto = async () => {
    window.location.href = "/addproject";
  };

  const adicionarTipoMaterial = async () => {
    window.location.href = "/addmaterialtype";
  };

  const verProjetos = async () => {
    window.location.href = "/showprojects";
  };

  const verKits = async () => {
    window.location.href = "/showkits";
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
      <h1>Sistema de controlo de Stocks SPEPSI</h1>
      {user.length !== 0 ? (
        <div>
          <h2>Logged in!</h2>
          <h3>Email: {user.email}</h3>
          <h3>ID: {user.id}</h3>

          <button onClick={realizarRequisicoes}>Realizar Requisições</button>
          <br />
          <button onClick={realizarDevolucoes}>Realizar Devoluções - X</button>
          <br />
          <button onClick={checkStocks}>Lista de Materiais</button>
          <br />
          <button onClick={atualizarStocks}>Atualizar Stocks</button>
          <br />
          <button onClick={adicionarMaterial}>Adicionar Material</button>
          <br />
          <button onClick={criarKits}>Criar Kit de Material</button>
          <br />
          <button onClick={verKits}>Lista de Kits</button>
          <br />
          <button onClick={adicionarProjeto}>Adicionar Projeto</button>
          <br />
          <button onClick={adicionarTipoMaterial}>Adicionar Tipo Material</button>
          <br />
          <button onClick={adicionarProjeto}>Criar Projeto</button>
          <br />
          <button onClick={verProjetos}>Lista de Projetos</button>
          <br />
          <button onClick={logoutUser}>Logout</button>
          <br />
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
