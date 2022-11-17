//utils.js - global helper functions
import { useRef, useState, useEffect } from "react";
import { state, cloud } from "./state";
import { LoadSong, newQuote } from "./API/firebase.service";

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
    `${cloud.songs[state.songIndex].artist} - ${
      cloud.songs[state.songIndex].name
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
export function closeWheel() {
  state.colorWheel = false;
}
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
export function OpenWheel() {
  state.colorWheel = true;
  state.isOpt = false;
  state.isPro = false;
}
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
}
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

//PANEL
let taps = 0;
let factor = 4;
export function handleClick(clip, query, dong, clear, nabla, svg) {
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
    if (query.length > 0) {
      clear();
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
    transition:  ${
      (Math.random() * (0.45 - 0.15) + 0.15).toFixed(2) * 0.3
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
    transition:  ${
      (Math.random() * (0.45 - 0.15) + 0.15).toFixed(2) * 0.3
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
    transition: ${
      (Math.random() * (0.45 - 0.15) + 0.15).toFixed(2) * 0.3
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
    transition:   ${
      (Math.random() * (0.45 - 0.15) + 0.15).toFixed(2) * 0.3
    }s !important;
        `
    );
  if (cloud.talking) {
    setTimeout(() => unActiveTap(nabla, svg), cloud.playRate * 500);
  }
}
export const characters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  ".",
  "!",
  "?",
  " ",
  " ",
  " ",
  " ",
  " ",
];
export function getPosPro(snap, vWidth, vHeight) {
  const left1 = { x: -state.navWidth + state.dist, y: 0 };
  const right1 = { x: state.navWidth - state.dist, y: 0 };
  const up1 = { x: 0, y: -state.navWidth - -state.dist };
  const down1 = { x: 0, y: state.navWidth - state.dist };
  // const

  if (
    (state.direction ? vWidth : vHeight) - state.navWidth - state.dist * 2 <
    (state.direction ? state.proPosition.x : state.proPosition.y)
  ) {
    //goes over the right side
    //fix this
    if (!state.proSwitched) {
      if (state.proSwitched) {
        state.proSwitched = true;
        console.log("my left");
        return snap.direction ? left1 : up1;
      } else {
        state.proSwitched = true;
        return snap.direction ? left1 : up1;
      }
    } else {
      if (state.proSwitched) {
        state.proSwitched = true;
        return snap.direction ? left1 : up1;
      } else {
        state.proSwitched = true;
        return snap.direction ? left1 : up1;
      }
    }
  } else if (!state.isPro) {
    return { x: 0, y: 0 };
  } else {
    //is normal
    if (!state.proSwitched) {
      if (state.proSwitched) {
        state.proSwitched = false;
        return snap.direction ? right1 : down1;
      } else {
        state.proSwitched = false;
        return snap.direction ? right1 : down1;
      }
    } else {
      if (state.proSwitched) {
        state.proSwitched = false;
        return snap.direction ? right1 : down1;
      } else {
        state.proSwitched = false;
        return snap.direction ? right1 : down1;
      }
    }
  }
}
export function getPosOpt(snap, vWidth, vHeight) {
  const left1 = { x: -state.navWidth + state.dist, y: 0 };
  const left2 = { x: state.navWidth * -2 - state.dist * -2, y: 0 };
  const right1 = { x: state.navWidth - state.dist, y: 0 };
  const right2 = { x: state.navWidth * 2 - state.dist * 2, y: 0 };
  const up1 = { x: 0, y: -state.navWidth - -state.dist };
  const up2 = { x: 0, y: state.navWidth * -2 - state.dist * -2 };
  const down1 = { x: 0, y: state.navWidth - state.dist };
  const down2 = { x: 0, y: state.navWidth * 2 - state.dist * 2 };

  //Row
  if (
    (state.direction ? vWidth : vHeight) -
      state.navWidth * 2 -
      state.dist +
      30 <
      (state.direction ? state.optPosition.x : state.optPosition.y) &&
    state.isOpt
  ) {
    //goes over the right side
    if (state.setSwitched) {
      state.setSwitched = true;
      if (!state.proSwitched) {
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
      if (!state.proSwitched) {
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
    return { x: 0, y: 0 };
  } else {
    //is normal
    if (state.setSwitched) {
      state.setSwitched = false;
      if (!state.proSwitched) {
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
      if (!state.proSwitched) {
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
}
export function styleHeaders(headwidth, level, type, enter) {
  if (enter) {
    if (level === 1) {
      // document.getElementById(type).style.width = headwidth.first.max;
      document.getElementById(type).style.boxShadow = `0 30px 50px ${
        state.theme === "light" ? state.light.LiHover : state.dark.LiHover
      }`;
    } else if (level === 2) {
      // document.getElementById(type).style.width = !(state.isOpt && state.isPro) ? headwidth.second.max : "115%";
      document.getElementById(type).style.boxShadow = `0 30px 50px ${
        state.theme === "light" ? state.light.LiHover : state.dark.LiHover
      }`;
    }
  } else if (!enter) {
    if (level === 1) {
      // document.getElementById(type).style.width = !(state.isOpt && state.isPro) ? headwidth.first.min : !state.direction ? headwidth.first.min : '100%';
      document.getElementById(type).style.boxShadow = `none`;
    } else if (level === 2) {
      // document.getElementById(type).style.width = !(state.isOpt && state.isPro) ? headwidth.second.min : !state.direction ? headwidth.second.min : '123%';
      document.getElementById(type).style.boxShadow = `none`;
    }
  }
}
export function styleHeader(headwidth, level, type, enter) {
  if (enter) {
    if (level === 1) {
      // document.getElementById(type).style.width = headwidth.first.max;
      type.current.style.boxShadow = `0 30px 50px ${
        state.theme === "light" ? state.light.LiHover : state.dark.LiHover
      }`;
    } else if (level === 2) {
      // document.getElementById(type).style.width = !(state.isOpt && state.isPro) ? headwidth.second.max : "115%";
      type.current.style.boxShadow = `0 30px 50px ${
        state.theme === "light" ? state.light.LiHover : state.dark.LiHover
      }`;
    }
  } else if (!enter) {
    if (level === 1) {
      // document.getElementById(type).style.width = !(state.isOpt && state.isPro) ? headwidth.first.min : !state.direction ? headwidth.first.min : '100%';
      type.current.style.boxShadow = `none`;
    } else if (level === 2) {
      // document.getElementById(type).style.width = !(state.isOpt && state.isPro) ? headwidth.second.min : !state.direction ? headwidth.second.min : '123%';
      type.current.style.boxShadow = `none`;
    }
  }
}
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
    setOffset("10px");
    open();
  } else if (modal.length === 1) {
    if (index !== -1) {
      // close the only section
      setModal(false);
      setOffset("-80px");
      close();
    } else if (index === -1) {
      // open the section thats not already open
      modal.push(link);
      setOffset("150px");
      open();
    }
  } else if (modal.length === 2) {
    if (index !== -1) {
      // close only the selected section
      setOffset("10px");
      modal.splice(index, 1);
      close();
    }
  }
}
export function resetPos(setModal, reset, search, navWrap) {
  setModal(false);
  cloud.resetRate = Math.random() * (0.85 - 0.65) + 0.65;
  reset();
  navWrap.current.style.transition = "1.3s";
  state.hideNav = false;
  state.searchPosition = { x: 0, y: 0 };
  state.optionsPosition = { x: 0, y: 0 };
  state.grabberPosition = { x: 0, y: 0 };
  state.mobileNavPosition = { x: 0, y: -offset * 9 };
  state.hideNav = true;
  state.mobileNavPosition = {
    x: 0,
    y: search ? 0 : -offset,
  };
  state.dragged = false;
  setTimeout(() => {
    navWrap.current.style.transition = "0.1s";
    console.log("transition returned");
  }, "1300");
}
export function getGyro() {
  function requestPermission() {
    cloud.mobile &&
      DeviceMotionEvent.requestPermission().then((response) => {
        if (response === "granted") {
          window.addEventListener("deviceorientation", (event) => {
            if (window.matchMedia("(orientation: portrait)").matches) {
              cloud.leftright = Math.floor(event.gamma / 4);
              cloud.frontback = Math.floor(event.beta / 4);
            }
            if (window.matchMedia("(orientation: landscape)").matches) {
              cloud.leftright = Math.floor(event.beta / 4);
              cloud.frontback = Math.floor(event.gamma / 4);
            }
          });
        } else {
          // console.log("ttrun off");
        }
        // console.log(response);
      });
    // console.log(state.gyro);
  }

  // if (gyro) {
  requestPermission();
  // } else {
  //     state.gyro = false;
  //     return;
  // }
}

// MISC.
export function useDocumentTitle(title, prevailOnUnmount = false) {
  const defaultTitle = useRef(document.title);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(
    () => () => {
      if (!prevailOnUnmount) {
        document.title = defaultTitle.current;
      }
    },
    [prevailOnUnmount]
  );
}

export const transformItems = (items) => {
  return items.filter((item) => item.images && { ...item });
};
