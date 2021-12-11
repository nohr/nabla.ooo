import CanvasComp from './components/Canvas/Canvas'
import UI from './components/UI/UI'
import { state } from './components/UI/state'

//App 
function App() {
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