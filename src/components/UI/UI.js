import React, { useEffect } from "react"
import { state } from './state'
import { useSnapshot } from 'valtio'
import { GlobalStyle, Container } from "./style"
import Navigator from "./navigator"
import Projects from "./projects"
import Settings from "./settings"
import { ThemeProvider } from "styled-components"
import Home from '../Stream/Home'
import Info from '../Stream/Info'
import Store from '../Stream/Store'
import Blog from "../Stream/Blog"
import NotFound from "../Stream/NotFound"
import { Page, Results } from '../Stream/Page.jsx'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

//Audio Imports
import useSound from 'use-sound'
import sound1 from "../Sounds/select.mp3"
import sound2 from '../Sounds/open.mp3'
import sound3 from '../Sounds/close.mp3'
// import cemeterydfile from "../Sounds/cemetery d.wav"
import tardigradefile from "../Sounds/tardigrade.wav"


//UI -- Parent Component
function UI() {
  const snap = useSnapshot(state);
  const [select] = useSound(sound1, { volume: state.sfxVolume, soundEnabled: !state.muted });
  const [open] = useSound(sound2, { volume: state.sfxVolume, soundEnabled: !state.muted });
  const [close] = useSound(sound3, { volume: state.sfxVolume, soundEnabled: !state.muted });
  const [play, { stop }] = useSound(tardigradefile, { interrupt: true, loop: true });

  useEffect(() => {
    // const nav = document.querySelector(".nav")
    // let sectors = document.querySelectorAll(".sector")
    const links = document.querySelectorAll(".w");
    let speaker = document.querySelector(".speaker")
    const portLink = document.querySelector(".portLink")
    const settLink = document.querySelector(".settLink")
    const head = document.querySelector(".head");

    //Folder
    function togglePort() {
      state.isPort ? (state.isPort = false) : (state.isPort = true);
      state.isPort ? open() : close();
      state.isPort ? portLink.classList.add("folderActive") : portLink.classList.remove("folderActive");

    }
    function toggleSett() {
      state.isSett ? open() : close();
      state.isSett ? (state.isSett = false) : (state.isSett = true);
      state.isSett ? settLink.classList.add("folderActive") : settLink.classList.remove("folderActive");
    }

    // AUDIO
    // Toggle Mute Switch
    const muteunmute = document.getElementById("muteunmute")
    const toggleMute = () => {
      if (state.muted === false) {
        state.muted = true
      } else if (state.muted === true) {
        state.muted = false
      }
    }
    //Music
    const playstop = document.getElementById("playstop")
    // Toggle Music
    const toggleMusic = () => {
      if (state.playMusic === false) {
        state.playMusic = true
        play();
      } else if (state.playMusic === true) {
        state.playMusic = false
        stop();
      }
    }

    // sectors ? console.log(sectors.length) : () => console.log(document.querySelectorAll(".sector").length)

    links.forEach(function (link) {
      link.addEventListener("click", select)
    })

    if (state.setSwitched && state.prtSwitched) { head.style.marginLeft = "-40vw !important" };

    if (speaker) {
      speaker.addEventListener("click", stop)
    }
    portLink.addEventListener("click", togglePort)
    settLink.addEventListener("click", toggleSett)
    muteunmute.addEventListener("click", toggleMute)
    playstop.addEventListener("click", toggleMusic)

  }, [play, select, stop, close, open])


  var x = window.matchMedia("(max-width: 768px)");
  if (x.matches) {
    //Mobile
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
          <Navigator />
          <Projects />
          <Settings />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/store" component={Store} />
            <Route path="/blog" component={Blog} />
            <Route path="/info" component={Info} />
            {snap.selfs.map((work) => (
              <Route key={`${work.name}`} path={`/${work.id}`}>
                <Page title={`${work.name} @ Nabla`} id={`${work.id}`} />
              </Route>
            ))}
            {snap.clients.map((work) => (
              <Route key={`${work.name}`} path={`/${work.id}`}>
                <Page title={`${work.name} @ Nabla`} id={`${work.id}`} />
              </Route>
            ))}
            {/* broken - needs UI to rerender */}
            <Route path={`/${snap.query}-results`}>
              <Results title={`${snap.query} Results`} />
            </Route>
            <Route component={NotFound} />
            {/* <Redirect from="*" to="/404" /> */}
          </Switch>
        </ThemeProvider>
      </Router>
    )
  }
}

export default UI;