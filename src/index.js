import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {  HashRouter } from "react-router-dom";
import ContextProvider from "./Context/ContextOPen";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </ContextProvider>
  </React.StrictMode>
);
