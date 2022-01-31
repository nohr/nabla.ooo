import { initializeApp } from "firebase/app"
import { getFirestore, collection, getDocs, orderBy, where, query } from 'firebase/firestore/lite';
// import { getAnalytics } from "firebase/analytics";
import { state } from "./components/UI/state";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_NABLA_7_APIKEY,
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
  state.loading = true;
  const colRef = collection(db, 'portfolio');
  const blogRef = collection(db, 'blog');
  const selfs = query(colRef, orderBy("date", "desc"), where("type", "==", "self"));
  const clients = query(colRef, orderBy("date", "desc"), where("type", "==", "client"));
  const blogs = query(blogRef, orderBy("created", "desc"), where('status', '==', 'LIVE'));
  const selfsSnapshot = await getDocs(selfs);
  const clientsSnapshot = await getDocs(clients);
  const blogSnashot = await getDocs(blogs);
  state.selfs = selfsSnapshot.docs.map(doc => doc.data());
  state.clients = clientsSnapshot.docs.map(doc => doc.data());
  state.blog = blogSnashot.docs.map(doc => doc.data());
  state.loading = false;
}

export async function GetSectors(db, work) {
  state.loading = true;
  const sectorRef = collection(db, "portfolio");
  const sectors = query(sectorRef, orderBy("projectYear", "desc"), where("at", "==", `${work}`));
  const sectorSnapshot = await getDocs(sectors);
  state.sectors = sectorSnapshot.docs.map(doc => doc.data());
  state.loading = false;
}