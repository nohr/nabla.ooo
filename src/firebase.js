import { initializeApp } from "firebase/app"
import { getFirestore, collection, getDocs, orderBy, where, query } from 'firebase/firestore/lite';
// import { getAnalytics } from "firebase/analytics";
import { state } from "./components/UI/state";

const API_KEY = process.env.FIREBASE_NABLA_7_APIKEY
const firebaseConfig = {
  apiKey: API_KEY,
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
  const projects = query(colRef, orderBy("date", "desc"));
  const projectsSnapshot = await getDocs(projects);
  state.works = projectsSnapshot.docs.map(doc => doc.data());
  state.loading = false;
}

export async function GetSectors(db, work) {
  state.loading = true;
  const sectorRef = collection(db, "portfolio");
  const sectors = query(sectorRef, orderBy("projectYear", "desc"), where("at", "==", `${work}`));
  const sectorSnapshot = await getDocs(sectors);
  state.sectors = sectorSnapshot.docs.map(doc => doc.data());
  state.loading = false;
  console.log(state.sectors);
}