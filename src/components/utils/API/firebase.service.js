import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
  where,
} from "firebase/firestore/lite";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { cloud, state } from "../state";
import { app } from "./firebase";

export const db = getFirestore(app);
export const storage = getStorage(app);
// export const auth = getAuth(app);
// export const provider = new GoogleAuthProvider();
// export const signInWithGoogle = () => signInWithPopup(auth, provider);

//FIREBASE
export async function GetWorks() {
  if (navigator.onLine) {
    cloud.UILoading = true;
    const colRef = collection(db, "portfolio");
    const projects = query(colRef, orderBy("projectYear", "desc"));
    const types = query(colRef, orderBy("date", "desc"));

    const collectionSnapshot = await getDocs(colRef);
    const projectsSnapshot = await getDocs(projects);
    const typesSnapshot = await getDocs(types);

    cloud.collection = collectionSnapshot.docs.map((doc) => doc.data());
    console.log(cloud.collection);
    cloud.projects = projectsSnapshot.docs.map((doc) => doc.data());
    cloud.types = typesSnapshot.docs.map((doc) => doc.data());
    cloud.UILoading = false;
  } else {
    return;
  }
}
export async function GetQuotes() {
  if (navigator.onLine) {
    const siteRef = collection(db, "siteinfo");
    const siteinfoSnapshot = await getDocs(siteRef);
    let quotes = siteinfoSnapshot.docs.map((doc) => doc.data())[0].quotes;
    // Randomize Quotes
    const random = Math.floor(Math.random() * quotes.length);
    return quotes[random];
  }
}
export async function newQuote() {
  GetQuotes().then((res) => {
    state.quotes = res;
  });
}
export async function GetSectors(id) {
  cloud.UILoading = true;
  const sectorRef = collection(db, "portfolio");
  const sectors = query(
    sectorRef,
    orderBy("projectYear", "desc"),
    where("at", "==", `${id}`)
  );
  const sectorSnapshot = await getDocs(sectors);
  cloud.sectors = sectorSnapshot.docs.map((doc) => doc.data());
  cloud.UILoading = false;
}
export async function GetSector(lot) {
  cloud.UILoading = true;
  const sectorRef = collection(db, "portfolio");
  const sector = query(sectorRef, where("lot", "==", `${lot}`));
  const sectorSnapshot = await getDocs(sector);
  cloud.sector = sectorSnapshot.docs.map((doc) => doc.data());
  cloud.UILoading = false;
}
export async function GetStore() {
  cloud.UILoading = true;
  const storeRef = collection(db, "portfolio");
  const items = query(
    storeRef,
    orderBy("productName", "desc"),
    where("productName", "!=", null)
  );
  const storeSnapshot = await getDocs(items);
  state.store = storeSnapshot.docs.map((doc) => doc.data());
  cloud.UILoading = false;
}
export async function GetBlog() {
  cloud.UILoading = true;
  const blogRef = collection(db, "blog");
  const blogs = query(
    blogRef,
    orderBy("created", "desc"),
    where("status", "==", "LIVE")
  );
  const blogSnashot = await getDocs(blogs);
  state.blog = blogSnashot.docs.map((doc) => doc.data());
  cloud.UILoading = false;
}

export function LoadSong(current, song) {
  let audio = current.current;
  getDownloadURL(
    ref(storage, `gs://nabla7.appspot.com/assets/songs/${song.name}.mp3`)
  )
    .then((url) => {
      cloud.songs[state.songIndex].url = url;
      audio.setAttribute("src", url);
      cloud.playMusic = true;
      audio.play();
    })
    .catch((error) => {
      console.log(error);
    });
}
