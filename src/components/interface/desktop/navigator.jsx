/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useRef } from "react";
import Projects from "./projects";
import Options from "./options";
import { Search } from "./search";
import { Header, Nav, Skew, TrayWrapper } from "./panel.style";
import { cloud, state } from "../../../common/state";
import { resetWheel } from "../../../common/utils";
import { Arrow, SideArrow } from "../../../common/svg";
import { useSnapshot } from "valtio";
import Draggable from "react-draggable";
import { HomeButton, Quote } from "../homeButton";
import { Grabber, NextButton, PlayButton, ResetPosButton } from "../panelTools";
import { ColorWheel } from "@react-spectrum/color";
import { Link, useLocation } from "wouter";
import { Folder, Wheel } from "../../../common/style";
import { closeWheel, togglePanel } from "./utils";

function Navigator({
  audio,
  nabla,
  dong,
  admin,
  confirm,
  select,
  reset,
  song,
  setSong,
  handle,
  text,
  setText,
  resetButton,
  colorWheel,
  setColorWheel,
  color,
  setColor,
  open,
  close,
  setHovered,
  container,
  vHeight,
  vWidth,
  user,
}) {
  const snap = useSnapshot(state);
  const clip = useSnapshot(cloud);
  const nav = useRef(null);
  const pro = useRef(null);
  const opt = useRef(null);
  const wheel = useRef();
  const [location] = useLocation();
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
  useEffect(() => {
    if (nav.current) {
      // Glow on Shift
      window.addEventListener("keydown", (e) => {
        if (e.key === "Shift") {
          e.preventDefault();
          nav.current && nav.current.classList.add("glow");
          pro.current.classList && pro.current.classList.add("glow");
          opt.current.classList && opt.current.classList.add("glow");
        } else {
          return;
        }
      });
      window.addEventListener("keyup", (e) => {
        if (e.key === "Shift") {
          e.preventDefault();
          nav.current && nav.current.classList.remove("glow");
          pro.current.classList && pro.current.classList.remove("glow");
          opt.current.classList && opt.current.classList.remove("glow");
        } else {
          return;
        }
      });
    }
  }, []);

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
  };

  return (
    <Skew
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      skew={clip.skew ? `skew(3deg, 9deg)` : `skew(0deg, 0deg)`}
    >
      <Draggable
        nodeRef={nav}
        handle=".grabber"
        bounds="html"
        position={state.navPosition}
        onStop={onControlledStop}
        onDrag={onControlledDrag}
      >
        <Nav ref={nav} className="Panel nav">
          <Header width={"100%"}>
            <HomeButton nabla={nabla} dong={dong} />
            {<Quote text={text} setText={setText} />}
          </Header>
          <div className="grid">
            <Search admin={admin} user={user} />
            <TrayWrapper
              style={
                clip.playMusic
                  ? {
                      borderColor:
                        snap.theme === "light"
                          ? snap.light.bwElement
                          : snap.dark.bwElement,
                    }
                  : null
              }
            >
              <ResetPosButton
                resetButton={resetButton}
                reset={reset}
                nav={nav}
              />
              <PlayButton audio={audio} setSong={setSong} />
              <NextButton audio={audio} setSong={setSong} select={select} />
            </TrayWrapper>
            {!snap.colorWheel && (
              <>
                <Link
                  onClick={() => {
                    select();
                  }}
                  className={`li w ${
                    location.substring(1) === "info" ? "active" : null
                  }`}
                  to="/info"
                  style={{ justifySelf: "flex-end" }}
                >
                  Info
                </Link>
                <Link
                  onClick={() => {
                    select();
                  }}
                  className={`li w ${
                    location.substring(1) === "store" ? "active" : null
                  }`}
                  to="/store"
                  style={{ justifySelf: "flex-start" }}
                >
                  Store
                </Link>
                <Folder
                  ref={pro}
                  className={`li folder proLink ${
                    state.isPro ? "folderActive" : null
                  }`}
                  tabIndex={-1}
                  style={{ justifySelf: "flex-end" }}
                  onClick={() => {
                    togglePanel("projects");
                  }}
                >
                  Projects
                  {snap.isPro ? <SideArrow /> : <Arrow />}
                </Folder>
                <Folder
                  ref={opt}
                  className={`li folder optLink ${
                    state.isOpt ? "folderActive" : null
                  }`}
                  tabIndex={-1}
                  style={{ justifySelf: "flex-start" }}
                  onClick={() => {
                    togglePanel("options");
                  }}
                >
                  Options
                  {snap.isOpt ? <SideArrow /> : <Arrow />}
                </Folder>
              </>
            )}
            {snap.colorWheel && (
              <>
                <Folder
                  onClick={() => {
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
                  }}
                >
                  Monochrome
                </Folder>
                <Folder
                  onClick={() => {
                    closeWheel();
                    confirm();
                  }}
                  className="li w Color"
                >
                  Confirm
                </Folder>
                <Folder
                  onClick={() => {
                    resetWheel();
                    reset();
                  }}
                  className="li w Reset"
                >
                  Reset
                </Folder>
              </>
            )}
          </div>
          <Grabber nav={nav} reset={reset} handle={handle} />
        </Nav>
      </Draggable>
      <Projects
        open={open}
        close={close}
        reset={reset}
        confirm={confirm}
        headwidth={headwidth}
        select={select}
        vWidth={vWidth}
        vHeight={vHeight}
      />
      <Options
        song={song}
        setSong={setSong}
        open={open}
        close={close}
        headwidth={headwidth}
        colorWheel={colorWheel}
        setColorWheel={setColorWheel}
        select={select}
        vWidth={vWidth}
        vHeight={vHeight}
      />
      <Draggable position={snap.navPosition}>
        <Wheel
          opacity={snap.colorWheel ? "1" : "0"}
          pointerEvents={snap.colorWheel ? "all" : "none"}
          transition={snap.colorWheel ? "0.3s" : "0s"}
          ref={wheel}
          onClick={() => {
            state.colorChanged = true;
          }}
        >
          {!snap.monochrome && (
            <ColorWheel
              size={"310px"}
              borderColor={`${(props) => props.theme.panelColor}`}
              value={color}
              onChange={setColor}
              onChangeEnd={setColor}
            />
          )}
        </Wheel>
      </Draggable>
    </Skew>
  );
}

export default memo(Navigator);
