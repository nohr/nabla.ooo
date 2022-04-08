import React, { useEffect, useRef } from "react"
import { state } from './state'
import { useSnapshot } from 'valtio'
import { GlobalStyle, Container } from "./style"
import Navigator from "./navigator"
import Projects from "./projects"
import Options from "./options"
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
import tardigradefile from "../Sounds/tardigrade.mp3"


//UI -- Parent Component
function UI() {
  const snap = useSnapshot(state);
  const [select] = useSound(sound1, { soundEnabled: !state.muted });
  const [open] = useSound(sound2, { soundEnabled: !state.muted });
  const [close] = useSound(sound3, { soundEnabled: !state.muted });
  const audio = useRef()

  console.log("render");

  // CircleType
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
  })

  //Toggle Options panel
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
  })

  // AUDIO
  //Toggle SFX 
  useEffect(() => {
    let muteunmute = document.querySelector("#muteunmute")
    const toggleMute = () => {
      state.muted ? state.muted = false : state.muted = true;
    }

    if (muteunmute) {
      muteunmute.addEventListener("click", toggleMute)
    }
    return () => {
      muteunmute = null;
    }
  }, [])

  // Toggle Music
  useEffect(() => {
    const tardigrade = audio.current;
    let playstop = document.querySelector("#playstop")
    const toggleMusic = () => {
      if (state.playMusic === false) {
        state.playMusic = true;
        tardigrade.play();
      } else if (state.playMusic === true) {
        state.playMusic = false;
        tardigrade.pause();
      }
    }
    if (playstop) {
      playstop.addEventListener("click", toggleMusic)
    }
    return () => {
      playstop = null;
    }
  }, [state.playMusic])

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
      <>
        <audio ref={audio} loop>
          <source src={tardigradefile}></source>
        </audio>
        <Router>
          <ThemeProvider theme={snap.theme === 'light' ? snap.light : snap.dark}>
            <GlobalStyle />
            <Navigator />
            <Projects />
            <Options />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/store" element={<Store />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/info" element={<Info />} />
              <Route path="/contrast" element={<Contrast />} />
              {snap.selfs.map((work) => (
                <Route key={`${work.name}`} path={`/${work.id}`} element={<Page title={`Nabla`} id={`${work.id}`} />} />
              ))}
              {snap.clients.map((work) => (
                <Route key={`${work.name}`} path={`/${work.id}`} element={<Page title={`Nabla & ${work.name}`} id={`${work.id}`} />} />
              ))}
              {/* broken - needs UI to rerender */}
              <Route path={`/${snap.query}-results`} element={<Results title={`${snap.query} Results`} />} />
              <Route element={NotFound} />
              {/* <Redirect from="*" to="/404" /> */}
            </Routes>
          </ThemeProvider>
        </Router>
      </>
    )
  }
}

export default UI;