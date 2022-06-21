import React, {useRef, useEffect} from "react";
import { cloud, state } from "../UI/state"
import { useSnapshot } from "valtio"
import styled from "styled-components"
import "../../App.css"
import Draggable from 'react-draggable'
import { motion } from 'framer-motion'
import PageData from "./PageData";
import useDocumentTitle from "../UI/documentTitle"
import { Header } from "../UI/svg"
import Info from "./Info";
import Store from "./Store";
import Blog from "./Blog";
import Contrast from "./Contrast";
import Home from "./Home";
import NotFound from "./NotFound";
import { useSearchBox } from "react-instantsearch-hooks-web";

export function Page(id) {
  useDocumentTitle(id.title)
    const { query } = useSearchBox();
  const snap = useSnapshot(state);
  const clip = useSnapshot(cloud);
    let opacity = query.length > 0 ? "0" : "1";
    let pointerEvents = query.length ? "none" : "all";
    let transition = query.length ? "0.3s" : "unset";
    let padding = clip.sectors.length > 1 ? '' : `
          @media only screen and (max-width: 1866px) {
          padding-top: ${props => props.paddingTop} !important;
          padding-bottom:  ${props => props.paddingTop} !important;
        }
    `
  
      //Toggle active panel buttons
  useEffect(() => {
      let proLink = document.querySelector(".proLink");
      let optLink = document.querySelector(".proLink");
    if (proLink) {
        proLink.classList.remove("folderActive");
      };
      if (optLink) {
        optLink.classList.remove("folderActive");
      };
  })
    if (id.id === "Home") {
    return <Home />
    } else if (id.id === "Info") {
    return <Info opacity={opacity} pointerEvents={pointerEvents} transition={transition} />
    } else if (id.id === "Store") {
    return <Store opacity={opacity} pointerEvents={pointerEvents} transition={transition}/>
    } else if (id.id === "Blog") {
    return <Blog opacity={opacity} pointerEvents={pointerEvents} transition={transition}/>
    } else if (id.id === "Contrast") {
    return <Contrast opacity={opacity} pointerEvents={pointerEvents} transition={transition}/>
    } else if (id.id === "NotFound") {
    return <NotFound opacity={opacity} pointerEvents={pointerEvents} transition={transition}/>
    } else {
        return (
          <>
            <Header id={id.id} />
            <Container className="container"
              opacity={opacity}
              pointerEvents={pointerEvents}
              transition={transition}
              // padding={padding}
            >
              <PageData id={id.id} />
              {snap.selectedImg ? <Modal /> : null}
            </Container>
          </>
      )
  }
}

const Modal = () => {
    const snap = useSnapshot(state);
    const nodeRef = useRef(null);
    const descRef = useRef(null);
    const types = new Map([["jpg", "img"], ["jpeg", "img"], ["png", "img"], ["gif", "img"], ["mp4", "video"], ["svg", "svg"]])
    const link = new URL(`${snap.selectedImg}`)
    const extension = link.pathname.split(".")
    const element = types.get(extension[extension.length - 1].toLowerCase())
    // console.log(element);

    const handleClick = (e) => {
        if (e.target.classList.contains('backdrop')) {
            state.selectedImg = null;
            state.selectedDesc = null;
        }
    }
    const onControlledDrag = (e, position) => {
        let { x, y } = position;
        state.modalPosition = { x, y };
        state.descPosition = { x, y };
    };
    return (
        <>
            <motion.div className="backdrop" onClick={handleClick}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                {snap.selectedDesc && <Draggable nodeRef={descRef} bounds="body" position={snap.descPosition} onDrag={onControlledDrag} >
                    <div className='description' ref={descRef}><p>{snap.selectedDesc}</p></div>
                </Draggable>}
                <Draggable nodeRef={nodeRef} bounds="body" position={snap.modalPosition} onDrag={onControlledDrag} >
                    <motion.object ref={nodeRef} data={snap.selectedImg} alt="full content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }} />
                </Draggable>
            </motion.div>
        </>
    )
}

export const Container = styled.div`
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 470;
  overflow-y: overlay;
  overflow: ${props => props.overflow};
  -webkit-overflow-scrolling: touch;
  height: 100%;
  width: 100%;
  padding: 20px 15px 20px 20px;
  padding: ${props=>props.padding};
  font-size: 14px;
  color: ${props => props.theme.panelColor};
  transition: ${props => props.transition};
  pointer-events: ${props => props.pointerEvents};
  opacity: ${props => props.opacity};

  & .backdrop{
    cursor: alias;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${props => props.theme.backdrop};
    display: flex;
    justify-content: center;
  }

  & .backdrop object{
    display: block;
    max-width: 80%;
    max-height: 90%;
    width: auto;
    height: auto;
    align-self: center;
    box-shadow: 3px 5px 7px rgba(0,0,0,0.5);
    -webkit-box-shadow:  3px 5px 7px rgba(0,0,0,0.5);
    -moz-box-shadow:  3px 5px 7px rgba(0,0,0,0.5);
    /* border: 1px solid ${props => props.theme.panelColor}; */
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  
    @media only screen and (max-width: 768px) {
      max-width: 80%;
      max-height: 100%;
    }
  }

  & .backdrop .description{
border: 1px solid ${props => props.theme.panelColor};
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
opacity: ${props => props.opacity};
transition: 0.3s;  
backdrop-filter: blur( 4px );
  -webkit-backdrop-filter: blur( 4px );
/* background-color: ${props => props.theme.sky}; */

&:hover{
  cursor: grab;
}

  }

  & .backdrop object:hover{
    cursor: grab;
  }

  /* &:last-child(){
    margin-bottom: 60%;
  } */

  &:last-child():not(.backdrop){
    height: 90%;
  }

  ::-webkit-scrollbar {
      -webkit-appearance: none;
      width: 5px;
      display: flex;
    }
    ::-webkit-scrollbar-thumb {
      background-color:${props => props.theme.panelColor};
      border-radius: 4px;
      /* transition: 0.3s; */
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: ${props => props.theme.panelColor};
          box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
          -webkit-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
          -moz-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
          /* transition: 0.3s; */
    }
`