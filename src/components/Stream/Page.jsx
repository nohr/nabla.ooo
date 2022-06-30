import React, { useRef, useEffect, memo } from "react";
import { cloud, state } from "../UI/state";
import { useSnapshot } from "valtio";
import styled from "styled-components";
import "../../App.css";
import Draggable from "react-draggable";
import { motion } from "framer-motion";
import PageData from "./PageData";
import useDocumentTitle from "../UI/documentTitle";
import { Header } from "../UI/svg";
import Info from "./Info";
import Store from "./Store";
import Blog from "./Blog";
import Contrast from "./Contrast";
import Home from "./Home";
import NotFound from "./NotFound";
import { useSearchBox } from "react-instantsearch-hooks-web";

export function Page(id) {
  useDocumentTitle(id.title);
  const { query } = useSearchBox();
  const clip = useSnapshot(cloud);
  let opacity = query.length > 0 ? "0" : "1";
  let pointerEvents = query.length ? "none" : "all";
  let transition = query.length ? "0.3s" : "unset";

  //Toggle active panel buttons
  useEffect(() => {});
  if (id.id === "Home") {
    return <Home />;
  } else if (id.id === "Info") {
    return (
      <Info
        opacity={opacity}
        pointerEvents={pointerEvents}
        transition={transition}
      />
    );
  } else if (id.id === "Store") {
    return (
      <Store
        opacity={opacity}
        pointerEvents={pointerEvents}
        transition={transition}
      />
    );
  } else if (id.id === "Blog") {
    return (
      <Blog
        opacity={opacity}
        pointerEvents={pointerEvents}
        transition={transition}
      />
    );
  } else if (id.id === "Contrast") {
    return (
      <Contrast
        opacity={opacity}
        pointerEvents={pointerEvents}
        transition={transition}
      />
    );
  } else if (id.id === "NotFound") {
    return (
      <NotFound
        opacity={opacity}
        pointerEvents={pointerEvents}
        transition={transition}
      />
    );
  } else {
    return (
      <>
        <Header id={id.id} />
        <Container
          className="container"
          opacity={opacity}
          pointerEvents={pointerEvents}
          transition={transition}
          // padding={padding}
        >
          <PageData id={id.id} />
          {clip.selectedImg ? <Modal /> : null}
        </Container>
      </>
    );
  }
}
// Get current index in image array
let num;
export function Next() {
  num = cloud.work.images.indexOf(cloud.selectedImg);
  if (cloud.work.images[num + 1]) {
    if (num !== -1) {
      num += 1;
      cloud.selectedImg = cloud.work.images[num];
      cloud.selectedDesc = cloud.work.description[num];
    }
  }
}

export function Prev() {
  num = cloud.work.images.indexOf(cloud.selectedImg);
  if (cloud.work.images[num - 1]) {
    if (num !== -1) {
      num -= 1;
      cloud.selectedImg = cloud.work.images[num];
      cloud.selectedDesc = cloud.work.description[num];
    }
  }
}

