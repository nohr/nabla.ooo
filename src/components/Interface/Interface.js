//UI -- Parent Component
import React, { useEffect, useState, useRef, memo } from "react"
import { state, cloud } from "../utils/state"
import { useSnapshot } from "valtio"
import { GlobalStyle, Wheel } from "../utils/common"
import Navigator from "./navigator"
import Projects from "./projects"
import Options from "./options"
import { ThemeProvider } from "styled-components"
import { Page } from "./Stream/Page"
import { Results } from "./Stream/Results"
import { Routes, Route, Navigate } from "react-router-dom"
import { ColorWheel } from '@react-spectrum/color';
import Draggable from "react-draggable"
import MobileNavigator from "./mobileNavigator"
import { useSearchBox } from "react-instantsearch-hooks-web"

// Audio
import home from "../Sounds/home.mp3"
import sound5 from "../Sounds/reset.mp3"

function Interface({ color, setColor, useSound, select, confirm, open, close }) {
  const [colorWheel, setColorWheel] = useState(false);
  const snap = useSnapshot(state);
  const clip = useSnapshot(cloud);
  const wheel = useRef();
  const handle = useRef();
  const nabla = useRef(null);
  const { query, refine, clear } = useSearchBox();
  const [song, setSong] = useState(`${clip.songs[state.songIndex].artist} - ${cloud.songs[state.songIndex].name}`);
  const [text, setText] = useState(state.quotes);
  const [dong] = useSound(home, { volume: snap.sfxVolume, soundEnabled: !snap.muted, playbackRate: clip.playRate, interrupt: false });
  const [reset] = useSound(sound5, { soundEnabled: !snap.muted, playbackRate: clip.resetRate });

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
  }, [cloud.UILoading])

  return <>
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
    <ThemeProvider theme={state.theme === "light" ? snap.light : snap.dark}>
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
            query={query}
            refine={refine}
            clear={clear}
            handle={handle}
            text={text}
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
}

export default memo(Interface);