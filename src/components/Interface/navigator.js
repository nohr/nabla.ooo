//Navigator -- Child of <UI />
import React, { useEffect, useRef, useState } from "react"
import { cloud, state } from "../utils/state"
import { Song, closeWheel, resetWheel, Folder } from "../utils/common"
import { Arrow, SideArrow, SearchBarIcon, ClearIcon } from "../utils/svg"
import { useSnapshot } from "valtio"
import styled from "styled-components"
import { NavLink } from "react-router-dom"
import Draggable from "react-draggable"
import { HomeButton, Quote } from './homeButton';
import { Grabber } from "./grabber"
import CircleType from "circletype"

function Navigator({ nabla, dong, confirm, select, reset, song, handle, query, clear, refine, text, setText, resetButton }) {
  const snap = useSnapshot(state);
  const clip = useSnapshot(cloud);
  const nav = useRef(null);
  const [focused, setFocused] = useState(false);

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

  let title;
  // CircleType
  useEffect(() => {
    title = document.querySelector(".bend");
    if (title) {
      title = new CircleType(title).radius(clip.mobile ? 170 : 128);
      title.dir(-1);
    }
    return () => {
      title.destroy();
      title = null;
    }
  }, [snap.songIndex, snap.colorChanged]);


  const onControlledDrag = (e, position) => {
    let { x, y } = position;
    state.proPosition = { x, y };
    state.optPosition = { x, y };
    state.wheelPosition = { x, y };
    cloud.drag = true;
    state.dragged = true;
    nav.current.classList.add("glow");
  };

  const onControlledStop = (e, position) => {
    let { x, y } = position;
    state.navPosition = { x, y };
    cloud.drag = false;
  }

  return (
    //NAV
    <Draggable nodeRef={nav} handle=".grabber" bounds="body"
      position={state.navPosition}
      onStop={onControlledStop}
      onDrag={onControlledDrag} >
      <Nav ref={nav} className="Panel nav">
        <div className="header"
        style={ focused ? {borderBottomColor:"#EBEBEB"} : null}>
          <HomeButton nabla={nabla} dong={dong} clear={clear} query={query} />
        {navigator.onLine && <Search query={query} clear={clear} refine={refine} setFocused={setFocused} />}
        </div>
          {<Quote text={text} setText={setText} />}
        <div className="grid">
          {!snap.colorWheel &&
            <>
              <NavLink onClick={() => { clear(); select(); }} className="li w" to="/info">
                Info
              </NavLink>
              <NavLink onClick={() => { clear(); select(); }} className="li w" to="/store">
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
              <Folder onClick={() => { closeWheel(); confirm(); }} className="li w Color">Confirm</Folder>
              <Folder onClick={() => { resetWheel(); reset(); }} className="li w Reset">Reset</Folder>
            </>
          }
          {/* force reload */}
          {clip.playMusic}
        </div>
        <Song position={` left: 48%;`}
          className="bend song" style={clip.playMusic ? { opacity: 1, pointerEvents: "all" } : { opacity: 0, pointerEvents: "none" }} onClick={() => { state.isOpt = true }} tabIndex="0">
          {song}
        </Song>
        {/* {(clip.UILoading || clip.CanvasLoading) ? <Spinner /> : */}
        {/* {(!snap.colorWheel && */}
        <Grabber nav={nav} reset={reset} handle={handle} resetButton={resetButton} />
        {/* )} */}
        {/* } */}
      </Nav>
    </Draggable>
  )
}


function Search({ query, refine, clear, setFocused }) {
  const [placeholder, setPlaceholder] = useState("Search (alt + z)");
  const Bar = useRef(null);

  useEffect(() => {
    let keys = {};

    function handleClick() {
      if (Bar.current === document.activeElement) {
        setPlaceholder("Cancel (esc)");
        setFocused(true);
        return;
      } else {
        setPlaceholder("Search (alt + z)");
        setFocused(false);
        return;
      }
    }

    function handleKeyPress(e) {
      // esc to clear search and blur input
      if (e.key === "Escape") {
        clear();
        Bar.current.blur();
        setPlaceholder("Search (alt + z)")
        // setFocused(false);
        return;
      }
      // Do nothing when these are pressed
      if (e.key === "Enter" || e.key === "Shift" || e.key === "CapsLock" || e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === "Alt") {
        return;
      }
    }

    function handleCommandPress(e) {
      // Alt + f to focus search
      let { keyCode, type } = e || Event;
      const isKeyDown = (type === "keydown");
      keys[keyCode] = isKeyDown;
      if (isKeyDown && (e.altKey === true) && keys[90]) {
        e.preventDefault();
        keys = {};
        Bar.current.focus();
        setPlaceholder("Cancel (esc)")
        setFocused(true);
      } else {
        return;
      }
    }
    if (Bar.current) {
      Bar.current.addEventListener("keydown", handleKeyPress);
    }
    window.addEventListener("click", handleClick);
    window.addEventListener("keydown", handleCommandPress);

    return () => {
      if (Bar.current) {
        Bar.current.removeEventListener("keydown", handleKeyPress);
      }
      window.removeEventListener("click", handleClick);
      window.removeEventListener("keydown", handleCommandPress);
    }
  }, [query, refine])

  function handleChange(e) {
    if (e.target.value) {
      !state.colorWheel && refine(e.target.value);
    } else {
      clear();
    }
  };

  return (
    <SearchWrapper id="search">
      <SearchBar
        placeholder={placeholder}
        type="text"
        value={query}
        onChange={(e) => handleChange(e)}
        ref={Bar}
      >
      </SearchBar>
      {cloud.chatMode}
      <SearchBarIcon />
      {query.length > 0 &&
        <div
          onClick={
            () => {
              clear()
              Bar.current.focus()
            }
          }
          id="clearIcon"
        >
          <ClearIcon />
        </div>}
    </SearchWrapper>)
}

