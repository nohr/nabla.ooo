import React, { useEffect, useRef } from "react"
import { state } from './state'
import { useSnapshot } from 'valtio'
import Draggable from 'react-draggable'
import { GlobalStyle, Navagator, Porter, Setter, Linker, Folder } from "./Theme"
import { ThemeProvider } from "styled-components"
import { SvgNabla, Spinner, Arrow, SideArrow } from './svg'
import Home from '../Stream/Home'
import About from '../Stream/About'
import Store from '../Stream/Store'
import Contact from "../Stream/Contact"
import NotFound from "../Stream/NotFound"
import { Page } from '../Stream/Page.jsx'
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
  const port = useRef(null);
  const snap = useSnapshot(state);
  state.selectedImg = null;
  const [dong] = useSound(sound1, { volume: state.sfxVolume });
  function select() {
    dong()
    state.isPort = false;
    state.isSett = false;
  }

  var x = window.matchMedia("(max-width: 768px)");
  let offset = {};
  if (x.matches) { // If media query matches
    offset = { x: '130px', y: '80px' };
  } else {
    if (state.isSett) {
      offset = { x: state.navWidth + state.settWidth - 40, y: '0px' };
    } else {
      offset = { x: state.navWidth - 20, y: '0px' };
    }
  }

  if (!state.loading) {
    return (
      <Draggable position={snap.prtPosition} positionOffset={offset} cancel={".li"} onStart={() => false}>
        <Porter ref={port} data-augmented-ui="tl-2-clip-y tr-2-clip-x br-clip bl-2-clip-y border" className="Panel prt">
          {snap.works && snap.works.map((work) => (
            <Linker exact className="li w" activeClassName="any" onClick={() => select()} to={`/${work.id}`} key={Math.random()}>{work.name}</Linker>
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
  const sett = useRef(null);
  const snap = useSnapshot(state);
  state.selectedImg = null;
  const [select] = useSound(sound1, { volume: state.sfxVolume });
  useEffect(() => {
    state.settWidth = sett.current.getBoundingClientRect().width;
  }, [])

  const themeToggeler = () => {
    select()
    state.wasClicked = true;
    state.theme === 'light' ? state.theme = 'dark' : state.theme = 'light';

  }

  // Volume
  const volume = () => {
    if (state.muted === false) {
      state.sfxVolume = 0.0;
      select()
      state.muted = true
    } else if (state.muted === true) {
      state.sfxVolume = 1;
      select()
      state.muted = false
    }
  }

  function togglePause() {
    if (!state.paused) {
      state.paused = true;
      select()

    } else if (state.paused) {
      state.paused = false;
      select()
    }
  }

  var x = window.matchMedia("(max-width: 768px)");
  let offset = {};
  if (x.matches) { // If media query matches
    offset = { x: '0px', y: '250px' };
  } else {
    offset = { x: state.navWidth - 20, y: 0 };
  }

  return (
    <Draggable position={snap.navPosition} positionOffset={offset} cancel={".li"} onStart={() => false}>
      <Setter ref={sett} data-augmented-ui="tl-2-clip-y tr-2-clip-x br-clip bl-2-clip-y border" className="Panel set">
        Audio <br />
        <Folder onClick={() => volume()} className="li w">{!snap.muted ? "Mute Sound" : "Unmute Sound"}</Folder><br />
        <br />
        Display <br />
        <Folder onClick={() => themeToggeler()} className="li w">{snap.theme === "light" ? "Dark Theme" : "Light Theme"}</Folder>
        <Folder onClick={() => togglePause()} className="li w">{snap.paused ? "Play Animation" : "Pause Animation"}</Folder><br />
      </Setter>
    </Draggable>
  );
}

//Nav -- Child of Parent: UI
function Nav() {
  const [open] = useSound(sound2, { volume: state.sfxVolume });
  const [close] = useSound(sound3, { volume: state.sfxVolume });
  const snap = useSnapshot(state);
  const portLink = useRef(null);
  const settLink = useRef(null);
  const nav = useRef(null);




  //Folder
  function Toggle(n) {
    if (n === 1) {
      state.isPort ? (state.isPort = false) : (state.isPort = true);
      state.isPort ? open() : close();
      state.isPort ? portLink.current.classList.add("folderActive") : portLink.current.classList.remove("folderActive");

    } else if (n === 2) {
      state.isSett ? (state.isSett = false) : (state.isSett = true);
      state.isSett ? open() : close();
      state.isSett ? settLink.current.classList.add("folderActive") : settLink.current.classList.remove("folderActive");
    }
  }
  const [select] = useSound(sound1, { volume: state.sfxVolume });
  const toggleLi = () => {
    select()
    state.isPort = false;
    state.isSett = false;
    state.isPort ? portLink.current.classList.add("folderActive") : portLink.current.classList.remove("folderActive");
    state.isSett ? settLink.current.classList.add("folderActive") : settLink.current.classList.remove("folderActive");
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

  useEffect(() => {
    state.navWidth = nav.current.getBoundingClientRect().width;
    // console.log(state.prtPosition.x);

    // if (state.prtPosition.x + state.portWidth >= state.containerWidth) {
    //   state.navWidth = 60 + -state.navWidth;
    //   state.settWidth = -40 + -state.settWidth;
    // } else {
    //   state.navWidth = 1 * state.navWidth;
    //   state.settWidth = 1 * state.settWidth;
    // }
  }, [nav])

  return (
    //NAV
    <Draggable cancel={".li, .nablaWrapper"} bounds=".container" positionOffset={offset} position={snap.navPosition} onDrag={onControlledDrag} >
      <Navagator data-augmented-ui="tl-2-clip-y tr-2-clip-x br-clip bl-2-clip-y border" ref={nav} className="Panel nav" portLink={portLink} settLink={settLink}>
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
        <Folder onClick={() => Toggle(1)} ref={portLink} className="li folder">
          Projects
          {snap.isPort ? <SideArrow /> : <Arrow />}
        </Folder>
        <Folder onClick={() => Toggle(2)} ref={settLink} className="li folder">
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
  //Get Project list and Data
  useEffect(() => {
    state.loading = true;
    const ref = db.collection("portfolio").orderBy("date", "desc");
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

  return (
    <Router>
      <ThemeProvider theme={snap.theme === 'light' ? snap.light : snap.dark}>
        <GlobalStyle />
        <Nav />
        {snap.isPort && <Projects />}
        {snap.isSett && <Settings />}
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/store" component={Store} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          {snap.works.map((work) => (
            <Route key={`${work.name}`} path={`/${work.id}`} component={() => <Page title={`Nabla | ${work.name}`} id={`${work.id}`} />} />
          ))}
          <Route component={NotFound} />
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default UI;