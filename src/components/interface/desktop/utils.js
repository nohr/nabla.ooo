import { auth, signInWithGoogle } from "../../../common/api/firebase";
import { cloud, state } from "../../../common/state";

// Nav
// PANELS
export function togglePanel(panel) {
  if (panel === "projects") {
    state.isPro = !state.isPro;
  }
  if (panel === "options") {
    state.isOpt = !state.isOpt;
  }
}

// Search
export function handleChange(e, clip, setSearchText, setChatText) {
  if (!state.colorWheel) {
    if (!clip.chatMode) {
      setSearchText(e.target.value);
      cloud.query = e.target.value;
      if (!clip.mobile) state.isPro = true;
    } else {
      setChatText(e.target.value);
    }
  }
}
export function handleChat(chatText, setLocation, setChatText, admin, user) {
  if (chatText.includes("excuse me")) {
    setLocation("/editor");
    setChatText("");
    admin();
    !user && signInWithGoogle();
    cloud.chatMode = false;
  } else if (chatText.includes("all set")) {
    auth.signOut()
    setLocation("/");
    setChatText("");
    admin();
    cloud.chatMode = false;
  }
}
export function handleKeyPress(e, setSearchText, Bar, setPlaceholder, setChatText, clip, chatText, setLocation, admin, user) {
  if (!clip.mobile) {
    // esc to clear search and blur input
    if (e.key === "Escape") {
      setSearchText("");
      setChatText("");
      Bar.current.blur();
      setPlaceholder("(alt + z)");
      return;
    }
    // Do nothing when these are pressed
    if (!clip.chatMode) {
      if (
        e.key === "Enter" ||
        e.key === "Shift" ||
        e.key === "CapsLock" ||
        e.key === "ArrowUp" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowDown" ||
        e.key === "ArrowRight" ||
        e.key === "Alt"
      ) {
        return;
      } else if (e.key === "Tab") {
        cloud.chatMode = true;
      }
    } else if (clip.chatMode) {
      if (e.key === "Enter") {
        handleChat(chatText, setLocation, setChatText, admin, user);
        Bar.current.blur();
      } else if (e.key === "Tab") {
        e.preventDefault();
        cloud.chatMode = false;
        return;
      }
    } else return;
  } else if (clip.mobile) {
    if (e.key === "Enter") {
      Bar.current.blur();
      cloud.mobileOptions = false;
      cloud.mobileSearch = false;
    }
    return;
  }
}
export function handleCommandPress(e, keys, Bar, setPlaceholder) {
  // Alt + f to focus search
  let { keyCode, type } = e || Event;
  const isKeyDown = type === "keydown";
  keys[keyCode] = isKeyDown;
  if (isKeyDown && e.altKey === true && keys[90]) {
    e.preventDefault();
    keys = {};
    Bar.current.focus();
    setPlaceholder("(esc)");
  } else {
    return;
  }
}
export function handleClick(Bar, setPlaceholder) {
  if (Bar.current === document.activeElement) {
    setPlaceholder("(esc)");
    return;
  } else {
    setPlaceholder("(alt + z)");
    return;
  }
}

// Options
export function openWheel() {
  state.colorWheel = true;
  state.isOpt = false;
  state.isPro = false;
}
export function closeWheel() {
  state.colorWheel = false;
}
//Toggles Panel Direction
export function toggleDirection(snap) {
  if (snap.direction) {
    //Row Direction
    state.direction = false;
  } else if (!snap.direction) {
    //Column Direction
    state.direction = true;
  }
}
// Toggle Canvas Visibility
export function toggleCanvas(snap) {
  let canvas;
  canvas = document.getElementsByTagName("canvas")[0];

  if (canvas) {
    if (!snap.canvasVisible) {
      //Show Canvas
      state.canvasVisible = true;
      canvas.style.display = "block";
    } else if (snap.canvasVisible) {
      //Hide Canvas
      state.canvasVisible = false;
      canvas.style.display = "none";
    }
  }
}

export function styleHeaders(headwidth, level, type, enter) {
  if (enter) {
    if (level === 1) {
      // document.getElementById(type).style.width = headwidth.first.max;
      document.getElementById(type).style.boxShadow = `0 30px 50px ${state.theme === "light" ? state.light.LiHover : state.dark.LiHover
        }`;
    } else if (level === 2) {
      // document.getElementById(type).style.width = !(state.isOpt && state.isPro) ? headwidth.second.max : "115%";
      document.getElementById(type).style.boxShadow = `0 30px 50px ${state.theme === "light" ? state.light.LiHover : state.dark.LiHover
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

// PROJECTS
export function useLayout(snap) {
  return snap.direction
    ? !snap.proSwitched
      ? `padding-left: 45px;padding-right: 40px; flex-direction: column; white-space: wrap;`
      : `padding-left: 40px;padding-right: 45px; flex-direction: column; white-space: wrap;`
    : `padding: 80px 12px 0px; flex-direction: row;`;
}
export const projectListLayout =
  "display: flex !important; flex-direction: column; align-items: flex-end; justify-content: center; overflow: scroll;";

export function useTop(snap) {
  return snap.direction
    ? "padding-top: 10px;"
    : snap.proSwitched
      ? "padding-top: 50px !important;"
      : "padding-top: 80px;";
}
export function useHeader(snap) {
  return snap.direction
    ? { width: "100%" }
    : {
      width: "64%",
      gridColumnStart: 2,
      gridColumnEnd: 2,
      gridRowStart: 1,
      gridRowEnd: 1,
    };
}
export function useHide(snap) {

  return snap.isPro
    ? "opacity: 1; pointer-events: all; transition: 0.2s; "
    : "opacity: 0; pointer-events: none; transition: 0s;";
}
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