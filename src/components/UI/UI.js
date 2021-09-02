import React, { useEffect } from "react"
import { state } from './state'
import { useSnapshot } from 'valtio'
import Draggable from 'react-draggable'
import { GlobalStyle, Navagator, Porter, Setter, Linker, Folder } from "./Theme"
import { ThemeProvider } from "styled-components"
import "./UI.css"
import { SvgNabla, Spinner, Arrow, SideArrow } from './svg'
import Home from '../Stream/Home'
import About from '../Stream/About'
import Store from '../Stream/Store'
import Contact from "../Stream/Contact"
import NotFound from "../Stream/NotFound"
import { Geese, Swami, Tidal } from '../Stream/Projects'
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
function Projects() {
  const snap = useSnapshot(state);
  const [dong] = useSound(sound1, { volume: state.sfxVolume });
  function select() {
    dong()
    state.isPort = false;
    state.isSett = false;
  }
  useEffect(() => {
    state.loading = true;
    const ref = db.collection("portfolio").orderBy("projectYear", "desc");
    const getWorks = () => {

      ref.onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          if (doc.data().name) {
            items.push(doc.data());
          }
        });
        state.works = items;
        state.loading = false;
      });
    }
    getWorks();
  }, []);

  var x = window.matchMedia("(max-width: 768px)");
  let offset = {};
  if (x.matches) { // If media query matches
    offset = { x: '130px', y: '80px' };
  } else {
    offset = { x: '150px', y: '50px' };
  }

  if (!state.loading) {
    return (
      <Draggable position={snap.prtPosition} positionOffset={offset} cancel={".li"} onStart={() => false}>
        <Porter data-augmented-ui="tl-2-clip-y tr-2-clip-x br-clip bl-2-clip-y border" className="Panel prt">
          {snap.works.map((work) => (
            <>
              <Linker exact className="li w" activeClassName="any" onClick={() => select()} to={`/${work.id}`} key={work.id}>{work.name}</Linker>
            </>
          ))}
        </Porter>
      </Draggable>
    )
  } else {
    return null
  }
}
//Settings -- Child of Panel
function Settings() {
  const snap = useSnapshot(state);
  const [select] = useSound(sound1, { volume: state.sfxVolume });

  const themeToggeler = () => {
    select()
    state.wasClicked = true;
    state.theme === 'light' ? state.theme = 'dark' : state.theme = 'light';

  }

  const volume = () => {
    if (state.muted === false) {
      state.sfxVolume = 0.0;
      select()
      state.muted = true
      console.log(state.sfxVolume)
    } else if (state.muted === true) {
      state.sfxVolume = 1;
      select()
      state.muted = false
      console.log(state.sfxVolume)
    }
  }

  var x = window.matchMedia("(max-width: 768px)");
  let offset = {};
  if (x.matches) { // If media query matches
    offset = { x: '0px', y: '250px' };
  } else {
    offset = { x: '0px', y: '170px' };
  }

  return (
    <Draggable position={snap.navPosition} positionOffset={offset} cancel={".li"} onStart={() => false}>
      <Setter data-augmented-ui="tl-2-clip-y tr-2-clip-x br-clip bl-2-clip-y border" className="Panel set">
        Audio <br />
        <Folder onClick={() => volume()} className="li w">{!snap.muted ? "Mute Sound" : "Unmute Sound"}</Folder><br />
        <br />
        Display <br />
        <Folder onClick={() => themeToggeler()} className="li w">{snap.theme === "light" ? "Dark Theme" : "Light Theme"}</Folder><br />
      </Setter>
    </Draggable>
  );
}

//Panel -- Child of Parent: UI
function Panel() {

  //Folder
  const [open] = useSound(sound2, { volume: state.sfxVolume });
  const [close] = useSound(sound3, { volume: state.sfxVolume });
  const snap = useSnapshot(state);

  useEffect(() => {
    const port = document.getElementById("port");
    if (state.isPort) {
      port.classList.add("folderBorder")

    } else {
      port.classList.remove("folderBorder");
    }
    const sett = document.getElementById("sett");
    state.isSett ? sett.classList.add("folderBorder") : sett.classList.remove("folderBorder");
  }, []);

  function Toggle(n) {
    if (n === 1) {
      state.isPort ? (state.isPort = false) : (state.isPort = true);
      state.isPort ? open() : close();
    } else if (n === 2) {
      state.isSett ? (state.isSett = false) : (state.isSett = true);
      state.isSett ? open() : close();
    }
  }
  const [select] = useSound(sound1, { volume: state.sfxVolume });
  const toggleLi = () => {
    select()
    state.isPort = false;
    state.isSett = false;
  };

  const onControlledDrag = (e, position) => {
    let { x, y } = position;
    state.navPosition = { x, y };
    state.prtPosition = { x, y };
  };

  var x = window.matchMedia("(max-width: 768px)");
  let offset = {};
  if (x.matches) { // If media query matches
    offset = { x: '0', y: '40px' };
  } else {
    offset = { x: '0px', y: '0px' };
  }

  return (
    //NAV
    <Draggable cancel={".li, .nablaWrapper"} bounds=".container" positionOffset={offset} position={snap.navPosition} onDrag={onControlledDrag} >
      <Navagator data-augmented-ui="tl-2-clip-y tr-2-clip-x br-clip bl-2-clip-y border" className="Panel nav">
        <div className='header' >
          <SvgNabla title="nabla" />
          {snap.loading && <Spinner />}
        </div>
        <Linker className="li" activeClassName="any" onClick={() => toggleLi()} to="/store">
          Store
        </Linker >
        <Linker className="li" activeClassName="any" onClick={() => toggleLi()} to="/about">
          About
        </Linker>
        <Linker className="li" activeClassName="any" onClick={() => toggleLi()} to="/contact">
          Contact
        </Linker >
        <Folder onClick={() => Toggle(1)} id="port" className="li folder">
          Projects
          {snap.isPort ? <SideArrow /> : <Arrow />}
        </Folder>
        <Folder onClick={() => Toggle(2)} id="sett" className="li folder">
          Settings
          {snap.isSett ? <SideArrow /> : <Arrow />}
        </Folder>
      </Navagator>
    </Draggable>
  )
}

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
  // function capitalizeFirstLetter(string) {
  //   return string.charAt(0).toUpperCase() + string.slice(1);
  // }

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
          <Route path="/geese" component={Geese} />
          <Route path="/swami" component={Swami} />
          <Route path="/tidal" component={Tidal} />
          {/* {snap.works.map((work) => (
            <Route path={`/${work.id}`} component={capitalizeFirstLetter(`${work.id}`)} />
          ))} */}
          <Route component={NotFound} />
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default UI;