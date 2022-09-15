import React from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Configure, InstantSearch } from 'react-instantsearch-hooks-web';
import { GetWorks, routing, searchClient, Theme } from "./components/utils/common";
import { cloud } from "./components/utils/state";
import { Router, Switch } from "wouter";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <InstantSearch
    indexName="projects"
    searchClient={searchClient}
    routing={routing}>
    <Configure hitsPerPage={50} />
    <Router>
      <Switch>
        <App tab="home" />
      </Switch>
    </Router>
  </InstantSearch >);

reportWebVitals();
Theme();
GetWorks();