import { useEffect, useRef, useState } from "react";
import { useSnapshot } from "valtio";
import { cloud } from "../../../common/state";
import { clearSelectedName, formatDate, handleUploadPost } from "./utils";
import {
  fillFormData,
  getFormLists,
  handleAddContent,
  handleDeletePost,
} from "../../../common/api/firebase.editor";

function ProjectEditor({
  name,
  setName,
  user,
  IDs,
  setIDs,
  Preview,
  content,
  setContent,
  cover,
  setCover,
  setSaved,
}) {
  const clip = useSnapshot(cloud);
  const nameInput = useRef(null);
  const dataList = useRef(null);
  const fileInput = useRef(null);
  const [categories, setCategories] = useState([]);
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [client, setClient] = useState("");
  const [checked, setChecked] = useState(false);
  const [description, setDescription] = useState("");
  const [program, setProgram] = useState("");
  const [programArray, setProgramArray] = useState([]);
  const [url, setURL] = useState("");
  const [caption, setCaption] = useState("");
  const [orientation, setOrientation] = useState("");
  const [selectedFiles, setSelectedFiles] = useState("");
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [load, setLoad] = useState("5MB Max");
  const [confirm, setConfirm] = useState(false);

  // Hide mobile keyboard on selection
  useEffect(() => {
    if (IDs.indexOf(name) !== -1 && nameInput.current) nameInput.current.blur();
  }, [name, IDs, nameInput]);

  // Get and List document id and categories in datalist
  useEffect(() => {
    getFormLists(setIDs, setCategories);
  }, [setIDs, setCategories]);

  // Populate form with data from firestore when name matches
  useEffect(() => {
    fillFormData(
      IDs,
      name,
      setDate,
      setChecked,
      setCategory,
      setClient,
      setDescription,
      setURL,
      setProgramArray,
      formatDate
    );
  }, [name, IDs]);

  useEffect(() => {
    return () => {
      setName("");
      clearSelectedName(
        nameInput,
        dataList,
        setName,
        setChecked,
        setCategory,
        setClient,
        setDescription,
        setDate,
        setProgram,
        setProgramArray,
        setContent,
        setIsFilePicked,
        setURL,
        setSelectedFiles
      );
      setContent([]);
    };
  }, [setContent, setName]);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="secondary">
      <div className="section">
        Metadata
        <div className="nameGroup">
          <input
            ref={nameInput}
            value={name}
            onChange={(e) => setName(e.target.value)}
            list="names"
            type="text"
            placeholder="Name"
            className="name"
            required
          ></input>
          <input
            type="checkbox"
            id="published"
            name="published"
            className="published"
            value={checked}
            onChange={(e) => setChecked(e.target.checked)}
          ></input>
        </div>
        <button
          type="button"
          onClick={() =>
            clearSelectedName(
              nameInput,
              dataList,
              setName,
              setChecked,
              setCategory,
              setClient,
              setDescription,
              setDate,
              setProgram,
              setProgramArray,
              setContent,
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
          value={client}
          onChange={(e) => {
            setClient(e.target.value);
            console.log(e.target.value);
          }}
          type="text"
          placeholder="Client"
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
        <input
          value={program}
          onChange={(e) => setProgram(e.target.value)}
          type="text"
          placeholder="Add Program"
        ></input>
        <button
          type="button"
          onClick={() => {
            setProgramArray([...programArray, program.toLowerCase()]);
            setProgram("");
          }}
        >
          Add Program
        </button>
        {programArray !== [] && (
          <ul>
            {programArray.map((program, index) => (
              <li
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setProgramArray(
                    programArray.filter((item) => item !== program)
                  );
                }}
              >
                {program}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="section third">
        Images
        {clip.mobile && (
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
            console.log(e.target.files[0].type);
          }}
          multiple
          type="file"
          ref={fileInput}
          className="fileInput"
        ></input>
        <div className="fileGroup">
          {isFilePicked ? (
            <input
              onChange={(e) => setCaption(e.target.value)}
              type="text"
              placeholder="Caption"
            ></input>
          ) : null}
          {selectedFiles[0] &&
          selectedFiles[0].type.split("/")[0] === "video" ? (
            <input
              onChange={(e) => setOrientation(e.target.value)}
              type="text"
              placeholder="Orientation"
              value={orientation}
            ></input>
          ) : null}
        </div>
        <div className="addContentWrap">
          <button
            className={`addContent ${!isFilePicked ? "disabled" : ""}`}
            type="button"
            onClick={() => {
              handleAddContent(
                selectedFiles,
                name,
                setLoad,
                content,
                setContent,
                caption,
                orientation,
                setIsFilePicked,
                fileInput
              );
              setCaption("");
            }}
          >
            Add Content
          </button>
          <p>{load === "5MB Max" ? `${load}` : `${load} uploaded`}</p>
        </div>
      </div>
      <button
        className={`submit ${isFilePicked ? "disabled" : ""}`}
        onClick={() =>
          handleUploadPost(
            name,
            checked,
            user,
            client,
            category,
            description,
            date,
            url,
            programArray,
            content,
            cover,
            setSaved,
            setContent
          )
        }
        disabled={isFilePicked}
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
              setChecked,
              setCategory,
              setClient,
              setDescription,
              setDate,
              setProgram,
              setProgramArray,
              setContent,
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
  );
}

export default function Form({
  name,
  setName,
  user,
  IDs,
  setIDs,
  Preview,
  content,
  setContent,
  cover,
  setCover,
}) {
  const clip = useSnapshot(cloud);
  const [saved, setSaved] = useState(false);

  return (
    <>
      <div className="formWrap">
        {saved ? (
          <>
            <p>Changes Saved!</p>
            <button onClick={() => setSaved(false)}>Post Again</button>
          </>
        ) : (
          <ProjectEditor
            name={name}
            setName={setName}
            user={user}
            IDs={IDs}
            setIDs={setIDs}
            Preview={Preview}
            content={content}
            setContent={setContent}
            cover={cover}
            setCover={setCover}
            setSaved={setSaved}
          />
        )}
      </div>
      {!clip.mobile && (
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
