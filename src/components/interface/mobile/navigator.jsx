import React, { useRef, useEffect, useState, memo } from "react";
import { useSnapshot } from "valtio";
import { cloud, state } from "../../../common/state";
import { Search } from "./search";
import { Options } from "./options";
import { ConfirmIcon, ResetIcon } from "../../../common/svg";
import { HomeButton, Quote } from "../homeButton";
import { Grabber, Rotate } from "../panelTools";
import { ColorWheel } from "@react-spectrum/color";
import Draggable from "react-draggable";
import { Folder, Song, Wheel } from "../../../common/style";
import { resetWheel } from "../../../common/utils";
import {
  MobileNav,
  NavButton,
  NavButtonIcon,
  NavWrapper,
} from "./mobile.style";
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
  handle,
  text,
  setText,
  resetButton,
  admin,
  user,
}) {
  const snap = useSnapshot(state);
  const clip = useSnapshot(cloud);
  const nav = useRef(null);
  const navWrap = useRef(null);
  const Bar = useRef(null);
  const wheel = useRef(null);
  // const [offset, setOffset] = useState("-80px");
  const [changing, setChanging] = useState(false);

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
        { passive: false }
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
                cloud.mobileOptions = false;
                cloud.mobileSearch = false;
                resetWheel();
                setColorWheel(false);
              }}
              className="circleButton li w reset"
              style={{ position: "fixed", left: "6vw", pointerEvents: "all" }}
            >
              <ResetIcon />
            </Folder>
          )}
          {
            <>
              {/* SEARCH BAR */}
              {clip.mobileSearch && (
                <Search
                  options={clip.mobileOptions}
                  reset={reset}
                  Bar={Bar}
                  navWrap={navWrap}
                  select={select}
                  open={open}
                  close={close}
                  admin={admin}
                  user={user}
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
                      (clip.mobileSearch || clip.query.length > 0) && "active"
                    } li w`}
                    onTouchEnd={() => (cloud.mobileSearch = !clip.mobileSearch)}
                  >
                    {svg["search"]}
                  </NavButton>
                )}
                {/* Home Button */}
                <HomeButton nabla={nabla} dong={dong} />
                {/* Options Button */}
                {!clip.CanvasLoading && (
                  <NavButton
                    className={`${clip.mobileOptions && "active"} li w`}
                    onTouchEnd={() =>
                      (cloud.mobileOptions = !clip.mobileOptions)
                    }
                  >
                    {svg["options"]}
                  </NavButton>
                )}
              </div>
              {/* OPTIONS  */}
              {clip.mobileOptions && (
                <Options
                  search={clip.mobileSearch}
                  handle={handle}
                  resetButton={resetButton}
                  reset={reset}
                  navWrap={navWrap}
                  setSong={setSong}
                  select={select}
                  colorWheel={colorWheel}
                  setColorWheel={setColorWheel}
                  audio={audio}
                  hidden={hidden}
                  setHidden={setHidden}
                  open={open}
                  close={close}
                />
              )}
            </>
          }
          {/* QUOTE */}
          {!clip.CanvasLoading && !clip.UILoading && (
            <Quote text={text} setText={setText} />
          )}
          {/* GRABBER */}
          {!colorWheel && !clip.CanvasLoading && (
            <Grabber
              resetButton={resetButton}
              navWrap={navWrap}
              reset={reset}
              options={clip.mobileOptions}
              handle={handle}
            />
          )}
          {/* ColorWheel */}
          {!state.monochrome && (
            <Wheel
              style={{ overflow: "hidden" }}
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
                cloud.mobileOptions = false;
                cloud.mobileSearch = false;
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
