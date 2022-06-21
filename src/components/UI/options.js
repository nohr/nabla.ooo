//Options -- Child of Panel
import React, { useEffect, useRef } from "react"
import { cloud, state } from "./state"
import { useSnapshot } from "valtio"
import Draggable from "react-draggable"
import { Folder } from "./style"
import styled from "styled-components"
import useWindowDimensions from "./window"
import { ColorIcon, DirectionIcon, ModeIcon, MuteIcon, PlayPauseIcon, ShowHideIcon } from "./svg"
import { useSearchBox } from "react-instantsearch-hooks-web"
import { useNavigate } from "react-router-dom"
import { getDownloadURL, ref } from "firebase/storage"
import { storage } from "../.."

function Options() {
    const { clear } = useSearchBox();
    const navigate = useNavigate();
    const opt = useRef(null);
    const audio = useRef();
    const colorLink = useRef(null)
    const snap = useSnapshot(state);
    const clip = useSnapshot(cloud);
    let optLink = document.querySelector(".optLink")
    if (state.selectedImg) { optLink.classList.remove("folderActive") }

    //Audio configured in UI.js
    // Toggle Music
    const currentSong = audio.current;

    function loadSong(song) {
        getDownloadURL(ref(storage, `gs://nabla7.appspot.com/assets/songs/${song.name}.mp3`))
            .then((url) => {
                cloud.songs[state.songIndex].url = url;
                currentSong.setAttribute('src', url);
                cloud.playMusic = true;
                currentSong.play();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function toggleMusic() {

        if (!cloud.songs[state.songIndex].url) {
            loadSong(cloud.songs[state.songIndex]);
        } else {
            if (cloud.playMusic === false) {
                cloud.playMusic = true;
                currentSong.play();
            } else if (cloud.playMusic === true) {
                cloud.playMusic = false;
                currentSong.pause();
            }
        }
    }

    useEffect(() => {
        if (currentSong) {
            currentSong.addEventListener("play", () => {
                cloud.playMusic = true;
            })
            currentSong.addEventListener("pause", () => {
                cloud.playMusic = false;
            })
        }
    }, [cloud.playMusic, state.songIndex])

    function Next() {
        cloud.playMusic = false;
        currentSong.pause();
        console.log(state.songIndex);

        if (state.songIndex < clip.songs.length - 1) {
            state.songIndex += 1;
        } else {
            state.songIndex = 0;
        }
        if (!cloud.songs[state.songIndex].url) {
            loadSong(cloud.songs[state.songIndex]);
        }
        // currentSong.play();
    }
    //DISPLAY
    //Toggle Theme
    const toggleTheme = () => {
        state.themeChanged = true;
        state.theme === "light" ? state.theme = "dark" : state.theme = "light";
    }
    // Toggle Canvas Visibility
    let canvas;
    function toggleCanvas() {
        canvas = document.getElementsByTagName("canvas")[0];

        if (canvas) {
            if (!snap.canvasVisible) {
                //Show Canvas
                state.canvasVisible = true;
                canvas.style.display = "block";
                if (!snap.canvasPaused) {
                    state.canvasPaused = true
                } else if (snap.canvasPaused) {
                    state.canvasPaused = true
                }
            } else if (snap.canvasVisible) {
                //Hide Canvas
                state.canvasVisible = false;
                canvas.style.display = "none";
                if (!snap.canvasPaused) {
                    state.canvasPaused = true;
                    state.CDRotationY = 0;
                    state.CDRotationZ = 0;
                    state.autoRotateSpeed = 0;
                }
            }
        }
    }
    //Pause Canvas Animation
    function togglePause() {
        if (!state.canvasPaused) {
            //Pause Canvas
            state.canvasPaused = true;
            state.autoRotateSpeed = 0;

        } else if (state.canvasPaused) {
            //Play Canvas
            state.canvasPaused = false;
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

    function openWheel() {
        clear();
        navigate('/');
        state.colorWheel = true;
        state.isOpt = false;
        state.isPro = false;
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

        //Row
        if (((state.direction ? vWidth : vHeight) - (state.navWidth * 2) - state.dist + 30) < (state.direction ? state.optPosition.x : state.optPosition.y) && state.isOpt) {
            //goes over the right side
            if (state.setSwitched) {
                state.setSwitched = true;
                if (!state.prtSwitched) {
                    if (state.isPro) {
                        console.log("1");
                        return state.direction ? left1 : up1;
                    } else {
                        state.setSwitched = true;
                        console.log("2");
                        return state.direction ? right1 : down1;
                    }
                } else {
                    if (state.isPro) {
                        console.log("3");
                        return state.direction ? left2 : up2;
                    } else {
                        state.setSwitched = true;
                        console.log("4");
                        return state.direction ? left1 : up1;
                    }
                }
            } else {
                state.setSwitched = true;
                if (!state.prtSwitched) {
                    if (state.isPro) {
                        state.setSwitched = true;
                        console.log("5");
                        return state.direction ? left1 : up1;
                    } else {
                        state.setSwitched = true;
                        console.log("6");
                        return state.direction ? right1 : down1;
                    }
                } else {
                    if (state.isPro) {
                        console.log("7");
                        return state.direction ? left2 : up2;
                    } else {
                        state.setSwitched = true;
                        console.log("8");
                        return state.direction ? left1 : up1;
                    }
                }
            }
        } else if (!state.isOpt) {
            return { x: 0, y: 0 }
        } else {
            //is normal
            if (state.setSwitched) {
                state.setSwitched = false;
                if (!state.prtSwitched) {
                    state.setSwitched = false;
                    if (state.isPro) {
                        return state.direction ? left1 : up1;
                    } else {
                        return state.direction ? left2 : up2;
                    }
                } else {
                    if (state.isPro) {
                        return state.direction ? right1 : down1;
                    } else {
                        return state.direction ? right2 : down2;
                    }
                }
            } else {
                if (!state.prtSwitched) {
                    if (state.isPro) {
                        return state.direction ? right2 : down2;
                    } else {
                        return state.direction ? right1 : down1;
                    }
                } else {
                    if (state.isPro) {
                        return state.direction ? left2 : up2;
                    } else {
                        return state.direction ? left1 : up1;
                    }
                }
            }
        }
    }

    const offset = getPos();
    const firstStyle = snap.direction ? { height: "75px" } : { height: "87px" };
    const secondStyle = snap.direction ? { height: "133px" } : { height: "161px" };
    const layout = snap.direction ? "grid-template-rows: 10% 1fr 10% 1fr; padding-left: 45px;padding-right: 40px;" : "grid-template-columns: 1fr 1fr; grid-template-rows: 15% 1fr; padding: 80px 12px 26px;";
    const top = snap.direction ? "padding-top: 7px;" : snap.setSwitched ? "padding-top: 50px !important;" : "padding-top: 80px;";
    const firstHeader = snap.direction ? { width: "62%" } : { width: "64%", gridColumnStart: 1, gridColumnEnd: 1, gridRowStart: 1, gridRowEnd: 1 }
    const secondHeader = snap.direction ? { width: "62%" } : { width: "64%", gridColumnStart: 2, gridColumnEnd: 2, gridRowStart: 1, gridRowEnd: 1 }
    const hide = snap.isOpt ? "opacity: 1; pointer-events: all; transition: 0.4s; " : "opacity: 0; pointer-events: none; transition: 0s;";
    const headwidth = {
        first: {
            max: snap.direction ? "100%" : "100%",
            min: snap.direction ? "62%" : "62%",
        },
        second: {
            max: snap.direction ? "100%" : "100%",
            min: snap.direction ? "62%" : "62%",
        },
    }

    return (
        <>
            <Draggable nodeRef={opt} position={snap.optPosition} positionOffset={offset} onStart={() => false}>
                <Option hide={hide} layout={layout} top={top} ref={opt}
                    className={state.drag ? "Panel opt glow" : "Panel opt"}
                >
                    <p style={firstHeader}
                        id="audiohead"
                    >Audio</p>
                    <div className="audio" style={firstStyle}
                        onMouseEnter={() => { document.getElementById("audiohead").style.width = headwidth.first.max }}
                        onMouseLeave={() => { document.getElementById("audiohead").style.width = headwidth.first.min }}
                    >
                        <Folder id="muteunmute" className="li"><MuteIcon />{!snap.muted ? "Mute" : "Unmute"}</Folder>
                        <Folder id="playstop" className="li"
                            onClick={() => toggleMusic()}
                        ><PlayPauseIcon arg={1} />{cloud.playMusic ? "Music" : "Music"}</Folder>
                        <Folder onClick={() => Next()} id="Next" className="li">Next</Folder>
                    </div>
                    <p style={secondHeader}
                        id="displayhead"
                    >Display</p>
                    <div className="display" style={secondStyle}
                        onMouseEnter={() => { document.getElementById("displayhead").style.width = headwidth.second.max }}
                        onMouseLeave={() => { document.getElementById("displayhead").style.width = headwidth.second.min }}
                    >
                        {state.canvasVisible &&
                            <Folder width={snap.direction ? "80%" : "60%"} onClick={() => togglePause(snap.canvasPaused)} className="li w"><PlayPauseIcon arg={2} />{snap.canvasPaused ? "Play" : "Pause"}</Folder>}
                        <Folder onClick={() => toggleCanvas()} className="li w"><ShowHideIcon />{snap.canvasVisible ? "Hide" : "Show"}</Folder>
                        <Folder onClick={() => toggleTheme()} className="li w"><ModeIcon /><span>{snap.theme === "light" ? "Dark" : "Light"}</span></Folder>
                        <Folder ref={colorLink} onClick={() => openWheel()} className="li w"><ColorIcon />{!snap.colorWheel ? "Color" : "Choose"}</Folder>
                        <Folder id="rowcolumn" onClick={() => toggleDirection()} className="li w"><DirectionIcon />{snap.direction ? "Column" : "Row"}</Folder>
                    </div>
                    {snap.isPro}
                    {cloud.playMusic}
                    <audio ref={audio} loop>
                        <source src={null}></source>
                    </audio>
                </Option>
            </Draggable >
        </>
    );
}

export default Options

const Option = styled.div`
    padding: var(--panelPadding);
    padding-bottom: 0;
    position: absolute;
    z-index: 4000;
    left: var(--edge);
    margin: 20px 0 0 0;
    display: grid;
    align-items: start;
    ${props => props.layout}
    ${props => props.hide}
    ${props => props.top}
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;

    .audio, .display{
       width: 100%;
       overflow-y: scroll;
       padding: 2px 2px 0px 7px;

        ::-webkit-scrollbar {
          -webkit-appearance: none;
          width: 5px;
          position: absolute;
        }
        ::-webkit-scrollbar-thumb {
            border: 1px solid;
          border-color:${props => props.theme.panelColor};
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

       #audiohead, #displayhead{
        text-transform: uppercase !important;
        font-size: 1vh !important;
        padding-bottom: 6px;

        @media screen and (min-height: 1087px) and (max-height:1300px) {
        font-size: 0.8vh !important;
        }
        @media screen and (min-height:1300px) {
        font-size: 0.65vh !important;
        }
         }
    .display{
       padding-bottom: 10px !important;
    }

  .li{
    justify-content: flex-end;
    width: 65%;
    margin: 4px auto 8px auto;
    position: relative;
    height: fit-content;
    /* padding-top: 1px; */
    padding-right: 7px;
    transition: 0.3s;

    & svg{
        left: 7px !important;
        right: unset !important;
    }
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
  
  .modeIcon, .muteIcon, .ShowHideIcon, .ColorIcon{
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