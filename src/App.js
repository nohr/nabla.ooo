import React, { useEffect, useState } from 'react'
import './App.css'
import { cloud, state } from './components/utils/state'
import { getGyro, newQuote, originalColors, useWindowDimensions } from './components/utils/common'
import { useSnapshot } from 'valtio';
import Interface from './components/Interface/Interface';
import Composition from './components/Canvas/Composition'
import { getGPUTier } from 'detect-gpu';
import { parseColor } from '@react-stately/color';

// Search Imports
import { useSearchBox } from 'react-instantsearch-hooks-web'

//Audio Imports
import useSound from "use-sound"
import sound1 from "./components/Sounds/select.mp3"
import sound5 from "./components/Sounds/select2.mp3"
import sound2 from "./components/Sounds/open.mp3"
import sound3 from "./components/Sounds/close.mp3"
import sound4 from "./components/Sounds/confirm.mp3"

let firstColor;
//App 
function App() {
  const snap = useSnapshot(state);
  const clip = useSnapshot(cloud);
  const { query, clear } = useSearchBox();
  const [select] = useSound(sound1, { volume: snap.sfxVolume, soundEnabled: !snap.muted, playbackRate: clip.selectRate });
  const [select2] = useSound(sound5, { volume: snap.sfxVolume, soundEnabled: !snap.muted, playbackRate: clip.selectRate });
  const [confirm] = useSound(sound4, { volume: snap.sfxVolume, soundEnabled: !snap.muted });
  const [open] = useSound(sound2, { volume: snap.sfxVolume, soundEnabled: !snap.muted });
  const [close] = useSound(sound3, { volume: snap.sfxVolume, soundEnabled: !snap.muted });
  snap.cached ? (snap.theme === 'light' ? firstColor = snap.light.panelColor : firstColor = snap.dark.panelColor) : (snap.theme === 'light' ? firstColor = originalColors.light.panelColor : firstColor = originalColors.dark.panelColor);
  const [color, setColor] = useState(parseColor(firstColor));
  let vWidth = useWindowDimensions().width;
  let vHeight = useWindowDimensions().height;

  useEffect(() => {
    newQuote();
  }, [])

  // GPU
  useEffect(() => {
    (async () => {
      const gpuTier = await getGPUTier();
      console.log(gpuTier);
      if (gpuTier.tier < 3) {
        state.canvasPaused = true;
      }
    })();
  }, [])

  useEffect(() => {
    if (clip.mobile) {
      if (snap.gyro) {
        window.addEventListener("click", getGyro(true));
      }
    }
    return () => {
      window.removeEventListener("click", getGyro(false));
    }
  }, []);
  // cloud.CanvasLoading = false;

  document.addEventListener('gesturestart', (e) => { e.preventDefault(); document.body.style.zoom = 0.99; });
  document.addEventListener('gesturechange', (e) => { e.preventDefault(); document.body.style.zoom = 0.99; });
  document.addEventListener('gestureend', (e) => { e.preventDefault(); document.body.style.zoom = 0.99; });

  return <>
    <Interface color={color} setColor={setColor} firstColor={firstColor} select={select} confirm={confirm} open={open} close={close} useSound={useSound} />
    <Composition vWidth={vWidth} vHeight={vHeight} query={query} clear={clear} select={select2} confirm={confirm} />
  </>
}

export default App;