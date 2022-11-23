import { useState } from "react";
import { useSnapshot } from "valtio";
import { uploadAbout } from "../../../common/api/firebase.editor";
import { state } from "../../../common/state";

export default function AboutForm() {
  const snap = useSnapshot(state);
  const [saved, setSaved] = useState(false);
  const [file, setFile] = useState("");

  return (
    <div className="formWrap">
      {saved ? (
        <>
          <p>Changes Saved!</p>
          <button onClick={() => window.location.reload(false)}>
            Post Again
          </button>
        </>
      ) : (
        <div className="about-form">
          <h1>Info</h1>
          <label htmlFor="about">Text</label>
          <textarea
            name="about"
            id="about"
            cols="20"
            rows="10"
            placeholder="About"
            value={snap.about}
            onChange={(e) => (state.about = e.target.value)}
          ></textarea>
          <br />
          <label htmlFor="file">Photo</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <br />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="Email"
            value={snap.email}
            onChange={(e) => (state.email = e.target.value)}
          />
          <br />
          <button
            onClick={() => {
              uploadAbout(file, snap);
              setSaved(true);
            }}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
