import React from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Router, Switch } from "wouter";
import { Theme } from "./common/utils";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(

  <Router>
    <Switch>
      <App tab="home" />
    </Switch>
  </Router>
);

reportWebVitals();
Theme();
