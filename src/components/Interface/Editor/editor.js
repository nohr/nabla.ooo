import { useState } from "react";
import { signInWithGoogle } from "../../utils/Firebase/api";
import AboutForm from "./editor.about";
import Form from "./editor.form";
import { ContentPage } from "./editor.style";
import Preview from "./preview";
// import InstagramEmbed from 'react-instagram-embed';

export default function Editor({ user, marginTop }) {
  const [IDs, setIDs] = useState([]);
  const [name, setName] = useState("");
  const [cover, setCover] = useState("");
  const [content, setContent] = useState([]);
  const [editor, setEditor] = useState(false);

  return (
    <>
      {user ? (
        <ContentPage style={{ marginTop: marginTop, paddingBottom: "60px" }}>
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
        <ContentPage style={{ marginTop: marginTop }}>
          <h1>Editor</h1>
          <button style={{ width: "50%" }} onClick={signInWithGoogle}>
            Sign in with Google
          </button>
        </ContentPage>
      )}
    </>
  );
}