export default Navigator

const Nav = styled.div`
  padding: 0em 32.5px 20px 32.5px;
  position: absolute;
  left: var(--edge);
  top: var(--edge);
  z-index: 5000;
  text-indent: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  @media only screen and (max-width: 768px) {
    &{
      display:  none;
    }
  }

  .grid{
    display: grid;
    justify-items: center;
    margin: 2px 0 16px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }
    .header {
      height: 128px;
        border-bottom: 1px solid ${props => props.theme.panelColor};
        margin: 0 0 8px 0;
        padding: 10px 0px 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        flex-wrap: nowrap;
    }

    .quote{
      text-align: center;
    white-space: nowrap;
      text-indent: 0 !important;
      padding: 4px 0 4px;
      font-size: 11px;
      height: 20.5px !important;
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

  & .GrabberWrap{
    /* position: relative; */
    display: flex;
    justify-content: center;
  }
  & .grabber{  
    cursor: grab;
    width: 50px;
    position: absolute;
    bottom: -15px;
    z-index: 500;
    /* left: 50%; */
    /* top: 10px; */
    /* transform: translate(-50%, 0); */
    stroke: ${props => props.theme.panelColor};
    fill: ${props => props.theme.panelColor};
    fill-opacity: 0% !important; 
    stroke-width: 1px !important;
    transition: 1.3s;
  }

  & .resetPos{
    position: absolute;
    bottom: 137px;
    right: 20px;
    width: 20px;
    height: 20px;

    &:hover{
      border-color:${props => props.theme.textHover};
    }

    &:hover > .ResetIcon{
      fill: ${props => props.theme.textHover};
    }

    & .ResetIcon{
      fill: ${props => props.theme.panelColor};
    }
  }

  & .speaker{
    fill: ${props => props.theme.panelColor};
    /* TODO: Make this pulse to tempo of current track */
  	animation: pulse ${state.songIndex === 1 ? '1.7778s' : '2s'} infinite;
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

  & .song{
    left: 48%;
  }
`
const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 96%;
  margin: 0 auto 0 auto;
`
const SearchBar = styled.input`
  border: none !important;
  width: 100%;
  margin: 3px 0;
  display: flex;
  border-radius: 25px;
  background-color: transparent;
  box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
  -webkit-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor}; 
  -moz-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor}; 
  color:  ${props => props.theme.panelColor};
  padding: 2px 19px 2px 19px;
  user-select: text;
  -moz-user-select: text;
  -webkit-user-select: text;
  font-size: 13px;
  cursor: pointer;

  @media only screen and (max-width: 768px) {
  padding: 6px 19px 6px 20px;
  outline: 1px solid ${props => props.theme.panelColor};
  font-size: 18px;
  }

  &::placeholder{
    color: ${props => props.theme.panelColor};
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
  }

  &:hover::placeholder{
    color: ${props => props.theme.textHover};
    transition: 0.3s;
  }
  &:hover{
    color: ${props => props.theme.textHover};
    background-color:${props => props.theme.LiHover};
    outline: 1px solid ${props => props.theme.textHover};
    box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
    -webkit-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor}; 
    -moz-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor}; 
    transition: 0.3s;
  }
  &:focus::placeholder{
    color: ${props => props.theme.textHover};
    transition: 0.3s;
  }
  &:focus{
    color: ${props => props.theme.textHover};
    background-color:${props => props.theme.LiHover};
    outline: 1px solid ${props => props.theme.textHover};
    box-shadow: 0 0 50px 50px  ${props => props.theme.LiHover};
    -webkit-box-shadow: 0 0 50px 50px  ${props => props.theme.LiHover};
    -moz-box-shadow: 0 0 50px 50px  ${props => props.theme.LiHover};
    transition: 0.3s;
  }

  &:focus ~ #searchIcon, &:hover ~ #searchIcon{
    fill: ${props => props.theme.textHover} !important;
    transition: 0.3s;
  }
  &:focus ~ #clearIcon svg, &:hover ~ #clearIcon svg{
    fill: ${props => props.theme.textHover} !important;
    transition: 0.3s;
  } 
`