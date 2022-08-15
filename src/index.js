import React from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from "firebase/app"
import {
  getFirestore,
  collection,
  getDocs,
  orderBy,
  where,
  query
} from "firebase/firestore/lite";
import { state, cloud } from "./components/UI/state";
import {
  BrowserRouter as Router,
} from 'react-router-dom'
import { getStorage } from "firebase/storage";

// Search Imports
import { history } from 'instantsearch.js/es/lib/routers';
import { Configure, InstantSearch } from 'react-instantsearch-hooks-web';
import algoliasearch from "algoliasearch"

const container = document.getElementById("root");
const root = createRoot(container);

// Search
const searchClient = algoliasearch('QYRMFVSZ3U', 'a5bc9e2f6d2b720f636a828233179a8f');
const indexName = 'projects';
const routing = {
  router: history(),
  stateMapping: {
    stateToRoute(uiState) {
      const indexUiState = uiState[indexName];
      return {
        query: indexUiState.query,
        // categories: indexUiState.menu?.categories,
        // brand: indexUiState.refinementList?.refinementList.brand,
        // page: indexUiState.page,
      };
    },
    routeToState(routeState) {
      return {
        [indexName]: {
          query: routeState.query,
          // menu: {
          //   categories: routeState.categories,
          // },
          // refinementList: {
          //   brand: routeState.brand,
          // },
          // page: routeState.page,
        },
      };
    },
  },
};

root.render(
  <InstantSearch
    searchClient={searchClient}
    indexName="projects"

    routing={routing}>
    <Configure hitsPerPage={200} />
    <Router><App tab="home" /></Router>
  </InstantSearch >);

reportWebVitals();

const x = window.matchMedia("(max-width: 760px)");
cloud.mobile = x.matches;

const firebaseConfig = {
  apiKey: "AIzaSyCEs-MUh6kHufZ5aKwGV1shjq-t85PhYFk",
  authDomain: "nabla7.firebaseapp.com",
  projectId: "nabla7",
  storageBucket: "nabla7.appspot.com",
  messagingSenderId: "22669283456",
  appId: "1:22669283456:web:ebd01b9cc2653ea9e7d665",
  measurementId: "G-FQ3S1GMV92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Get works from database
export async function GetWorks(db) {
  if (navigator.onLine) {
    cloud.UILoading = true;
    const colRef = collection(db, "portfolio");
    const projects = query(colRef, orderBy("projectYear", "desc"), where("projectYear", "!=", null));
    const selfs = query(colRef, orderBy("date", "desc"), where("type", "==", "self"));
    const clients = query(colRef, orderBy("date", "desc"), where("type", "==", "client"));

    const projectsSnapshot = await getDocs(projects);
    const selfsSnapshot = await getDocs(selfs);
    const clientsSnapshot = await getDocs(clients);
    cloud.projects = projectsSnapshot.docs.map(doc => doc.data());
    cloud.selfs = selfsSnapshot.docs.map(doc => doc.data());
    cloud.clients = clientsSnapshot.docs.map(doc => doc.data());

    const projectClientsRef = query(colRef, orderBy("name", "asc"), where("name", "!=", null))
    const projectClientsSnapshot = await getDocs(projectClientsRef);
    state.projectClients = projectClientsSnapshot.docs.map(doc => doc.data());

    cloud.UILoading = false;
  } else {
    return;
  }

}
GetWorks(db);

async function GetBlog(db) {
  cloud.UILoading = true;
  const blogRef = collection(db, "blog");
  const blogs = query(blogRef, orderBy("created", "desc"), where("status", "==", "LIVE"));
  const blogSnashot = await getDocs(blogs);
  state.blog = blogSnashot.docs.map(doc => doc.data());
  cloud.UILoading = false;
}
export async function GetQuotes(db) {
  if (navigator.onLine) {
    const siteRef = collection(db, "siteinfo");
    const siteinfoSnapshot = await getDocs(siteRef);
    let quotes = siteinfoSnapshot.docs.map(doc => doc.data())[0].quotes;
    // Randomize Quotes
    const random = Math.floor(Math.random() * quotes.length);
    return quotes[random];
  }
}
export async function newQuote() {
  cloud.UILoading = true;
  GetQuotes(db).then(res => {
    cloud.quotes = res;
    cloud.UILoading = false;
  });
}

export async function GetSectors(db, work) {
  cloud.UILoading = true;
  const sectorRef = collection(db, "portfolio");
  const sectors = query(sectorRef, orderBy("projectYear", "desc"), where("at", "==", `${work}`));
  const sectorSnapshot = await getDocs(sectors);
  cloud.sectors = sectorSnapshot.docs.map(doc => doc.data());
  cloud.UILoading = false;
}

export async function GetStore() {
  cloud.UILoading = true;
  const storeRef = collection(db, "portfolio");
  const items = query(storeRef, orderBy("productName", "desc"), where("productName", '!=', null));
  const storeSnapshot = await getDocs(items);
  state.store = storeSnapshot.docs.map(doc => doc.data());
  cloud.UILoading = false;
}

// Themes

function Theme() {
  // Theme to prefrence and listen for changes if no cache
  if (state.cached) {
    document.getElementById("theme-color").setAttribute("media", "");
    document.getElementById("theme-color").setAttribute("content", (state.theme === "light") ? state.light.sky : (state.dark.sky));
  } else {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.getElementById("theme-color").setAttribute("media", "");
      document.getElementById("theme-color").setAttribute("content", state.dark.sky);
      state.theme = "dark";
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
      document.getElementById("theme-color").setAttribute("media", "");
      document.getElementById("theme-color").setAttribute("content", state.light.sky);
      state.theme = "light";
    }
  }

  // Themelistener
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
    document.getElementById("theme-color").setAttribute("content", (!e.matches) ? state.light.sky : state.dark.sky);
    return e.matches ? (state.theme = "dark") : (state.theme = "light");
  })
}
Theme();