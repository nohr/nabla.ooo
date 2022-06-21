//Navigator -- Child of <UI />
import React, { useEffect, useRef } from "react"
import { cloud, state } from "./state"
import { useSnapshot } from "valtio"
import { Folder } from "./style"
import styled from "styled-components"
import { NavLink } from "react-router-dom"
import Draggable from "react-draggable"
import { SvgNabla, Spinner, Arrow, SideArrow, Grabber } from "./svg"
import { Search } from "./search"
import { useSearchBox } from "react-instantsearch-hooks-web"

//Audio Imports
// import useSound from "use-sound"
// import sound3 from "../Sounds/close.mp3"

function Navigator() {
  const snap = useSnapshot(state);
  const clip = useSnapshot(cloud)
  const { clear } = useSearchBox();
  const nav = useRef(null);

  // Glow
  let pro;
  let opt;

  useEffect(() => {
    pro = document.querySelector('.pro');
    opt = document.querySelector('.opt');
    if (nav.current) {
      // Glow on Shift
      window.addEventListener("keydown", (e) => {
        if (e.key === "Shift") {
          e.preventDefault();
          nav.current && nav.current.classList.add("glow");
          pro.classList && pro.classList.add("glow");
          opt.classList && opt.classList.add("glow");
        } else {
          return;
        }
      })
      window.addEventListener("keyup", (e) => {
        if (e.key === "Shift") {
          e.preventDefault();
          nav.current && nav.current.classList.remove("glow");
          pro.classList && pro.classList.remove("glow");
          opt.classList && opt.classList.remove("glow");
        } else {
          return;
        }
      })
    };
  }, []);

  const onControlledDrag = (e, position) => {
    let { x, y } = position;
    state.proPosition = { x, y };
    state.optPosition = { x, y };
    state.drag = true;

    nav.current.classList.add("glow");
  };

  const onControlledStop = (e, position) => {
    let { x, y } = position;
    state.navPosition = { x, y };
    state.drag = false;
  }

  function closeWheel() {
    state.colorWheel = false;
  }

  function resetWheel() {
    state.colorWheel = false;
    if (snap.theme === 'light') {
      state.light.panelColor = 'hsl(205, 100%, 28%)';
      state.light.placeholder = 'hsl(205, 100%, 28%)';
      state.light.LiHover = "hsla(205, 100%, 28%, 0.67)";
      state.light.CD = "hsla(14, 31%, 84%, 1)";
      state.light.Surface = "hsla(205, 100%, 80%, 1)";
      state.light.spotlight = "hsl(360, 0%, 72%)";
    } else if (snap.theme === 'dark') {
      state.dark.panelColor = "hsl(205, 31%, 70%)";
      state.dark.placeholder = "hsl(205, 31%, 70%)";
      state.dark.LiHover = "hsla(205, 31%, 70%, 0.67)";
      state.dark.Surface = "hsla(205, 15%, 50%, 1)";
      state.dark.spotlight = "hsla(205, 31%, 70%, 1)";
    }
    state.colorChanged = false;
  }

  return (
    //NAV
    <Draggable nodeRef={nav} handle=".grabber" bounds="body"
      position={state.navPosition}
      onStop={onControlledStop}
      onDrag={onControlledDrag} >
      <Nav ref={nav} className="Panel nav">
        <div className="header">
          <SvgNabla />
          <div className="quote w">{`${snap.quotes}`}</div>
        </div>
        {navigator.onLine && <Search />}
        <div className="grid">
          {!snap.colorWheel &&
            <>
              <NavLink onClick={() => clear()} className="li w" to="/info">
                Info
              </NavLink>
              <NavLink onClick={() => clear()} className="li w" to="/store">
                Store
              </NavLink >
              <Folder className="li folder proLink" tabIndex={-1}
              >
                Projects
                {snap.isPro ? <SideArrow /> : <Arrow />}
              </Folder>
              <Folder className="li folder optLink" tabIndex={-1}
              >
                Options
                {snap.isOpt ? <SideArrow /> : <Arrow />}
              </Folder>
            </>}
          {snap.colorWheel &&
            <>
              <Folder onClick={() => closeWheel()} className="li w Color">Confirm</Folder>
              <Folder onClick={() => resetWheel()} className="li w Reset">Reset</Folder>
            </>
          }
          {/* force reload */}
          {clip.playMusic}
          {/* {snap.isPro}
          {snap.isOpt} */}
        </div>
        <p className="song" style={clip.playMusic ? { opacity: 1, pointerEvents: "all" } : { opacity: 0, pointerEvents: "none" }} onClick={() => { state.isOpt = true }} tabIndex="0">
          {clip.songs[snap.songIndex].artist} - {clip.songs[snap.songIndex].name}
        </p>
        {clip.loading ? <Spinner /> : (!snap.colorWheel && <Grabber />)}
      </Nav>
    </Draggable>
  )
}

export default Navigator

