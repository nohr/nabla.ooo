//utils.js - global helper functions
import { useRef, useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, orderBy, where, query } from "firebase/firestore/lite";
import { getStorage, getDownloadURL, ref } from "firebase/storage";
import algoliasearch from "algoliasearch";
import { history } from 'instantsearch.js/es/lib/routers';
import styled, { createGlobalStyle } from "styled-components";
import { state, cloud } from "./state";

// CANVAS
export const target = [0, 6, 3];

// GLOBAL STYLING
export const Folder = styled.div`
  width: 100%;
  margin: 3px 0;
  padding: 2px 0;
  display: block;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-color: ${props => props.theme.panelColor};
   ${props => props.border};
   backdrop-filter: blur(30px) !important;

   &.mono{
    width: 60% !important;
    grid-area: 3/ 1/span 1/ span 2;
    text-align: center;
     color: ${props => props.theme.bwElement};
     border: 1px solid ${props => props.theme.bwElement};
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
   }

   &.resetPos{
    pointer-events: all;
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
            /* border: 1px solid ${props => props.theme.panelColor}; */
            border-radius: 50%;
            justify-content: center;
            display:flex;
            height: 50px;
            width: 50px;
            flex-direction: column;
            /* padding: 2px; */

            & svg{
                stroke:  ${props => props.theme.panelColor};
            width: 28px !important;
            stroke-width: 3px;
            }
   }

  &.circleButton{
    border-radius: 50% !important;
    width: 50px !important;
    height: 50px !important;
    display: flex !important;
    justify-content: center !important;
  }

  &.color{
    border-color: #ebebeb !important;
    fill: ${props => props.theme.LiHover};
    background-color: ${props => props.theme.LiHover};
    -webkit-filter: drop-shadow(1px 1px 6px ${props => props.theme.LiHover});
    filter: drop-shadow(1px 1px 6px ${props => props.theme.LiHover});
    text-align: center;

    & svg{
    animation: flashConfirm 1s steps(5, start) infinite;
    animation-delay: 3s;
    -webkit-filter:none;
    filter:none ;
    fill: #ebebeb;
    }
    transition: 0s;
    outline: 0px;

  }
  &.reset{
  border-color: #ebebeb !important;
    color: #ebebeb;
    background-color: ${props => props.theme.LiActiveBackground};
    -webkit-filter: drop-shadow(1px 1px 6px ${props => props.theme.LiActiveBackground});
    filter: drop-shadow(1px 1px 6px ${props => props.theme.LiActiveBackground});
    text-align: center;
    transition: 0.3s;

  }

  .light, .dark{
    fill: ${props => props.theme.panelColor} !important;
  }
  .nextIcon, .modeIcon, .muteIcon, .ShowHideIcon, .ColorIcon{
    fill: ${props => props.theme.panelColor} !important;
    overflow: visible;
  }
  .modeIcon{
    stroke-width: 1px !important;
  }
  .ConfirmIcon,  .ResetIcon{
    height: 80%;
  }
  .ResetIcon{
    fill: #ebebeb;
  }

  .PlayPauseIcon{
    fill: ${props => props.theme.panelColor} !important;
    overflow: visible;
  }
  .DirectionIcon{
    /* stroke: transparent !important; */
    fill: ${props => props.theme.panelColor} !important;
    stroke-width: 1px !important;
    overflow: visible;
  }
`
export const Song = styled.p`
    position: absolute;
     top: 6px;
    /* margin: 0 auto; */
    ${props => props.position}
    margin: 0;
    /* transform: translate(-30%, 0%) !important; */
    border: none;
    white-space: nowrap;
    /* pointer-events: none;
    opacity: 0; */
    animation: flash 2s infinite;
    transition: 1.3s;
    cursor: pointer;
    -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;

    @media only screen and (min-width: 768px) {
        & {
            bottom: 10px;
            top: unset;
        }
    }
  
  @keyframes flash {
	0% {
		color: ${props => props.theme.panelColor};
	}

	70% {
		color: ${props => props.theme.sky};
    -webkit-filter: drop-shadow(1px 1px 6px ${props => props.theme.sky});
    filter: drop-shadow(1px 1px 6px ${props => props.theme.sky});
	}

	100% {
		color: ${props => props.theme.panelColor};
	}
}
`
export const Wheel = styled.div`
@media only screen and (max-width: 768px) {
  & {
   backdrop-filter: blur(30px) !important;
  }
}
   bottom: unset !important;
  position: absolute;
  z-index: 4900;
  left: 0;
  transition: 0.9s !important;
  opacity: ${props => props.opacity};
  pointer-events: ${props => props.pointerEvents} !important;
  transition: ${props => props.transition};
  &*{
  border-width: 0px !important;
  }

`
export const GlobalStyle = createGlobalStyle`
    //App
    :root{
        --theme: ${props => props.theme.sky};
        --panelWidth: 270px;
        --panelHeight: 270px;
        --panelPadding: 6px 42.5px;
        --headOffset: 10px;
        --edge: 20px;
        --blur: 7px;
        --transition:0.3s;
    }
    html, body, #root {
        /* isolation: isolate; */
        background-color: ${props => props.theme.sky};
    }

    *::selection{
      color: inherit;
      background-color: #00000020;
    }
    *{
      /* filter:contrast(1.1) ; */
      animation-delay: 0s;
    }

          .gugmu9vdpaw div {
        box-shadow: 0 1.8px 0 0 ${props => props.theme.panelColor} !important;
      }

      .gugmu9vdpaw p {
        color: ${props => props.theme.panelColor} !important;
        text-shadow: 0 1px 1 1 ${props => props.theme.panelColor} !important;

      }
    //Panel
    .Panel {
      background-color: #00000000;
      width: var(--panelWidth);
      height: var(--panelHeight);
      scroll-snap-type: none;
        backdrop-filter: blur(30px) !important;
      /* backdrop-filter: blur(var(--blur)); */
      /* -webkit-backdrop-filter: blur(var(--blur)); */
      border: 1px solid ${props => props.theme.panelColor};
      color: ${props => props.theme.panelColor};
      border-radius: 185px;
      overflow: hidden;
        /* backdrop-filter: blur(10px) !important; */
      
      & .li{
        border-radius: 250px 250px 500px 500px;
      }
    }

    .glow{
        & *{
            opacity: 0;
        }
      fill: ${props => props.theme.LiHover} !important;
      background-color: ${props => props.theme.LiHover} !important;
      /* color: ${props => props.theme.bwElement} !important; */
      /* mix-blend-mode: ${props => props.theme.blend}; */
      box-shadow: 0 8px 32px 0 ${props => props.theme.LiHover};
      -webkit-box-shadow:  0 8px 32px 0 ${props => props.theme.LiHover};
      -moz-box-shadow:  0 8px 32px 0 ${props => props.theme.LiHover};
      /* transition: 1s; */
      /* animation: pulseItem 2s infinite; */
    }

// animation keyframes
    @keyframes pulseItem {
	0% {
		text-shadow: 1px 1px 10px ${props => props.theme.LiHover};
      box-shadow: 0 8px 32px 0 ${props => props.theme.panelColor};
      -webkit-box-shadow:  0 8px 32px 0 ${props => props.theme.panelColor};
      -moz-box-shadow:  0 8px 32px 0 ${props => props.theme.panelColor};
	}

	50% {
		text-shadow: 1px 1px 30px ${props => props.theme.LiHover};
      box-shadow: 0 8px 12px 0 ${props => props.theme.panelColor};
      -webkit-box-shadow:  0 8px 12px 0 ${props => props.theme.panelColor};
      -moz-box-shadow:  0 8px 12px 0 ${props => props.theme.panelColor};
	}

	100% {
		text-shadow: 1px 1px 10px ${props => props.theme.LiHover};
      box-shadow: 0 8px 32px 0 ${props => props.theme.panelColor};
      -webkit-box-shadow:  0 8px 32px 0 ${props => props.theme.panelColor};
      -moz-box-shadow:  0 8px 32px 0 ${props => props.theme.panelColor};
	}
}
    @keyframes flashConfirm {
  to {
    visibility: hidden;
  }
}

    //Links
    a{
      text-decoration: none;
      width: 100%;
      margin: 3px 0;
      padding: 2px 0;
      display: block;
}  
a.active:not(.nablaWrapper){
  background-color: ${props => props.theme.LiActiveBackground};
  color:  ${props => props.theme.textHover};
  -webkit-box-shadow: 0px 2px 10px 1px  ${props => props.theme.LiActiveBackground};
  -moz-box-shadow: 0px 2px 10px 1px  ${props => props.theme.LiActiveBackground};
  box-shadow: 0px 2px 10px 1px  ${props => props.theme.LiActiveBackground};
  text-shadow: 1px 1px 3px  ${props => props.theme.textHover};
  /* font-style: italic; */
}
    .li{
      border-radius: 12px;
    }
    .li, .folder {
        color: ${props => props.theme.panelColor};
        transition: 0.9s;
    }
    .folderActive {
      box-shadow: 0 0 0 1px  ${props => props.theme.panelColor} !important;
      -webkit-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor} !important;
      -moz-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor} !important;
      color:  ${props => props.theme.panelColor} !important;
      font-style: italic !important;
    }
    .folderActive:hover{
      box-shadow: 0 0 0 1px  ${props => props.theme.panelColor} !important;
      -webkit-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor} !important;
      /* border: 1px solid ${props => props.theme.LiHover} ; */
    }
    .folderActive:after{
      border-radius: 5px !important;
    }
      .active:not(.nablaWrapper){
        border-color: #ebebeb;
  background-color: ${props => props.theme.LiActiveBackground};
  color:  ${props => props.theme.textHover};
  -webkit-box-shadow: 0px 2px 10px 1px  ${props => props.theme.LiActiveBackground};
  -moz-box-shadow: 0px 2px 10px 1px  ${props => props.theme.LiActiveBackground};
  box-shadow: 0px 2px 10px 1px  ${props => props.theme.LiActiveBackground};
  text-shadow: 1px 1px 3px  ${props => props.theme.textHover};
  /* font-style: italic; */

   & svg{
    fill: ${props => props.theme.textHover};
    -webkit-filter: drop-shadow(1px 1px 3px ${props => props.theme.textHover});
    filter: drop-shadow(1px 1px 3px ${props => props.theme.textHover});  
  }
}
    .li:hover {
      background-color: ${props => props.theme.LiHover};
      -webkit-box-shadow: 0px 2px 10px 1px ${props => props.theme.LiHover};
      -moz-box-shadow: 0px 2px 10px 1px ${props => props.theme.LiHover};
      box-shadow: 0px 2px 10px 1px ${props => props.theme.LiHover};
      color: ${props => props.theme.textHover};
      text-shadow: 1px 1px 3px #ebebeb;
      /* transition: 0.3s !important; */
    }
    .arrow {
      fill: ${props => props.theme.panelColor};
      height: clamp(8px, 12px, 12px);
      float: right;
    }
    .li svg{
      transition: var(--transition);
      pointer-events: none;
    }
    .li:hover > svg {
      fill: ${props => props.theme.textHover};
      stroke: ${props => props.theme.textHover} !important;
      -webkit-filter: drop-shadow(1px 1px 6px ${props => props.theme.textHover});
      filter: drop-shadow(1px 1px 6px ${props => props.theme.textHover});
      /* transition: 0.3s !important; */
    }

    .li:hover > .ColorIcon{
      stroke: inherit !important;
      -webkit-filter: drop-shadow(1px 1px 6px inherit) !important;
      filter: drop-shadow(1px 1px 6px inherit) !important;

    }
    .notfound {
      width: 100vw;
      height: 100%;
      display: flex;
      align-items: center;
      justify-items: center;
      justify-content: center;
      flex-direction: column;
    }

//Not Mobile

@media only screen and (min-width: 1920px) {
  .sector{
    height: 70%;
  }
}
@media only screen and (min-width: 768px) {
  .info{
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-between;
    padding-bottom: 60px;
  }
  .info .text{
    width: 590px;
    /* margin: 0 30px; */
  }

}
.spectrum-ColorWheel-gradient_31462a:before,
.spectrum-ColorWheel-gradient_31462a:after{
  border-color: ${props => props.theme.panelColor};
}

  .spectrum-ColorLoupe_c818a8.is-open_c818a8{
    opacity: 0 !important;
  }
  .spectrum-ColorWheel_31462a .spectrum-ColorWheel-handle_31462a{
    height: 120px;
    width: 120px;
    border-color: ${props => props.theme.panelColor} !important;
    background-color:  ${props => props.theme.panelColor} !important;
     @media screen and (min-width:768px) {
        &{
             height: 50px;
            width: 50px;
        }
    }
  }
  .spectrum-ColorHandle-color_5a9f41{
    border-color: ${props => props.theme.panelColor} !important;
    background-color:  ${props => props.theme.panelColor} !important;
  }
`