const Modal = memo(function Modal() {
  const snap = useSnapshot(state);
  const clip = useSnapshot(cloud);
  const nodeRef = useRef(null);
  const descRef = useRef(null);
  // Get enxtentions of files
  const types = new Map([
    ["jpg", "img"],
    ["jpeg", "img"],
    ["png", "img"],
    ["gif", "img"],
    ["mp4", "video"],
    ["svg", "svg"],
  ]);
  const link = new URL(`${clip.selectedImg}`);
  const extension = link.pathname.split(".");
  const element = types.get(extension[extension.length - 1].toLowerCase());

  const handleClick = (e) => {
    if (e.target.classList.contains("backdrop")) {
      cloud.selectedImg = null;
      cloud.selectedDesc = null;
    }
  };
  const onControlledDrag = (e, position) => {
    let { x, y } = position;
    state.modalPosition = { x, y };
  };

  function Video() {
    if (clip.work.orientation === "portrait") {
      return (
        <video
          style={{
            height: "100%",
          }}
          key={`${Math.random()}`}
          autoPlay={true}
          playsInline
          preload={"none"}
          poster={`${clip.work.poster}`}
          loop={true}
          muted={true}
          src={`${clip.selectedImg}`}
        >
          {"portrait"}
        </video>
      );
    } else if (clip.work.orientation === "landscape") {
      return (
        <video
          className={"landscape"}
          key={`${Math.random()}`}
          autoPlay={true}
          playsInline
          controls
          preload={"none"}
          poster={clip.work.poster ? `${clip.work.poster}` : false}
          loop={true}
          muted={false}
          src={`${clip.selectedImg}`}
        >
          {"landscape"}
        </video>
      );
    }
  }

  function Controls() {
    num = clip.work.images.indexOf(clip.selectedImg);
    return (
      <>
        {clip.work.images[num - 1] && (
          <Control
            left="20px"
            onClick={() => {
              Prev();
            }}
          >
            prev
          </Control>
        )}
        {clip.work.images[num + 1] && (
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
    <>
      <Controls />
      <motion.div
        className="backdrop"
        onClick={handleClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {clip.selectedDesc && (
          <Draggable
            nodeRef={descRef}
            bounds="body"
            position={snap.modalPosition}
            onDrag={onControlledDrag}
          >
            <div className="description" ref={descRef}>
              <p>{clip.selectedDesc}</p>
            </div>
          </Draggable>
        )}
        {element === "video" ? (
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
              data={clip.selectedImg}
              alt="full content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            ></motion.object>
          </Draggable>
        )}
      </motion.div>
    </>
  );
});

export const Container = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 470;
  overflow-y: overlay;
  overflow: ${(props) => props.overflow};
  -webkit-overflow-scrolling: touch;
  height: 100%;
  width: 100%;
  padding: 20px 15px 20px 20px;
  padding: ${(props) => props.padding};
  font-size: 14px;
  color: ${(props) => props.theme.panelColor};
  transition: ${(props) => props.transition};
  pointer-events: ${(props) => props.pointerEvents};
  opacity: ${(props) => props.opacity};

  & .backdrop {
    cursor: alias;
    position: fixed;
    z-index: 50;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${(props) => props.theme.backdrop};
    display: flex;
    justify-content: center;
  }

  & .backdrop object {
    display: block;
    max-width: 80%;
    max-height: 90%;
    width: auto;
    height: auto;
    align-self: center;
    /* box-shadow: 3px 5px 7px rgba(0,0,0,0.5); */
    /* -webkit-box-shadow:  3px 5px 7px rgba(0,0,0,0.5); */
    /* -moz-box-shadow:  3px 5px 7px rgba(0,0,0,0.5); */
    /* border: 1px solid ${(props) => props.theme.panelColor}; */
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    resize: both;

    @media only screen and (max-width: 768px) {
      max-width: 80%;
      max-height: 100%;
    }
  }

  & .backdrop .description {
    border: 1px solid ${(props) => props.theme.panelColor};
    border-radius: 10px;
    position: absolute;
    bottom: 20px;
    left: 20px;
    z-index: 500;
    padding: 10px;
    white-space: break-spaces;
    line-height: 25px;
    text-align: justify;
    width: 60ch;
    overflow-x: hidden;
    opacity: ${(props) => props.opacity};
    transition: 0.3s;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    /* background-color: ${(props) => props.theme.sky}; */

    &:hover {
      cursor: grab;
    }
  }

  & .backdrop object:hover {
    cursor: grab;
  }

  & .backdrop .landscape {
    width: 60% !important;
  }

  /* &:last-child(){
    margin-bottom: 60%;
  } */

  &:last-child():not(.backdrop) {
    height: 90%;
  }

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 5px;
    display: flex;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.panelColor};
    border-radius: 4px;
    /* transition: 0.3s; */
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: ${(props) => props.theme.panelColor};
    box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
    -webkit-box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
    -moz-box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
    /* transition: 0.3s; */
  }
`;
const Control = styled.p`
  background-color: ${(props) => props.theme.layerBG};
  position: fixed;
  z-index: 500;
  opacity: 1;
  font-weight: 800;
  font-size: 20px;
  user-select: none;
  -webkit-user-select: none;
  transition: 0.3s;
  padding: 10px;
  cursor: pointer;
  left: ${(props) => props.left || "none"};
  right: ${(props) => props.right || "none"};
  border-radius: 12px;

  &:hover {
    border: 1px solid ${(props) => props.theme.panelColor};
    background-color: ${(props) => props.theme.LiHover};
    -webkit-box-shadow: 0px 2px 10px 1px ${(props) => props.theme.LiHover};
    -moz-box-shadow: 0px 2px 10px 1px ${(props) => props.theme.LiHover};
    box-shadow: 0px 2px 10px 1px ${(props) => props.theme.LiHover};
    color: ${(props) => props.theme.textHover};
    text-shadow: 1px 1px 3px #ebebeb;
  }
`;
