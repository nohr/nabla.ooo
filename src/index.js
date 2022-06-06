import React from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from "firebase/app"
import { getFirestore, collection, getDocs, orderBy, where, query } from "firebase/firestore/lite";
import { state } from "./components/UI/state";
import {
  BrowserRouter as Router, useLocation,
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

// Initialize location and search term
// let value = URLSearchParams.search.slice(8).toLocaleLowerCase().split('&')[0];


// Get works from database
export async function GetWorks(db, term) {
  state.loading = true;
  const colRef = collection(db, "portfolio");
  const selfs = query(colRef, orderBy("date", "desc"), where("type", "==", "self"));
  const clients = query(colRef, orderBy("date", "desc"), where("type", "==", "client"));

  const selfsSnapshot = await getDocs(selfs);
  const clientsSnapshot = await getDocs(clients);
  state.selfs = selfsSnapshot.docs.map(doc => doc.data());
  state.clients = clientsSnapshot.docs.map(doc => doc.data());

  const projectClientsRef = query(colRef, orderBy("name", "asc"), where("name", "!=", null))
  const projectClientsSnapshot = await getDocs(projectClientsRef);
  state.projectClients = projectClientsSnapshot.docs.map(doc => doc.data());

  // TODO: siphon if term is visible
  let projectsRef;
  projectsRef = query(colRef, orderBy("projectName", "asc"))

  if (term) {
    console.log(term);
  }

  const projectsSnapshot = await getDocs(projectsRef);
  projectsSnapshot.docs.map(doc => doc.data()).forEach((one) => {
    state.projects.push(one)
    if (state.mediums.indexOf(one["projectMedium"]) === -1) {
      state.mediums.push(one["projectMedium"])
    }
  })

  state.projects.map(({ projectYear, by }) => {
    let year;
    if (projectYear) {
      year = eval(projectYear.toDate().getFullYear());
      if (state.projectYears.indexOf(year) === -1) {
        state.projectYears.push(year)
        state.projectYears.sort(function (a, b) { if (b) { return b - a } });
      }
    }

    let byInitials = by;
    if (state.by.indexOf(byInitials) === -1) {
      state.by.push(byInitials)
    }
  })
  state.loading = false;
}

GetWorks(db)



async function GetBlog(db) {
  state.loading = true;
  const blogRef = collection(db, "blog");
  const blogs = query(blogRef, orderBy("created", "desc"), where("status", "==", "LIVE"));
  const blogSnashot = await getDocs(blogs);
  state.blog = blogSnashot.docs.map(doc => doc.data());
  state.loading = false;
}

export async function GetSiteInfo(db) {
  const siteRef = collection(db, "siteinfo");
  const siteinfoSnapshot = await getDocs(siteRef);
  let quotes = siteinfoSnapshot.docs.map(doc => doc.data())[0].quotes;
  // Randomize Quotes
  const random = Math.floor(Math.random() * quotes.length);
  state.quotes = quotes[random];
}
GetSiteInfo(db);

export async function GetSectors(db, work) {
  state.loading = true;
  const sectorRef = collection(db, "portfolio");
  const sectors = query(sectorRef, orderBy("projectYear", "desc"), where("at", "==", `${work}`));
  const sectorSnapshot = await getDocs(sectors);
  state.sectors = sectorSnapshot.docs.map(doc => doc.data());

  state.loading = false;
}
// Themes
export function Themes() {
  // Theme to prefrence and listen for changes
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches && !state.themeChanged ?
    (state.theme = "dark") : (state.theme = "light")
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",
    e => e.matches ? (state.theme = "dark") : (state.theme = "light") // listener
  );
}
Themes();