//AUDIO
function LoadSong(song) {
    // const audio = useRef();
    // const currentSong = audio.current;
    let currentSong;
    currentSong = document.querySelectorAll('audio')[0];

    getDownloadURL(ref(storage, `gs://nabla7.appspot.com/assets/songs/${song.name}.mp3`))
        .then((url) => {
            cloud.songs[state.songIndex].url = url;
            currentSong.setAttribute('src', url);
            cloud.playMusic = true;
            currentSong.play();
        })
        .catch((error) => {
            console.log(error);
        });
};
export function ToggleMusic() {
    // const audio = useRef();
    // const currentSong = audio.current;
    let currentSong;
    currentSong = document.querySelectorAll('audio')[0];
    if (!cloud.songs[state.songIndex].url) {
        LoadSong(cloud.songs[state.songIndex]);
    } else {
        if (cloud.playMusic === false) {
            cloud.playMusic = true;
            currentSong.play();
        } else if (cloud.playMusic === true) {
            cloud.playMusic = false;
            currentSong.pause();
        }
    }
    currentSong.onended = () => NextSong();
};
export function NextSong() {
    // const audio = useRef();
    // const currentSong = audio.current;
    let currentSong;
    currentSong = document.querySelectorAll('audio')[0];

    cloud.playMusic = false;
    currentSong.pause();
    console.log(state.songIndex);

    if (state.songIndex < cloud.songs.length - 1) {
        state.songIndex += 1;
    } else {
        state.songIndex = 0;
    }
    if (!cloud.songs[state.songIndex].url) {
        LoadSong(cloud.songs[state.songIndex]);
    } else {
        currentSong.setAttribute('src', cloud.songs[state.songIndex].url);
        currentSong.play();
    }

};

