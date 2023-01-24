import React, { useEffect, useState } from "react";
import httpClient from "../httpClient";
import Alert from "./Alert";

export default function AddMaterialForm() {
  const [nome, setNome] = useState([]);
  const [quantidade, setQuantidade] = useState([]);
  const [observacao, setObservacao] = useState([]);
  // FKs
  const [tipo_material, setTipo_material] = useState([]);
  const [projeto, setProjeto] = useState([]);
  // List of Projects and types of materials
  const [tipos, setTipos] = useState([]);
  const [projetos, setProjetos] = useState([]);
  // Date
  const [dataAquisicao, setDataAquisicao] = useState(0);
  const [alert, setAlert] = useState(false);
  const [missingData, setMissingData] = useState(false);
  // File
  const [file, setFile] = useState();
  const [matList, setMatList] = useState([]);
  const fileReader = new FileReader();

  /**
   * @Resume: Function that Resets the State
   */
  function resetState() {
    setNome([]);
    setQuantidade([]);
    setObservacao([]);
    setTipo_material([]);
    setProjeto([]);
    setDataAquisicao(0);
    setAlert(false);
    setMissingData(false);
  }

  const addMaterial = async (e) => {
    if (
      nome.length <= 0 ||
      quantidade.length <= 0 ||
      observacao.length <= 0 ||
      dataAquisicao.length <= 0
    ) {
      //sets missing data state to the prevState
      setMissingData((prevState) => !prevState);
      //sets the missing data state to the prevState after 3 seconds
      setTimeout(() => {
        setMissingData((prevState) => !prevState);
      }, 3000);
    } else {
      try {
        await httpClient.post("//localhost:5000/addmaterial", {
          nome,
          quantidade,
          observacao,
          tipo_material,
          projeto,
          dataAquisicao,
        });
        setTimeout(() => {
          setAlert((prevState) => !prevState);
        }, 3000);
        //Sets Variables to their initial state
        resetState();
        //Changes the state of the alert
        setAlert((prevState) => !prevState);
      } catch (e) {
        if (e.response.status === 401) {
          alert("Invalid Material Info");
        }
      }
    }
  };

  //get list of types of materials
  useEffect(() => {
    (async () => {
      try {
        const types = await httpClient.get(
          "//localhost:5000/showtypesmaterials"
        );
        // default choice
        setTipo_material(1);
        setTipos(types.data.types);
      } catch (error) {
        console.log("Error getting types of materials");
      }
    })();
  }, []);

  //get list of projects
  useEffect(() => {
    (async () => {
      try {
        const projects = await httpClient.get("//localhost:5000/showprojects");
        // default choice
        setProjeto("0");
        setProjetos(projects.data.projects);
      } catch (error) {
        console.log("Error getting projects");
      }
    })();
  }, []);

  // read CSV file
  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  // converts file data to JSON
  const csvFileToArray = (string) => {
    var array = string.toString().split("\n");
    var data = [];
    for (const r of array) {
      let row = r.toString().replace("\r", "").split(";");
      data.push(row);
    }
    var heading = data[0];
    var ans_array = [];
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      var obj = {};
      for (var j = 0; j < heading.length; j++) {
        if (!row[j]) {
          row[j] = "NA";
        }
        obj[heading[j].replaceAll(" ", "_")] = row[j]
          .toString()
          .replaceAll(" ", "_");
      }
      ans_array.push(obj);
    }
    setMatList(ans_array);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };
      fileReader.readAsText(file);
    }
  };

  useEffect(() => {
    console.log("use effect mat list", matList);
    addMaterialList();
  }, [matList]);

  const addMaterialList = async (e) => {
    try {
      await httpClient.post("//localhost:5000/addmaterialfile", {
        matList,
      });
    } catch (e) {
      if (e.response.status === 401) {
        alert("Invalid Material List");
      }
    }
  };

  return (
    <div id="layoutSidenav_content">
      <main>
        <div className="container-fluid px-4">
          <h1 className="mt-4">Adicionar Novo Material</h1>
          <div>
            <form>
              <div className="form-floating mb-2">
                <div className="row">
                  <div className="col-md-2">
                    <label>Nome do Material </label>
                  </div>
                  <div className="col-md-10">
                    <input
                      className="form-control"
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      id=""
                    />
                  </div>
                </div>
              </div>
              <div className="form-floating mb-2">
                <div className="row">
                  <div className="col-md-2">
                    <label>Quantidade </label>
                  </div>
                  <div className="col-md-10">
                    <input
                      className="form-control"
                      type="number"
                      value={quantidade}
                      onChange={(e) => setQuantidade(e.target.value)}
                      id=""
                    />
                  </div>
                </div>
              </div>
              <div className="form-floating mb-2">
                <div className="row">
                  <div className="col-md-2">
                    <label>Observações </label>
                  </div>
                  <div className="col-md-10">
                    <input
                      className="form-control"
                      type="text"
                      value={observacao}
                      onChange={(e) => setObservacao(e.target.value)}
                      id=""
                    />
                  </div>
                </div>
              </div>
              <div className="form-floating mb-2">
                <div className="row">
                  <div className="col-md-2">
                    <label>Tipo de Material </label>
                  </div>
                  <div className="col-md-10">
                    <select
                      className="form-select"
                      onChange={(choice) =>
                        setTipo_material(choice.target.value)
                      }
                    >
                      {tipos.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.tipo}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-floating mb-2">
                <div className="row">
                  <div className="col-md-2">
                    <label>Associar a Projeto </label>
                  </div>
                  <div className="col-md-10">
                    <select
                      className="form-select"
                      onChange={(choice) => setProjeto(choice.target.value)}
                    >
                      <option key="0" value="0">
                        Não associar
                      </option>
                      {projetos.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-floating mb-2">
                <div className="row">
                  <div className="col-md-2">
                    <label>Data de Aquisição </label>
                  </div>
                  <div className="col-md-10">
                    <input
                      className="form-control"
                      type="date"
                      id="start"
                      value={dataAquisicao}
                      min="2009-01-01"
                      max="2999-12-31"
                      onChange={(e) => setDataAquisicao(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <button
                className="btn btn-primary"
                type="button"
                onClick={addMaterial}
              >
                Adicionar Material
              </button>
              {alert && (
                <Alert
                  id="alert"
                  tipo={"success"}
                  props={"Material Adicionado com Sucesso"}
                />
              )}
              {missingData && (
                <Alert
                  id="alert"
                  tipo={"danger"}
                  props={"Por Favor Insira Todos os Dados Necessários"}
                />
              )}
            </form>
          </div>
        </div>
        <br />
        <div className="container-fluid px-4">
          <h1 className="mt-4">Adicionar Materiais apartir de ficheiro CSV</h1>
          <p>A primeira linha do ficheiro deve conter os seguintes cabeçalhos:
                [Name, Qty, Type]
          </p>
          <form>
            <input
              type={"file"}
              id={"csvFileInput"}
              accept={".csv"}
              onChange={handleOnChange}
            />

            <button
              className="btn btn-primary"
              onClick={(e) => {
                handleOnSubmit(e);
              }}
            >
              Adicionar Materiais do ficheiro CSV
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
