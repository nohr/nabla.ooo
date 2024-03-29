import { cloud, state } from "../../../common/state";

// MOBILE
export const offset = 70;
export function resetPos(reset, search, navWrap) {
  cloud.mobileOptions = false;
  cloud.mobileSearch = false;
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
