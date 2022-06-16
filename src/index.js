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

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Router><App tab="home" /></Router>);

reportWebVitals();

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


// Get works from database
export async function GetWorks(db) {
  if (navigator.onLine) {
    cloud.loading = true;
    const colRef = collection(db, "portfolio");
    const selfs = query(colRef, orderBy("date", "desc"), where("type", "==", "self"));
    const clients = query(colRef, orderBy("date", "desc"), where("type", "==", "client"));

    const selfsSnapshot = await getDocs(selfs);
    const clientsSnapshot = await getDocs(clients);
    cloud.selfs = selfsSnapshot.docs.map(doc => doc.data());
    cloud.clients = clientsSnapshot.docs.map(doc => doc.data());

    const projectClientsRef = query(colRef, orderBy("name", "asc"), where("name", "!=", null))
    const projectClientsSnapshot = await getDocs(projectClientsRef);
    state.projectClients = projectClientsSnapshot.docs.map(doc => doc.data());

    cloud.loading = false;
  } else {
    return;
  }

}
GetWorks(db)

async function GetBlog(db) {
  cloud.loading = true;
  const blogRef = collection(db, "blog");
  const blogs = query(blogRef, orderBy("created", "desc"), where("status", "==", "LIVE"));
  const blogSnashot = await getDocs(blogs);
  state.blog = blogSnashot.docs.map(doc => doc.data());
  cloud.loading = false;
}

export async function GetSiteInfo(db) {
  if (navigator.onLine) {
    const siteRef = collection(db, "siteinfo");
    const siteinfoSnapshot = await getDocs(siteRef);
    let quotes = siteinfoSnapshot.docs.map(doc => doc.data())[0].quotes;
    // Randomize Quotes
    const random = Math.floor(Math.random() * quotes.length);
    state.quotes = quotes[random];
  } else if (state.cached) {
    state.quotes = state.quotes;
  } else {
    return;
  }
}
GetSiteInfo(db);

export async function GetSectors(db, work) {
  cloud.loading = true;
  const sectorRef = collection(db, "portfolio");
  const sectors = query(sectorRef, orderBy("projectYear", "desc"), where("at", "==", `${work}`));
  const sectorSnapshot = await getDocs(sectors);
  cloud.sectors = sectorSnapshot.docs.map(doc => doc.data());
  cloud.loading = false;
}

export async function GetStore() {
  cloud.loading = true;
  const storeRef = collection(db, "portfolio");
  const items = query(storeRef, orderBy("productName", "desc"), where("productName", '!=', null));
  const storeSnapshot = await getDocs(items);
  state.store = storeSnapshot.docs.map(doc => doc.data());
  cloud.loading = false;
}
GetStore();

// Themes
// Theme to prefrence and listen for changes if no cache
if (state.cached) {
  state.theme = state.theme;
} else {
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches && !state.themeChanged ?
    (state.theme = "dark") : (state.theme = "light")
}

console.log(state.themeChanged);

// listener
!state.themeChanged ? (window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",
  e => e.matches ? (state.theme = "dark") : (state.theme = "light")
)) :
  // TODO: change pwa header on theme change
  state.theme === 'light' ? (state.theme = "light") : (state.theme = "dark");
