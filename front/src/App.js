import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Axios from "axios";

function App() {
  const baseUrl = process.env.REACT_APP_DOMAIN;
  const studentApi = "http://vps-a47222b1.vps.ovh.net:4242/student";
  console.log(baseUrl);

  React.useEffect(() => {
    Axios.get(baseUrl + "/api/allMateriels")
      .then((r) => console.log(r))
      .catch((e) => console.error(e));
  }, []);
  React.useEffect(() => {
    Axios.get(studentApi)
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
