import React, { useEffect, useState } from "react";
import "./App.css";
import { cloud, state } from "./common/state";
import {
  originalColors,
  useWindowDimensions,
} from "./common/utils";
import { useSnapshot } from "valtio";
import { getGPUTier } from "detect-gpu";
import { parseColor } from "@react-stately/color";
import { newQuote } from "./common/api/firebase.service";
import { getGyro } from "./components/interface/mobile/utils";
import Interface from "./components/interface/interface";
import Composition from "./components/canvas/composition";
import { handleGetData } from "./common/api/firebase.editor";

//Audio Imports
import useSound from "use-sound";
import sound1 from "./components/sounds/select.mp3";
import sound5 from "./components/sounds/select2.mp3";
import sound2 from "./components/sounds/open.mp3";
import sound3 from "./components/sounds/close.mp3";
import sound4 from "./components/sounds/confirm.mp3";
import sound6 from "./components/sounds/admin.mp3";

let firstColor;
//App
function App() {
  const snap = useSnapshot(state);
  const clip = useSnapshot(cloud);
  const [select] = useSound(sound1, {
    volume: snap.sfxVolume,
    soundEnabled: !snap.muted,
    playbackRate: clip.selectRate,
  });
  const [select2] = useSound(sound5, {
    volume: snap.sfxVolume,
    soundEnabled: !snap.muted,
    playbackRate: clip.selectRate,
  });
  const [confirm] = useSound(sound4, {
    volume: snap.sfxVolume,
    soundEnabled: !snap.muted,
  });
  const [open] = useSound(sound2, {
    volume: snap.sfxVolume,
    soundEnabled: !snap.muted,
  });
  const [close] = useSound(sound3, {
    volume: snap.sfxVolume,
    soundEnabled: !snap.muted,
  });
  const [admin] = useSound(sound6, {
    volume: snap.sfxVolume,
    soundEnabled: !snap.muted,
  });

  snap.cached
    ? snap.theme === "light"
      ? (firstColor = snap.light.panelColor)
      : (firstColor = snap.dark.panelColor)
    : snap.theme === "light"
      ? (firstColor = originalColors.light.panelColor)
      : (firstColor = originalColors.dark.panelColor);
  const [color, setColor] = useState(parseColor(firstColor));
  let vWidth = useWindowDimensions().width;
  let vHeight = useWindowDimensions().height;

  useEffect(() => {
    handleGetData();
  }, []);

  useEffect(() => {
    newQuote();
  }, []);

  // GPU
  useEffect(() => {
    (async () => {
      const gpuTier = await getGPUTier();
      console.log(gpuTier);
      if (gpuTier.tier < 3) {
        state.canvasPaused = true;
      }
    })();
  }, []);

  useEffect(() => {
    if (clip.mobile) {
      if (snap.gyro) {
        window.addEventListener("click", getGyro(true));
      }
    }
    return () => {
      window.removeEventListener("click", getGyro(false));
    };
  }, [clip.mobile, snap.gyro]);
  // cloud.CanvasLoading = false;

  document.addEventListener("gesturestart", (e) => {
    e.preventDefault();
    document.body.style.zoom = 0.99;
  });
  document.addEventListener("gesturechange", (e) => {
    e.preventDefault();
    document.body.style.zoom = 0.99;
  });
  document.addEventListener("gestureend", (e) => {
    e.preventDefault();
    document.body.style.zoom = 0.99;
  });

  return (
    <>
      <Interface
        vWidth={vWidth}
        vHeight={vHeight}
        color={color}
        setColor={setColor}
        firstColor={firstColor}
        select={select}
        confirm={confirm}
        open={open}
        close={close}
        admin={admin}
        useSound={useSound}
      />
      <Composition
        vWidth={vWidth}
        vHeight={vHeight}
        select={select2}
        confirm={confirm}
      />
    </>
  );
}

export default App;
