import React, { useRef, useEffect, useState } from "react";
import {
  ColorIcon,
  GyroIcon,
  ModeIcon,
  MuteIcon,
  NextIcon,
  PlayPauseIcon,
  ShowHideIcon,
} from "../utils/svg";
import styled from "styled-components";
import { useSnapshot } from "valtio";
import { cloud, state } from "../utils/state";
import {
  Folder,
  offset,
  NextSong,
  ToggleMusic,
  toggleTheme,
  getGyro,
  resetPos,
} from "../utils/common";
import Draggable from "react-draggable";
import { Stats } from "@react-three/drei";

export function Options({
  audio,
  search,
  resetButton,
  reset,
  navWrap,
  handle,
  setSong,
  modal,
  select,
  setColorWheel,
  setModal,
}) {
  const snap = useSnapshot(state);
  const carousel = useRef(null);

  useEffect(() => {
    if (!snap.dragged) {
      state.mobileNavPosition.y = state.mobileNavPosition.y + offset;
    }

    cloud.opt = true;
    return () => {
      cloud.opt = false;
      if (!snap.dragged) {
        state.mobileNavPosition.y = state.mobileNavPosition.y - offset;
      }
    };
  }, []);

  const onControlledDrag = (e, position) => {
    // let { x, y } = position;
    cloud.drag = true;
  };

  const onControlledStop = (e, position) => {
    let { x, y } = position;
    state.searchPosition = { x, y: 0 };
    cloud.drag = false;
  };

  const [hidden, setHidden] = useState(false);
  return (
    <>
      <Draggable
        nodeRef={carousel}
        handle=".grabber"
        axis="x"
        position={snap.optionsPosition}
        onStop={onControlledStop}
        onDrag={onControlledDrag}
      >
        <OptionsWrapper
          ref={carousel}
          className="modalContent"
          opacity={modal !== "options" ? "0" : "1"}
          pointerEvents={modal !== "options" ? "none" : "all"}
          transition={modal !== "options" ? "0.3s" : "unset"}
        >
          <div
            style={{
              pointerEvents: hidden ? "none" : "all",
              backgroundColor: hidden
                ? snap.theme === "light"
                  ? snap.light.LiHover
                  : snap.dark.LiHover
                : "transparent",
              opacity: hidden ? 0.6 : 1,
            }}
            className="carousel"
            onTouchMove={() => {
              setHidden(true);
              handle.current.setAttribute(
                `style`,
                `
                    animation: none !important;
                    fill-opacity: 100% !important; stroke-width: 0px !important; transition: 0s !important;`
              );
            }}
            onTouchEnd={() => {
              setHidden(false);
              handle.current.setAttribute(
                `style`,
                `fill-opacity: 0% !important; stroke-width: 1px !important; transition: 0.3s;`
              );
            }}
          >
            {/* MUTE */}
            <Folder
              className="MuteIcon li"
              onTouchEnd={() =>
                snap.muted ? (state.muted = false) : (state.muted = true)
              }
            >
              <MuteIcon />
            </Folder>
            {/* MUSIC */}
            <Folder
              className="li"
              // style={{ marginBottom: "20px" }}
              onTouchEnd={() => {
                ToggleMusic(audio, setSong);
              }}
            >
              <PlayPauseIcon arg={1} />
            </Folder>
            {/* NEXT */}
            <Folder
              // style={{ marginTop: "20px", marginBottom: "4px" }}
              onTouchEnd={() => {
                select();
                NextSong(audio, setSong);
              }}
              id="Next"
              className="li"
            >
              <NextIcon />
            </Folder>
            {/* RESET */}
            <Folder
              ref={resetButton}
              onTouchStart={() =>
                resetPos(setModal, reset, search, navWrap, snap)
              }
              className={`li resetPos w`}
            >
              <ShowHideIcon n={2} />
            </Folder>
            {/* THEME */}
            <Folder
              // style={{ marginTop: "20px", marginBottom: "4px" }}
              onTouchEnd={() => {
                select();
                toggleTheme();
              }}
              className="li"
            >
              <ModeIcon />
            </Folder>
            {/* COLOR */}
            <Folder
              // style={{ marginBottom: "20px" }}
              onTouchEnd={() => {
                select();
                setColorWheel(true);
                state.canvasPaused = false;
              }}
              className="li w"
            >
              <ColorIcon />
            </Folder>
            {/* GYRO */}
            <Folder
              // style={{ marginBottom: "20px" }}
              onTouchEnd={() => {
                select();
                getGyro();
              }}
              className="li w"
            >
              <GyroIcon />
            </Folder>
            {cloud.playMusic}
          </div>
        </OptionsWrapper>
      </Draggable>
      <Stats showPanel={0} className="stats" />
    </>
  );
}

const OptionsWrapper = styled.div`
  pointer-events: all !important;
  position: relative;
  height: 70px !important;
  width: 100%;
  justify-content: center !important;
  flex-direction: row !important;
  user-select: none;
  -ms-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -webkit-user-drag: none;
  overflow: auto !important;
  margin: 0 20px !important;

  & .carousel {
    padding: 0 10px;
    border-radius: 50px;
    user-select: all !important;
    -ms-user-select: all !important;
    -moz-user-select: all !important;
    -webkit-user-select: all !important;
    -webkit-user-drag: auto !important ;
    margin: 20px 0 0px 0;
    overflow: visible !important;
    height: 50px !important;
    width: fit-content;
    display: flex;
    align-items: center;
    gap: 40px;

    & .li,
    & .folder {
      transform: rotateZ("90");
      backdrop-filter: blur(3px);
      border: 1px solid ${(props) => props.theme.panelColor};
      border-radius: 50%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      height: 40px;
      width: 40px;
      padding: 2px;
      /* margin: 0 20px; */

      &:hover {
        border-color: ${(props) => props.theme.textHover};
      }

      & svg {
        width: 24px !important;
      }
      &.resetPos {
        & svg {
          stroke: ${(props) => props.theme.panelColor};
          width: 32px !important;
          stroke-width: 3px;
        }
      }
      &.MuteIcon svg {
        width: 16px !important;
        fill: transparent;
        stroke: ${(props) => props.theme.panelColor};
      }
      & .nextIcon {
        width: 16px !important;
        height: auto;
        fill: transparent;
        stroke: ${(props) => props.theme.panelColor};
      }
      & .PlayPauseIcon {
        width: 16px !important;
        height: auto;
        fill: transparent;
        stroke: ${(props) => props.theme.panelColor};
      }
      & .GyroIcon {
        fill: ${(props) => props.theme.panelColor};
        & path {
          stroke: ${(props) => props.theme.panelColor} !important;
        }
      }
      & .modeIcon {
        stroke: ${(props) => props.theme.panelColor};
        fill: ${(props) => props.theme.panelColor}!important;
        height: 20px !important;
      }
    }
  }
`;
