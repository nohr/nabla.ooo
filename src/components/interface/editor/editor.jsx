import { useState } from "react";
import { signInWithGoogle } from "../../../common/api/firebase";
import { useDocumentTitle } from "../pages/utils";
import AboutForm from "./editor.about";
import Form from "./editor.form";
import { ContentPage } from "./editor.style";
import Preview from "./preview";

export default function Editor({ user, container }) {
  const [IDs, setIDs] = useState([]);
  const [name, setName] = useState("");
  const [cover, setCover] = useState("");
  const [content, setContent] = useState([]);
  const [editor, setEditor] = useState(false);
  useDocumentTitle("Editor");
  return (
    <>
      {user ? (
        <ContentPage
          ref={container}
          style={{ paddingTop: "200px", paddingBottom: "60px" }}
        >
          <h1>Editor</h1>
          <button style={{ width: "unset" }} onClick={() => setEditor(!editor)}>
            {!editor ? "Edit Info" : "Edit Projects"}
          </button>
          <br />
          <div className="dash">
            {!editor ? (
              <Form
                IDs={IDs}
                setIDs={setIDs}
                name={name}
                setName={setName}
                user={user}
                Preview={Preview}
                content={content}
                cover={cover}
                setCover={setCover}
                setContent={setContent}
              />
            ) : (
              <AboutForm />
            )}
          </div>
        </ContentPage>
      ) : (
        <ContentPage ref={container}>
          <h1>Be excused</h1>
          <button style={{ width: "50%" }} onClick={signInWithGoogle}>
            Sign in with Google
          </button>
        </ContentPage>
      )}
    </>
  );
}
