import React, { useRef, useEffect, useState } from 'react'
import { ClearIcon, ColorIcon, ConfirmIcon, GyroIcon, ModeIcon, MuteIcon, NextIcon, PlayPauseIcon, ResetIcon, ShowHideIcon } from './svg';
import { HomeButton, characters } from './homeButton';
import { Grabber } from './grabber';
import styled from 'styled-components';
import { useSnapshot } from 'valtio';
import { cloud, state } from './state';
import { Folder, Wheel } from './style';
import { NextSong, ToggleMusic, toggleTheme } from './options';
import { resetWheel, Song } from './navigator';
import { ColorWheel } from '@react-spectrum/color';
import Draggable from 'react-draggable';
import { Stats } from '@react-three/drei';
import Scrambler from 'scrambling-text';
import { newQuote } from '../..';
import { getGyro } from '../../App';

export const offset = 70;
function Search({
    Bar, options,
    refine, clear, navWrap,
    query, setModal, select, reset, modal }) {
    const searchWrap = useRef(null);
    const snap = useSnapshot(state);
    const clip = useSnapshot(cloud);

    function handleChange(e) {
        if (e.target.value) {
            refine(e.target.value);
        } else {
            clear();
        }
    };

    useEffect(() => {
        Bar.current.focus();
        if (navWrap.current) { navWrap.current.style.overflowX = "clip" };
        if (!clip.dragged) {
            state.mobileNavPosition.y = state.mobileNavPosition.y + (offset);
        } else {
            // state.searchPosition.x = 0;
            navWrap.current.style.transition = "1.3s";
            // state.searchPosition = { x: 0, y: 0 };
            // state.optionsPosition = { x: 0, y: 0 };
            // state.grabberPosition = { x: 0, y: 0 };
            state.mobileNavPosition = { x: 0, y: options ? (offset * 2) : offset };
            cloud.dragged = false;
            setTimeout(() => {
                navWrap.current.style.transition = "0.1s";
            }, "1300");
        }
        cloud.preview = [];

        function handleKeyPress(e) {
            // esc to clear search and blur input
            if (e.key === "Enter") {
                // refine('');
                Bar.current.blur();
                setModal(false);
                select();
                return;
            }
        }

        if (Bar.current) {
            Bar.current.addEventListener("keydown", handleKeyPress);
        }

        return () => {
            if (Bar.current) {
                Bar.current.removeEventListener("keydown", handleKeyPress);
            }
            if (navWrap.current) { navWrap.current.style.overflowX = "visible" };
            if (!clip.dragged) {
                state.mobileNavPosition.y = state.mobileNavPosition.y - offset;
            }
        }
    }, [])
    return <Draggable nodeRef={searchWrap} bounds=".searchBounds" position={snap.searchPosition} axis="x"
        onStart={() => false}
    >
        <SearchWrapper
            ref={searchWrap}
            id='search'
            className="modalContent"
            opacity={modal !== "search" ? "0" : "1"}
            pointerEvents={modal !== "search" ? "none" : "all"}
            transition={modal !== "search" ? "0.3s" : "unset"}
        >
            <SearchBar
                onTouchEnd={e => {
                    e.target.focus();
                    navWrap.current.style.overflowX = "clip";
                    navWrap.current.style.transition = "1.3s";
                    state.mobileNavPosition = { x: 0, y: options ? (offset * 2) : offset };
                    cloud.dragged = false;
                    setTimeout(() => {
                        navWrap.current.style.transition = "0.1s";
                    }, "1300");
                }}
                onBlur={() =>
                    navWrap.current.style.overflowX = "visible"}
                placeholder={'Search'}
                type="text"
                value={query}
                onChange={(e) => handleChange(e)}
                ref={Bar}
            ></SearchBar>
            {query.length > 0 &&
                <Folder onTouchEnd={() => {
                    reset();
                    navWrap.current.style.overflowX = "clip";
                    clear();
                    Bar.current.focus();
                }}
                    id="clearIcon"
                ><ClearIcon />
                </Folder>}
        </SearchWrapper>
    </Draggable>
}

