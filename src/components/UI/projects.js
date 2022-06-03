//Projects -- Child of Panel
import { useRef } from "react"
import { state } from "./state"
import useWindowDimensions from "./window"
import { useSnapshot } from "valtio"
import Draggable from "react-draggable"
import { NavLink } from "react-router-dom"
import styled from "styled-components"

const Project = styled.div`
  padding: var(--panelPadding);
  padding-bottom: 0;
  position: absolute;
  z-index: 4900;
  left: var(--edge);
  margin: 20px 0 0 0;
  text-align: center;
  /* overflow: scroll !important; */
  display: grid;
  align-items: start;
  ${props => props.layout}
  ${props => props.hide}
  ${props => props.top}
  -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;

  &::-webkit-scrollbar{
    display: none;
  }
  
  * .li{
    margin: 0 0 4px auto;
    width: 85%;
    transition: 0.9s !important;
  }
  p{
    /* position: fixed; */
    margin: 3px auto 5px auto;
    overflow: visible;
    text-align: center;
    border-bottom: 1px solid ${props => props.theme.panelColor};
    transition: 0.9s;
  }

  .self, .client{
    overflow-y: scroll;
    padding: 2px 10px 0px 10px;
    width: 90%;

  .li{
    transition: 0.3s !important;
  }

    ::-webkit-scrollbar {
      -webkit-appearance: none;
      width: 5px;
      position: absolute;
    }
    ::-webkit-scrollbar-thumb {
      background-color: ${props => props.theme.panelColor};
      border-radius: 4px;
      transition: 0.3s;
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: ${props => props.theme.panelColor};
          box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
          -webkit-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
          -moz-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
          transition: 0.3s;
    }
  }
  .self{
    padding-bottom: 0;
  }
  .client{
    padding-bottom: 32px;
  }
`

function Projects() {
  const pro = useRef(null);
  const snap = useSnapshot(state);
  let proLink = document.querySelector(".proLink")
  if (state.selectedImg) { proLink.classList.remove("folderActive") }

  // offset and direction of panel from nav
  let vWidth = useWindowDimensions().width;
  let vHeight = useWindowDimensions().height;
  function getPos() {
    const left1 = { x: -state.navWidth + state.dist, y: 0 };
    const right1 = { x: state.navWidth - (state.dist), y: 0 };
    const up1 = { x: 0, y: (-state.navWidth) - (-state.dist) };
    const down1 = { x: 0, y: state.navWidth - state.dist };
    // const 

    if ((((state.direction ? vWidth : vHeight) - state.navWidth) - (state.dist * 2)) < (state.direction ? state.prtPosition.x : state.prtPosition.y)) {
      //goes over the right side
      //fix this
      if (!state.prtSwitched) {
        if (state.prtSwitched) {
          state.prtSwitched = true;
          console.log("my left");
          return snap.direction ? left1 : up1
        } else {
          state.prtSwitched = true;
          return snap.direction ? left1 : up1
        }
      } else {
        if (state.prtSwitched) {
          state.prtSwitched = true;
          return snap.direction ? left1 : up1
        } else {
          state.prtSwitched = true;
          return snap.direction ? left1 : up1
        }
      }
    } else if (!state.isPro) {
      return { x: 0, y: 0 }
    } else {
      //is normal
      if (!state.prtSwitched) {
        if (state.prtSwitched) {
          state.prtSwitched = false;
          return snap.direction ? right1 : down1
        } else {
          state.prtSwitched = false;
          return snap.direction ? right1 : down1
        }
      } else {
        if (state.prtSwitched) {
          state.prtSwitched = false;
          return snap.direction ? right1 : down1
        } else {
          state.prtSwitched = false;
          return snap.direction ? right1 : down1
        }
      }
    }
  }
  const offset = getPos();
  const firstheight = snap.direction ? { height: "75px" } : { height: "87px" };
  const secondheight = snap.direction ? { height: "113px" } : { height: "161px" };
  const layout = snap.direction ? !state.prtSwitched ? "grid-template-rows: 10% 1fr 10% 1fr; padding-left: 45px;padding-right: 40px;" : "grid-template-rows: 10% 1fr 10% 1fr; padding-left: 40px;padding-right: 45px;" : "grid-template-columns: 1fr 1fr; grid-template-rows: 12% 1fr; padding: 80px 12px 26px;";
  const top = snap.direction ? "padding-top: 280x;" : snap.prtSwitched ? "padding-top: 50px !important;" : "padding-top: 80px;";
  const firstHeader = snap.direction ? { width: "100%" } : { width: "64%", gridColumnStart: 1, gridColumnEnd: 1, gridRowStart: 1, gridRowEnd: 1 }
  const secondHeader = snap.direction ? { width: "62%" } : { width: "64%", gridColumnStart: 2, gridColumnEnd: 2, gridRowStart: 1, gridRowEnd: 1 }
  const hide = snap.isPro ? "opacity: 1; pointer-events: all; transition: 0.2s; " : "opacity: 0; pointer-events: none; transition: 0s;";
  const headwidth = {
    first: {
      max: snap.direction ? "119%" : "100%",
      min: snap.direction ? "100%" : "64%",
    },
    second: {
      max: snap.direction ? "119%" : "100%",
      min: snap.direction ? "65%" : "65%",
    },
  }



  return (
    <Draggable nodeRef={pro} position={snap.prtPosition} positionOffset={offset} onStart={() => false} >
      <Project hide={hide} layout={layout} top={top} grabbed={state.grabbed ? "" : ""} ref={pro} className=" Panel pro">
        <p style={firstHeader}
          id="selfhead"
        >Self-Initiate</p>
        <div className="self" style={firstheight}
          onMouseEnter={() => { document.getElementById("selfhead").style.width = headwidth.first.max }}
          onMouseLeave={() => { document.getElementById("selfhead").style.width = headwidth.first.min }}
        >
          {snap.selfs && snap.selfs.map((work) => (
            <NavLink className="li w" to={`/${work.id}`} tabIndex={state.isPro ? "0" : "-1"} key={Math.random()}>{work.name}</NavLink>
          ))}
        </div>
        <p style={secondHeader}
          id="clienthead"
        >Client</p>
        <div className="client" style={secondheight}
          onMouseEnter={() => { document.getElementById("clienthead").style.width = headwidth.second.max }}
          onMouseLeave={() => { document.getElementById("clienthead").style.width = headwidth.second.min }}
        >
          {snap.clients && snap.clients.map((work) => (
            <NavLink className="li w" to={`/${work.id}`} tabIndex={state.isPro ? "0" : "-1"} key={Math.random()}>{work.name}</NavLink>
          ))}
        </div>
        {snap.isOpt}
      </Project>
    </Draggable >
  )
}

export default Projects