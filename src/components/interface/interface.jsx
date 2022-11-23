/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { state, cloud } from "../../common/state";
import { useSnapshot } from "valtio";
import { toHslString } from "../../common/utils";
import Navigator from "./desktop/navigator";
import { ThemeProvider } from "styled-components";
import { Page } from "./pages/page";
import { Route } from "wouter";
import MobileNavigator from "./mobile/navigator";
import { GlobalStyle } from "../../common/style";
import home from "../sounds/home.mp3";
import sound5 from "../sounds/reset.mp3";
import Editor from "./editor/editor";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../common/api/firebase";

function Interface({
  color,
  admin,
  setColor,
  useSound,
  select,
  confirm,
  open,
  close,
  vWidth,
  vHeight,
}) {
  const [colorWheel, setColorWheel] = useState(false);
  const snap = useSnapshot(state);
  const clip = useSnapshot(cloud);
  const audio = useRef(null);
  const handle = useRef(null);
  const nabla = useRef(null);
  const resetButton = useRef(null);
  const container = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [song, setSong] = useState(
    `${clip.songs[state.songIndex].artist} - ${
      cloud.songs[state.songIndex].name
    }`
  );
  const [text, setText] = useState(state.quotes);
  const [user, setUser] = useState(null);
  const [dong] = useSound(home, {
    volume: snap.sfxVolume,
    soundEnabled: !snap.muted,
    playbackRate: clip.playRate,
    interrupt: false,
  });
  const [reset] = useSound(sound5, {
    soundEnabled: !snap.muted,
    playbackRate: clip.resetRate,
  });

  useEffect(() => {
    toHslString(snap.hue);
  }, [snap.hue, snap.monochrome]);

  useEffect(() => {
    state.hue = color.hue;
  }, [color]);

  // Toggle Music
  const currentSong = audio.current;
  useEffect(() => {
    if (currentSong) {
      currentSong.addEventListener("play", () => {
        cloud.playMusic = true;
      });
      currentSong.addEventListener("pause", () => {
        cloud.playMusic = false;
      });
    }
  }, [clip.playMusic, currentSong, snap.songIndex]);

  // check if the user is logged in
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(false);
    });
  }, [auth, setUser]);

  useEffect(() => {
    cloud.UILoading = false;
  }, [cloud.UILoading]);

  return (
    <ThemeProvider theme={state.theme === "light" ? snap.light : snap.dark}>
      <GlobalStyle />
      {clip.mobile ? (
        <MobileNavigator
          audio={audio}
          nabla={nabla}
          dong={dong}
          admin={dong}
          open={open}
          close={close}
          select={select}
          confirm={confirm}
          reset={reset}
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
          container={container}
          user={user}
        />
      ) : (
        <>
          <Navigator
            audio={audio}
            nabla={nabla}
            dong={dong}
            admin={dong}
            open={open}
            close={close}
            select={select}
            confirm={confirm}
            reset={reset}
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
            container={container}
            hovered={hovered}
            setHovered={setHovered}
            vWidth={vWidth}
            vHeight={vHeight}
            user={user}
          />
        </>
      )}
      <audio ref={audio} loop>
        <source src={null}></source>
      </audio>
      <Route path="/">
        <Page
          hovered={hovered}
          setHovered={setHovered}
          container={container}
          title={"Nabla"}
          id={"Home"}
        />
      </Route>
      <Route path="/editor">
        <Editor user={user} container={container} />
      </Route>
      <Route path="/store">
        <Page
          hovered={hovered}
          setHovered={setHovered}
          container={container}
          title={"Nabla Store"}
          id={"Store"}
          confirm={confirm}
        />
      </Route>
      <Route path="/info">
        <Page
          hovered={hovered}
          setHovered={setHovered}
          container={container}
          title={"Nabla Info"}
          id={"Info"}
        />
      </Route>
      <Route path="/contrast">
        <Page
          hovered={hovered}
          setHovered={setHovered}
          container={container}
          title={"Contrast"}
          id={"Contrast"}
        />
      </Route>
      {clip.data.map((work) => (
        <Route key={`${work.lot}`} path={`/${work.lot}`}>
          <Page
            hovered={hovered}
            setHovered={setHovered}
            container={container}
            title={`${work.name} @ Nabla`}
            id={`${work.client.toLowerCase().replace(/\s/g, "")}`}
            lot={`${work.lot}`}
          />
        </Route>
      ))}
      <Route path="*">
        <Page
          hovered={hovered}
          setHovered={setHovered}
          container={container}
          title={"Nabla not found"}
          id={"NotFound"}
        />
      </Route>
      {/* <Route
        path="*"
        element={<Navigate to="/404" replace />}
      /> */}
    </ThemeProvider>
  );
}

export default Interface;
