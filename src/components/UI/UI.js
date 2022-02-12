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
import Contrast from "../Stream/Contrast"
import NotFound from "../Stream/NotFound"
import { Page, Results } from '../Stream/Page.jsx'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import CircleType from 'circletype';

//Audio Imports
import useSound from 'use-sound'
import sound1 from "../Sounds/select.mp3"
import sound2 from '../Sounds/open.mp3'
import sound3 from '../Sounds/close.mp3'
import tardigradefile from "../Sounds/tardigrade.wav"


//UI -- Parent Component
function UI() {
  const snap = useSnapshot(state);
  const [select] = useSound(sound1, { volume: state.sfxVolume, soundEnabled: !state.muted });
  const [open] = useSound(sound2, { volume: state.sfxVolume, soundEnabled: !state.muted });
  const [close] = useSound(sound3, { volume: state.sfxVolume, soundEnabled: !state.muted });
  const [play, { stop }] = useSound(tardigradefile, { volume: 3.5, interrupt: true, loop: true });

  useEffect(() => {
    let title = document.querySelector('.song');
    if (title) {
      const song = new CircleType(title).radius(128);
      return song;
    }

  }, [])

  //Play the select sound for all links with .w
  useEffect(() => {
    let links = document.querySelectorAll(".w");
    if (links) {
      links.forEach(function (link) {
        link.addEventListener("click", select)
      })
    }

    return () => {
      links = null;
    }
  }, [select])

  //Toggle projects panel
  useEffect(() => {
    let portLink = document.querySelector(".portLink")
    function togglePort() {
      if (portLink) {
        state.isPort ? (state.isPort = false) : (state.isPort = true);
        state.isPort ? portLink.classList.add("folderActive") : portLink.classList.remove("folderActive");
        state.isPort ? open() : close();
      }
    }
    if (portLink) {
      portLink.addEventListener("click", togglePort)
    }
    return () => {
      portLink = null;
    }
  }, [open, close])

  //Toggle settings panel
  useEffect(() => {
    let settLink = document.querySelector(".settLink")
    function toggleSett() {
      if (settLink) {
        state.isSett ? (state.isSett = false) : (state.isSett = true);
        state.isSett ? settLink.classList.add("folderActive") : settLink.classList.remove("folderActive");
        state.isSett ? open() : close();
      }
    }
    if (settLink) {
      settLink.addEventListener("click", toggleSett)
    }
    return () => {
      settLink = null;
    }
  }, [open, close])

  // AUDIO
  //Toggle audio volume
  useEffect(() => {
    let muteunmute = document.querySelector("#muteunmute")
    const toggleMute = () => {
      if (state.muted === false) {
        state.muted = true
      } else if (state.muted === true) {
        state.muted = false
        select()
      }
    }
    if (muteunmute) {
      muteunmute.addEventListener("click", toggleMute)
    }
    return () => {
      muteunmute = null;
    }
  }, [select])

  useEffect(() => {
    let playstop = document.getElementById("playstop")
    const toggleMusic = () => {
      if (state.playMusic === false) {
        play();
        state.playMusic = true
      } else if (state.playMusic === true) {
        stop();
        state.playMusic = false
      }
      console.log(state.playMusic);
    }
    if (playstop) {
      playstop.addEventListener("click", toggleMusic)
    }
    return () => {
      playstop = null;
    }
  }, [play, stop, select])

  useEffect(() => {
    // let sectors = document.querySelectorAll(".sector")
    // const title = document.querySelector(".title")
    const head = document.querySelector(".head");

    // sectors ? console.log(sectors.length) : () => console.log(document.querySelectorAll(".sector").length)

    if (state.setSwitched && state.prtSwitched) { head.style.marginLeft = "-40vw !important" };

  }, [])

  var x = window.matchMedia("(max-width: 768px)");
  if (x.matches) {
    //Mobile
    return (
      <ThemeProvider theme={snap.theme === 'light' ? snap.light : snap.dark}>
        <GlobalStyle />
        <Container className="container hom" >
          <div style={{ textAlign: "center" }}>
            <h2>nabla.ooo works a lot better on tablet and desktop, for now.</h2><br /><br /> <p>Come back on one of those devices while I work on making this experience something special.</p> <br /><br /> <b>Thank you!</b>
          </div>
        </Container>
      </ThemeProvider>
    )
  } else {
    //Not Mobile
    return (
      <Router>
        <ThemeProvider theme={snap.theme === 'light' ? snap.light : snap.dark}>
          <GlobalStyle />
          <Navigator />
          <Projects />
          <Settings />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/info" element={<Info />} />
            <Route path="/contrast" element={<Contrast />} />
            {snap.selfs.map((work) => (
              <Route key={`${work.name}`} path={`/${work.id}`} element={<Page title={`${work.name} @ Nabla`} id={`${work.id}`} />} />
            ))}
            {snap.clients.map((work) => (
              <Route key={`${work.name}`} path={`/${work.id}`} element={<Page title={`${work.name} @ Nabla`} id={`${work.id}`} />} />
            ))}
            {/* broken - needs UI to rerender */}
            <Route path={`/${snap.query}-results`} element={<Results title={`${snap.query} Results`} />} />
            <Route element={NotFound} />
            {/* <Redirect from="*" to="/404" /> */}
          </Routes>
        </ThemeProvider>
      </Router>
    )
  }
}

export default UI;