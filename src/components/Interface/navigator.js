//Navigator -- Child of <UI />
import React, { memo, useEffect, useRef, useState } from "react"
import Projects from "./projects"
import Options from "./options"
import { cloud, state } from "../utils/state"
import { Song, closeWheel, resetWheel, Folder, Wheel } from "../utils/common"
import { Arrow, SideArrow, SearchBarIcon, ClearIcon } from "../utils/svg"
import { useSnapshot } from "valtio"
import styled from "styled-components"
import Draggable from "react-draggable"
import { HomeButton, Quote } from './homeButton';
import { Grabber, NextButton, PlayButton, ResetPosButton } from "./panelTools"
import CircleType from "circletype"
import { ColorWheel } from '@react-spectrum/color';
import { Link, useLocation } from "wouter"

function Navigator({ audio, nabla, dong, confirm, select, reset, song, setSong, handle, query, clear, refine, text, setText, resetButton, colorWheel, setColorWheel, color, setColor, open, close, setHovered, container }) {
  const snap = useSnapshot(state);
  const clip = useSnapshot(cloud);
  const nav = useRef(null);
  const wheel = useRef();
  const [focused, setFocused] = useState(false);
  const [location, setLocation] = useLocation();
  // const [track, setTrack] = useState(`${snap.songIndex + 1}/${clip.songs.length}`);

  const headwidth = {
    first: {
      max: snap.direction ? "100%" : "100%",
      min: snap.direction ? "62%" : "62%",
    },
    second: {
      max: snap.direction ? "115%" : "62%",
      min: snap.direction ? "62%" : "100%",
    },
  };

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

  // CircleType
  let bent;
  const title = useRef();
  useEffect(() => {
    if (title) {
      if (bent) {
        bent.destroy();
      } else {
        bent = new CircleType(title.current).radius(135);
      }
    }
    return () => {
      bent = null;
    }
  }, [state.songIndex]);


  const onControlledDrag = (e, position) => {
    let { x, y } = position;
    state.proPosition = { x, y };
    state.optPosition = { x, y };
    state.wheelPosition = { x, y };
    cloud.drag = true;
    state.dragged = true;
    nav.current.classList.add("glow");
    container.current.style.display = "none";
  };

  const onControlledStop = (e, position) => {
    let { x, y } = position;
    state.navPosition = { x, y };
    cloud.drag = false;
    if (container.current) container.current.style.display = "flex";
  }

  return (
    <Skew
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      skew={clip.skew ? `skew(3deg, 9deg)` : `skew(0deg, 0deg)`}
    >
      <Draggable nodeRef={nav} handle=".grabber" bounds="html"
        position={state.navPosition}
        onStop={onControlledStop}
        onDrag={onControlledDrag} >
        <Nav ref={nav} className="Panel nav">
          <Header style={focused ? { borderBottomColor: "#EBEBEB" } : null}
            width={(snap.isOpt || snap.isPro) ? "100%" : "90%"}
          >
            <HomeButton nabla={nabla} dong={dong} clear={clear} query={query} />
            {<Quote text={text} setText={setText} />}
          </Header>
          <div className="grid">
            {navigator.onLine && <Search query={query} clear={clear} refine={refine} setFocused={setFocused} />}
            <TrayWrapper
              style={clip.playMusic ? { borderColor: snap.theme === "light" ? snap.light.bwElement : snap.dark.bwElement } : null}>
              <ResetPosButton
                resetButton={resetButton}
                reset={reset}
                nav={nav} />
              <PlayButton
                audio={audio}
                setSong={setSong}
              />
              <NextButton
                audio={audio}
                setSong={setSong}
                select={select}
              />
            </TrayWrapper>
            {!snap.colorWheel &&
              <>
                <Link onClick={() => { clear(); select(); }} className={`li w ${location.substring(1) === "info" ? "active" : null}`} to="/info"
                  style={{ justifySelf: "flex-end" }}
                >
                  Info
                </Link>
                <Link onClick={() => { clear(); select(); }} className={`li w ${location.substring(1) === "store" ? "active" : null}`} to="/store"
                  style={{ justifySelf: "flex-start" }}>
                  Store
                </Link >
                <Folder className={`li folder proLink ${state.isPro ? "folderActive" : null}`} tabIndex={-1}
                  style={{ justifySelf: "flex-end" }}
                >
                  Projects
                  {snap.isPro ? <SideArrow /> : <Arrow />}
                </Folder>
                <Folder className={`li folder optLink ${state.isOpt ? "folderActive" : null}`} tabIndex={-1}
                  style={{ justifySelf: "flex-start" }}
                >
                  Options
                  {snap.isOpt ? <SideArrow /> : <Arrow />}
                </Folder>
              </>}
            {snap.colorWheel &&
              <>
                <Folder onClick={() => { state.monochrome = !state.monochrome; select(); }} className={`li w mono ${snap.monochrome ? "glow" : null}`} style={{ color: snap.monochrome ? snap.theme == 'light' ? snap.light.sky : snap.dark.sky : null }}
                >Monochrome</Folder>
                <Folder onClick={() => { closeWheel(); confirm(); }} className="li w Color">Confirm</Folder>
                <Folder onClick={() => { resetWheel(); reset(); }} className="li w Reset">Reset</Folder>
              </>
            }
            {/* force reload */}
            {clip.playMusic}
          </div>
          <Song ref={title} position={` left: 48%;`}
            className="bend song" style={clip.playMusic ? { opacity: 1, pointerEvents: "all" } : { opacity: 0, pointerEvents: "none" }} onClick={() => { state.isOpt = true }} tabIndex="0">
            {/* {snap.songIndex + 1}/{clip.songs.length} */}
          </Song>
          {/* {(clip.UILoading || clip.CanvasLoading) ? <Spinner /> : */}
          {/* {(!snap.colorWheel && */}
          <Grabber nav={nav} reset={reset} handle={handle} />
          {/* )} */}
          {/* } */}
        </Nav>
      </Draggable>
      <Projects
        open={open}
        close={close}
        reset={reset}
        confirm={confirm}
        headwidth={headwidth}
        select={select} />
      <Options
        song={song}
        setSong={setSong}
        open={open}
        close={close}
        headwidth={headwidth}
        colorWheel={colorWheel}
        setColorWheel={setColorWheel}
        select={select} />
      <Draggable position={snap.navPosition}>
        <Wheel
          opacity={snap.colorWheel ? "1" : "0"}
          pointerEvents={snap.colorWheel ? "all" : "none"}
          transition={snap.colorWheel ? "0.3s" : "0s"}
          ref={wheel}
          onClick={() => { state.colorChanged = true; }}
        >
          {!snap.monochrome && <ColorWheel
            size={"310px"}
            borderColor={`${props => props.theme.panelColor}`}
            value={color}
            onChange={setColor}
            onChangeEnd={setColor} />}
        </Wheel>
      </Draggable>
    </Skew>
  )
}

