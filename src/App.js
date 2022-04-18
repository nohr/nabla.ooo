import React from 'react'
import CanvasComp from './components/Canvas/Canvas'
import UI from './components/UI/UI'
import { state } from './components/UI/state'
import { db, GetWorks } from './firebase'
import { getGPUTier } from 'detect-gpu';

//App 
function App() {

  // GPU
  (async () => {
    const gpuTier = await getGPUTier();

    if (gpuTier.tier >= 3) {
      state.paused = false;
    }

    console.log(gpuTier);
    // Example output:
    // {
    //   "tier": 1,
    //   "isMobile": false,
    //   "type": "BENCHMARK",
    //   "fps": 21,
    //   "gpu": "intel iris graphics 6100"
    // }
  })();

  //Load project titles
  GetWorks(db);
  //Change the theme based on user preference
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !state.themeChanged ?
    (state.theme = 'dark') : (state.theme = 'light')
  return (
    <>
      <UI />
      <CanvasComp />
    </>
  );
}

export default App;