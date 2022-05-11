import React from 'react'
import CanvasComp from './components/Canvas/Canvas'
import UI from './components/UI/UI'
import { state } from './components/UI/state'
import { db, GetSiteInfo, GetWorks } from '.'
import { getGPUTier } from 'detect-gpu';

//App 
function App() {
  GetSiteInfo(db);
  //Load project titles
  GetWorks(db);
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


  return (
    <>
      <UI />
      <CanvasComp />
    </>
  );
}

export default App;