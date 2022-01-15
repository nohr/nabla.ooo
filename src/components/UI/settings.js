//Settings -- Child of Panel
import React, { useRef } from "react"
import { state } from './state'
import { useSnapshot } from 'valtio'
import Draggable from 'react-draggable'
import { Folder } from "./style"
import styled from "styled-components"
import useWindowDimensions from "./window"
import { DirectionIcon, ModeIcon, MuteIcon, PlayPauseIcon, ShowHideIcon } from "./svg"

const Setter = styled.div`
    padding: var(--panelPadding);
    padding-bottom: 0;
    position: absolute;
    z-index: 3500;
    left: var(--edge);
    margin: 20px 0;
    display: grid;
    align-items: start;
    ${props => props.layout}
    ${props => props.hide}
    ${props => props.top}
    /* transition: 0.3s; */
      transition: 0.6s !important;

    .audio, .display{
       width: 100%;
       overflow-y: scroll;
       padding: 7px 2px 0px 7px;
       /* padding-bottom: 20px; */

        ::-webkit-scrollbar {
          -webkit-appearance: none;
          width: 5px;
          position: absolute;
        }
        ::-webkit-scrollbar-thumb {
          outline: 1px solid ${props => props.theme.panelColor};
          border-radius: 4px;
          background-color: transparent;
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
  *{
    width: min-content;
    scroll-behavior: smooth;
  }

  .li{
    justify-content: flex-start;
    width: 70%;
    margin: 0 auto 4px auto;
    position: relative;
    height: fit-content;
    padding-left: 10px;
    transition: 0.9s;
  }

  p{
    margin: 3px auto 5px auto;
    text-align: center;
    border-bottom: 1px solid ${props => props.theme.panelColor};
    transition: 0.9s;
  }
  svg:not(.ShowHideIcon):not(.light):not(.dark){
    fill: none !important;
    stroke: ${props => props.theme.panelColor};
    stroke-width: 38px !important;
  }

  .dark{
    fill: none !important;
    stroke: ${props => props.theme.panelColor};
    stroke-width: 12px !important;
  }
  
  .modeIcon, .muteIcon, .ShowHideIcon{
    position: absolute;
    right: 6px;
    width: 10px;
    fill: ${props => props.theme.panelColor};
    overflow: visible;
    align-self: left;
    top: 50%;
    transform: translateY(-50%);
  }
  .PlayPauseIcon{
    position: absolute;
    right: 7px;
    height: 10px;
    fill: ${props => props.theme.panelColor};
    overflow: visible;
    align-self: left;
    top: 50%;
    transform: translateY(-50%);
  }
  .DirectionIcon{
    stroke-width: 1px !important;
    position: absolute;
    right: 6px;
    width: 10px;
    overflow: visible;
    align-self: left;
    top: 50%;
    transform: translateY(-50%);
  }
`