function Options({ search, resetButton, reset, navWrap, handle, setSong, modal, select, setColorWheel, setModal }) {
    const snap = useSnapshot(state);
    const clip = useSnapshot(cloud);
    const carousel = useRef(null);

    useEffect(() => {
        if (!clip.dragged) {
            state.mobileNavPosition.y = state.mobileNavPosition.y + offset;
        }

        cloud.opt = true;
        return () => {
            cloud.opt = false;
            if (!clip.dragged) {
                state.mobileNavPosition.y = state.mobileNavPosition.y - offset;
            }
        }
    }, [])

    // Rotate reset button
    useEffect(() => {
        const rad = Math.atan(state.grabberPosition.x / -state.mobileNavPosition.y);
        const deg = rad * (180 / Math.PI);
        if (cloud.dragged) {
            resetButton.current.style.transform = `rotate(${rad}rad)`;
        }
        console.log(state.mobileNavPosition);
    }, [state.grabberPosition])

    const onControlledDrag = (e, position) => {
        // let { x, y } = position;
        cloud.drag = true;
    };

    const onControlledStop = (e, position) => {
        let { x, y } = position;
        state.searchPosition = { x, y: 0 };
        cloud.drag = false;
    };

    let hide = false;
    const [hidden, setHidden] = useState(false);
    return <Draggable nodeRef={carousel}
        handle=".grabber"
        axis='x'
        position={snap.optionsPosition}
        onStop={onControlledStop}
        onDrag={onControlledDrag} >
        <OptionsWrapper
            ref={carousel}
            className="modalContent"
            opacity={modal !== "options" ? "0" : "1"}
            pointerEvents={modal !== "options" ? "none" : "all"}
            transition={modal !== "options" ? "0.3s" : "unset"}
        >
            <div style={{ pointerEvents: hidden ? "none" : "all", backgroundColor: hidden ? snap.theme === 'light' ? snap.light.LiHover : snap.dark.LiHover : "transparent", opacity: hidden ? 0.6 : 1 }} className='carousel'
                onTouchMove={() => {
                    setHidden(true);
                    handle.current.setAttribute(`style`, `
                    animation: none !important;
                    fill-opacity: 100% !important; stroke-width: 0px !important; transition: 0s !important;`);
                }}
                onTouchEnd={() => {
                    setHidden(false);
                    handle.current.setAttribute(`style`,
                        `fill-opacity: 0% !important; stroke-width: 1px !important; transition: 0.3s;`);
                }}
            >
                {/* MUTE */}
                <Folder className="MuteIcon li"
                    onTouchEnd={() =>
                        snap.muted ? state.muted = false : state.muted = true}>
                    <MuteIcon />
                </Folder>
                {/* MUSIC */}
                <Folder className="li"
                    // style={{ marginBottom: "20px" }}
                    onTouchEnd={() => {
                        ToggleMusic();
                    }}
                ><PlayPauseIcon arg={1} />
                </Folder>
                {/* NEXT */}
                <Folder
                    // style={{ marginTop: "20px", marginBottom: "4px" }}
                    onTouchEnd={() => {
                        select();
                        NextSong();
                        setSong(`${cloud.songs[state.songIndex].artist} - ${cloud.songs[state.songIndex].name}`);
                    }} id="Next" className="li"><NextIcon />
                </Folder>
                {/* RESET */}
                <Folder
                    ref={resetButton}
                    onTouchEnd={() => {
                        setModal(false);
                        cloud.resetRate = (Math.random() * (0.85 - 0.65) + 0.65);
                        reset();
                        navWrap.current.style.transition = "1.3s";
                        if (clip.dragged) {
                            state.hideNav = false;
                            state.searchPosition = { x: 0, y: 0 };
                            state.optionsPosition = { x: 0, y: 0 };
                            state.grabberPosition = { x: 0, y: 0 };
                            state.mobileNavPosition = { x: 0, y: (offset * 2) };
                        } else {
                            state.hideNav = true;
                            state.mobileNavPosition = {
                                x: 0, y: search ? 15 : (-offset + 15)
                            };
                        }
                        cloud.dragged = false;
                        setTimeout(() => {
                            navWrap.current.style.transition = "0.1s";
                            console.log("transition returned");
                        }, "1300");
                    }}
                    className={`li resetPos w`}>
                    <ShowHideIcon n={2} />
                </Folder>
                {/* THEME */}
                <Folder
                    // style={{ marginTop: "20px", marginBottom: "4px" }}
                    onTouchEnd={() => {
                        select();
                        toggleTheme();
                    }} className="li"><ModeIcon />
                </Folder>
                {/* COLOR */}
                <Folder
                    // style={{ marginBottom: "20px" }}
                    onTouchEnd={() => {
                        select();
                        setColorWheel(true);
                        state.canvasPaused = false;
                    }} className="li w"><ColorIcon />
                </Folder>
                {/* GYRO */}
                <Folder
                    // style={{ marginBottom: "20px" }}
                    onTouchEnd={() => {
                        select();
                        getGyro(!snap.gyro);
                        state.gyro = !snap.gyro;
                    }} className="li w"><GyroIcon />
                </Folder>
                {cloud.playMusic}
            </div>
        </OptionsWrapper>
    </Draggable>
}

