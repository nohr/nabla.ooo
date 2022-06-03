import React, {useEffect} from "react";
import { state } from "../UI/state"
import { useSnapshot } from "valtio"
import styled from "styled-components"
import "../../App.css"
import PageData from "./PageData";
import Modal from "../UI/Modal";
import useDocumentTitle from "../UI/documentTitle"
import { Header } from "../UI/svg"
import Info from "./Info";
import Store from "./Store";
import Blog from "./Blog";
import Contrast from "./Contrast";
import Home from "./Home";
import NotFound from "./NotFound";
import { useLocation } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  gap: 60px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 470;
  overflow-y: overlay;
  -webkit-overflow-scrolling: touch;
  height: 100%;
  width: 100%;
  padding: 20px 15px 20px 20px;
  font-size: 14px;
  color: ${props => props.theme.panelColor};
  transition: ${props => props.transition};
  pointer-events: ${props => props.pointerEvents};
  opacity: ${props => props.opacity};

  & .backdrop{
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
    .oldNabla{
      fill: ${props => props.theme.panelColor};
      overflow: visible;
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%,-60%);
    }
`


function Page(id) {
    useDocumentTitle(id.title)
    const snap = useSnapshot(state);
    const location = useLocation();
    let opacity = location.search.length > 0 ? "0" : "1";
    let pointerEvents = location.search.length > 0 ? "none" : "all";
    let transition = location.search.length > 0 ? "0.9s" : "unset";

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
            <Header id={id.id}/>
                <Container className="container"
                    opacity={opacity}
                    pointerEvents={pointerEvents}
                    transition={transition}
                >
                <PageData id={id.id}/>
                    {snap.selectedImg ? <Modal /> : null}
            </Container>
        </>
    )
} 
}


export { Page }