function Search({ query, refine, clear, setFocused }) {
  const [placeholder, setPlaceholder] = useState("(alt + z)");
  const Bar = useRef(null);

  useEffect(() => {
    let keys = {};

    function handleClick() {
      if (Bar.current === document.activeElement) {
        setPlaceholder("(esc)");
        setFocused(true);
        return;
      } else {
        setPlaceholder("(alt + z)");
        setFocused(false);
        return;
      }
    }

    function handleKeyPress(e) {
      // esc to clear search and blur input
      if (e.key === "Escape") {
        clear();
        Bar.current.blur();
        setPlaceholder("(alt + z)")
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
        setPlaceholder("(esc)")
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
    <SearchWrapper>
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
          id="clearIcon"
          onClick={
            () => {
              clear()
              Bar.current.focus()
            }
          }
        >
          <ClearIcon />
        </div>}
    </SearchWrapper>)
}

export default memo(Navigator)

const Skew = styled.div`  
  transform: ${props => props.skew};
  transition: 0.1s;
  position: absolute;
  z-index: 5000;
`
const Nav = styled.div`
  padding: 0 0 20px 0;
  position: absolute;
  left: var(--edge);
  top: var(--edge);
  z-index: 5000;
  text-indent: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .grid{
    position: relative;
    padding: 0 15px;
    display: grid;
    justify-items: center;
    margin: 2px 0 10px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    column-gap: 10px;
    row-gap: 5px;

    & a{
      width:90%;
    }

    & .folder{
      width: 75%;
    }
  }
    .quote{
      text-align: center;
    white-space: nowrap;
      text-indent: 0 !important;
      padding: 4px 0 4px;
      font-size: 10px;
      height: 20.5px !important;
    -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }

    & .li{
   backdrop-filter: blur(20px) !important;
    width: 80%;
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
    display: flex;
    justify-content: center;
    pointer-events: none;
  }

  & .grabber{
    pointer-events: all;
    cursor: grab;
    width: 50px;
    position: absolute;
    bottom: -20px;
    z-index: 500;
    /* left: 50%; */
    /* top: 10px; */
    /* transform: translate(-50%, 0); */
    stroke: ${props => props.theme.panelColor};
    fill: ${props => props.theme.panelColor};
    fill-opacity: 100% !important; 
    stroke-width: 1px !important;
    transition: 1.3s;
  }

  & .resetPos{
    border-radius: 50%;
    width: 20px;
    height: 20px;
    border-color:  ${props => props.theme.panelColor};
    /* background-color: ${props => props.theme.LiHover}; */

    & svg path{
      fill:  ${props => props.theme.panelColor};
    }

    &:hover{
      border-color: ${props => props.theme.sky};
    }

    &:hover >  svg path{
      fill: ${props => props.theme.LiActiveBackground} !important;
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
    position: absolute;
    top: 06px;
    left: 48%;
  }
`
const Header = styled.div`
      height: 130px;
      width: ${props => props.width};
        border-bottom: 1px solid ${props => props.theme.panelColor};
        margin: 0 0 8px 0;
        padding: 25px 0px 0px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        row-gap: 2px !important;
        flex-direction: column;
        flex-wrap: nowrap;
`
const TrayWrapper = styled.div`
  transform: skewY(2deg);
  padding: 0 5px;
  height: 100%;
  /* height: 26px; */
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  justify-self: flex-start;
  /* overflow-x: scroll; */
  column-gap: 10px;
  border: 1px solid;
   border-radius: 500px;
`
const SearchWrapper = styled.div`
display: flex;
align-items: center;
position: relative;
width: 100%;
transform: skewY(-2deg);
`
const SearchBar = styled.input`
  border: none !important;
  width: 100%;
  height: 26px;
  margin: auto 0;
  backdrop-filter: blur(20px) !important;
  display: flex;
  border-radius: 500px;
  background-color: transparent;
  box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
  -webkit-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor}; 
  -moz-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor}; 
  color:  ${props => props.theme.panelColor};
  padding: 2px 25px 2px 25px;
  user-select: text;
  -moz-user-select: text;
  -webkit-user-select: text;
  font-size: 13px;
  cursor: pointer;

  #searchIcon{
    position: absolute;
    top: 0 !important;
    left: 0 !important;
  }

  &::placeholder{
    text-align: center;
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
export const BarIcon = styled.svg`
        position: absolute;
        top: 50%;
        left: 8px;
        transform: translateY( -57%);
        height: 12px;
        fill: ${props => props.colorfill};
        stroke: ${props => props.colorstroke};
        cursor: pointer;
        stroke-width: 1px;

        &:hover{
          opacity: 50%;
        pointer-events: painted;
    }
        `
export const Clear = styled.svg`
        position: absolute;
        top: 52%;
        right: 15px;
        transform: translate(50%, -57%);
        height: 14px;
        fill: ${props => props.theme.panelColor};
        cursor: pointer;

        &:hover{
          opacity: 50%;
        pointer-events: painted;
    }
        `