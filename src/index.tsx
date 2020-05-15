import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import * as swaggerJson from "./swagger.json";

// TODO: Need to research why the wildcard import requires "default" property lookup
ReactDOM.render(
  <React.StrictMode>
    <App spec={swaggerJson.default} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