const Nav = styled.div`
  padding: 0em 42.5px 30px 42.5px;
  position: absolute;
  left: var(--edge);
  top: var(--edge);
  z-index: 5000;
  text-indent: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .grid{
    display: grid;
    justify-items: center;
    padding-top: 10px;
    gap: 5px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }
    .header {
        border-bottom: 1px solid ${props => props.theme.panelColor};
        margin: 0 0 8px 0;
        padding: 10px 0px 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        flex-wrap: nowrap;
    }

    .quote{
      text-indent: 0 !important;
      padding: 4px 0 4px;
      font-size: 10px;
      height: 19.5px !important;
    -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }


    & .li{
    width: 85%;
    align-self: center;
    transition: 0.3s;
    -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }

    .folder{
      padding-right: 2px;
    }

  & .speaker{
    cursor: pointer;
    position: absolute;
    z-index: 500;
    width: 12px;
    top: 5%;
    left: 50%;
    transform: translate(-50%, 0);
  }

  & .grabber{  
    cursor: grab;
    width: 50px;
    position: absolute;
    z-index: 500;
    left: 50%;
    bottom: 8%;
    transform: translate(-50%, 0);
    stroke: ${props => props.theme.panelColor};
    fill: ${props => props.theme.panelColor};
    fill-opacity: 0% !important; 
    stroke-width: 1px !important;
    transition: 1.3s;
  }

  & .speaker{
    fill: ${props => props.theme.panelColor};
  	animation: pulse 2s infinite;
    transition: 1.3s;
}

@keyframes pulse {
	0% {
		transform: scale(0.8);
		fill: ${props => props.theme.panelColor};
	}

	70% {
		transform: scale(1);
		fill: ${props => props.theme.textHover};
	}

	100% {
		transform: scale(0.8);
		fill: ${props => props.theme.panelColor};
	}
}

  & .speaker:hover {
    fill: ${props => props.theme.LiHover};
    -webkit-filter: drop-shadow(1px 1px 3px ${props => props.theme.LiHover});
    filter: drop-shadow(1px 1px 3px ${props => props.theme.LiHover});
    transition: 0.3s;
  }

  & .grabber:not(:hover){
    fill-opacity: 0% !important; 
    stroke-width: 1px !important;
  }

  .spinner {
    width: 25px;
    height: 25px;
    background: none;
    position: absolute;
    z-index: 500;
    pointer-events: none;
    left: 50%;
    bottom: 5%;
    transform: translate(-50%, 0);
  }
  .spinner path{
    fill: ${props => props.theme.panelColor};
  }

  .Color{
    grid-row: 2;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    text-indent: 0;
    color: #ebebeb !important;
		background-color: ${props => props.theme.LiHover};
    -webkit-filter: drop-shadow(1px 1px 6px ${props => props.theme.LiHover});
    filter: drop-shadow(1px 1px 6px ${props => props.theme.LiHover});
    text-align: center;
    animation: flashConfirm 0.6s infinite;
    transition: 0.3s;
    outline: 0px;

    &:hover{
      color: ${props => props.theme.panelColor} !important;
      text-shadow: none;
      background-color:  transparent !important;
      outline: 1px solid ${props => props.theme.panelColor};
    }

    @keyframes flashConfirm {
	0% {
    color: #ebebeb;
		background-color: ${props => props.theme.LiHover};
    box-shadow: 0px 0px 0px ${props => props.theme.LiHover};
	}

	70% {
    color: ${props => props.theme.sky};
		background-color: ${props => props.theme.LiHover};
    box-shadow: 1px 1px 6px ${props => props.theme.LiHover};
	}

	100% {
    color: #ebebeb;
		background-color: ${props => props.theme.LiHover};
    box-shadow: 0px 0px 0px ${props => props.theme.LiHover};
	}
}
  }

  .Reset{
    grid-row: 2;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    text-indent: 0;
    color: #ebebeb !important;
		background-color: ${props => props.theme.LiActiveBackground};
    -webkit-filter: drop-shadow(1px 1px 6px ${props => props.theme.LiActiveBackground});
    filter: drop-shadow(1px 1px 6px ${props => props.theme.LiActiveBackground});
    text-align: center;
    transition: 0.3s;
    outline: 0px;

    &:hover{
      color: ${props => props.theme.panelColor} !important;
      text-shadow: none;
      background-color:  transparent !important;
      outline: 1px solid ${props => props.theme.panelColor};
    }
  }

  .song{
    position: absolute;
     top: 3%;
    /* margin: 0 auto; */
    left: 48%;
    margin: 0;
    /* transform: translate(-30%, 0%) !important; */
    border: none;
    white-space: nowrap;
    /* pointer-events: none;
    opacity: 0; */
    animation: flash 2s infinite;
    transition: 1.3s;
    cursor: pointer;
    -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
  }
  @keyframes flash {
	0% {
		color: ${props => props.theme.panelColor};
	}

	70% {
		color: ${props => props.theme.sky};
    -webkit-filter: drop-shadow(1px 1px 6px ${props => props.theme.sky});
    filter: drop-shadow(1px 1px 6px ${props => props.theme.sky});
	}

	100% {
		color: ${props => props.theme.panelColor};
	}
}
`
export const Homer = styled(NavLink)`
  height: fit-content;
  width: 70%;
  display: flex;
  justify-content: center;
  margin: 9px 0 2px 0;
  padding-top: 5px;
  padding-bottom: 3px;
  border-radius: 120px;
  overflow: visible;
  background-color: transparent !important;
  -webkit-box-shadow: none !important;
  -moz-box-shadow: none !important;
  box-shadow: none !important;

  & svg{
    align-self:center;
    fill: ${props => props.theme.panelColor};
    color: ${props => props.theme.panelColor};
    transition: 2.3s;
  }

  &:hover {
    background-color: ${props => props.theme.LiHover} !important;
    -webkit-box-shadow: 0px 3px 10px 1px ${props => props.theme.LiHover}  !important;
    -moz-box-shadow: 0px 3px 10px 1px ${props => props.theme.LiHover}  !important;
    box-shadow: 0px 3px 10px 1px ${props => props.theme.LiHover}  !important;
    transition: 0.6s;
  }

  &:hover > svg{
    fill: ${props => props.theme.textHover};
    -webkit-filter: drop-shadow(1px 1px 3px ${props => props.theme.textHover});
    filter: drop-shadow(1px 1px 3px ${props => props.theme.textHover});
    transition: 1.0s;
  }

`