function Settings() {
    const sett = useRef(null);
    const snap = useSnapshot(state);
    state.selectedImg = null;
    const settLink = document.querySelector(".settLink")
    if (state.selectedImg) { settLink.classList.remove("folderActive") }
    function onControlledDrag(e, position) {
        let { x, y } = position;
        // let location = { x, y };
        console.log({ x, y });

    }
    //Audio configured in App.js

    //DISPLAY
    //Toggle Theme
    const toggleTheme = () => {
        state.themeChanged = true;
        state.theme === 'light' ? state.theme = 'dark' : state.theme = 'light';

    }
    // Toggle Canvas Visibility
    const canvas = document.getElementsByTagName('canvas')[0];
    function toggleCanvas() {
        if (!state.canvasVisible) {
            //Show Canvas
            state.canvasVisible = true;
            canvas.style.display = "block";
            if (!state.paused) {
                state.paused = true
            } else if (state.paused) {
                state.paused = true
            }
        } else if (state.canvasVisible) {
            //Hide Canvas
            state.canvasVisible = false;
            canvas.style.display = "none";
            if (!state.paused) {
                state.paused = true;
                state.CDRotationY = 0;
                state.CDRotationZ = 0;
                state.autoRotateSpeed = 0;
            }
        }

    }
    //Pause Canvas Animation
    function togglePause() {
        if (!state.paused) {
            //Pause Canvas
            state.paused = true;
            state.autoRotateSpeed = 0;

        } else if (state.paused) {
            //Play Canvas
            state.paused = false;
            state.autoRotateSpeed = 0.09;
        }
    }
    //Toggles Panel Direction
    function toggleDirection() {
        if (state.direction) {
            //Row Direction
            state.direction = false;

        } else if (!state.direction) {
            //Column Direction
            state.direction = true;
        }
        getPos()
    }

    //offset and direction of panel from nav and projects
    let vWidth = useWindowDimensions().width;
    let vHeight = useWindowDimensions().height;

    function getPos() {
        const left1 = { x: -state.navWidth + state.dist, y: 0 };
        const left2 = { x: (state.navWidth * -2) - (state.dist * -2), y: 0 };
        const right1 = { x: state.navWidth - (state.dist), y: 0 };
        const right2 = { x: (state.navWidth * 2) - (state.dist * 2), y: 0 };
        const up1 = { x: 0, y: (-state.navWidth) - (-state.dist) }
        const up2 = { x: 0, y: (state.navWidth * -2) - (state.dist * -2) }
        const down1 = { x: 0, y: state.navWidth - state.dist };
        const down2 = { x: 0, y: (state.navWidth * 2) - (state.dist * 2) };

        console.log(state.setSwitched);

        //Row
        if (((state.direction ? vWidth : vHeight) - (state.navWidth * 2) - state.dist + 30) < (state.direction ? state.setPosition.x : state.setPosition.y)) {
            //goes over the right side
            if (state.setSwitched) {
                state.setSwitched = true;
                if (!state.prtSwitched) {
                    if (state.isPort) {
                        return state.direction ? left1 : up1;
                    } else {
                        state.setSwitched = false;
                        return state.direction ? right1 : down1;
                    }
                } else {
                    if (state.isPort) {
                        return state.direction ? left2 : up2;
                    } else {
                        state.setSwitched = false;
                        return state.direction ? right1 : down1;
                    }
                }
            } else {
                state.setSwitched = true;
                if (!state.prtSwitched) {
                    if (state.isPort) {
                        state.prtSwitched = false;
                        return state.direction ? left2 : up2;
                    } else {
                        state.prtSwitched = true;
                        return state.direction ? left1 : up1;
                    }
                } else {
                    if (state.isPort) {
                        return state.direction ? left2 : up2;
                    } else {
                        state.prtSwitched = true;
                        return state.direction ? left1 : up1;
                    }

                }
            }
        } else {
            //is normal
            if (state.setSwitched) {
                state.setSwitched = false;
                if (!state.prtSwitched) {
                    state.setSwitched = false;
                    if (state.isPort) {
                        return state.direction ? left1 : up1;
                    } else {
                        return state.direction ? left2 : up2;
                    }
                } else {
                    if (state.isPort) {
                        return state.direction ? right1 : down1;
                    } else {
                        return state.direction ? right2 : down2;
                    }
                }
            } else {
                if (!state.prtSwitched) {
                    if (state.isPort) {
                        return state.direction ? right2 : down2;
                    } else {
                        return state.direction ? right1 : down1;
                    }
                } else {
                    if (state.isPort) {
                        return state.direction ? left2 : up2;
                    } else {
                        return state.direction ? left1 : up1;
                    }
                }
            }
        }
    }



    //intersection observer


    const offset = getPos();
    const firstheight = snap.direction ? { height: "75px" } : { height: "87px" };
    const secondheight = snap.direction ? { height: "113px" } : { height: "161px" };
    const layout = snap.direction ? "grid-template-rows: 10% 1fr 10% 1fr; padding-left: 45px;padding-right: 40px; transition: 0.3s;" : "grid-template-columns: 1fr 1fr; grid-template-rows: 15% 1fr; padding: 80px 12px 26px; transition: 0.3s;";
    const top = snap.direction ? "padding-top: 26px;" : snap.setSwitched ? "padding-top: 50px !important;" : "padding-top: 80px;";
    const firstHeader = snap.direction ? { width: "100%" } : { width: "64%", gridColumnStart: 1, gridColumnEnd: 1, gridRowStart: 1, gridRowEnd: 1 }
    const secondHeader = snap.direction ? { width: "62%" } : { width: "64%", gridColumnStart: 2, gridColumnEnd: 2, gridRowStart: 1, gridRowEnd: 1 }
    const hide = snap.isSett ? "opacity: 1; pointer-events: all; transition: 0.3s;" : "opacity: 0; pointer-events: none; transition: 0.3s;";
    const headwidth = {
        first: {
            max: snap.direction ? "119%" : "100%",
            min: snap.direction ? "100%" : "64%",
        },
        second: {
            max: snap.direction ? "119%" : "100%",
            min: snap.direction ? "64%" : "64%",
        },
    }

    return (
        <Draggable nodeRef={sett} onDrag={onControlledDrag} position={snap.setPosition} positionOffset={offset} onStart={() => false}>
            <Setter hide={hide} layout={layout} top={top} ref={sett} className="Panel set">
                <p style={firstHeader}
                    id="audiohead"
                >Audio</p>
                <div className="audio" style={firstheight}
                    onMouseEnter={() => { document.getElementById("audiohead").style.width = headwidth.first.max }}
                    onMouseLeave={() => { document.getElementById("audiohead").style.width = headwidth.first.min }}
                >
                    <Folder id="muteunmute" className="li w"><MuteIcon />{!snap.muted ? "Mute" : "Unmute"}</Folder>
                    <Folder id="playstop" className="li"><PlayPauseIcon arg={1} />Music</Folder>
                    {snap.playMusic && <p style={{ border: "none", fontSize: "10px", whiteSpace: "nowrap" }}>nohri - tardigrade</p>}
                </div>
                <p style={secondHeader}
                    id="displayhead"
                >Display</p>
                <div className="display" style={secondheight}
                    onMouseEnter={() => { document.getElementById("displayhead").style.width = headwidth.second.max }}
                    onMouseLeave={() => { document.getElementById("displayhead").style.width = headwidth.second.min }}
                >
                    <Folder onClick={() => toggleTheme()} className="li w"><ModeIcon /><span>{snap.theme === "light" ? "Dark" : "Light"}</span></Folder>
                    <Folder onClick={() => toggleCanvas()} className="li w"><ShowHideIcon />{snap.canvasVisible ? "Hide" : "Show"}</Folder>
                    {state.canvasVisible && <Folder onClick={() => togglePause()} className="li w"><PlayPauseIcon arg={2} />{snap.paused ? "Play" : "Pause"}</Folder>}
                    <Folder id="rowcolumn" onClick={() => toggleDirection()} className="li w"><DirectionIcon />{snap.direction ? "Column" : "Row"}</Folder>
                </div>
                {snap.isPort}
            </Setter>
        </Draggable>
    );
}

export default Settings