import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {value} from './firebase';
import { IContext } from "./interface/global";

export const Context = createContext<IContext>(value);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Context.Provider value={value}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Context.Provider>
);