//DISPLAY
let darkStringAlpha;
let stringAlpha;
let string;
let darkString;
let surface;
let darkSurface;
let cd;
let fogLight = "hsl(360, 0%, 72%)";

export function toHslString(color) {
    if (state.monochrome) {
        string = `hsl(0, 0%, 0%)`
        darkString = `hsl(0, 100%, 100%)`
        stringAlpha = `hsla(0, 100%, 0%, 0.67)`
        darkStringAlpha = `hsla(0, 100%, 100%, 0.45)`
        surface = `#fafafa`;
        darkSurface = `#7a7a7a`;
        cd = `hsla(0, 100%, 100%, 1)`;
    } else {
        string = `hsl(${color}, 100%, 20%)`
        darkString = `hsl(${color}, 41%, 74%)`
        stringAlpha = `hsla(${color}, 100%, 20%, 0.67)`
        darkStringAlpha = `hsla(${color}, 51%, 64%, 0.67)`
        surface = `hsla(${color}, 100%, 80%, 1)`;
        darkSurface = `hsla(${color}, 15%, 40%, 1)`;
        cd = `hsla(${color}, 31%, 84%, 1)`;
    }

    if (state.theme === 'light') {
        state.light.panelColor = string;
        state.light.placeholder = string;
        state.light.LiHover = stringAlpha;
        state.light.CD = cd;
        state.light.Surface = surface;
        state.light.spotlight = fogLight;
    } else if (state.theme === 'dark') {
        state.dark.panelColor = darkString;
        state.dark.placeholder = darkString;
        state.dark.LiHover = darkStringAlpha;
        state.dark.Surface = darkSurface;
        state.dark.spotlight = darkString;
    }
};
export const originalColors = {
    light: {
        panelColor: 'hsl(205, 100%, 20%)',
        LiHover: "hsla(205, 100%, 20%, 0.67)",
        CD: "hsla(14, 31%, 84%, 1)",
        Surface: "hsla(205, 100%, 80%, 1)",
        spotlight: "#ffffff",
    },
    dark: {
        panelColor: "hsl(205, 31%, 80%)",
        LiHover: "hsla(205, 31%, 80%, 0.67)",
        Surface: "hsla(205, 15%, 40%, 1)",
        spotlight: "hsla(205, 31%, 70%, 1)",
    }
};
export function closeWheel() {
    state.colorWheel = false;
};
export function resetWheel() {
    state.colorWheel = false;
    state.monochrome = false;
    state.hue = 205;
    if (state.theme === 'light') {
        state.light.panelColor = originalColors.light.panelColor;
        state.light.placeholder = originalColors.light.panelColor;
        state.light.LiHover = originalColors.light.LiHover;
        state.light.CD = originalColors.light.CD;
        state.light.Surface = originalColors.light.Surface;
        state.light.spotlight = originalColors.light.spotlight;
    } else if (state.theme === 'dark') {
        state.dark.panelColor = originalColors.dark.panelColor;
        state.dark.placeholder = originalColors.dark.panelColor;
        state.dark.LiHover = originalColors.dark.Surface;
        state.dark.Surface = originalColors.dark.Surface;
        state.dark.spotlight = originalColors.dark.spotlight;
    }
    state.colorChanged = false;
};
export function Theme() {
    // Theme to prefrence and listen for changes if no cache
    if (state.cached) {
        document.getElementById("theme-color").setAttribute("media", "");
        document.getElementById("theme-color").setAttribute("content", (state.theme === "light") ? state.light.sky : (state.dark.sky));
    } else {
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            document.getElementById("theme-color").setAttribute("media", "");
            document.getElementById("theme-color").setAttribute("content", state.dark.sky);
            state.theme = "dark";
        } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
            document.getElementById("theme-color").setAttribute("media", "");
            document.getElementById("theme-color").setAttribute("content", state.light.sky);
            state.theme = "light";
        }
    }

    // Themelistener
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
        document.getElementById("theme-color").setAttribute("content", (!e.matches) ? state.light.sky : state.dark.sky);
        return e.matches ? (state.theme = "dark") : (state.theme = "light");
    })
};
export const toggleTheme = () => {
    state.themeChanged = true;
    if (state.monochrome) {
        toHslString(state.hue);
    }
    if (state.theme === "dark") {
        document.getElementById("theme-color").setAttribute("media", "");
        document.getElementById("theme-color").setAttribute("content", state.light.sky);
        state.theme = "light";
    } else {
        document.getElementById("theme-color").setAttribute("media", "");
        document.getElementById("theme-color").setAttribute("content", state.dark.sky);
        state.theme = "dark";
    };
};
export function OpenWheel() {
    state.colorWheel = true;
    state.isOpt = false;
    state.isPro = false;
};
export function togglePause() {
    if (!state.canvasPaused) {
        //Pause Canvas
        state.canvasPaused = true;
        state.autoRotateSpeed = 0;

    } else if (state.canvasPaused) {
        //Play Canvas
        state.canvasPaused = false;
        state.autoRotateSpeed = 0.09;
    }
};
export function useWindowDimensions() {

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height,
        };
    }
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
};

