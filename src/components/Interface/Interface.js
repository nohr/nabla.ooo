//UI -- Parent Component
import React, { useEffect, useState, useRef, memo } from "react"
import { state, cloud } from "../utils/state"
import { useSnapshot } from "valtio"
import { GlobalStyle, toHslString } from "../utils/common"
import Navigator from "./navigator"
import { ThemeProvider } from "styled-components"
import { Page } from "./Stream/Page"
import { Routes, Route, Navigate } from "react-router-dom"
import MobileNavigator from "./mobileNavigator"
import { useSearchBox } from "react-instantsearch-hooks-web"

// Audio
import home from "../Sounds/home.mp3"
import sound5 from "../Sounds/reset.mp3"
import { Results } from "./Stream/Results"

function Interface({ color, setColor, useSound, select, confirm, open, close }) {
  const [colorWheel, setColorWheel] = useState(false);
  const snap = useSnapshot(state);
  const clip = useSnapshot(cloud);
  const audio = useRef();
  const handle = useRef();
  const nabla = useRef(null);
  const resetButton = useRef(null);
  const { query, refine, clear } = useSearchBox();
  const [song, setSong] = useState(`${clip.songs[state.songIndex].artist} - ${cloud.songs[state.songIndex].name}`);
  const [text, setText] = useState(state.quotes);
  const [dong] = useSound(home, { volume: snap.sfxVolume, soundEnabled: !snap.muted, playbackRate: clip.playRate, interrupt: false });
  const [reset] = useSound(sound5, { soundEnabled: !snap.muted, playbackRate: clip.resetRate });

  useEffect(() => {
    toHslString(snap.hue);
  }, [snap.hue, snap.monochrome])

  useEffect(() => {
    state.hue = color.hue;
  }, [color])

  // Toggle Music
  const currentSong = audio.current;
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

  // PANELS
  //Toggle Projects panel
  let proLink;
  useEffect(() => {
    proLink = document.querySelector('.proLink');
    function togglePro() {
      if (snap.isPro) {
        state.isPro = false;
        return;
      } else {
        state.isPro = true;
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
      // !snap.isOpt ? open() : close();
      if (snap.isOpt) {
        state.isOpt = false;
        return;
      } else {
        state.isOpt = true;
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

  return <ThemeProvider
    theme={state.theme === "light" ? snap.light : snap.dark}
  >
    <GlobalStyle />
    {clip.mobile ?
      <MobileNavigator
        audio={audio}
        nabla={nabla}
        dong={dong}
        open={open}
        close={close}
        select={select}
        confirm={confirm}
        reset={reset}
        query={query}
        refine={refine}
        clear={clear}
        handle={handle}
        resetButton={resetButton}
        song={song}
        setSong={setSong}
        text={text}
        setText={setText}
        color={color}
        setColor={setColor}
        colorWheel={colorWheel}
        setColorWheel={setColorWheel}
      />
      : <Navigator
        audio={audio}
        nabla={nabla}
        dong={dong}
        open={open}
        close={close}
        select={select}
        confirm={confirm}
        reset={reset}
        query={query}
        refine={refine}
        clear={clear}
        handle={handle}
        resetButton={resetButton}
        song={song}
        setSong={setSong}
        text={text}
        setText={setText}
        color={color}
        setColor={setColor}
        colorWheel={colorWheel}
        setColorWheel={setColorWheel}
      />
    }
    <Results
      select={select} />
    <audio ref={audio} loop>
      <source src={null}></source>
    </audio>
    <Routes>
      <Route path="/" element={<Page title={"Nabla"} id={"Home"} />} />
      <Route path="/store" element={<Page title={"Nabla Store"} id={"Store"} />} />
      <Route path="/blog" element={<Page title={"Nabla Blog"} id={"Blog"} />} />
      <Route path="/info" element={<Page title={"Nabla Info"} id={"Info"} />} />
      <Route path="/contrast" element={<Page title={"Contrast"} id={"Contrast"} />} />
      {clip.projectGroups.map((work) => (
        <Route key={`${work.name}`} path={`/${work.id}`} element={<Page title={`Nabla`} id={`${work.id}`} />} />
      ))}
      <Route path="*" element={<Page title={"Nabla not found"} id={"NotFound"} />} />
      {/* <Route
        path="*"
        element={<Navigate to="/404" replace />}
      /> */}
    </Routes>
  </ThemeProvider>
}

export default memo(Interface);