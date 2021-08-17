import React, { useEffect } from "react"
import { state } from './state'
import { useSnapshot } from 'valtio'
import Draggable from 'react-draggable'
//import '../../App.css'
import { GlobalStyle, Navagatior, Porter, Setter, Linker, Folder } from "./Theme"
import { ThemeProvider } from "styled-components"
import "./UI.css"
import { SvgNabla, Spinner, Arrow, SideArrow  } from './svg'
import Home from '../Stream/Home'
import About from '../Stream/About'
import Store from '../Stream/Store'
import Contact from "../Stream/Contact"
import NotFound from "../Stream/NotFound"
import sound1 from '../Sounds/select.mp3'
import sound2 from '../Sounds/open.mp3'
import sound3 from '../Sounds/close.mp3'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import useSound from 'use-sound'
import db from '../../firebase'


//Projects -- Child of Panel
function Projects(){
  const snap = useSnapshot(state);
    const [select] = useSound(sound1, {volume:state.sfxVolume});  
  
    useEffect(() => {
    state.loading = true;
    const ref = db.collection("portfolio").orderBy("projectYear", "desc");  
    const getWorks = () => {
        
        ref.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            state.works = items;
            state.loading = false;
        });
    }
        getWorks();
    }, []);

if (!state.loading) {
    return (
  <Draggable position={snap.prtPosition} positionOffset={{x: '105%', y: '50%'}} onStart={() => false}>
    <Porter  data-augmented-ui="tl-2-clip-y tr-2-clip-x br-clip bl-2-clip-y border" className="Panel prt"> 
        {snap.works.map((work)=>(
            <Linker exact className="li w" activeClassName="any" onClick={()=> select()} to={`/${work.id}`} key={work.id}>{work.projectName}</Linker>
        ))}
    </Porter>
  </Draggable>
)} else {
  return null
}
}
//Settings -- Child of Panel
function Settings(){
  const snap = useSnapshot(state);
  const [select] = useSound(sound1, state.sfxVolume); 
  const themeToggeler = () =>{
    select()
    state.wasClicked = true;
    state.theme === 'light' ? state.theme = 'dark' : state.theme = 'light';
 
  } 

  const volume = () => {
    state.sfxVolume -= 0.1; 
    select()
    console.log(state.sfxVolume)
  }

  
    return (
      <Draggable position={snap.prtPosition} positionOffset={{x: '0%', y: '150%'}} onStart={() => true}>
      <Setter  data-augmented-ui="tl-2-clip-y tr-2-clip-x br-clip bl-2-clip-y border" className="Panel set"> 
        Audio <br/>
        Music Volume <br/>
        <Folder onClick={()=>volume()} className="li">SFX Volume</Folder><br/>
        <br/>
        Display <br/>
        <Folder onClick={()=>themeToggeler()} className="li">Color Scheme</Folder><br/>
        Pause Canvas <br/>
    </Setter>
    </Draggable>
    );
  }

//Panel -- Child of Parent UI
function Panel() {

      //Projects Folder
      const [open] = useSound(sound2, state.sfxVolume);
      const [close] = useSound(sound3, state.sfxVolume);
      const snap = useSnapshot(state);

    function Toggle(n) {
    if (n === 1){
      state.isPort ? (state.isPort = false) : (state.isPort = true);
      const folder = document.getElementById("port");
      if (state.isPort){
        open()
        folder.classList.add("folderBorder")
    } else if (!state.isPort) {
        close()
        folder.classList.remove("folderBorder")
    }
  } else if (n === 2){
    state.isSett ? (state.isSett = false) : (state.isSett = true);
    const folder = document.getElementById("sett");
        if (state.isSett){
          open()
          folder.classList.add("folderBorder")
      } else if (!state.isSett) {
          close()
          folder.classList.remove("folderBorder")
      }
  }
} 
const [select] = useSound(sound1, state.sfxVolume); 
const toggleLi = () => {select()};

const onControlledDrag = (e, position) => {
  let {x, y} = position;
  state.navPosition = {x, y};
  state.prtPosition = {x, y};
};
    
    return (
      //NAV
      <Draggable handle=".grip" bounds=".container" position={snap.navPosition} onDrag={onControlledDrag} >
      <Navagatior data-augmented-ui="tl-2-clip-y tr-2-clip-x br-clip bl-2-clip-y border" className="Panel nav"> 
      <div className='header' >
        <SvgNabla title="nabla" />
          {snap.loading && <Spinner/>}
      </div>
            <Linker className="li" activeClassName="any" onClick={()=> toggleLi()} to="/Store">
            Store
            </Linker >
            <Linker className="li" activeClassName="any" onClick={()=> toggleLi()} to="/About">
            About 
            </Linker>
            <Linker className="li" activeClassName="any" onClick={()=> toggleLi()} to="/Contact">
            Contact
            </Linker >
      <Folder onClick={() => Toggle(1)} id="port" className="li folder">
        Projects 
        {snap.isPort && snap.loading ? <SideArrow transform={"rotate(-45)"} /> : <Arrow />}
      </Folder>
      <Folder onClick={() => Toggle(2)} id="sett" className="li folder">
        Settings
        {snap.isSett && snap.loading ? <SideArrow /> : <Arrow />}
      </Folder>
    <div className="grip"></div>
      </Navagatior>
      </Draggable>
    )}

//UI -- Parent Component
function UI() {
  const snap = useSnapshot(state);

  //Set theme automatically
    // const localTheme = window.localStorage.getItem('theme');
    // window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !localTheme ?
    //   (state.theme = 'dark') :
    //   localTheme ?
    //      (state.theme = localTheme) :
    //     (state.theme = 'light')

  return (
    <Router>
    <ThemeProvider theme={snap.theme === 'light' ? snap.light : snap.dark}>
      <GlobalStyle />
    <Panel /> 
    {snap.isPort && <Projects />}
    {snap.isSett && <Settings />}         
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/store" component={Store} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>    
    </ThemeProvider>
    </Router> 
  );
}

export default UI;