//PANEL
let taps = 0;
let factor = 4;
export function handleClick(clip, query, dong, clear, nabla, svg) {
    function getRandom(max, min) {
        return Math.floor(Math.random() * (max - min) + min);
    };
    const amount = getRandom(6, 4);
    const speed = getRandom(250, 85);
    const time = getRandom(2000, 1000);
    const required = getRandom(2000, 1500);
    if (!clip.talking) {
        cloud.playRate = (Math.random() * (0.45 - 0.15) + 0.15).toFixed(2);
        cloud.selected = false;
        if (query.length > 0) { clear(); };
        dong();
        taps += 1;
        setTimeout(() => {
            //  CD SPEECH
            if (taps >= amount && taps <= (amount + 4)) {
                // debugger;
                state.colorChanged = true;
                cloud.talking = true;
                // TODO: Trigger smile animation
                // TODO: lengthen speech to amount of words spoken
                newQuote();
                const loop = setInterval(() => {
                    // toggleTheme();
                    // document.getElementById("theme-color").style.transition = cloud.playRate * 500;
                    state.hue += factor;
                    (state.hue + getRandom(50, 10) < 360) ? state.hue += getRandom(50, 10) : state.hue = 0;
                    cloud.playRate = (Math.random() * (1.00 - 0.65) + 0.65).toFixed(2);
                    dong();
                    activeTap(nabla, svg);
                }, speed);
                setTimeout(() => { clearInterval(loop); cloud.talking = false; cloud.UILoading = false; }, time);
                console.log(taps, amount, speed, time, state.hue);
            }
            taps = 0;
        }, required);
    }
};
export function unActiveTap(nabla, svg) {
    // if (cloud.target !== target || cloud.mobileCameraPosition !== [0, 20, 25])
    // || cloud.selected) ||
    // cloud.mobileCameraRotation !== [0, 0, 0] ||
    // cloud.mobileCameraQuaternion !== [0, 0, 0] ||
    {
        cloud.target = target;
        cloud.mobileCameraPosition = [0, 20, 25];
        // cloud.mobileCameraRotation = [0, 0, 0];
        // cloud.mobileCameraQuaternion = [0, 0, 0];
        cloud.selected = false;
    }
    nabla.current && nabla.current.setAttribute("style", `
        background-color: transparent !important;
    -webkit-box-shadow: none !important;
    -moz-box-shadow: none !important;
    box-shadow: none !important;
    transition:  ${(Math.random() * (0.45 - 0.15) + 0.15).toFixed(2) * 0.3}s !important;
    `);
    svg.current.style.fill = `${props => props.theme.panelColor}`;
    svg.current && svg.current.setAttribute("style", `
    -webkit-filter: none !important;
    filter: none !important;
    transition:  ${(Math.random() * (0.45 - 0.15) + 0.15).toFixed(2) * 0.3}s !important;
        `);
};
export function activeTap(nabla, svg) {
    nabla.current && nabla.current.setAttribute("style", `
        background-color: ${props => props.theme.LiHover} !important;
        border-color: ${props => props.theme.LiHover} !important;
    -webkit-box-shadow: 0px 3px 10px 1px ${props => props.theme.LiHover}  !important;
    -moz-box-shadow: 0px 3px 10px 1px ${props => props.theme.LiHover}  !important;
    box-shadow: 0px 3px 10px 1px ${props => props.theme.LiHover}  !important;
    transition: ${(Math.random() * (0.45 - 0.15) + 0.15).toFixed(2) * 0.3}s !important;
    `);

    svg.current && svg.current.setAttribute("style", `
    fill: #ebebeb;
    -webkit-filter: drop-shadow(1px 1px 3px ${props => props.theme.textHover}) !important;
    filter: drop-shadow(1px 1px 3px ${props => props.theme.textHover}) !important;
    transition:   ${(Math.random() * (0.45 - 0.15) + 0.15).toFixed(2) * 0.3}s !important;
        `);
    if (cloud.talking) {
        setTimeout(() => unActiveTap(nabla, svg), (cloud.playRate * 500))
    }
};
export const characters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '.', '!', '?', ' ', ' ', ' ', ' ', ' '];
export function getPosPro(snap, vWidth, vHeight) {
    const left1 = { x: -state.navWidth + state.dist, y: 0 };
    const right1 = { x: state.navWidth - (state.dist), y: 0 };
    const up1 = { x: 0, y: (-state.navWidth) - (-state.dist) };
    const down1 = { x: 0, y: state.navWidth - state.dist };
    // const 

    if ((((state.direction ? vWidth : vHeight) - state.navWidth) - (state.dist * 2)) < (state.direction ? state.proPosition.x : state.proPosition.y)) {
        //goes over the right side
        //fix this
        if (!state.prtSwitched) {
            if (state.prtSwitched) {
                state.prtSwitched = true;
                console.log("my left");
                return snap.direction ? left1 : up1
            } else {
                state.prtSwitched = true;
                return snap.direction ? left1 : up1
            }
        } else {
            if (state.prtSwitched) {
                state.prtSwitched = true;
                return snap.direction ? left1 : up1
            } else {
                state.prtSwitched = true;
                return snap.direction ? left1 : up1
            }
        }
    } else if (!state.isPro) {
        return { x: 0, y: 0 }
    } else {
        //is normal
        if (!state.prtSwitched) {
            if (state.prtSwitched) {
                state.prtSwitched = false;
                return snap.direction ? right1 : down1
            } else {
                state.prtSwitched = false;
                return snap.direction ? right1 : down1
            }
        } else {
            if (state.prtSwitched) {
                state.prtSwitched = false;
                return snap.direction ? right1 : down1
            } else {
                state.prtSwitched = false;
                return snap.direction ? right1 : down1
            }
        }
    }
};
export function getPosOpt(snap, vWidth, vHeight) {
    const left1 = { x: -state.navWidth + state.dist, y: 0 };
    const left2 = { x: (state.navWidth * -2) - (state.dist * -2), y: 0 };
    const right1 = { x: state.navWidth - (state.dist), y: 0 };
    const right2 = { x: (state.navWidth * 2) - (state.dist * 2), y: 0 };
    const up1 = { x: 0, y: (-state.navWidth) - (-state.dist) }
    const up2 = { x: 0, y: (state.navWidth * -2) - (state.dist * -2) }
    const down1 = { x: 0, y: state.navWidth - state.dist };
    const down2 = { x: 0, y: (state.navWidth * 2) - (state.dist * 2) };

    //Row
    if (((state.direction ? vWidth : vHeight) - (state.navWidth * 2) - state.dist + 30) < (state.direction ? state.optPosition.x : state.optPosition.y) && state.isOpt) {
        //goes over the right side
        if (state.setSwitched) {
            state.setSwitched = true;
            if (!state.prtSwitched) {
                if (state.isPro) {
                    console.log("1");
                    return snap.direction ? left1 : up1;
                } else {
                    state.setSwitched = true;
                    console.log("2");
                    return snap.direction ? right1 : down1;
                }
            } else {
                if (state.isPro) {
                    console.log("3");
                    return snap.direction ? left2 : up2;
                } else {
                    state.setSwitched = true;
                    console.log("4");
                    return snap.direction ? left1 : up1;
                }
            }
        } else {
            state.setSwitched = true;
            if (!state.prtSwitched) {
                if (state.isPro) {
                    state.setSwitched = true;
                    console.log("5");
                    return snap.direction ? left1 : up1;
                } else {
                    state.setSwitched = true;
                    console.log("6");
                    return snap.direction ? right1 : down1;
                }
            } else {
                if (state.isPro) {
                    console.log("7");
                    return snap.direction ? left2 : up2;
                } else {
                    state.setSwitched = true;
                    console.log("8");
                    return snap.direction ? left1 : up1;
                }
            }
        }
    } else if (!state.isOpt) {
        return { x: 0, y: 0 }
    } else {
        //is normal
        if (state.setSwitched) {
            state.setSwitched = false;
            if (!state.prtSwitched) {
                state.setSwitched = false;
                if (state.isPro) {
                    return snap.direction ? left1 : up1;
                } else {
                    return snap.direction ? left2 : up2;
                }
            } else {
                if (state.isPro) {
                    return snap.direction ? right1 : down1;
                } else {
                    return snap.direction ? right2 : down2;
                }
            }
        } else {
            if (!state.prtSwitched) {
                if (state.isPro) {
                    return snap.direction ? right2 : down2;
                } else {
                    return snap.direction ? right1 : down1;
                }
            } else {
                if (state.isPro) {
                    return snap.direction ? left2 : up2;
                } else {
                    return snap.direction ? left1 : up1;
                }
            }
        }
    }
};

