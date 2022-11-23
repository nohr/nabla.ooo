import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore/lite";
import { getDownloadURL, ref } from "firebase/storage";
import { cloud, state } from "../state";
import { db, storage } from "./firebase";

//FIREBASE
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
export async function GetSectors(client) {
  cloud.UILoading = true;
  const sectorSnapshot = await getDocs(query(
    collection(db, "projects"),
    orderBy("date", "desc"),
    where("client", "==", `${client}`)
  ));
  cloud.sectors = sectorSnapshot.docs.map((doc) => doc.data());
  cloud.UILoading = false;
}
export async function GetSector(lot) {
  cloud.UILoading = true;
  const sectorSnapshot = await getDocs(query(collection(db, "projects"), where("lot", "==", `${lot}`)));
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
