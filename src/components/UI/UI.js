import React, { useEffect, useState, useRef } from "react"
import { state, cloud } from "./state"
import { useSnapshot } from "valtio"
import { GlobalStyle, Wheel } from "./style"
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
  Navigate
} from "react-router-dom"
import CircleType from "circletype"
import { ColorWheel } from '@react-spectrum/color';
import { parseColor } from "@react-stately/color"

//Audio Imports
import useSound from "use-sound"
import sound1 from "../Sounds/select.mp3"
import sound2 from "../Sounds/open.mp3"
import sound3 from "../Sounds/close.mp3"
import tardigradefile from "../Sounds/tardigrade.mp3"
import Draggable from "react-draggable"

let firstColor;
let darkStringAlpha;
let stringAlpha;
let string;
let darkString;
let surface;
let darkSurface;
let cd;
let fogLight = "hsl(360, 0%, 72%)"

//UI -- Parent Component
function UI() {
  const startTime = performance.now();
  const snap = useSnapshot(state);
  const clip = useSnapshot(cloud);
  const [select] = useSound(sound1, { soundEnabled: !state.muted });
  const [open] = useSound(sound2, { soundEnabled: !state.muted });
  const [close] = useSound(sound3, { soundEnabled: !state.muted });
  const audio = useRef();
  const wheel = useRef();
  snap.cached ? (snap.theme === 'light' ? firstColor = snap.light.panelColor : firstColor = snap.dark.panelColor) : (snap.theme === 'light' ? firstColor = 'hsl(205, 100%, 28%)' : firstColor = 'hsl(205, 31%, 64%)');
  const [color, setColor] = useState(parseColor(firstColor));

  function toHslString(color) {
    string = `hsl(${color.hue}, 100%, 28%)`
    darkString = `hsl(${color.hue}, 31%, 64%)`
    stringAlpha = `hsla(${color.hue}, 100%, 28%, 0.67)`
    darkStringAlpha = `hsla(${color.hue}, 51%, 64%, 0.67)`
    surface = `hsla(${color.hue}, 100%, 80%, 1)`;
    darkSurface = `hsla(${color.hue}, 15%, 50%, 1)`;
    cd = `hsla(${(color.hue)}, 31%, 84%, 1)`;

    if (snap.theme === 'light' && snap.colorChanged) {
      state.light.panelColor = string;
      state.light.placeholder = string;
      state.light.LiHover = stringAlpha;
      state.light.CD = cd;
      state.light.Surface = surface;
      state.light.spotlight = fogLight;
    } else if (snap.theme === 'dark' && snap.colorChanged) {
      state.dark.panelColor = darkString;
      state.dark.placeholder = darkString;
      state.dark.LiHover = darkStringAlpha;
      state.dark.Surface = darkSurface;
      state.dark.spotlight = darkString;
    }
  }

  snap.colorChanged && toHslString(color);

  // CircleType
  useEffect(() => {
    let song;
    let title = document.querySelector(".song");
    if (title) {
      song = new CircleType(title).radius(128);
    }
    return () => {
      title = null;
      song = null;
    }
  }, [])

  // Exit modals
  useEffect(() => {
    function handleKeyPress(e) {
      // esc to clear search and blur input
      if (e.key === "Escape") {
        state.selectedDesc = null;
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

  // PANELS
  //Toggle Projects panel
  let proLink;
  useEffect(() => {
    proLink = document.querySelector('.proLink');
    function togglePro() {
      !snap.isPro ? open() : close();
      if (snap.isPro) {
        state.isPro = false;
        proLink && proLink.classList.remove("folderActive");
        return;
      } else {
        state.isPro = true;
        proLink && proLink.classList.add("folderActive");
        return;
      }
    };
    if (proLink) {
      proLink.addEventListener("click", togglePro)
    };
    return () => {
      if (proLink) {
        proLink.removeEventListener("click", togglePro)
        proLink = null;
      }
    }
  }, [snap.isPro, snap.colorWheel]);

  //Toggle Options panel
  let optLink;
  useEffect(() => {
    optLink = document.querySelector('.optLink');
    function toggleOpt() {
      !snap.isOpt ? open() : close();
      if (snap.isOpt) {
        state.isOpt = false;
        // optLink && optLink.classList.remove("folderActive");
        return;
      } else {
        state.isOpt = true;
        // optLink && optLink.classList.add("folderActive");
        return;
      }
    };
    if (optLink) {
      optLink.addEventListener("click", toggleOpt)
    };
    return () => {
      if (optLink) {
        optLink.removeEventListener("click", toggleOpt)
        optLink = null;
      }
    }
  }, [snap.isOpt, snap.colorWheel]);

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
  }, [select, snap.colorWheel])

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
      if (cloud.playMusic === false) {
        cloud.playMusic = true;
        currentSong.play();
      } else if (cloud.playMusic === true) {
        cloud.playMusic = false;
        currentSong.pause();
      }
    }
    if (playstop) {
      playstop.addEventListener("click", toggleMusic)
    }
    if (currentSong) {
      currentSong.addEventListener("play", () => {
        cloud.playMusic = true;
      })
      currentSong.addEventListener("pause", () => {
        cloud.playMusic = false;
      })
    }
  }, [])

  var x = window.matchMedia("(max-width: 760px)");
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
    const duration = performance.now() - startTime;
    console.log(`UI took ${duration}ms`);
    return (
      <>
        {
          <Draggable onStart={() => false} position={snap.navPosition}>
            <Wheel
              opacity={snap.colorWheel ? "1" : "0"}
              pointerEvents={snap.colorWheel ? "all" : "none"}
              transition={snap.colorWheel ? "0.3s" : "0s"}
              ref={wheel}
              onClick={() => state.colorChanged = true}
            >
              <ColorWheel
                size="310px"
                borderColor={`${props => props.theme.panelColor}`}
                value={color}
                onChange={setColor}
                onChangeEnd={setColor} />
            </Wheel>
          </Draggable>
        }
        <audio ref={audio} loop>
          <source src={tardigradefile}></source>
        </audio>
        <ThemeProvider theme={snap.theme === "light" ? snap.light : snap.dark}>
          <GlobalStyle />
          <Navigator />
          <Projects />
          <Options />
          <Results />
          <Routes>
            <Route path="/" element={<Page title={"Nabla"} id={"Home"} />} />
            <Route path="/store" element={<Page title={"Nabla Store"} id={"Store"} />} />
            <Route path="/blog" element={<Page title={"Nabla Blog"} id={"Blog"} />} />
            <Route path="/info" element={<Page title={"Nabla Info"} id={"Info"} />} />
            <Route path="/contrast" element={<Page title={"Contrast"} id={"Contrast"} />} />
            {clip.selfs.map((work) => (
              <Route key={`${work.name}`} path={`/${work.id}`} element={<Page title={`Nabla`} id={`${work.id}`} />} />
            ))}
            {clip.clients.map((work) => (
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
    )
  }
}

export default UI;