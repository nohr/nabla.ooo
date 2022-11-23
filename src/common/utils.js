//utils.js - global helper functions
import { useState, useEffect } from "react";
import { state, cloud } from "./state";
import { LoadSong, newQuote } from "./api/firebase.service";

// CANVAS
export const target = [0, 6, 3];

//AUDIO
export function ToggleMusic(current, setSong) {
  let audio = current.current;
  if (!cloud.songs[state.songIndex].url) {
    LoadSong(current, cloud.songs[state.songIndex]);
  } else {
    if (cloud.playMusic === false) {
      cloud.playMusic = true;
      audio.play();
    } else if (cloud.playMusic === true) {
      cloud.playMusic = false;
      audio.pause();
    }
  }
  audio.onended = () => NextSong(current, setSong);
}
export function NextSong(current, setSong) {
  function next() {
    let audio = current.current;

    cloud.playMusic = false;
    audio.pause();
    console.log(state.songIndex);

    if (state.songIndex < cloud.songs.length - 1) {
      state.songIndex += 1;
    } else {
      state.songIndex = 0;
    }
    if (!cloud.songs[state.songIndex].url) {
      LoadSong(current, cloud.songs[state.songIndex]);
    } else {
      audio.setAttribute("src", cloud.songs[state.songIndex].url);
      audio.play();
    }
  }
  next();
  setSong(
    `${cloud.songs[state.songIndex].artist} - ${cloud.songs[state.songIndex].name
    }`
  );
  current.current.onEnded = () => next();
}

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
    string = `hsl(0, 0%, 0%)`;
    darkString = `hsl(0, 100%, 100%)`;
    stringAlpha = `hsla(0, 100%, 0%, 0.67)`;
    darkStringAlpha = `hsla(0, 100%, 100%, 0.45)`;
    surface = `#fafafa`;
    darkSurface = `#7a7a7a`;
    cd = `hsla(0, 100%, 100%, 1)`;
  } else {
    string = `hsl(${color}, 100%, 20%)`;
    darkString = `hsl(${color}, 41%, 74%)`;
    stringAlpha = `hsla(${color}, 100%, 20%, 0.67)`;
    darkStringAlpha = `hsla(${color}, 51%, 64%, 0.67)`;
    surface = `hsla(${color}, 100%, 80%, 1)`;
    darkSurface = `hsla(${color}, 15%, 40%, 1)`;
    cd = `hsla(${color}, 31%, 84%, 1)`;
  }

  if (state.theme === "light") {
    state.light.panelColor = string;
    state.light.placeholder = string;
    state.light.LiHover = stringAlpha;
    state.light.CD = cd;
    state.light.Surface = surface;
    state.light.spotlight = fogLight;
  } else if (state.theme === "dark") {
    state.dark.panelColor = darkString;
    state.dark.placeholder = darkString;
    state.dark.LiHover = darkStringAlpha;
    state.dark.Surface = darkSurface;
    state.dark.spotlight = darkString;
  }
}
export const originalColors = {
  light: {
    panelColor: "hsl(209, 100%, 20%)",
    LiHover: "hsla(209, 100%, 20%, 0.67)",
    CD: "hsla(14, 31%, 84%, 1)",
    Surface: "hsla(209, 100%, 80%, 1)",
    spotlight: "#ffffff",
  },
  dark: {
    panelColor: "hsl(209, 31%, 80%)",
    LiHover: "hsla(209, 31%, 80%, 0.67)",
    Surface: "hsla(209, 15%, 40%, 1)",
    spotlight: "hsla(209, 31%, 70%, 1)",
  },
};
export function resetWheel() {
  state.colorWheel = false;
  state.monochrome = false;
  state.hue = 209;
  if (state.theme === "light") {
    state.light.panelColor = originalColors.light.panelColor;
    state.light.placeholder = originalColors.light.panelColor;
    state.light.LiHover = originalColors.light.LiHover;
    state.light.CD = originalColors.light.CD;
    state.light.Surface = originalColors.light.Surface;
    state.light.spotlight = originalColors.light.spotlight;
  } else if (state.theme === "dark") {
    state.dark.panelColor = originalColors.dark.panelColor;
    state.dark.placeholder = originalColors.dark.panelColor;
    state.dark.LiHover = originalColors.dark.Surface;
    state.dark.Surface = originalColors.dark.Surface;
    state.dark.spotlight = originalColors.dark.spotlight;
  }
  state.colorChanged = false;
}
export const toggleTheme = () => {
  state.themeChanged = true;
  if (state.monochrome) {
    toHslString(state.hue);
  }
  if (state.theme === "dark") {
    document.getElementById("theme-color").setAttribute("media", "");
    document
      .getElementById("theme-color")
      .setAttribute("content", state.light.sky);
    state.theme = "light";
  } else {
    document.getElementById("theme-color").setAttribute("media", "");
    document
      .getElementById("theme-color")
      .setAttribute("content", state.dark.sky);
    state.theme = "dark";
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
}

//HOME
let taps = 0;
let factor = 4;
export function handleClick(clip, dong, nabla, svg) {
  function getRandom(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  const amount = getRandom(6, 4);
  const speed = getRandom(250, 85);
  const time = getRandom(2000, 1000);
  const required = getRandom(2000, 1500);
  if (!clip.talking) {
    cloud.playRate = (Math.random() * (0.45 - 0.15) + 0.15).toFixed(2);
    cloud.selected = false;
    if (clip.query.length > 0) {
      cloud.query = '';
    }
    dong();
    taps += 1;
    setTimeout(() => {
      //  CD SPEECH
      if (taps >= amount && taps <= amount + 4) {
        // debugger;
        state.colorChanged = true;
        cloud.talking = true;
        cloud.skew = !clip.skew;
        if (clip.mobile) cloud.chatMode = !clip.chatMode;
        // TODO: Trigger smile animation
        // TODO: lengthen speech to amount of words spoken
        newQuote();
        const color = setInterval(() => {
          state.hue += factor;
        }, 300);
        setTimeout(() => {
          clearInterval(color);
        }, 400);
        const loop = setInterval(() => {
          // toggleTheme();
          // document.getElementById("theme-color").style.transition = cloud.playRate * 500;
          state.hue + getRandom(50, 10) < 360
            ? (state.hue += getRandom(50, 10))
            : (state.hue = 0);
          cloud.playRate = (Math.random() * (1.0 - 0.65) + 0.65).toFixed(2);
          dong();
          activeTap(nabla, svg);
        }, speed);
        setTimeout(() => {
          clearInterval(loop);
          cloud.talking = false;
          cloud.UILoading = false;
        }, time);
        console.log(taps, amount, speed, time, state.hue);
      }
      taps = 0;
    }, required);
  }
}
export function unActiveTap(nabla, svg) {
  // if (cloud.target !== target || cloud.mobileCameraPosition !== [0, 20, 25])
  // || cloud.selected) ||
  // cloud.mobileCameraRotation !== [0, 0, 0] ||
  // // cloud.mobileCameraQuaternion !== [0, 0, 0] ||
  // {
  // cloud.target = target;
  // cloud.mobileCameraPosition = [0, 20, 25];
  // cloud.mobileCameraRotation = [0, 0, 0];
  // cloud.mobileCameraQuaternion = [0, 0, 0];
  // cloud.selected = false;
  // }
  nabla.current &&
    nabla.current.setAttribute(
      "style",
      `
        background-color: transparent !important;
    -webkit-box-shadow: none !important;
    -moz-box-shadow: none !important;
    box-shadow: none !important;
    transition:  ${(Math.random() * (0.45 - 0.15) + 0.15).toFixed(2) * 0.3
      }s !important;
    `
    );
  svg.current.style.fill = `${(props) => props.theme.panelColor}`;
  svg.current &&
    svg.current.setAttribute(
      "style",
      `
    -webkit-filter: none !important;
    filter: none !important;
    transition:  ${(Math.random() * (0.45 - 0.15) + 0.15).toFixed(2) * 0.3
      }s !important;
        `
    );
}
export function activeTap(nabla, svg) {
  nabla.current &&
    nabla.current.setAttribute(
      "style",
      `
        background-color: ${(props) => props.theme.LiHover} !important;
        border-color: ${(props) => props.theme.LiHover} !important;
    -webkit-box-shadow: 0px 3px 10px 1px ${(props) =>
        props.theme.LiHover}  !important;
    -moz-box-shadow: 0px 3px 10px 1px ${(props) =>
        props.theme.LiHover}  !important;
    box-shadow: 0px 3px 10px 1px ${(props) => props.theme.LiHover}  !important;
    transition: ${(Math.random() * (0.45 - 0.15) + 0.15).toFixed(2) * 0.3
      }s !important;
    `
    );

  svg.current &&
    svg.current.setAttribute(
      "style",
      `
    fill: #ebebeb;
    -webkit-filter: drop-shadow(1px 1px 3px ${(props) =>
        props.theme.textHover}) !important;
    filter: drop-shadow(1px 1px 3px ${(props) =>
        props.theme.textHover}) !important;
    transition:   ${(Math.random() * (0.45 - 0.15) + 0.15).toFixed(2) * 0.3
      }s !important;
        `
    );
  if (cloud.talking) {
    setTimeout(() => unActiveTap(nabla, svg), cloud.playRate * 500);
  }
}

// MISC.
export function Theme() {
  // Theme to prefrence and listen for changes if no cache
  if (state.cached) {
    document.getElementById("theme-color").setAttribute("media", "");
    document
      .getElementById("theme-color")
      .setAttribute(
        "content",
        state.theme === "light" ? state.light.sky : state.dark.sky
      );
  } else {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.getElementById("theme-color").setAttribute("media", "");
      document
        .getElementById("theme-color")
        .setAttribute("content", state.dark.sky);
      state.theme = "dark";
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches
    ) {
      document.getElementById("theme-color").setAttribute("media", "");
      document
        .getElementById("theme-color")
        .setAttribute("content", state.light.sky);
      state.theme = "light";
    }
  }

  // Themelistener
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      document
        .getElementById("theme-color")
        .setAttribute("content", !e.matches ? state.light.sky : state.dark.sky);
      return e.matches ? (state.theme = "dark") : (state.theme = "light");
    });
}

// search through the items and return the ones that match the search term in all fields
export const searchItems = (items, searchTerm) => {
  if (searchTerm === "") {
    return items;
  }

  return items.filter((item) => {
    const values = Object.values(item).join("").toLowerCase();
    return values.indexOf(searchTerm.toLowerCase()) > -1;
  });
};
