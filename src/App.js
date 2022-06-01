import React from 'react'
import CanvasComp from './components/Canvas/Canvas'
import UI from './components/UI/UI'
import { state } from './components/UI/state'
import { getGPUTier } from 'detect-gpu';
import {
  BrowserRouter as Router,
} from 'react-router-dom'
//App 
function App() {
  // GPU
  (async () => {
    const gpuTier = await getGPUTier();

    if (gpuTier.tier >= 3 || gpuTier.isMobile === true) {
      //TODO: change to false for live build
      state.paused = true;
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
    <Router>
      <UI />
      <CanvasComp />
    </Router>
  );
}

export default App;