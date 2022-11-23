import React, { useRef, useEffect } from "react";
import {
  ColorIcon,
  GyroIcon,
  ModeIcon,
  MuteIcon,
  NextIcon,
  PlayPauseIcon,
  ShowHideIcon,
} from "../../../common/svg";
import { useSnapshot } from "valtio";
import { cloud, state } from "../../../common/state";
import Draggable from "react-draggable";
import { Folder } from "../../../common/style";
import { getGyro, offset, resetPos } from "./utils";
import { NextSong, ToggleMusic, toggleTheme } from "../../../common/utils";
import { OptionsWrapper } from "./mobile.style";
// import { Stats } from "@react-three/drei";

export function Options({
  audio,
  search,
  resetButton,
  reset,
  navWrap,
  handle,
  setSong,
  select,
  setColorWheel,
  hidden,
  setHidden,
  open,
  close,
}) {
  const snap = useSnapshot(state);
  const clip = useSnapshot(cloud);
  const carousel = useRef(null);

  // handle audio
  useEffect(() => {
    open();
    return () => {
      close();
    };
  }, [open, close]);

  useEffect(() => {
    if (!snap.dragged) {
      state.mobileNavPosition.y = state.mobileNavPosition.y + offset;
    }
    return () => {
      if (!snap.dragged) {
        state.mobileNavPosition.y = state.mobileNavPosition.y - offset;
      }
    };
  }, [snap.dragged]);

  const onControlledDrag = (e, position) => {
    // let { x, y } = position;
    cloud.drag = true;
  };

  const onControlledStop = (e, position) => {
    let { x } = position;
    state.searchPosition = { x, y: 0 };
    cloud.drag = false;
  };

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
          opacity={!clip.mobileOptions ? "0" : "1"}
          pointerEvents={!clip.mobileOptions ? "none" : "all"}
          transition={!clip.mobileOptions ? "0.3s" : "unset"}
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
              handle &&
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
              onTouchStart={() => resetPos(reset, search, navWrap)}
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
                cloud.mobileOptions = false;
                cloud.mobileSearch = false;
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
      {/* <Stats showPanel={0} className="stats" /> */}
    </>
  );
}
