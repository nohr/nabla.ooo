import React, { useRef, useState, useEffect } from 'react'
import './App.css'
import Composition from './components/Canvas/Composition'
import UI from './components/UI/UI'
import { cloud, state } from './components/UI/state'
import { getGPUTier } from 'detect-gpu';
import { useSnapshot } from 'valtio';

// Search Imports
import { useSearchBox, useInfiniteHits } from 'react-instantsearch-hooks-web'

//Audio Imports
import useSound from "use-sound"
import sound1 from "./components/Sounds/select.mp3"
import sound2 from "./components/Sounds/open.mp3"
import sound3 from "./components/Sounds/close.mp3"
import sound4 from "./components/Sounds/confirm.mp3"

// Get Accelerometer data
function requestPermission() {
  DeviceMotionEvent.requestPermission().then(response => {
    if (response === 'granted') {
      window.addEventListener('deviceorientation', (event) => {
        if (window.matchMedia("(orientation: portrait)").matches) {
          cloud.leftright = Math.floor(event.gamma / 6);
          cloud.frontback = (Math.floor(event.beta / 8) - 6);
        }
        if (window.matchMedia("(orientation: landscape)").matches) {
          cloud.leftright = Math.floor(event.beta / 6);
          cloud.frontback = (Math.floor(event.gamma / 8) + 6);
        }
      });
    } else {
      // console.log("ttrun off");
    }
    // console.log(response);
  });
  // console.log(state.gyro);
};

export function getGyro(gyro) {
  if (gyro) {
    requestPermission();
  } else {
    state.gyro = false;
    return;
  }

};

const transformItems = (items) => {
  return items.filter(item => item.images && ({ ...item }));
};

//App 
function App() {
  const nabla = useRef(null);
  const snap = useSnapshot(state);
  const clip = useSnapshot(cloud);
  const { query, clear } = useSearchBox();
  const { hits } = useInfiniteHits({ transformItems });
  const [selectRate, setSelectRate] = useState(1)
  const [select] = useSound(sound1, { volume: snap.sfxVolume, soundEnabled: !snap.muted, playbackRate: clip.selectRate });
  const [confirm] = useSound(sound4, { volume: snap.sfxVolume, soundEnabled: !snap.muted });
  const [open] = useSound(sound2, { volume: snap.sfxVolume, soundEnabled: !snap.muted });
  const [close] = useSound(sound3, { volume: snap.sfxVolume, soundEnabled: !snap.muted });

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
      window.removeEventListener("click", getGyro(true));
    }
  }, []);
  // cloud.CanvasLoading = false;

  return <>
    <UI setSelectRate={setSelectRate} nabla={nabla} select={select} confirm={confirm} open={open} close={close} />
    <Composition query={query} hits={hits} clear={clear} setSelectRate={setSelectRate} nabla={nabla} select={select} confirm={confirm} />
  </>
}

export default App;