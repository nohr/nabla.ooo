import React, { useRef, useEffect, memo } from "react";
import { cloud, state } from "../../../common/state";
import { useSnapshot } from "valtio";
import Draggable from "react-draggable";
import { motion } from "framer-motion";
import PageData from "./pageData";
import { handleKeyPress, Next, Prev, useDocumentTitle } from "./utils";
import { Container, Control } from "./page.style";
import Info from "./routes/info";
import Home from "./routes/home";
import Store from "./routes/store";
import Contrast from "./routes/contrast";
import NotFound from "./routes/notFound";
import { Header } from "./header/header";

export function Page({
  id,
  lot,
  title,
  container,
  hovered,
  setHovered,
  confirm,
}) {
  useDocumentTitle(title);
  const clip = useSnapshot(cloud);
  const snap = useSnapshot(state);
  let opacity = clip.query.length > 0 ? "0" : clip.drag || hovered ? 0.3 : "1";
  let pointerEvents = clip.query.length ? "none" : hovered ? "none" : "all";
  let transition = clip.query.length ? "0.3s" : hovered ? "0.3s" : "unset";
  let margin = clip.mobile
    ? `padding-top: 200px !important; `
    : snap.direction
    ? `padding-top: 0px !important; `
    : `padding-left: 300px !important; `;

  useEffect(() => {
    setHovered(false);
  }, [setHovered]);

  useEffect(() => {
    cloud.selectedImg = null;
    cloud.selectedDesc = null;
  }, [id]);

  // Manage modals
  useEffect(() => {
    window.addEventListener("keyup", handleKeyPress);
    return () => {
      window.removeEventListener("keyup", handleKeyPress);
    };
  });

  //Toggle active panel buttons
  // useEffect(() => {});
  if (id === "Home") {
    return (
      <Home
        container={container}
        opacity={opacity}
        pointerEvents={pointerEvents}
        transition={transition}
      />
    );
  } else if (id === "Info") {
    return (
      <Info
        container={container}
        opacity={opacity}
        pointerEvents={pointerEvents}
        transition={transition}
      />
    );
  } else if (id === "Store") {
    return (
      <Store
        container={container}
        opacity={opacity}
        pointerEvents={pointerEvents}
        transition={transition}
        confirm={confirm}
      />
    );
  } else if (id === "Contrast") {
    return (
      <Contrast
        container={container}
        opacity={opacity}
        pointerEvents={pointerEvents}
        transition={transition}
      />
    );
  } else if (id === "NotFound") {
    return (
      <NotFound
        container={container}
        opacity={opacity}
        pointerEvents={pointerEvents}
        transition={transition}
      />
    );
  } else {
    return (
      <>
        <Header id={id} />
        <Container
          ref={container}
          className="container"
          opacity={opacity}
          pointerEvents={pointerEvents}
          transition={transition}
          margin={margin}
        >
          <PageData lot={lot} />
          {clip.selectedImg ? <Modal container={container} /> : null}
        </Container>
      </>
    );
  }
}
// Get current index in image array
let num;
const Modal = memo(function Modal({ container }) {
  const snap = useSnapshot(state);
  const clip = useSnapshot(cloud);
  const nodeRef = useRef(null);

  const handleClick = (e) => {
    if (e.target.classList.contains("backdrop")) {
      cloud.selectedImg = null;
    }
  };
  const onControlledDrag = (e, position) => {
    let { x, y } = position;
    state.modalPosition = { x, y };
  };

  function Video() {
    if (clip.selectedImg.orientation === "portrait") {
      return (
        <motion.video
          style={{
            height: "100%",
          }}
          key={`${Math.random()}`}
          autoPlay={true}
          playsInline
          preload={"none"}
          poster={
            clip.selectedImg.poster ? `${clip.selectedImg.poster}` : false
          }
          loop={true}
          muted={true}
          src={`${clip.selectedImg.url}`}
        >
          {"portrait"}
        </motion.video>
      );
    } else if (clip.selectedImg.orientation === "landscape") {
      return (
        <motion.video
          className={"landscape"}
          key={`${Math.random()}`}
          autoPlay={true}
          playsInline
          controls
          preload={"none"}
          poster={
            clip.selectedImg.poster ? `${clip.selectedImg.poster}` : false
          }
          loop={true}
          muted={false}
          src={`${clip.selectedImg.url}`}
        >
          {"landscape"}
        </motion.video>
      );
    }
  }

  function Controls() {
    num = clip.work.content.indexOf(clip.selectedImg);
    return (
      <>
        {clip.work.content[num - 1] && (
          <Control
            left="20px"
            onClick={() => {
              Prev();
            }}
          >
            prev
          </Control>
        )}
        {clip.work.content[num + 1] && (
          <Control
            right="20px"
            onClick={() => {
              Next();
            }}
          >
            next
          </Control>
        )}
      </>
    );
  }

  return (
    <div className="modalWrapper" ref={container}>
      <Controls />
      <motion.div
        className="backdrop"
        onClick={handleClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {clip.selectedImg.caption !== "" && (
          <div className="description">
            <p>{clip.selectedImg.caption}</p>
          </div>
        )}
        {clip.selectedImg.type === "video" ? (
          Video()
        ) : (
          //Image
          <Draggable
            nodeRef={nodeRef}
            bounds="body"
            position={snap.modalPosition}
            onDrag={onControlledDrag}
          >
            <motion.object
              ref={nodeRef}
              data={clip.selectedImg.url}
              alt="full content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            ></motion.object>
          </Draggable>
        )}
      </motion.div>
    </div>
  );
});