// MOBILE
export const offset = 70;
export function toggleModal(link, modal, setModal, setOffset, open, close) {
    let index;

    if (modal && modal.indexOf(link)) {
        index = modal.indexOf(link);
    }

    if (!modal) {
        // open the modal if its closed
        setModal([link]);
        setOffset('10px');
        open();
    } else if (modal.length === 1) {
        if (index !== -1) {
            // close the only section
            setModal(false);
            setOffset('-80px');
            close();
        } else if (index === -1) {
            // open the section thats not already open
            modal.push(link);
            setOffset('150px');
            open();
        }
    } else if (modal.length === 2) {
        if (index !== -1) {
            // close only the selected section 
            setOffset('10px');
            modal.splice(index, 1);
            close();
        }
    };
};
export function resetPos(setModal, reset, search, navWrap, snap) {
    setModal(false);
    cloud.resetRate = Math.random() * (0.85 - 0.65) + 0.65;
    reset();
    navWrap.current.style.transition = "1.3s";
    if (snap.dragged) {
        state.hideNav = false;
        state.searchPosition = { x: 0, y: 0 };
        state.optionsPosition = { x: 0, y: 0 };
        state.grabberPosition = { x: 0, y: 0 };
        state.mobileNavPosition = { x: 0, y: offset };
    } else {
        state.hideNav = true;
        state.mobileNavPosition = {
            x: 0,
            y: search ? 0 : -offset,
        };
    }
    state.dragged = false;
    setTimeout(() => {
        navWrap.current.style.transition = "0.1s";
        console.log("transition returned");
    }, "1300");
}
export function getGyro(gyro) {
    function requestPermission() {
        DeviceMotionEvent && DeviceMotionEvent.requestPermission().then(response => {
            if (response === 'granted') {
                window.addEventListener('deviceorientation', (event) => {
                    if (window.matchMedia("(orientation: portrait)").matches) {
                        cloud.leftright = Math.floor(event.gamma / 6);
                        cloud.frontback = (Math.floor(event.beta / 8) - 6);
                    }
                    if (window.matchMedia("(orientation: landscape)").matches) {
                        cloud.leftright = Math.floor(event.beta / 6);
                        cloud.frontback = (Math.floor(event.gamma / 8) + 6);
                    }
                });
            } else {
                // console.log("ttrun off");
            }
            // console.log(response);
        });
        // console.log(state.gyro);
    };

    if (gyro) {
        requestPermission();
    } else {
        state.gyro = false;
        return;
    }
};

