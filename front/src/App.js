import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Axios from "axios";

function App() {
  var baseUrl = process.env.REACT_APP_DOMAIN;
  React.useEffect(() => {
    Axios.get(baseUrl + "/api/allMateriels")
      .then((r) => console.log(r))
      .catch((e) => console.error(e));
  }, []);
  React.useEffect(() => {
    Axios.post(baseUrl + "/api/addMateriel", {
      name: "clé USB",
      description: "petites mais puissantes",
    })
      .then((r) => console.log(r))
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
