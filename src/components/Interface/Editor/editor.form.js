import { useEffect, useRef, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore/lite";
import { useSnapshot } from "valtio";
import { state } from "../../utils/state";
import {
  clearSelectedName,
  formatDate,
  handleUploadPost,
} from "../../utils/common";
import { db } from "../../utils/Firebase/api";
import {
  handleAddContent,
  handleDeletePost,
} from "../../utils/Firebase/Firebase.service";
// import InstagramEmbed from 'react-instagram-embed';

export default function Form({
  name,
  setName,
  IDs,
  setIDs,
  Preview,
  content,
  setContent,
  cover,
  setCover,
}) {
  const snap = useSnapshot(state);
  const nameInput = useRef(null);
  const dataList = useRef(null);
  const fileInput = useRef(null);
  const [categories, setCategories] = useState([]);
  const [saved, setSaved] = useState(false);
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
  const [selectedFiles, setSelectedFiles] = useState("");
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [TikTokID, setTikTokID] = useState("");
  // const [InstaID, setInstaID] = useState('');
  const [load, setLoad] = useState("5MB Max");
  const [confirm, setConfirm] = useState(false);

  // Hide mobile keyboard on selection
  useEffect(() => {
    if (IDs.indexOf(name) !== -1 && nameInput.current) nameInput.current.blur();
  }, [name, IDs, nameInput]);

  // Get and List document id and categories in datalist
  useEffect(() => {
    (async () => {
      const data = await getDocs(collection(db, "projects"));
      setIDs(data.docs.map((doc) => doc.id));
      setCategories([...new Set(data.docs.map((doc) => doc.data().category))]);
    })();
  }, [setIDs, setCategories]);

  // Populate form with data from firestore when name matches
  useEffect(() => {
    if (IDs.indexOf(name) !== -1) {
      (async () => {
        const docSnap = await getDoc(doc(db, "projects", name));
        if (docSnap.exists()) {
          docSnap.data().date &&
            setDate(formatDate(docSnap.data().date.toDate()));
          setDescription(docSnap.data().description);
          setURL(docSnap.data().url);
          setCategory(docSnap.data().category);
        } else {
          console.log("No such document!");
        }
      })();
    }
  }, [name, IDs]);

  return (
    <>
      <div className="formWrap">
        {saved ? (
          <>
            {" "}
            <p>Changes Saved!</p>
            <button onClick={() => window.location.reload(false)}>
              Post Again
            </button>
          </>
        ) : (
          <form onSubmit={(e) => e.preventDefault()} className="secondary">
            <div className="section">
              Metadata
              <input
                ref={nameInput}
                value={name}
                onChange={(e) => setName(e.target.value)}
                list="names"
                type="text"
                placeholder="Name"
                required
              ></input>
              <button
                type="button"
                onClick={() =>
                  clearSelectedName(
                    nameInput,
                    dataList,
                    setName,
                    setCategory,
                    setDescription,
                    setDate,
                    setContent,
                    setTikTokID,
                    setIsFilePicked,
                    setURL,
                    setSelectedFiles
                  )
                }
              >
                Clear
              </button>
              <datalist id="names" ref={dataList}>
                {IDs.map((name, index) => (
                  <option value={name} key={index} />
                ))}
              </datalist>
              <input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                type="date"
                required
              ></input>
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                list="categories"
                type="text"
                placeholder="Category"
                required
              ></input>
              <datalist id="categories" ref={dataList}>
                {categories.map((category, index) => (
                  <option value={category} key={index} />
                ))}
              </datalist>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="desc"
                type="text"
                placeholder="Description"
              ></textarea>
              <input
                value={url}
                onChange={(e) => setURL(e.target.value)}
                type="text"
                placeholder="Project URL"
              ></input>
            </div>
            <div className="section third">
              Images
              {snap.mobile && (
                <Preview
                  name={name}
                  IDs={IDs}
                  content={content}
                  setContent={setContent}
                  setCover={setCover}
                />
              )}
              <input
                onChange={(e) => {
                  e.target.files.length > 0
                    ? setIsFilePicked(true)
                    : setIsFilePicked(false);
                  setSelectedFiles(e.target.files);
                }}
                multiple
                type="file"
                ref={fileInput}
              ></input>
              {/* <input value={InstaID} onChange={e => setInstaID(e.target.value)} type="text" placeholder='Instagram URL'></input> */}
              {/* <input
                value={TikTokID}
                onChange={(e) => setTikTokID(e.target.value)}
                type="text"
                placeholder="TikTok ID (ie. 7160455716745137413)"
              ></input> */}
              <div className="addContentWrap">
                <button
                  className={`addContent ${!isFilePicked ? "disabled" : ""} ${
                    TikTokID !== "" ? "disabled" : ""
                  }`}
                  type="button"
                  onClick={() =>
                    handleAddContent(
                      selectedFiles,
                      name,
                      setLoad,
                      content,
                      setContent,
                      setIsFilePicked,
                      fileInput,
                      TikTokID,
                      setTikTokID
                    )
                  }
                >
                  Add Content
                </button>
                <p>{load === "5MB Max" ? `${load}` : `${load} uploaded`}</p>
              </div>
            </div>
            <button
              className={`submit ${
                TikTokID !== "" || isFilePicked ? "disabled" : ""
              }`}
              onClick={() =>
                handleUploadPost(
                  name,
                  category,
                  description,
                  date,
                  url,
                  content,
                  cover,
                  setSaved,
                  setContent
                )
              }
              disabled={TikTokID !== "" && isFilePicked}
              type="submit"
            >
              {IDs.indexOf(name) === -1 ? "Upload" : "Save"} Post
            </button>
            {IDs.indexOf(name) !== -1 && (
              <button
                className={`${confirm ? "submit" : "delete"}`}
                onClick={() => setConfirm(!confirm)}
                type="button"
              >
                {confirm ? "Cancel" : "Delete Post"}
              </button>
            )}
            {confirm && (
              <button
                className={`delete`}
                onClick={() => {
                  handleDeletePost(name, setSaved);
                  clearSelectedName(
                    nameInput,
                    dataList,
                    setName,
                    setCategory,
                    setDescription,
                    setDate,
                    setContent,
                    setTikTokID,
                    setIsFilePicked,
                    setURL,
                    setSelectedFiles
                  );
                }}
                type="button"
              >
                Confirm
              </button>
            )}
          </form>
        )}
      </div>
      {!snap.mobile && (
        <Preview
          name={name}
          IDs={IDs}
          content={content}
          setContent={setContent}
          setCover={setCover}
        />
      )}
    </>
  );
}
