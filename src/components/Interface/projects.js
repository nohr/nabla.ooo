//Projects -- Child of Panel
import { useEffect, useRef } from "react"
import { cloud, state } from "../utils/state"
import { useSnapshot } from "valtio"
import Draggable from "react-draggable"
import { NavLink } from "react-router-dom"
import styled from "styled-components"
import { getPosPro, styleHeaders, useWindowDimensions } from "../utils/common"

function Projects({ headwidth, select, open, close }) {
  const pro = useRef(null);
  const snap = useSnapshot(state);
  const clip = useSnapshot(cloud);

  // offset and direction of panel from nav
  let vWidth = useWindowDimensions().width;
  let vHeight = useWindowDimensions().height;
  const offset = getPosPro(snap, vWidth, vHeight);
  const firstStyle = snap.direction ? { height: "75px" } : { height: "87px" };
  const secondStyle = snap.direction ? { height: "133px" } : { height: "161px" };
  const layout = snap.direction ? !state.prtSwitched ? "grid-template-rows: 10% 0.9fr 10% 1.5fr; padding-left: 45px;padding-right: 40px;" : "grid-template-rows: 10% 1fr 10% 1fr; padding-left: 40px;padding-right: 45px;" : "grid-template-columns: 1fr 1fr; grid-template-rows: 15% 1fr; padding: 80px 12px 26px;";
  const top = snap.direction ? "padding-top: 7px;" : snap.prtSwitched ? "padding-top: 50px !important;" : "padding-top: 80px;";
  const firstHeader = snap.direction ? { width: "62%" } : { width: "64%", gridColumnStart: 1, gridColumnEnd: 1, gridRowStart: 1, gridRowEnd: 1 }
  const secondHeader = snap.direction ? { width: "115%" } : { width: "64%", gridColumnStart: 2, gridColumnEnd: 2, gridRowStart: 1, gridRowEnd: 1 }
  const hide = snap.isPro ? "opacity: 1; pointer-events: all; transition: 0.2s; " : "opacity: 0; pointer-events: none; transition: 0s;";

  useEffect(() => {
    !snap.isPro ? close() : open();
  }, [snap.isPro])


  useEffect(() => {
    if (snap.isOpt && snap.direction) {
      document.getElementById("selfhead").style.width = '100%';
      document.getElementById("clienthead").style.width = '123%';
    } else {
      document.getElementById("selfhead").style.width = headwidth.first.min;
      document.getElementById("clienthead").style.width = headwidth.second.min;
    }
  }, [state.isOpt])

  return (
    <Draggable nodeRef={pro} position={snap.proPosition} positionOffset={offset} onStart={() => false} >
      <Project hide={hide} layout={layout} top={top} ref={pro}
        className={clip.drag ? "Panel pro glow" : "Panel pro"}
      >
        <p style={firstHeader}
          id="selfhead"
        >Self-Initiate</p>
        <div className="self" style={firstStyle}
          onMouseEnter={() => styleHeaders(headwidth, 1, "selfhead", true)}
          onMouseLeave={() => styleHeaders(headwidth, 1, "selfhead", false)}
        >
          {clip.selfs && clip.selfs.map((work) => (
            <NavLink onClick={select} style={snap.direction ? { width: '70%' } : { width: '100%' }} className="li w" to={`/${work.id}`} tabIndex={state.isPro ? "0" : "-1"} key={Math.random()}>{work.name}</NavLink>
          ))}
        </div>
        <p style={secondHeader}
          id="clienthead"
        >Client</p>
        <div className="client" style={secondStyle}
          onMouseEnter={() => styleHeaders(headwidth, 2, "clienthead", true)}
          onMouseLeave={() => styleHeaders(headwidth, 2, "clienthead", false)}
        >
          {clip.clients && clip.clients.map((work) => (
            <NavLink onClick={select} style={snap.direction ? { width: '70%' } : { width: '100%' }} className="li w" to={`/${work.id}`} tabIndex={state.isPro ? "0" : "-1"} key={Math.random()}>{work.name}</NavLink>
          ))}
        </div>
      </Project>
    </Draggable >
  )
}

export default Projects

const Project = styled.div`
  padding: var(--panelPadding);
  padding-bottom: 0;
  position: absolute;
  z-index: 4800;
  left: var(--edge);
  margin: 20px 0 0 0;
  text-align: center;
  /* overflow: scroll !important; */
  display: grid;
  justify-items: center;
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
   backdrop-filter: blur(20px) !important;
    margin: 0 0 4px 0;
    width: 70%;
    transition: 0.9s !important;
  }
  p{
    /* position: fixed; */
    margin: 3px auto 5px auto;
    overflow: visible;
    text-align: center;
    border: 1px solid;
    border-color: transparent transparent ${props => props.theme.panelColor} transparent;
    transition: 0.9s;
  }

  .self, .client{
    display: flex !important;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    overflow-y: scroll;
    overflow-x: visible;
    padding: 2px 2px 0px 10px;
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
      background-color: transparent;
      border: 1px solid;
      border-color: ${props => props.theme.panelColor};
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

  #selfhead, #clienthead{
          border-radius: 10px;
        text-transform: uppercase !important;
        font-size: 10px !important;
        padding-bottom: 6px;
  
        @media screen and (min-height: 1087px) and (max-height:1300px) {
        font-size: 0.8vh !important;
        }
        @media screen and (min-height:1300px) {
        font-size: 0.65vh !important;
        }
    }

  .self{
    padding-bottom: 0;
  }
  .client{
    padding-bottom: 32px;
  }
`
