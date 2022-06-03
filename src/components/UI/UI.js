import React, { useEffect, useRef } from "react"
import { state } from "./state"
import { useSnapshot } from "valtio"
import { GlobalStyle } from "./style"
import { Container } from "../Stream/Page.jsx"
import Navigator from "./navigator"
import Projects from "./projects"
import Options from "./options"
import { ThemeProvider } from "styled-components"
import { Page } from "../Stream/Page.jsx"
import { Results } from "./search"
import {
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom"
import CircleType from "circletype"

//Audio Imports
import useSound from "use-sound"
import sound1 from "../Sounds/select.mp3"
import sound2 from "../Sounds/open.mp3"
import sound3 from "../Sounds/close.mp3"
import tardigradefile from "../Sounds/tardigrade.mp3"


//UI -- Parent Component
function UI() {
  const snap = useSnapshot(state);
  const [select] = useSound(sound1, { soundEnabled: !state.muted });

  const [open] = useSound(sound2, { soundEnabled: !state.muted });
  const [close] = useSound(sound3, { soundEnabled: !state.muted });
  const audio = useRef()
  const location = useLocation();

  // CircleType
  useEffect(() => {
    let title = document.querySelector(".song");
    if (title) {
      const song = new CircleType(title).radius(128);
    }
  }, [])

  // Exit modals
  useEffect(() => {
    function handleKeyPress(e) {
      // esc to clear search and blur input
      if (e.key === "Escape") {
        state.selectedImg = null;
        return;
      }
      // Do nothing when these are pressed
      if (e.key === "Enter" || e.key === "Shift" || e.key === "Meta" || e.key === "CapsLock" || e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === "Alt") {
        return;
      }
    }

    window.addEventListener("keyup", handleKeyPress);
    return () => {
      window.removeEventListener("keyup", handleKeyPress);
    }
  });

  // Remove modal on link change
  useEffect(() => {
    state.selectedImg = null;
    let proLink = document.querySelector(".proLink");
    let optLink = document.querySelector(".optLink");

    if (state.isPro) {
      state.isPro = false;
      proLink.classList.remove("glow");
      close();
    }
    if (state.isOpt) {
      state.isOpt = false;
      optLink.classList.remove("glow");
      close();
    }

    return () => {
      proLink = null;
      optLink = null;
    }
  }, [location])


  // PANELS
  //Toggle Projects panel
  useEffect(() => {
    let proLink = document.querySelector(".proLink");
    function togglePro() {
      if (proLink) {
        state.isPro ? (state.isPro = false) : (state.isPro = true);
        state.isPro ? proLink.classList.add("glow") : proLink.classList.remove("glow");
        state.isPro ? open() : close();
      }
    };
    if (proLink) {
      proLink.addEventListener("click", togglePro)
    };
    return () => {
      proLink = null;
    }
  });

  //Toggle Options panel
  useEffect(() => {
    let optLink = document.querySelector(".optLink");
    function toggleOpt() {
      if (optLink) {
        state.isOpt ? (state.isOpt = false) : (state.isOpt = true);
        state.isOpt ? optLink.classList.add("glow") : optLink.classList.remove("glow");
        state.isOpt ? open() : close();
      }
    };
    if (optLink) {
      optLink.addEventListener("click", toggleOpt)
    };
    return () => {
      optLink = null;
    }
  });

  // AUDIO
  //Play the select sound for all links with .w
  useEffect(() => {
    let links = document.querySelectorAll(".w");
    if (links) {
      links.forEach(function (link) {
        link.addEventListener("click", select)
      })
    }

    return () => {
      if (links) {
        links.forEach(function (link) {
          link.removeEventListener("click", select)
        })
        links = null;
      }
    }
  }, [select])

  //Toggle SFX 
  useEffect(() => {
    let muteunmute = document.querySelector("#muteunmute")
    const toggleMute = () => {
      state.muted ? state.muted = false : state.muted = true;
    }

    if (muteunmute) {
      muteunmute.addEventListener("click", toggleMute)
    }
  }, [])

  // Toggle Music
  useEffect(() => {
    const currentSong = audio.current;
    let playstop = document.querySelector("#playstop")
    const toggleMusic = () => {
      if (state.playMusic === false) {
        state.playMusic = true;
        currentSong.play();
      } else if (state.playMusic === true) {
        state.playMusic = false;
        currentSong.pause();
      }
    }
    if (playstop) {
      playstop.addEventListener("click", toggleMusic)
    }
    if (currentSong) {
      currentSong.addEventListener("play", () => {
        state.playMusic = true;
      })
      currentSong.addEventListener("pause", () => {
        state.playMusic = false;
      })
    }
  }, [])

  var x = window.matchMedia("(max-width: 768px)");
  if (x.matches) {
    //Mobile
    return (
      <ThemeProvider theme={snap.theme === "light" ? snap.light : snap.dark}>
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
        <>
          <ThemeProvider theme={snap.theme === "light" ? snap.light : snap.dark}>
            <GlobalStyle />
            <Navigator />
            <Projects />
            <Options />
            {(location.search.length > 0) ? <Results /> : null}
            <Routes>
              <Route path="/" element={<Page title={"Nabla"} id={"Home"} />} />
              <Route path="/store" element={<Page title={"Nabla Store"} id={"Store"} />} />
              <Route path="/blog" element={<Page title={"Nabla Blog"} id={"Blog"} />} />
              <Route path="/info" element={<Page title={"Nabla Info"} id={"Info"} />} />
              <Route path="/contrast" element={<Page title={"Contrast"} id={"Contrast"} />} />
              {snap.selfs.map((work) => (
                <Route key={`${work.name}`} path={`/${work.id}`} element={<Page title={`Nabla`} id={`${work.id}`} />} />
              ))}
              {snap.clients.map((work) => (
                <Route key={`${work.name}`} path={`/${work.id}`} element={<Page title={`Nabla & ${work.name}`} id={`${work.id}`} />} />
              ))}
              <Route path="*" element={<Page title={"Nabla not found"} id={"NotFound"} />} />
              <Route
                path="*"
                element={<Navigate to="/404" replace />}
              />
            </Routes>
          </ThemeProvider>
        </>
      </>
    )
  }
}

export default UI;