import React, { useRef, useEffect, useState, memo } from "react";
import { useSnapshot } from "valtio";
import { cloud, state } from "../../utils/state";
import { resetWheel, toggleModal } from "../../utils/common";
import { Search } from "./mobileSearch";
import { Options } from "./mobileOptions";
import { ConfirmIcon, ResetIcon } from "../../utils/svg";
import { HomeButton, Quote } from "../homeButton";
import { Grabber, Rotate } from "../../utils/panelTools";
import styled from "styled-components";
import { ColorWheel } from "@react-spectrum/color";
import Draggable from "react-draggable";
import { Folder, Song, Wheel } from "../../utils/style";
// import { useLocation } from 'wouter';

function MobileNavigator({
  audio,
  nabla,
  dong,
  open,
  close,
  select,
  confirm,
  reset,
  color,
  setColor,
  setSong,
  song,
  setColorWheel,
  colorWheel,
  query,
  refine,
  clear,
  handle,
  text,
  setText,
  resetButton,
}) {
  const snap = useSnapshot(state);
  const clip = useSnapshot(cloud);
  const nav = useRef(null);
  const navWrap = useRef(null);
  const Bar = useRef(null);
  const wheel = useRef(null);
  const [modal, setModal] = useState(false);
  // const [offset, setOffset] = useState("-80px");
  const [changing, setChanging] = useState(false);
  let search = modal && modal.indexOf("search") > -1;
  let options = modal && modal.indexOf("options") > -1;

  if (wheel.current) {
    wheel.current.style.position = "absolute";
    wheel.current.style.left = "50%";
    wheel.current.style.transform = "translateX(-50%)";
    wheel.current.style.bottom = "20px";
    wheel.current.style.borderRadius = "50%";
  }

  const onControlledDrag = (e, position) => {
    cloud.drag = true;
    state.dragged = true;
    let { y } = position;
    state.mobileNavPosition.y = y;
  };

  const onControlledStop = (e, position) => {
    cloud.drag = false;
  };

  useEffect(() => {
    if (navWrap.current) {
      navWrap.current.addEventListener(
        "touchmove",
        (e) => {
          e.preventDefault();
        },
        false
      );
    }
  });

  // Rotate reset button
  useEffect(() => {
    Rotate(resetButton, clip, snap);
  }, [clip, resetButton, snap]);

  // TODO: Hide when changing routes
  const [hidden, setHidden] = useState(false);
  // const [location, setLocation] = useLocation();
  // useEffect(() => {
  //     if (location !== "/") {
  //         // setHidden(true);
  //         state.hideNav = true;
  //         state.mobileNavPosition = {
  //             x: 0,
  //             y: -offset,
  //         };
  //     }
  // }, [location]);

  return (
    <Draggable
      nodeRef={navWrap}
      handle=".GrabberWrap"
      bounds=".container"
      position={snap.mobileNavPosition}
      axis="y"
      onStop={onControlledStop}
      onDrag={onControlledDrag}
    >
      <NavWrapper
        className="mobileNavWrap"
        ref={navWrap}
        onTouchStart={() => (cloud.selected = false)}
      >
        {/* Mobile Nav */}
        <MobileNav className="mobileNav" ref={nav}>
          {/* Reset */}
          {!changing && colorWheel && (
            <Folder
              border="border: 1px solid;"
              onTouchEnd={() => {
                cloud.resetRate = Math.random() * (0.85 - 0.65) + 0.65;
                reset();
                setModal(false);
                resetWheel();
                setColorWheel(false);
              }}
              className="circleButton li w reset"
              style={{ position: "fixed", left: "6vw", pointerEvents: "all" }}
            >
              <ResetIcon />
            </Folder>
          )}
          {!colorWheel && (
            <>
              {/* SEARCH BAR */}
              {search && (
                <Search
                  options={options}
                  reset={reset}
                  Bar={Bar}
                  navWrap={navWrap}
                  query={query}
                  refine={refine}
                  clear={clear}
                  setModal={setModal}
                  select={select}
                  modal={modal}
                />
              )}
              {/* Song Title */}
              <Song
                position={`position: unset; margin: 8px 0 7px 0 !important;`}
                style={
                  clip.playMusic
                    ? { opacity: 1, pointerEvents: "all" }
                    : { opacity: 0, pointerEvents: "none" }
                }
                tabIndex="0"
              >
                {song}
              </Song>
              <div className="mainRow">
                {/* Search Button */}
                {!clip.CanvasLoading && (
                  <NavButton
                    className={`${
                      (search || query.length > 0) && "active"
                    } li w`}
                    onTouchEnd={() =>
                      toggleModal(
                        "search",
                        modal,
                        setModal,
                        // setOffset,
                        open,
                        close
                      )
                    }
                  >
                    {svg["search"]}
                  </NavButton>
                )}
                {/* Home Button */}
                <HomeButton
                  nabla={nabla}
                  dong={dong}
                  clear={clear}
                  query={query}
                />
                {/* Options Button */}
                {!clip.CanvasLoading && (
                  <NavButton
                    className={`${options && "active"} li w`}
                    onTouchEnd={() =>
                      toggleModal(
                        "options",
                        modal,
                        setModal,
                        // setOffset,
                        open,
                        close
                      )
                    }
                  >
                    {svg["options"]}
                  </NavButton>
                )}
              </div>
              {/* OPTIONS  */}
              {options && (
                <Options
                  search={search}
                  handle={handle}
                  resetButton={resetButton}
                  reset={reset}
                  navWrap={navWrap}
                  setModal={setModal}
                  setSong={setSong}
                  select={select}
                  modal={modal}
                  colorWheel={colorWheel}
                  setColorWheel={setColorWheel}
                  audio={audio}
                  hidden={hidden}
                  setHidden={setHidden}
                />
              )}
            </>
          )}
          {/* QUOTE */}
          {!colorWheel && !clip.CanvasLoading && !clip.UILoading && (
            <Quote text={text} setText={setText} />
          )}
          {/* GRABBER */}
          {!colorWheel && !clip.CanvasLoading && (
            <Grabber
              resetButton={resetButton}
              setModal={setModal}
              navWrap={navWrap}
              reset={reset}
              options={options}
              handle={handle}
            />
          )}
          {/* ColorWheel */}
          {!state.monochrome && (
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
                borderColor={`${(props) => props.theme.panelColor}`}
                value={color}
                onChange={setColor}
                onChangeEnd={setColor}
              />
            </Wheel>
          )}
          {/* Mono */}
          {!changing && colorWheel && (
            <Folder
              onTouchEnd={() => {
                state.monochrome = !state.monochrome;
                select();
              }}
              className={`li w mono ${snap.monochrome ? "glow" : null}`}
              style={{
                color: snap.monochrome
                  ? snap.theme === "light"
                    ? snap.light.sky
                    : snap.dark.sky
                  : null,
                position: "absolute",
                bottom: "-60px",
                height: "30px",
                pointerEvents: "all",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Monochrome
            </Folder>
          )}
          {/* Confirm */}
          {!changing && colorWheel && (
            <Folder
              border="border: 1px solid;"
              onTouchEnd={() => {
                confirm();
                setModal(false);
                setColorWheel(false);
              }}
              className="circleButton color li w"
              style={{ position: "fixed", right: "6vw", pointerEvents: "all" }}
            >
              <ConfirmIcon />
            </Folder>
          )}
        </MobileNav>
      </NavWrapper>
    </Draggable>
  );
}

export default memo(MobileNavigator);

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
  /* bottom: ${(props) => props.offset}; */
  top: 160px;
  transition: 0 !important;
  transition-timing-function: ease-out;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */

  & * {
    transition: 0s !important;
  }
`;
const MobileNav = styled.div`
  transition: 0.9s;
  height: 70px;
  width: 100%;
  color: ${(props) => props.theme.panelColor};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;

  & .grabber {
    pointer-events: all;
    cursor: grab;
    width: 100px;
    stroke: ${(props) => props.theme.panelColor};
    fill: ${(props) => props.theme.panelColor};
    stroke-width: 1px !important;
    transition: 1.3s;
  }

  & .GrabberWrap {
    pointer-events: none !important;
    margin: 10px 0 0 0 !important;
  }

  .mainRow {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    width: 100%;
    height: 82px;

    & a {
      height: 70px !important;
    }
  }
  .nablaWrapper {
    pointer-events: all !important;
    margin: 0 auto;
    width: 120px !important;
    padding: 0;
    border: 1px solid ${(props) => props.theme.panelColor};
    backdrop-filter: blur(3px);
  }

  .quote {
    height: 15px !important;
    display: block;
    white-space: nowrap;
    font-size: 8px;
    font-weight: 900;
    padding: 1px;
    margin-top: 15px;
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
  }
  .modalContent {
    overflow: visible !important;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    column-gap: 30px;
  }
`;
const NavButton = styled.div`
  pointer-events: all !important;
  backdrop-filter: blur(20px) !important;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 66px;
  width: 66px;
  font-size: 10px;
  padding: 7px;
  border-radius: 50% !important;
  border: 1px solid ${(props) => props.theme.panelColor};
  transition: 0.3s !important;
  user-select: none;
  -webkit-user-select: none;
`;
const NavButtonIcon = styled.svg`
  /* position: absolute; */
  ${(props) => props.size}
  fill: ${(props) => props.theme.panelColor};
  stroke: ${(props) => props.colorstroke};
  stroke-width: 1px;
  justify-self: flex-end !important;
  width: auto !important;
`;
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
  options: (
    <NavButtonIcon viewBox="0 0 475.982 464.973" size="height: 22px;">
      <path d="M467.711 253.458h-.002l-45.586-30.688a6.27 6.27 0 01-2.742-4.426c-1.512-13.328-4.535-26.543-8.902-39.199-.617-1.734-.391-3.586.504-5.207l27.719-47.434c3.863-6.609 3.246-15.062-1.512-21l-24.641-30.91c-4.762-5.992-12.879-8.457-20.16-6.16l-52.414 16.52c-1.734.559-3.641.336-5.152-.672a184.573 184.573 0 00-36.23-17.473c-1.68-.617-3.078-1.902-3.695-3.641l-19.77-51.238C272.386 4.817 265.386 0 257.769 0h-39.594c-7.617 0-14.617 4.816-17.359 11.93l-19.77 51.238a6.254 6.254 0 01-3.695 3.641c-12.656 4.426-24.809 10.305-36.23 17.473-1.512.953-3.414 1.176-5.152.672l-52.414-16.52c-7.281-2.297-15.398.168-20.16 6.16l-24.641 30.91c-4.762 5.992-5.375 14.449-1.512 21l27.719 47.434c.953 1.566 1.121 3.473.504 5.207-4.426 12.656-7.391 25.816-8.902 39.199-.223 1.793-1.176 3.414-2.742 4.426L8.235 253.458C1.907 257.716-1.23 265.61.45 273.06l8.793 38.586c1.68 7.449 7.953 13.215 15.512 14.281l54.375 7.894c1.793.281 3.414 1.289 4.367 2.801 7.168 11.312 15.566 21.895 25.031 31.359 1.289 1.289 1.902 3.078 1.793 4.871l-4.426 54.824c-.617 7.617 3.586 14.953 10.473 18.258l35.672 17.191c6.887 3.305 15.23 2.016 20.832-3.191l40.098-37.633a6.43 6.43 0 014.93-1.68c6.609.727 13.383 1.121 20.105 1.121s13.441-.391 20.105-1.121c1.793-.223 3.586.391 4.93 1.68l40.098 37.633a18.673 18.673 0 0012.77 5.039c2.742 0 5.488-.617 8.062-1.848l35.672-17.191c6.887-3.305 11.09-10.641 10.473-18.258l-4.426-54.824c-.168-1.848.504-3.641 1.793-4.871 9.465-9.519 17.922-20.047 25.031-31.359.953-1.512 2.574-2.574 4.367-2.801l54.375-7.895c7.559-1.121 13.777-6.832 15.512-14.281l8.793-38.586c1.613-7.449-1.465-15.289-7.848-19.602zm-106.02-20.918c0 68.207-55.496 123.65-123.7 123.65s-123.7-55.496-123.7-123.7 55.496-123.65 123.7-123.65 123.7 55.496 123.7 123.7z"></path>
    </NavButtonIcon>
  ),
};
