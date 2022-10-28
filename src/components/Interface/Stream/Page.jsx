import React, { useRef, useEffect, memo } from "react";
import { cloud, state } from "../../utils/state";
import { useSnapshot } from "valtio";
import styled from "styled-components";
import "../../../App.css";
import Draggable from "react-draggable";
import { motion } from "framer-motion";
import PageData from "./PageData";
import { Header } from "../../utils/svg";
import Info from "./Info";
import Store from "./Store";
import Blog from "./Blog";
import Contrast from "./Contrast";
import Home from "./Home";
import NotFound from "./NotFound";
import { useSearchBox } from "react-instantsearch-hooks-web";
import { useDocumentTitle } from "../../utils/common";

export function Page({ id, lot, title, container, hovered, setHovered }) {
  useDocumentTitle(title);
  const { query } = useSearchBox();
  const clip = useSnapshot(cloud);
  const snap = useSnapshot(state);
  let opacity = query.length > 0 ? "0" : clip.drag || hovered ? 0.3 : "1";
  let pointerEvents = query.length ? "none" : hovered ? "none" : "all";
  let transition = query.length ? "0.3s" : hovered ? "0.3s" : "unset";
  let margin = clip.mobile
    ? `padding-top: 200px !important; `
    : snap.direction
    ? `padding-top: 300px !important; `
    : `padding-left: 300px !important; `;

  useEffect(() => {
    setHovered(false);
  }, []);

  useEffect(() => {
    cloud.selectedImg = null;
    cloud.selectedDesc = null;
  }, [id]);

  // Manage modals
  useEffect(() => {
    function handleKeyPress(e) {
      // esc to clear modal
      if (e.key === "Escape") {
        cloud.selectedDesc = null;
        cloud.selectedImg = null;
        return;
      }

      // Next
      if (e.key === "ArrowRight") {
        Next();
        return;
      }

      // Prev
      if (e.key === "ArrowLeft") {
        Prev();
        return;
      }
      // Do nothing when these are pressed
      if (
        e.key === "Enter" ||
        e.key === "Shift" ||
        e.key === "Meta" ||
        e.key === "CapsLock" ||
        e.key === "ArrowUp" ||
        e.key === "ArrowDown" ||
        e.key === "Alt"
      ) {
        return;
      }
    }

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
      />
    );
  } else if (id === "Blog") {
    return (
      <Blog
        container={container}
        opacity={opacity}
        pointerEvents={pointerEvents}
        transition={transition}
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
export function Next() {
  if (cloud.work) {
    num = cloud.work.images.indexOf(cloud.selectedImg);
    if (cloud.work.images[num + 1]) {
      if (num !== -1) {
        num += 1;
        cloud.selectedImg = cloud.work.images[num];
        if (cloud.work.description) {
          cloud.selectedDesc = cloud.work.description[num];
        }
      }
    }
  }
}

export function Prev() {
  if (cloud.work) {
    num = cloud.work.images.indexOf(cloud.selectedImg);
    if (cloud.work.images[num - 1]) {
      if (num !== -1) {
        num -= 1;
        cloud.selectedImg = cloud.work.images[num];
        if (cloud.work.description) {
          cloud.selectedDesc = cloud.work.description[num];
        }
      }
    }
  }
}

const Modal = memo(function Modal({ container }) {
  const snap = useSnapshot(state);
  const clip = useSnapshot(cloud);
  const nodeRef = useRef(null);
  // Get enxtentions of files
  const types = new Map([
    ["jpg", "img"],
    ["jpeg", "img"],
    ["png", "img"],
    ["gif", "img"],
    ["mp4", "video"],
    ["svg", "svg"],
  ]);
  if (clip.selectedImg) {
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
          <motion.video
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
          </motion.video>
        );
      } else if (clip.work.orientation === "landscape") {
        return (
          <motion.video
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
          </motion.video>
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
      <div className="modalWrapper" ref={container}>
        <Controls />
        <motion.div
          className="backdrop"
          onClick={handleClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {clip.selectedDesc && (
            <div className="description">
              <p>{clip.selectedDesc}</p>
            </div>
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
      </div>
    );
  }
});

export const Container = styled.div`
  ${(props) => props.margin}
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  z-index: 470;
  overflow-y: scroll;
  overflow-x: hidden;
  /* overflow: ${(props) => props.overflow}; */
  -webkit-overflow-scrolling: touch;
  height: 100vh;
  width: 100vw;
  padding: 20px 15px 20px 20px;
  font-size: 14px;
  color: ${(props) => props.theme.panelColor};
  transition: ${(props) => props.transition};
  pointer-events: ${(props) => props.pointerEvents};
  opacity: ${(props) => props.opacity};

  .modalWrapper {
    position: absolute;
  }
  &.hom {
    pointer-events: none;
    width: 100vw;
    align-items: flex-end !important;

    .preview {
      /* display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 25% 75%; */
      display: flex;
      flex-direction: column;
      height: 20vh;
      border: 1px solid ${(props) => props.theme.textHover};
      color: ${(props) => props.theme.textHover};
      border-radius: 40px;
      box-shadow: none;
      /* background-color: ${(props) => props.theme.backdrop} !important; */
      background-color: transparent;
      /* height: 30vh !important; */
      position: unset !important;
      width: fit-content !important;
      justify-content: space-around;
      margin: 20px !important;
      opacity: 1;
      padding: 10px;
      pointer-events: none;
      backdrop-filter: blur(10px);

      & .icons {
        backdrop-filter: blur(20px);
        border-radius: 40px;
        flex-wrap: wrap;
        flex-direction: row-reverse;
        padding: 10px 20px;
        /* width: 90% !important; */
        justify-content: space-around !important;
        margin: 0 auto;

        & .both {
          display: flex;
          flex-direction: row-reverse;
          column-gap: 10px !important;
          align-items: center;
        }
      }

      & .icons .Program {
        flex-wrap: nowrap !important;
        padding: 0;
        & svg {
          margin: 0;
          height: 30px;
        }
      }
      h3 {
        margin: 0;
        white-space: nowrap;
        font-size: 20px;
        @media all and (min-width: 50px) {
          body {
            font-size: 0.4em;
          }
        }
        @media all and (min-width: 100px) {
          body {
            font-size: 0.3em;
          }
        }
        @media all and (min-width: 200px) {
          body {
            font-size: 0.6em;
          }
        }
        @media all and (min-width: 300px) {
          body {
            font-size: 0.8em;
          }
        }
        @media all and (min-width: 400px) {
          body {
            font-size: 1em;
          }
        }
        @media all and (min-width: 500px) {
          body {
            font-size: 1.2em;
          }
        }
        @media all and (min-width: 600px) {
          body {
            font-size: 1.4em;
          }
        }
        @media all and (min-width: 700px) {
          body {
            font-size: 1.6em;
          }
        }
        @media all and (min-width: 800px) {
          body {
            font-size: 1.8em;
          }
        }
        @media all and (min-width: 900px) {
          body {
            font-size: 2em;
          }
        }
        @media all and (min-width: 1000px) {
          body {
            font-size: 2.2em;
          }
        }
      }

      & .Scroller {
        text-indent: 10px;
        border-radius: 0 0 40px 40px;
        overflow-y: hidden !important;
        mask-image: -webkit-gradient(
          linear,
          left top,
          left bottom,
          from(rgba(0, 0, 0, 3)),
          to(rgba(0, 0, 0, 0))
        );
        -webkit-mask-image: -webkit-gradient(
          linear,
          left top,
          left bottom,
          from(rgba(0, 0, 0, 3)),
          to(rgba(0, 0, 0, 0))
        );
      }
    }
  }

  &.stats {
    position: absolute;
    right: 0;
    z-index: 6000;
  }
  & .modalWrapper .backdrop {
    cursor: alias;
    position: fixed;
    z-index: 50;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${(props) => props.theme.backdrop} !important;
    display: flex;
    justify-content: center;
  }

  & .modalWrapper .backdrop object {
    display: block;
    max-width: 100%;
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
  }

  @media screen and (max-width: 768px) {
    & .modalWrapper .backdrop video {
      max-width: 75%;
      max-height: 80% !important;
    }
  }

  & .modalWrapper .backdrop .description {
    border: 1px solid ${(props) => props.theme.panelColor};
    border-radius: 10px;
    position: absolute;
    bottom: 20px;
    left: 20px;
    @media screen and (max-width: 768px) {
      left: 50%;
      transform: translateX(-50%);
    }
    z-index: 500;
    padding: 10px;
    white-space: break-spaces;
    line-height: 25px;
    text-align: justify;
    width: 40ch;
    overflow-x: hidden;
    overflow-y: scroll;
    opacity: ${(props) => props.opacity};
    transition: 0.3s;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    /* background-color: ${(props) => props.theme.sky}; */

    &:hover {
      cursor: grab;
    }
  }

  & .modalWrapper .backdrop object:hover {
    cursor: grab;
  }

  & .modalWrapper .backdrop .landscape {
    width: 60% !important;
  }

  /* &:last-child(){
    margin-bottom: 60%;
  } */

  & .modalWrapper:last-child():not(.backdrop) {
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
