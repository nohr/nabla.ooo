import React, { useRef } from "react"
import { state } from './state'
import { useSnapshot } from 'valtio'
import Draggable from 'react-draggable'
import { GlobalStyle, Navagator, Linker, Folder, Container } from "./style"
import Projects from "./projects"
import Settings from "./settings"
import { ThemeProvider } from "styled-components"
import Search from "./search"
import { SvgNabla, Spinner, Arrow, SideArrow, Grabber, Speaker } from './svg'
import Home from '../Stream/Home'
import Info from '../Stream/Info'
import Store from '../Stream/Store'
import Blog from "../Stream/Blog"
import NotFound from "../Stream/NotFound"
import { Page, Results } from '../Stream/Page.jsx'
import sound1 from '../Sounds/select.mp3'
import sound2 from '../Sounds/open.mp3'
import sound3 from '../Sounds/close.mp3'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import useSound from 'use-sound'


//Nav -- Child of Parent: UI
function Nav() {
  const [open] = useSound(sound2, { volume: state.sfxVolume, soundEnabled: !state.muted });
  const [close] = useSound(sound3, { volume: state.sfxVolume, soundEnabled: !state.muted });
  const snap = useSnapshot(state);
  const portLink = useRef(null);
  const settLink = useRef(null);
  const nav = useRef(null);

  //intersection observer

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
  let [select] = useSound(sound1, { volume: state.sfxVolume, soundEnabled: !state.muted });
  const toggleLi = () => {
    select()
    state.isPort ? portLink.current.classList.add("folderActive") : portLink.current.classList.remove("folderActive");
    state.isSett ? settLink.current.classList.add("folderActive") : settLink.current.classList.remove("folderActive");
  };

  const panel = document.querySelectorAll('.panel');
  const onControlledDrag = (e, position) => {
    panel.forEach((one) => {
      one.style.setAttribute("style", "color: red; transition: 0.3s; cursor:grab !important;");
      console.log('hi');
    })
    let { x, y } = position;
    state.navPosition = { x, y };
    state.prtPosition = { x, y };
  };

  return (
    //NAV
    <Draggable nodeRef={nav} cancel={".li, .nablaWrapper, #search"} handle=".grabber" bounds=".container" position={nav.position} onDrag={onControlledDrag} >
      <Navagator ref={nav} className="Panel nav" portLink={portLink} settLink={settLink}>
        <div className='header' >
          <SvgNabla />
        </div>
        <Search />
        <Linker className="li" activeClassName="any" onClick={() => toggleLi()} to="/info" style={{ cursor: "not-allowed" }}>
          Info
        </Linker>
        <Linker className="li" activeClassName="any" onClick={() => toggleLi()} to="/store">
          Store
        </Linker >
        <Linker className="li" activeClassName="any" onClick={() => toggleLi()} to="/blog" style={{ cursor: "not-allowed" }}>
          Blog
        </Linker >
        <Folder onClick={() => Toggle(1)} ref={portLink} className="li folder">
          Projects
          {snap.isPort ? <SideArrow /> : <Arrow />}
        </Folder>
        <Folder onClick={() => Toggle(2)} ref={settLink} className="li folder">
          Settings
          {snap.isSett ? <SideArrow /> : <Arrow />}
        </Folder>
        {snap.loading ? <Spinner /> : <Grabber />}
        {snap.playMusic ? <Speaker /> : null}
      </Navagator>
    </Draggable>
  )
}

//UI -- Parent Component
function UI() {
  const snap = useSnapshot(state);

  var x = window.matchMedia("(max-width: 768px)");
  if (x.matches) {
    return (
      <ThemeProvider theme={snap.theme === 'light' ? snap.light : snap.dark}>
        <GlobalStyle />
        <Container className="container hom" >
          <p style={{ textAlign: "center" }}>
            <b>nabla.ooo works a lot better on tablet and desktop, for now.</b><br /><br /> Come back on one of those devices while I work on making this experience something special. <br /><br /> <b>Thank you!</b>
          </p>
        </Container>
      </ThemeProvider>
    )

  } else {
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
            <Route path="/blog" component={Blog} />
            <Route path="/info" component={Info} />
            {snap.works.map((work) => (
              <Route key={`${work.name}`} path={`/${work.id}`}>
                <Page title={`${work.name} @ Nabla`} id={`${work.id}`} />
              </Route>
            ))}
            {/* broken - needs UI to rerender */}
            <Route path={`/${snap.query}-results`}>
              <Results title={`${snap.query} Results`} />
            </Route>
            <Route path="/404" component={NotFound} />
            {/* <Redirect from="*" to="/404" /> */}
          </Switch>
        </ThemeProvider>
      </Router>
    )
  }
}

export default UI;