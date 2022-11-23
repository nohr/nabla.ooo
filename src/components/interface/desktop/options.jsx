import React, { useEffect, useRef } from "react";
import { cloud, state } from "../../../common/state";
import { useSnapshot } from "valtio";
import Draggable from "react-draggable";
import {
  ColorIcon,
  DirectionIcon,
  ModeIcon,
  MuteIcon,
  ShowHideIcon,
} from "../../../common/svg";
import { toggleTheme } from "../../../common/utils";
import { SongInfo } from "../panelTools";
import { Folder } from "../../../common/style";
import { Option } from "./panel.style";
import {
  getPosOpt,
  openWheel,
  styleHeaders,
  toggleCanvas,
  toggleDirection,
} from "./utils";

function Options({ song, select, headwidth, open, close, vWidth, vHeight }) {
  const opt = useRef(null);
  const colorLink = useRef(null);
  const snap = useSnapshot(state);

  const offset = getPosOpt(snap, vWidth, vHeight);
  const firstStyle = snap.direction ? { height: "75px" } : { height: "87px" };
  const secondStyle = snap.direction
    ? { height: "133px" }
    : { height: "161px" };
  const layout = snap.direction
    ? "grid-template-rows: 10% 1fr 10% 1fr; padding-left: 45px;padding-right: 40px;"
    : "grid-template-columns: 1fr 1fr; grid-template-rows: 15% 1fr; padding: 80px 12px 26px;";
  const top = snap.direction
    ? "padding-top: 7px;"
    : snap.setSwitched
    ? "padding-top: 50px !important;"
    : "padding-top: 80px;";
  const firstHeader = snap.direction
    ? { width: "62%" }
    : {
        width: "64%",
        gridColumnStart: 1,
        gridColumnEnd: 1,
        gridRowStart: 1,
        gridRowEnd: 1,
      };
  const secondHeader = snap.direction
    ? { width: "115%" }
    : {
        width: "64%",
        gridColumnStart: 2,
        gridColumnEnd: 2,
        gridRowStart: 1,
        gridRowEnd: 1,
      };
  const hide = snap.isOpt
    ? "opacity: 1; pointer-events: all; transition: 0.4s; "
    : "opacity: 0; pointer-events: none; transition: 0s;";

  useEffect(() => {
    return () => {
      snap.isOpt ? close() : open();
    };
  }, [close, open, snap.isOpt]);

  // useEffect(() => {
  //   if (snap.isPro && snap.direction) {
  //     document.getElementById("audiohead").style.width = "100%";
  //     document.getElementById("displayhead").style.width = '123%';
  //   } else {
  //     document.getElementById("audiohead").style.width = headwidth.first.min;
  //     document.getElementById("displayhead").style.width = headwidth.second.min;
  //   }
  // }, [state.isPro])

  return (
    <Draggable
      nodeRef={opt}
      position={snap.optPosition}
      positionOffset={offset}
      onStart={() => false}
    >
      <Option
        hide={hide}
        layout={layout}
        top={top}
        ref={opt}
        className={cloud.drag ? "Panel opt glow" : "Panel opt"}
      >
        <p style={firstHeader} id="audiohead">
          Audio
        </p>
        <div
          className="audio"
          style={firstStyle}
          onMouseEnter={() => {
            styleHeaders(headwidth, 1, "audiohead", true);
          }}
          onMouseLeave={() => {
            styleHeaders(headwidth, 1, "audiohead", false);
          }}
        >
          <Folder
            id="muteunmute"
            className="li"
            onClick={() => {
              select();
              snap.muted ? (state.muted = false) : (state.muted = true);
            }}
          >
            <MuteIcon />
            {!snap.muted
              ? snap.direction
                ? "Mute SFX"
                : "Mute"
              : snap.direction
              ? "Unmute SFX"
              : "Unmute"}
          </Folder>
          <SongInfo song={song} />
        </div>
        <p style={secondHeader} id="displayhead">
          Display
        </p>
        <div
          className="display"
          style={secondStyle}
          onMouseEnter={() => styleHeaders(headwidth, 2, "displayhead", true)}
          onMouseLeave={() => styleHeaders(headwidth, 2, "displayhead", false)}
        >
          <Folder
            onClick={() => {
              toggleCanvas(snap);
              select();
            }}
            className="li w"
          >
            <ShowHideIcon n={0} />
            {snap.canvasVisible ? "Hide" : "Show"}
          </Folder>
          <Folder
            onClick={() => {
              toggleTheme();
              select();
            }}
            className="li w"
          >
            <ModeIcon />
            <span>{snap.theme === "light" ? "Dark" : "Light"}</span>
          </Folder>
          <Folder
            ref={colorLink}
            onClick={() => {
              openWheel();
              select();
            }}
            className="li w"
          >
            <ColorIcon />
            {!snap.colorWheel ? "Color" : "Choose"}
          </Folder>
          <Folder
            id="rowcolumn"
            onClick={() => {
              toggleDirection(snap);
              select();
            }}
            className="li w"
          >
            <DirectionIcon />
            {snap.direction ? "Column" : "Row"}
          </Folder>
        </div>
        {snap.isPro}
        {cloud.playMusic}
      </Option>
    </Draggable>
  );
}

export default Options;