// MISC.
export function useDocumentTitle(title, prevailOnUnmount = false) {
    const defaultTitle = useRef(document.title);

    useEffect(() => {
        document.title = title;
    }, [title]);

    useEffect(() => () => {
        if (!prevailOnUnmount) {
            document.title = defaultTitle.current;
        }
    }, [prevailOnUnmount])
};

//FIREBASE
const app = initializeApp({
    apiKey: "AIzaSyCEs-MUh6kHufZ5aKwGV1shjq-t85PhYFk",
    authDomain: "nabla7.firebaseapp.com",
    projectId: "nabla7",
    storageBucket: "nabla7.appspot.com",
    messagingSenderId: "22669283456",
    appId: "1:22669283456:web:ebd01b9cc2653ea9e7d665",
    measurementId: "G-FQ3S1GMV92"
});
export const db = getFirestore(app);
export const storage = getStorage(app);
export async function GetWorks() {
    if (navigator.onLine) {
        cloud.UILoading = true;
        const colRef = collection(db, "portfolio");
        const projects = query(colRef, orderBy("projectYear", "desc"), where("projectYear", "!=", null));
        const selfs = query(colRef, orderBy("date", "desc"), where("type", "==", "self"));
        const clients = query(colRef, orderBy("date", "desc"), where("type", "==", "client"));

        const projectsSnapshot = await getDocs(projects);
        const selfsSnapshot = await getDocs(selfs);
        const clientsSnapshot = await getDocs(clients);
        cloud.projects = projectsSnapshot.docs.map(doc => doc.data());
        cloud.selfs = selfsSnapshot.docs.map(doc => doc.data());
        cloud.clients = clientsSnapshot.docs.map(doc => doc.data());

        const projectGroupsRef = query(colRef, orderBy("name", "asc"), where("name", "!=", null))
        const projectGroupsSnapshot = await getDocs(projectGroupsRef);
        cloud.projectGroups = projectGroupsSnapshot.docs.map(doc => doc.data());

        cloud.UILoading = false;
    } else {
        return;
    }

};
export async function GetQuotes() {
    if (navigator.onLine) {
        const siteRef = collection(db, "siteinfo");
        const siteinfoSnapshot = await getDocs(siteRef);
        let quotes = siteinfoSnapshot.docs.map(doc => doc.data())[0].quotes;
        // Randomize Quotes
        const random = Math.floor(Math.random() * quotes.length);
        return quotes[random];
    }
};
export async function newQuote() {
    GetQuotes().then(res => {
        state.quotes = res;
    });
};
export async function GetSectors(id) {
    cloud.UILoading = true;
    const sectorRef = collection(db, "portfolio");
    // TODO: update to look for generated LOT #
    const sectors = query(sectorRef, orderBy("projectYear", "desc"), where("at", "==", `${id}`));
    const sectorSnapshot = await getDocs(sectors);
    cloud.sectors = sectorSnapshot.docs.map(doc => doc.data());
    cloud.UILoading = false;
};
export async function GetStore() {
    cloud.UILoading = true;
    const storeRef = collection(db, "portfolio");
    const items = query(storeRef, orderBy("productName", "desc"), where("productName", '!=', null));
    const storeSnapshot = await getDocs(items);
    state.store = storeSnapshot.docs.map(doc => doc.data());
    cloud.UILoading = false;
};
export async function GetBlog() {
    cloud.UILoading = true;
    const blogRef = collection(db, "blog");
    const blogs = query(blogRef, orderBy("created", "desc"), where("status", "==", "LIVE"));
    const blogSnashot = await getDocs(blogs);
    state.blog = blogSnashot.docs.map(doc => doc.data());
    cloud.UILoading = false;
};

//ALGOLIA SEARCH
export const searchClient = algoliasearch('QYRMFVSZ3U', 'a5bc9e2f6d2b720f636a828233179a8f');
const indexName = 'projects';
export const routing = {
    router: history(),
    stateMapping: {
        stateToRoute(uiState) {
            const indexUiState = uiState[indexName];
            return {
                query: indexUiState.query,
                // categories: indexUiState.menu?.categories,
                // brand: indexUiState.refinementList?.refinementList.brand,
                // page: indexUiState.page,
            };
        },
        routeToState(routeState) {
            return {
                [indexName]: {
                    query: routeState.query,
                    // menu: {
                    //   categories: routeState.categories,
                    // },
                    // refinementList: {
                    //   brand: routeState.brand,
                    // },
                    // page: routeState.page,
                },
            };
        },
    },
};
export const transformItems = (items) => { return items.filter(item => item.images && ({ ...item })); };