function MobileNavigator({ nabla, dong, open, close, select, confirm, reset, color, setColor, setSong, song, setColorWheel, colorWheel, query, refine, clear, handle }) {
    const snap = useSnapshot(state);
    const clip = useSnapshot(cloud);
    const nav = useRef(null);
    const navWrap = useRef(null);
    const Bar = useRef(null);
    const wheel = useRef(null);
    const resetButton = useRef(null);
    const [modal, setModal] = useState(false);
    const [offset, setOffset] = useState('-80px');
    const [changing, setChanging] = useState(false);
    let currentSong;
    currentSong = document.querySelectorAll('audio')[0];
    let search = (modal && modal.indexOf("search") > -1);
    let options = (modal && modal.indexOf("options") > -1);

    // Text Scramble
    const [text, setText] = useState("");
    const quote = useRef(new Scrambler());
    useEffect(() => {
        newQuote().then(() => quote.current.scramble(state.quotes, setText, { characters: characters }));
    }, [snap.quotes]);

    function toggleModal(link) {
        let index;

        if (modal && modal.indexOf(link)) {
            index = modal.indexOf(link);
        }

        if (!modal) {
            // open the modal if its closed
            setModal([link]);
            setOffset('10px');
            open();
        } else if (modal.length === 1) {
            if (index !== -1) {
                // close the only section
                setModal(false);
                setOffset('-80px');
                close();
            } else if (index === -1) {
                // open the section thats not already open
                modal.push(link);
                setOffset('150px');
                open();
            }
        } else if (modal.length === 2) {
            if (index !== -1) {
                // close only the selected section 
                setOffset('10px');
                modal.splice(index, 1);
                close();
            }
        };
    };

    if (wheel.current) {
        wheel.current.style.position = "absolute";
        wheel.current.style.left = "50%";
        wheel.current.style.transform = "translateX(-50%)";
        wheel.current.style.bottom = "20px";
        wheel.current.style.borderRadius = "50%";
    };

    useEffect(() => {
        if (currentSong) {
            currentSong.addEventListener("play", () => {
                cloud.playMusic = true;
            })
            currentSong.addEventListener("pause", () => {
                cloud.playMusic = false;
            })
        }
    }, [clip.playMusic, snap.songIndex]);

    const onControlledDrag = (e, position) => {
        cloud.drag = true;
        let { x, y } = position;
        state.mobileNavPosition.y = y;
    };

    const onControlledStop = (e, position) => {
        cloud.drag = false;
        let { x, y } = position;

    };

    useEffect(() => {
        if (navWrap.current) {
            navWrap.current.addEventListener("touchmove", (e) => { e.preventDefault(); }, false);
        }
    });

    return (
        <>
            <Draggable nodeRef={navWrap} handle=".GrabberWrap" bounds=".container"
                position={snap.mobileNavPosition}
                axis="y"
                onStop={onControlledStop}
                onDrag={onControlledDrag} >
                <NavWrapper className='mobileNavWrap' ref={navWrap} onTouchStart={() => cloud.selected = false}>
                    {/* Reset */}
                    {!changing && colorWheel && <Folder
                        border="border: 1px solid;"
                        onTouchEnd={() => {
                            cloud.resetRate = (Math.random() * (0.85 - 0.65) + 0.65);
                            reset();
                            setModal(false);
                            resetWheel();
                            setColorWheel(false);
                            state.canvasPaused = false;
                        }} className="circleButton li w reset"
                        style={{ position: "fixed", left: "6vw", pointerEvents: "all" }}
                    ><ResetIcon /></Folder>}
                    {/* Mobile Nav */}
                    {!colorWheel && <MobileNav className="mobileNav" ref={nav} >
                        {/* SEARCH BAR */}
                        {search && <Search options={options} reset={reset} Bar={Bar} navWrap={navWrap} query={query}
                            refine={refine} clear={clear}
                            setModal={setModal} select={select} modal={modal} />}
                        {/* Song Title */}
                        <Song
                            position={`position: unset; margin: 5px 0 10px 0 !important;`}
                            style={clip.playMusic ? { opacity: 1, pointerEvents: "all" } : { opacity: 0, pointerEvents: "none" }} tabIndex="0">
                            {song}
                        </Song>
                        <div className="mainRow">
                            {/* Search Button */}
                            {(!clip.CanvasLoading) && <NavButton
                                className={`${(search || query.length > 0) && "active"} li w`}
                                onTouchEnd={() => toggleModal("search")}>
                                {svg["search"]}
                            </NavButton>}
                            {/* Home Button */}
                            <HomeButton text={text} setText={setText} quote={quote} setColor={setColor} color={color} nabla={nabla} dong={dong} clear={clear} />
                            {/* Options Button */}
                            {(!clip.CanvasLoading) && <NavButton
                                className={`${options && "active"} li w`}
                                onTouchEnd={() => toggleModal("options")} >
                                {svg["options"]}
                            </NavButton>}
                        </div>
                        {/* OPTIONS  */}
                        {options && <Options search={search} handle={handle} resetButton={resetButton} reset={reset} navWrap={navWrap} setModal={setModal} setSong={setSong} select={select} modal={modal}
                            colorWheel={colorWheel}
                            setColorWheel={setColorWheel} />}
                        {/* QUOTE */}
                        <div className="quote w">
                            {(!clip.CanvasLoading) ? <div >{`${text}`}</div> : <div style={{ opacity: 0 }}>love</div>}
                        </div>
                        {/* GRABBER */}
                        {(!clip.CanvasLoading) && <Grabber resetButton={resetButton} setModal={setModal} navWrap={navWrap} reset={reset} options={options} handle={handle} />}
                    </MobileNav>}
                    {/* ColorWheel */}
                    <Wheel
                        style={{ overflowX: "hidden" }}
                        opacity={colorWheel ? "1" : "0"}
                        pointerEvents={colorWheel ? "all" : "none"}
                        transition={colorWheel ? "0.3s" : "0s"}
                        ref={wheel}
                        onTouchStart={() => setChanging(true)}
                        onTouchEnd={() => {
                            setChanging(false);
                            state.colorChanged = true;
                        }}
                    >
                        <ColorWheel
                            size={"200px"}
                            borderColor={`${props => props.theme.panelColor}`}
                            value={color}
                            onChange={setColor}
                            onChangeEnd={setColor}
                        />
                    </Wheel>
                    {/* Confirm */}
                    {!changing && colorWheel && <Folder
                        border="border: 1px solid;"
                        onTouchEnd={() => {
                            confirm();
                            setModal(false);
                            setColorWheel(false);
                            state.canvasPaused = false;
                        }} className="circleButton color li w"
                        style={{ position: "fixed", right: "6vw", pointerEvents: "all" }}
                    ><ConfirmIcon /></Folder>
                    }
                </NavWrapper >
            </Draggable >
            <audio >
                <source src={null}></source>
            </audio>
            <Stats showPanel={0} className="stats" />
        </>
    )
}

