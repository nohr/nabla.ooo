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
  const snap = useSnapshot(state);
  let opacity = query.length > 0 ? "0" : "1";
  let pointerEvents = query.length ? "none" : "all";
  let transition = query.length ? "0.3s" : "unset";
  let margin =
    clip.sectors.length > 0
      ? snap.direction
        ? `padding-top: 300px !important; `
        : `padding-left: 300px !important; `
      : ``;

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
          margin={margin}
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
  ${(props) => props.margin}
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
  width: 100vw;
  padding: 20px 15px 20px 20px;
  font-size: 14px;
  color: ${(props) => props.theme.panelColor};
  transition: ${(props) => props.transition};
  pointer-events: ${(props) => props.pointerEvents};
  opacity: ${(props) => props.opacity};

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
      border: 1px solid ${(props) => props.theme.panelColor};
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
      padding: 5px 10px;
      pointer-events: none;

      & .icons {
        backdrop-filter: blur(30px);
        border-radius: 40px;
        flex-wrap: wrap;
        flex-direction: row-reverse;
        padding: 10px 10px;
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
        @media all and (min-width: 1100px) {
          body {
            font-size: 2.4em;
          }
        }
        @media all and (min-width: 1200px) {
          body {
            font-size: 2.6em;
          }
        }
        @media all and (min-width: 1300px) {
          body {
            font-size: 2.8em;
          }
        }
        @media all and (min-width: 1400px) {
          body {
            font-size: 3em;
          }
        }
        @media all and (min-width: 1500px) {
          body {
            font-size: 3.2em;
          }
        }
        @media all and (min-width: 1500px) {
          body {
            font-size: 3.4em;
          }
        }
        @media all and (min-width: 1600px) {
          body {
            font-size: 3.6em;
          }
        }
        @media all and (min-width: 1700px) {
          body {
            font-size: 3.8em;
          }
        }
      }

      & .Scroller {
        text-indent: 20px;
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
