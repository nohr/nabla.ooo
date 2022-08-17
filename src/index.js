import React from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from 'react-router-dom'
import { Configure, InstantSearch } from 'react-instantsearch-hooks-web';
import { GetWorks, routing, searchClient, Theme } from "./components/common/utils";
import { cloud } from "./components/common/state";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <InstantSearch
    indexName="projects"
    searchClient={searchClient}
    routing={routing}>
    <Configure hitsPerPage={50} />
    <Router><App tab="home" /></Router>
  </InstantSearch >);

reportWebVitals();
Theme();

if (!cloud.mobile) {
  GetWorks();
}