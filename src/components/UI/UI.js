import React, { useEffect, useRef } from "react"
import { state } from './state'
import { useSnapshot } from 'valtio'
import Draggable from 'react-draggable'
import { GlobalStyle, Navagator, Linker, Folder } from "./Theme"
import Projects from "./projects"
import Settings from "./settings"
import { ThemeProvider } from "styled-components"
import { SvgNabla, Spinner, Arrow, SideArrow } from './svg'
import Home from '../Stream/Home'
import Info from '../Stream/Info'
import Store from '../Stream/Store'
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

//Nav -- Child of Parent: UI
function Nav() {
  const [open] = useSound(sound2, { volume: state.sfxVolume });
  const [close] = useSound(sound3, { volume: state.sfxVolume });
  const snap = useSnapshot(state);
  const portLink = useRef(null);
  const settLink = useRef(null);
  const nav = useRef(null);

  //Move Nav if offscreen - BROKEN
  // useEffect(() => {
  //   state.navWidth = nav.current.getBoundingClientRect().width;
  //   // console.log(state.prtPosition.x);

  //   if (state.prtPosition.x + state.portWidth >= state.containerWidth) {
  //     state.navWidth = 60 + -state.navWidth;
  //     state.settWidth = -40 + -state.settWidth;
  //   } else {
  //     state.navWidth = 1 * state.navWidth;
  //     state.settWidth = 1 * state.settWidth;
  //   }
  // }, [nav])

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

  return (
    //NAV
    <Draggable cancel={".li, .nablaWrapper"} bounds=".container" position={nav.position} onDrag={onControlledDrag} >
      <Navagator data-augmented-ui="tl-2-clip-y tr-2-clip-x br-clip bl-2-clip-y border" ref={nav} className="Panel nav" portLink={portLink} settLink={settLink}>
        <div className='header' >
          <SvgNabla />
          {snap.loading && <Spinner />}
        </div>
        <Linker className="li" activeClassName="any" onClick={() => toggleLi()} to="/info">
          Info
        </Linker>
        <Linker className="li" activeClassName="any" onClick={() => toggleLi()} to="/store">
          Store
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

  var x = window.matchMedia("(max-width: 768px)");
  if (x.matches) {
    // Mobile
    return (
      <Router>
        <ThemeProvider theme={snap.theme === 'light' ? snap.light : snap.dark}>
          <GlobalStyle />
          <Nav />
          {snap.isSett && <Settings />}
          {snap.isPort && <Projects />}
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/store" component={Store} />
            <Route path="/info" component={Info} />
            {snap.works.map((work) => (
              <Route key={`${work.name}`} path={`/${work.id}`}>
                <Page title={`${work.name} @ Nabla`} id={`${work.id}`} />
              </Route>
            ))}
            <Route component={NotFound} />
          </Switch>
        </ThemeProvider>
      </Router>
    )
  } else {
    // Desktop
    return (
      <Router>
        <ThemeProvider theme={snap.theme === 'light' ? snap.light : snap.dark}>
          <GlobalStyle />
          <Nav />
          {snap.isSett && <Settings />}
          {snap.isPort && <Projects />}
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/store" component={Store} />
            <Route path="/info" component={Info} />
            {snap.works.map((work) => (
              <Route key={`${work.name}`} path={`/${work.id}`}>
                <Page title={`${work.name} @ Nabla`} id={`${work.id}`} />
              </Route>
            ))}
            <Route component={NotFound} />
          </Switch>
        </ThemeProvider>
      </Router>
    );
  }
}

export default UI;