export default MobileNavigator

const NavWrapper = styled.div`
pointer-events: none;
display: flex;
justify-content: space-around;
flex-direction: column;
align-items: center;
  padding: 0 30px;
width: 100%;
height: max-content;
  position: absolute;
  z-index: 5000;
  /* bottom: ${props => props.offset}; */
  top: 150px;
  transition: 0!important;
  transition-timing-function: ease-out;
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */

  & *{
    transition: 0s !important;
  }
`
const MobileNav = styled.div`
transition: 0.9s;
  height: 70px;
  width: 100%;
  color:${props => props.theme.panelColor};
 display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;

  & .grabber{
    cursor: grab;
    width: 100px;
    stroke: ${props => props.theme.panelColor};
    fill: ${props => props.theme.panelColor};
    fill-opacity: 0% !important;
    stroke-width: 1px !important;
    transition: 1.3s;
  }

  & .GrabberWrap{
    pointer-events: all !important;
    margin: 10px 0 0 0 !important;
  }

      .mainRow{
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        width: 100%;
        height: 82px;

        & a{
            height: 70px !important;
        }
      }
  .nablaWrapper{
    pointer-events: all !important;
    margin: 0 auto;
    width: 120px !important;
    padding:0;
      border: 1px solid ${props => props.theme.panelColor};
  backdrop-filter: blur(3px);
  }

  .quote{
    height: 15px !important;
    display: block;
    white-space: nowrap;
    font-size:10px;
    padding: 1px;
    margin-top: 15px;
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
  }
  .modalContent{
    overflow: visible !important;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    column-gap: 30px;
  }
`
const NavButton = styled.div`
    pointer-events: all !important;
  backdrop-filter: blur(3px);
display: flex;
flex-direction: column;
justify-content: space-around;
align-items:center ;
height: 66px;
width: 66px;
font-size: 10px;
padding: 7px;
border-radius: 50% !important;
border: 1px solid ${props => props.theme.panelColor};
transition: 0.3s !important;
user-select: none;
-webkit-user-select: none;
`
const NavButtonIcon = styled.svg`
  /* position: absolute; */
  ${props => props.size}
    fill: ${props => props.theme.panelColor};
    stroke: ${props => props.colorstroke};
    stroke-width: 1px;
    justify-self: flex-end !important;
    width: auto !important;
`
const SearchWrapper = styled.div`
    pointer-events: all !important;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: row !important;
height: 70px !important;
  margin: 40px 0 0 0;
  column-gap: 10px !important;

    & .li, & .folder{
        backdrop-filter: blur(3px);
      border: 1px solid ${props => props.theme.panelColor};
      border-radius: 50%;
        display:flex;
        justify-content: center;
        flex-direction: column;
        height: 40px;
        width: 40px;
        padding: 2px;
    }
    #clearIcon{
        margin: 0 !important;
        padding: 0 !important;
        position: unset;
        height: 38px;
        width: 38px;
        svg{
            position: unset !important;
            transform: unset;
            -webkit-filter: none;
            filter: none;
            overflow: visible !important;
            fill: transparent !important;
            stroke-width: 1px !important;
            stroke: ${props => props.theme.panelColor} !important;
            width: 100% !important;
            height: 100% !important;
        }
    }
`
const SearchBar = styled.input`
/* position: absolute; */
  user-select: text;
  -ms-user-select: text;
  -moz-user-select: text;
  -webkit-user-select: text;
  width: 60%;
  height: 40px;
  display: flex;
  /* background-color: ${props => props.theme.LiActiveBackground}; */
  background-color: transparent;
  box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
  -webkit-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor}; 
  -moz-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor}; 
  color: ${props => props.theme.panelColor};
  user-select: text;
  -moz-user-select: text;
  -webkit-user-select: text;
  cursor: pointer;
  /* border: 0.5px solid ${props => props.theme.panelColor}; */
  border: none;
  border-radius: 25px;
  padding: 6px 19px 6px 20px;
  font-size: 15px;
  -webkit-appearance: none !important;
  backdrop-filter: blur(3px);
  text-align: center;

  &::placeholder{
    color: ${props => props.theme.panelColor};
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */

  }

  &:focus::placeholder{
    color: ${props => props.theme.textHover};
    transition: 0.3s;
  }
  &:focus{
    color: ${props => props.theme.textHover};
    background-color:${props => props.theme.LiHover};
    outline-color:${props => props.theme.textHover};
    border: none;
    box-shadow:0px 20px 50px 10px  ${props => props.theme.LiHover};
    -webkit-box-shadow: 0px 20px 50px 10px ${props => props.theme.LiHover};
    -moz-box-shadow:0px 20px 50px 10px ${props => props.theme.LiHover};
    transition: 0.3s;
  }
  
  &:focus ~ #clearIcon svg, &:hover ~ #clearIcon svg{
            -webkit-filter: drop-shadow(1px 1px 3px ${props => props.theme.textHover}) !important;
        filter: drop-shadow(1px 1px 3px ${props => props.theme.textHover}) !important;
    stroke: ${props => props.theme.textHover} !important;
    transition: 0.3s;
  }
`
const OptionsWrapper = styled.div`
    pointer-events: all !important;
  position: relative;
height: 70px !important;
width: 100% ;
justify-content: center !important;
flex-direction: row !important;
user-select: none;
-ms-user-select: none;
-moz-user-select: none;
-webkit-user-select: none;
-webkit-user-drag: none;
overflow: auto !important;
margin: 0 20px !important;

  & .carousel{
    padding: 0 10px;
    border-radius: 50px;
user-select: all !important;
-ms-user-select: all !important;
-moz-user-select: all !important;
-webkit-user-select: all !important;
-webkit-user-drag: auto !important ;
    margin:  20px 0 0px 0;
    overflow: visible !important;
    height: 50px !important;
    width: fit-content;
    display: flex;
    align-items: center;
    gap: 40px;

  & .li, & .folder{
    transform: rotateZ('90');
        backdrop-filter: blur(3px);
      border: 1px solid ${props => props.theme.panelColor};
      border-radius: 50%;
        display:flex;
        justify-content: center;
        flex-direction: column;
        height: 40px;
        width: 40px;
        padding: 2px;
        /* margin: 0 20px; */

        &:hover{
            border-color:  ${props => props.theme.textHover};
        }

        & svg{
            width: 24px !important;
        }
        &.MuteIcon svg{
            width: 16px !important;
            fill: transparent;
            stroke: ${props => props.theme.panelColor};
        }
        & .nextIcon{
            width: 16px !important;
            height: auto;
            fill: transparent;
            stroke: ${props => props.theme.panelColor};
        }
        & .PlayPauseIcon{
            width: 16px !important;
            height: auto;
            fill: transparent;
            stroke: ${props => props.theme.panelColor};
        }
        & .GyroIcon{
            fill: ${props => props.theme.panelColor};
            & path{
            stroke:  ${props => props.theme.panelColor} !important;
            }
        }
        & .modeIcon{
            stroke: ${props => props.theme.panelColor};
            fill: transparent !important;
            height: 20px !important;
        }
    }
  }
`
const svg = {
    search: (
        <NavButtonIcon
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
            viewBox="0 0 354 356"
            size="height: 26px;"
        >
            <path d="M306.606 296.787L255 242c-10.227-10.636-13.883-22.848-6.843-35.816a118.238 118.238 0 0014.325-56.482c0-67.009-55.815-121.23-123.395-118.611C77.481 33.478 27.555 83.405 25.168 145.01c-2.618 67.579 51.603 123.395 118.611 123.395 16.65 0 32.769-3.403 47.66-9.974 12.647-5.581 18.588.687 39.815 18.542 13.614 11.451 53.719 46.578 53.516 46.799 17.729 17.729 40.638-8.181 21.835-26.984zM143.78 69.702c44.113 0 80 35.887 80 80s-35.887 80-80 80-80-35.887-80-80 35.887-80 80-80z"></path>
        </NavButtonIcon>
    ),
    options: (<NavButtonIcon
        data-name="Layer 1"
        viewBox="0 0 513.34 466.67"
        size="height: 18px;"
    >
        <path d="M513.34 46.664v46.668H280V46.664h233.34zM280 420.004h233.33v-46.668H280v46.668zM93.34 46.664H.004v46.668h93.332V140h140l.004-140h-140v46.664zm0 326.67H.004v46.668h93.332v46.668h140v-140l-140-.004.004 46.668zm326.66-210H280v140h140v-46.668h93.332v-46.668H420v-46.664zM0 256.666h233.33v-46.668L0 210.002v46.664z"></path>
    </NavButtonIcon>
    )
}

