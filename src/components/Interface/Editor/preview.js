import { useEffect, useState } from "react";
import { generateElement } from "../../utils/common";
import {
  handleDeleteContent,
  handleGetProjectData,
} from "../../utils/Firebase/Firebase.service";

export default function Preview({ content, setContent, name, IDs, setCover }) {
  const [preview, setPreview] = useState(
    `Upload and click 'Add Image' to preview.`
  );
  // set the cover image when the content changes
  useEffect(() => {
    if (content.length > 0) {
      // go through the content array, stop and set the first image as the cover
      for (let i = 0; i < content.length; i++) {
        if (content[i].type === "image") {
          setCover(content[i].url);
          break;
        }
      }
    } else {
      setCover("");
    }
  }, [content, name, setCover]);

  // Set the preview content when the document matches from the database
  useEffect(() => {
    // Set the content to the data from the database if the name matches an ID
    if (IDs.indexOf(name) !== -1) {
      // get the data from the database
      handleGetProjectData(name, setContent);
    }
  }, [name, IDs, setContent]);

  // Set the preview when the content array changes
  useEffect(() => {
    // change the preview when the name changes
    if (content.length > 0) {
      setPreview(
        content.map((item, index) => {
          return (
            <div className="previewContent" key={index}>
              {" "}
              {generateElement(item, index)}
              <button
                className={`delete`}
                style={{ width: "min-content" }}
                onClick={() =>
                  handleDeleteContent(item, name, content, setContent)
                }
                type="button"
              >
                Delete {item.type}
              </button>
            </div>
          );
        })
      );
    } else {
      setPreview(`Upload and click 'Add Image' to preview.`);
    }
  }, [content, name, IDs, setContent]);

  return <div className="slideshow">{preview}</div>;
}
