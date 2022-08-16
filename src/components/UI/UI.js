import React, { useEffect, useState, useRef, memo } from "react"
import { state, cloud } from "./state"
import { useSnapshot } from "valtio"
import { GlobalStyle, Wheel } from "./style"
import { Next, Prev } from "../Stream/Page.jsx"
import Navigator from "./navigator"
import Projects from "./projects"
import Options from "./options"
import { ThemeProvider } from "styled-components"
import { Page } from "../Stream/Page.jsx"
import { Results } from "./search"
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom"
import CircleType from "circletype"
import { ColorWheel } from '@react-spectrum/color';
import { parseColor } from "@react-stately/color"

import Draggable from "react-draggable"
import MobileNavigator from "./mobileNavigator"
import { useSearchBox } from "react-instantsearch-hooks-web"

// Audio
import useSound from "use-sound"
import home from "../Sounds/home.mp3"
import sound5 from "../Sounds/reset.mp3"

let firstColor;
let darkStringAlpha;
let stringAlpha;
let string;
let darkString;
let surface;
let darkSurface;
let cd;
let fogLight = "hsl(360, 0%, 72%)"

export function toHslString(color) {
  string = `hsl(${color}, 100%, 20%)`
  darkString = `hsl(${color}, 41%, 74%)`
  stringAlpha = `hsla(${color}, 100%, 20%, 0.67)`
  darkStringAlpha = `hsla(${color}, 51%, 64%, 0.67)`
  surface = `hsla(${color}, 100%, 80%, 1)`;
  darkSurface = `hsla(${color}, 15%, 40%, 1)`;
  cd = `hsla(${(color)}, 31%, 84%, 1)`;
  state.hue = color;

  if (state.theme === 'light' && state.colorChanged) {
    state.light.panelColor = string;
    state.light.placeholder = string;
    state.light.LiHover = stringAlpha;
    state.light.CD = cd;
    state.light.Surface = surface;
    state.light.spotlight = fogLight;
  } else if (state.theme === 'dark' && state.colorChanged) {
    state.dark.panelColor = darkString;
    state.dark.placeholder = darkString;
    state.dark.LiHover = darkStringAlpha;
    state.dark.Surface = darkSurface;
    state.dark.spotlight = darkString;
  }
}
//UI -- Parent Component
function UI({ select, confirm, open, close, quote, text, setText }) {
  const [colorWheel, setColorWheel] = useState(false);
  const snap = useSnapshot(state);
  const clip = useSnapshot(cloud);
  const wheel = useRef();
  const handle = useRef();
  const nabla = useRef(null);
  const { query, refine, clear } = useSearchBox();
  snap.cached ? (snap.theme === 'light' ? firstColor = snap.light.panelColor : firstColor = snap.dark.panelColor) : (snap.theme === 'light' ? firstColor = 'hsl(205, 100%, 28%)' : firstColor = 'hsl(205, 31%, 64%)');
  const [color, setColor] = useState(parseColor(firstColor));
  const [song, setSong] = useState(`${clip.songs[state.songIndex].artist} - ${cloud.songs[state.songIndex].name}`);

  const [dong] = useSound(home, { volume: snap.sfxVolume, soundEnabled: !snap.muted, playbackRate: clip.playRate, interrupt: false });

  const [reset] = useSound(sound5, { soundEnabled: !snap.muted, playbackRate: clip.resetRate });



  snap.colorChanged && toHslString(color.hue);

  // PANELS
  //Toggle Projects panel
  let proLink;
  useEffect(() => {
    proLink = document.querySelector('.proLink');
    function togglePro() {
      !snap.isPro ? open() : close();
      if (snap.isPro) {
        state.isPro = false;
        // proLink && proLink.classList.remove("folderActive");
        return;
      } else {
        state.isPro = true;
        // proLink && proLink.classList.add("folderActive");
        return;
      }
    };
    if (proLink) {
      proLink.addEventListener("click", togglePro)
    };
    return () => {
      if (proLink) {
        proLink.removeEventListener("click", togglePro)
        proLink = null;
      }
    }
  }, [snap.isPro, snap.colorWheel]);

  //Toggle Options panel
  let optLink;
  useEffect(() => {
    optLink = document.querySelector('.optLink');
    function toggleOpt() {
      !snap.isOpt ? open() : close();
      if (snap.isOpt) {
        state.isOpt = false;
        // optLink && optLink.classList.remove("folderActive");
        return;
      } else {
        state.isOpt = true;
        // optLink && optLink.classList.add("folderActive");
        return;
      }
    };
    if (optLink) {
      optLink.addEventListener("click", toggleOpt)
    };
    return () => {
      if (optLink) {
        optLink.removeEventListener("click", toggleOpt)
        optLink = null;
      }
    }
  }, [snap.isOpt, snap.colorWheel]);

  useEffect(() => {
    cloud.UILoading = false;
  }, [])

  return (
    <>
      {
        !clip.mobile && <Draggable onStart={() => false} position={snap.navPosition}>
          <Wheel
            opacity={snap.colorWheel ? "1" : "0"}
            pointerEvents={snap.colorWheel ? "all" : "none"}
            transition={snap.colorWheel ? "0.3s" : "0s"}
            ref={wheel}
            onClick={() => state.colorChanged = true}
          >
            <ColorWheel
              size={"310px"}
              borderColor={`${props => props.theme.panelColor}`}
              value={color}
              onChange={setColor}
              onChangeEnd={setColor} />
          </Wheel>
        </Draggable>
      }
      <ThemeProvider theme={snap.theme === "light" ? snap.light : snap.dark}>
        <GlobalStyle />
        {clip.mobile ?
          <MobileNavigator
            nabla={nabla}
            dong={dong}
            open={open}
            close={close}
            select={select}
            confirm={confirm}
            reset={reset}
            song={song}
            setSong={setSong}
            colorWheel={colorWheel}
            setColorWheel={setColorWheel}
            quote={quote}
            query={query}
            refine={refine}
            clear={clear}
            handle={handle}
            color={color}
            setColor={setColor}
            text={text}
            setText={setText}
          />
          : <>
            <Navigator
              nabla={nabla}
              dong={dong}
              select={select}
              confirm={confirm}
              reset={reset}
              song={song}
              handle={handle}
              color={color}
              setColor={setColor}
              quote={quote}
              setText={setText} />
            <Projects select={select} />
            <Options
              colorWheel={colorWheel}
              setColorWheel={setColorWheel}
              setSong={setSong} select={select} />
            <Results select={select} />
          </>}
        <Routes>
          <Route path="/" element={<Page title={"Nabla"} id={"Home"} />} />
          <Route path="/store" element={<Page title={"Nabla Store"} id={"Store"} />} />
          <Route path="/blog" element={<Page title={"Nabla Blog"} id={"Blog"} />} />
          <Route path="/info" element={<Page title={"Nabla Info"} id={"Info"} />} />
          <Route path="/contrast" element={<Page title={"Contrast"} id={"Contrast"} />} />
          {clip.selfs.map((work) => (
            <Route key={`${work.name}`} path={`/${work.id}`} element={<Page title={`Nabla`} id={`${work.id}`} />} />
          ))}
          {clip.clients.map((work) => (
            <Route key={`${work.name}`} path={`/${work.id}`} element={<Page title={`Nabla & ${work.name}`} id={`${work.id}`} />} />
          ))}
          <Route path="*" element={<Page title={"Nabla not found"} id={"NotFound"} />} />
          <Route
            path="*"
            element={<Navigate to="/404" replace />}
          />
        </Routes>
      </ThemeProvider>
    </>
  )
}

export default memo(UI);