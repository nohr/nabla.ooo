import './App.css'
import React from 'react';
import CanvasComp from './components/Canvas/Canvas'
import UI from './components/UI/UI'
import { state } from './components/UI/state'

//App
function App() {
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !state.wasClicked ?
    (state.theme = 'dark') : (state.theme = 'light')

  return (
    <>
      <UI />
      <CanvasComp />
    </>
  );
}

export default App;
