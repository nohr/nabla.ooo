import React, { useRef, useEffect, useState } from 'react'
import { useSnapshot } from 'valtio';
import { cloud, state } from '../utils/state';
import { Folder, Wheel, resetWheel, toggleModal, Song } from '../utils/common';
import { Search } from './mobileSearch';
import { Options } from './mobileOptions';
import { ConfirmIcon, ResetIcon } from '../utils/svg';
import { HomeButton, Quote } from './homeButton';
import { Grabber } from './grabber';
import styled from 'styled-components';
import { ColorWheel } from '@react-spectrum/color';
import Draggable from 'react-draggable';

function MobileNavigator({ nabla, dong, open, close, select, confirm, reset, color, setColor, setSong, song, setColorWheel, colorWheel, query, refine, clear, handle, text, setText }) {
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
        state.dragged = true;
        let { x, y } = position;
        state.mobileNavPosition.y = y;
    };

    const onControlledStop = (e, position) => {
        cloud.drag = false;
    };

    useEffect(() => {
        if (navWrap.current) {
            navWrap.current.addEventListener("touchmove", (e) => { e.preventDefault(); }, false);
        }
    });

    return (
        <>
            <Draggable nodeRef={navWrap} handle=".GrabberWrap" bounds=".container" position={snap.mobileNavPosition} axis="y" onStop={onControlledStop} onDrag={onControlledDrag} >
                <NavWrapper className='mobileNavWrap' ref={navWrap} onTouchStart={() => cloud.selected = false}>
                    {/* Mobile Nav */}
                    <MobileNav className="mobileNav" ref={nav} >
                        {/* Reset */}
                        {!changing && colorWheel && <Folder
                            border="border: 1px solid;"
                            onTouchEnd={() => {
                                cloud.resetRate = (Math.random() * (0.85 - 0.65) + 0.65);
                                reset();
                                setModal(false);
                                resetWheel();
                                setColorWheel(false);
                            }} className="circleButton li w reset"
                            style={{ position: "fixed", left: "6vw", pointerEvents: "all" }}
                        ><ResetIcon /></Folder>}
                        {!colorWheel &&
                            <>
                                {/* SEARCH BAR */}
                                {search && <Search options={options} reset={reset} Bar={Bar} navWrap={navWrap} query={query}
                                    refine={refine} clear={clear}
                                    setModal={setModal} select={select} modal={modal} />}
                                {/* Song Title */}
                                <Song position={`position: unset; margin: 8px 0 7px 0 !important;`}
                                    style={clip.playMusic ? { opacity: 1, pointerEvents: "all" } : { opacity: 0, pointerEvents: "none" }} tabIndex="0">
                                    {song}
                                </Song>
                                <div className="mainRow">
                                    {/* Search Button */}
                                    {(!clip.CanvasLoading) && <NavButton
                                        className={`${(search || query.length > 0) && "active"} li w`}
                                        onTouchEnd={() => toggleModal("search", modal, setModal, setOffset, open, close)}>
                                        {svg["search"]}
                                    </NavButton>}
                                    {/* Home Button */}
                                    <HomeButton nabla={nabla} dong={dong} clear={clear} query={query} />
                                    {/* Options Button */}
                                    {(!clip.CanvasLoading) && <NavButton
                                        className={`${options && "active"} li w`}
                                        onTouchEnd={() => toggleModal("options", modal, setModal, setOffset, open, close)} >
                                        {svg["options"]}
                                    </NavButton>}
                                </div>
                                {/* OPTIONS  */}
                                {options && <Options search={search} handle={handle} resetButton={resetButton} reset={reset} navWrap={navWrap} setModal={setModal} setSong={setSong} select={select} modal={modal} colorWheel={colorWheel} setColorWheel={setColorWheel} />}
                            </>}
                        {/* QUOTE */}
                        {(!clip.CanvasLoading && !clip.UILoading) && <Quote text={text} setText={setText} />}
                        {/* GRABBER */}
                        {(!clip.CanvasLoading) && <Grabber resetButton={resetButton} setModal={setModal} navWrap={navWrap} reset={reset} options={options} handle={handle} />}
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
                            }} className="circleButton color li w"
                            style={{ position: "fixed", right: "6vw", pointerEvents: "all" }}
                        ><ConfirmIcon /></Folder>
                        }
                    </MobileNav>
                </NavWrapper >
            </Draggable >
            <audio >
                <source src={null}></source>
            </audio>
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
  top: 160px;
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
    font-size:8px;
    font-weight: 900;
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

