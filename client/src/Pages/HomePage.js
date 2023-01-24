import React, { useEffect, useState } from "react";

export default function HomePage() {
  const [stocks, setStocks] = useState([]);
  const [searchInput, setSearchInput] = useState([]);
  const [typeSearch, setTypeSearch] = useState("nome_material");

  // search bar
  useEffect(() => {
    fetch(
      `//localhost:5000/showstockbyname?search=` +
        searchInput +
        "&search_type=" +
        typeSearch
    )
      .then((res) => res.json())
      .then((data) => {
        setStocks(data.materials_list);
      });
  }, [searchInput, typeSearch]);

  return (
    <body className="bg-primary">
      <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
          <main>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-12">
                  <div className="card shadow-lg border-0 rounded-lg mt-5">
                    <div className="card-header">
                      <h3 className="text-center font-weight-light my-4">
                        <img alt="" id="logo1" src="../../img/logo_sepsi.png" />
                        Sistema de Gestão de Stocks SEPSI
                      </h3>
                    </div>
                    <div className="card-body">
                      <h6>
                        Aqui podem ser visualizadas as Ferramentas e os
                        Materiais que existem no laboratório, pode pesquisar os
                        materiais através da barra de pesquisa abaixo por
                        qualquer um dos campos da tabela
                      </h6>

                      <div className="form-floating mb-3">
                        <div className="row">
                          <div className="col-md-2">
                            <p>
                              <label>Pesquisa: </label>
                            </p>
                          </div>
                          <div className="col-md-5">
                            <input
                              className="form-control"
                              type="search"
                              value={searchInput}
                              onChange={(e) => {
                                setSearchInput(e.target.value);
                                //searchMaterials();
                              }}
                              id=""
                            />
                          </div>
                          <div className="col-md-5">
                            <select
                              className="form-select"
                              onChange={(e) => {
                                setTypeSearch(e.target.value);
                              }}
                              id=""
                            >
                              <option value="nome_material">
                                Nome Material
                              </option>
                              <option value="quantidade">Quantidade</option>
                              <option value="data_requisicao">
                                Data de Requisicao
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="form-floating mb-3">
                        <table className="table table-bordered" border="1">
                          <tbody>
                            <tr>
                              <th>Material</th>
                              <th>Quantidade</th>
                              <th>Observações</th>
                              <th>Data de Aquisição</th>
                            </tr>
                            {stocks?.map((item) => (
                              <tr key={item.id}>
                                <th>{item.nome}</th>
                                <th>{item.quantidade}</th>
                                <th>{item.observacao}</th>
                                <th>{item.data.substr(0, 10)}</th>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                        <a href="/login" className="btn btn-primary">
                          Login
                        </a>
                        <a href="/register" className="btn btn-primary">
                          Registar Utilizador
                        </a>
                      </div>
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
}
