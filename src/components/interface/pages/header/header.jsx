import { useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { useSnapshot } from "valtio";
import { cloud, state } from "../../../../common/state";
import { Head } from "./header.style";
import { headerObject } from "./header.svg";

export function Header({ id }) {
  const snap = useSnapshot(state);
  const clip = useSnapshot(cloud);
  const nodeRef = useRef(null);
  let header;
  let text = clip.query;

  useEffect(() => {
    header = nodeRef.current;
    if (header) {
      header.style.transition = "0s";
      header.style.opacity = 1;
      var opacity = 0;
      var intervalID = 0;
      // Fade the Header
      function fadeout() {
        if (id === "404") {
          return;
        } else if (text.length > 0) {
          return;
        } else {
          setInterval(hide, 500);
        }
      }

      function hide() {
        opacity = Number(
          window.getComputedStyle(header).getPropertyValue("opacity")
        );

        if (opacity > 0) {
          opacity = opacity - 0.1;
          header.style.transition = "1s";
          header.style.opacity = opacity;
        } else {
          clearInterval(intervalID);
        }
      }
      if (text.length > 0) {
        return;
      } else {
        setTimeout(fadeout, 1500);
      }
    }
  }, [clip.query, id]);

  const HeaderContent = () => {
    // if (text.length > 0 || (text && id)) {
    //   return headerObject[text] || (<h1 ref={nodeRef}>{text}</h1>)
    // } else if (id && text.length === 0) {
    // }

    return (
      headerObject[text.length > 0 ? text : id] || (
        <h1 ref={nodeRef}>{text.length > 0 ? text : id}</h1>
      )
    );
  };

  // Main return
  return (
    <Draggable
      nodeRef={nodeRef}
      position={snap.optPosition}
      onStart={() => false}
    >
      <Head ref={nodeRef} className="head">
        {HeaderContent()}
      </Head>
    </Draggable>
  );
}
