// GLOBAL STYLING
import styled, { createGlobalStyle } from "styled-components";

export const Folder = styled.div`
  width: 100%;
  margin: 3px 0;
  padding: 2px 0;
  display: block;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-color: ${(props) => props.theme.panelColor};
  ${(props) => props.border};
  /* backdrop-filter: blur(20px) !important; */

  &:hover > .ShowHideIcon {
    fill: ${(props) => props.theme.textHover} !important;
  }

  &.trayIcon {
    border-radius: 50% !important;
    justify-content: center;
    width: 20px !important;
    height: 20px !important;

    &:hover > svg {
      fill: ${(props) => props.theme.textHover} !important;
    }
    svg {
      overflow: visible;
      height: 12px !important;
      width: 12px !important;
    }
  }

  &.mono {
    width: 60% !important;
    grid-area: 3/ 1 / span 1 / span 2;
    text-align: center;
    color: ${(props) => props.theme.bwElement};
    border: 1px solid ${(props) => props.theme.bwElement};
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
  }

  &.resetPos {
    pointer-events: all;
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
    /* border: 1px solid ${(props) => props.theme.panelColor}; */
    border-radius: 50%;
    justify-content: center;
    display: flex;
    height: 50px;
    width: 50px;
    flex-direction: column;
    /* padding: 2px; */

    & svg {
      stroke: ${(props) => props.theme.panelColor};
      width: 28px !important;
      stroke-width: 3px;
    }
  }

  &.circleButton {
    border-radius: 50% !important;
    width: 50px !important;
    height: 50px !important;
    display: flex !important;
    justify-content: center !important;
  }

  &.color {
    border-color: #ebebeb !important;
    fill: ${(props) => props.theme.LiHover};
    background-color: ${(props) => props.theme.LiHover};
    -webkit-filter: drop-shadow(1px 1px 6px ${(props) => props.theme.LiHover});
    filter: drop-shadow(1px 1px 6px ${(props) => props.theme.LiHover});
    text-align: center;

    & svg {
      animation: flashConfirm 1s steps(5, start) infinite;
      animation-delay: 3s;
      -webkit-filter: none;
      filter: none;
      fill: #ebebeb;
    }
    transition: 0s;
    outline: 0px;
  }
  &.reset {
    border-color: #ebebeb !important;
    color: #ebebeb;
    background-color: ${(props) => props.theme.LiActiveBackground};
    -webkit-filter: drop-shadow(
      1px 1px 6px ${(props) => props.theme.LiActiveBackground}
    );
    filter: drop-shadow(
      1px 1px 6px ${(props) => props.theme.LiActiveBackground}
    );
    text-align: center;
    transition: 0.3s;
  }

  .light,
  .dark {
    stroke-width: 1px !important;
  }
  .nextIcon,
  .muteIcon,
  .ShowHideIcon,
  .ColorIcon {
    fill: ${(props) => props.theme.panelColor} !important;
    overflow: visible;
  }
  /* .modeIcon{
    stroke-width: 1px !important;
  } */
  .ConfirmIcon,
  .ResetIcon {
    height: 80%;
  }
  .ResetIcon {
    fill: #ebebeb;
  }

  .PlayPauseIcon {
    fill: ${(props) => props.theme.panelColor} !important;
    overflow: visible;
  }
  .DirectionIcon {
    /* stroke: transparent !important; */
    fill: ${(props) => props.theme.panelColor} !important;
    stroke-width: 1px !important;
    overflow: visible;
  }

  &.songinfo {
    cursor: text;
    user-select: text !important;
    -ms-user-select: text !important;
    -moz-user-select: text !important;
    -webkit-user-select: text !important;
    border-radius: 10px !important;
    background: inherit !important;
    padding: 3px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin: 0 0 4px 15px !important;
    width: 100% !important;
    height: 50px !important;

    & textarea {
      padding: 0 !important;
      border: none !important;
      background-color: transparent !important;
      width: 95% !important;
      height: inherit;
      /* height: fit-content !important; */
      resize: none;
      color: ${(props) => props.theme.panelColor} !important;
      ::-webkit-scrollbar {
        display: none !important;
      }
      &:active {
        border: 1px solid ${(props) => props.theme.panelColor} !important;
      }
    }
    &:hover {
      background-color: ${(props) => props.theme.layerBG} !important;
      box-shadow: inherit !important;
      color: inherit !important;
    }
  }
`;
export const Song = styled.p`
  position: absolute;
  top: 6px;
  /* margin: 0 auto; */
  ${(props) => props.position}
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
      color: ${(props) => props.theme.panelColor};
    }

    70% {
      color: ${(props) => props.theme.sky};
      -webkit-filter: drop-shadow(1px 1px 6px ${(props) => props.theme.sky});
      filter: drop-shadow(1px 1px 6px ${(props) => props.theme.sky});
    }

    100% {
      color: ${(props) => props.theme.panelColor};
    }
  }
`;
export const Wheel = styled.div`
  @media only screen and (max-width: 768px) {
    & {
      backdrop-filter: blur(20px) !important;
    }
  }
  bottom: unset !important;
  position: absolute;
  z-index: 4900;
  left: 0;
  transition: 0.9s !important;
  opacity: ${(props) => props.opacity};
  pointer-events: ${(props) => props.pointerEvents} !important;
  transition: ${(props) => props.transition};
  &* {
    border-width: 0px !important;
  }
`;
export const GlobalStyle = createGlobalStyle`
    //App
    :root{
        --theme: ${(props) => props.theme.sky};
        --panelWidth: 270px;
        --panelHeight: 270px;
        --panelPadding: 6px 42.5px;
        --headOffset: 10px;
        --edge: 20px;
        --blur: 7px;
        --transition:0.1s;
    }
    html, body, #root {
        /* isolation: isolate; */
        background-color: ${(props) => props.theme.sky};
    }

    *::selection{
      color:  ${(props) => props.theme.textHover};
      background-color:  ${(props) => props.theme.LiHover};
    }
    *{
      /* filter:contrast(1.1) ; */
      animation-delay: 0s;
::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 5px;
    display: flex;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.panelColor};
    border-radius: 4px;
    /* transition: 0.3s; */
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: ${(props) => props.theme.panelColor};
    box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
    -webkit-box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
    -moz-box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
    /* transition: 0.3s; */
  }
    }

          .gugmu9vdpaw div {
        box-shadow: 0 1.8px 0 0 ${(props) => props.theme.panelColor} !important;
      }

      .gugmu9vdpaw p {
        font-size: 64px;
        font-weight: 800;
        color: ${(props) => props.theme.panelColor} !important;
        text-shadow: 0 1px 1 1 ${(props) => props.theme.panelColor} !important;

      }
      // LOGO
      .nablaWrapper{
         height: 70px;
  width: 130px;
  display: flex;
  justify-content: center;
  /* margin: 10px 0 0px 0; */
  backdrop-filter: blur(20px) !important;
  padding-top: 5px;
  padding-bottom: 3px;
  border-radius: 75% 75% 50px 50px;
  border: 1px solid ${(props) => props.theme.panelColor};
  overflow: visible;
  background-color: transparent !important;
  -webkit-box-shadow: none !important;
  -moz-box-shadow: none !important;
  box-shadow: none !important;
  user-select:none ;
  -ms-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -webkit-user-drag: none;
    transition: 0.1s;

  & svg{
    ${(props) => props.fill}
    align-self:center;
    fill: ${(props) => props.theme.panelColor};
    color: ${(props) => props.theme.panelColor};
    pointer-events: none;
  }

  &:hover{
    background-color: ${(props) => props.theme.LiHover} !important;
    -webkit-box-shadow: 0px 3px 10px 1px ${(props) =>
      props.theme.LiHover}  !important;
    -moz-box-shadow: 0px 3px 10px 1px ${(props) =>
      props.theme.LiHover}  !important;
    box-shadow: 0px 3px 10px 1px ${(props) => props.theme.LiHover}  !important;
    transition: 0.6s;
  }

  @media only screen and (min-width: 768px) {
    /* &:hover {
    background-color: ${(props) => props.theme.LiHover} !important;
    -webkit-box-shadow: 0px 3px 10px 1px ${(props) =>
      props.theme.LiHover}  !important;
    -moz-box-shadow: 0px 3px 10px 1px ${(props) =>
      props.theme.LiHover}  !important;
    box-shadow: 0px 3px 10px 1px ${(props) => props.theme.LiHover}  !important;
    transition: 0.6s;
  } */
      &:hover > svg{
    fill: ${(props) => props.theme.textHover};
    -webkit-filter: drop-shadow(1px 1px 3px ${(props) =>
      props.theme.textHover});
    filter: drop-shadow(1px 1px 3px ${(props) => props.theme.textHover});
    transition: 1.0s;
  }
}
      }

    //Panel
    .Panel {
      background-color: #00000000;
      width: var(--panelWidth);
      height: var(--panelHeight);
      scroll-snap-type: none;
        backdrop-filter: blur(20px) !important;
      /* backdrop-filter: blur(var(--blur)); */
      /* -webkit-backdrop-filter: blur(var(--blur)); */
      border: 1px solid ${(props) => props.theme.panelColor};
      color: ${(props) => props.theme.panelColor};
      border-radius: 185px;
      overflow: hidden;
        /* backdrop-filter: blur(10px) !important; */
      & *{

        -webkit-user-drag: none;
      }
      & .li{
        border-radius: 250px 250px 500px 500px;
      }
    }

    .glow{
        & *{
            opacity: 0;
        }
      fill: ${(props) => props.theme.LiHover} !important;
      background-color: ${(props) => props.theme.LiHover} !important;
      /* color: ${(props) => props.theme.bwElement} !important; */
      /* mix-blend-mode: ${(props) => props.theme.blend}; */
      box-shadow: 0 8px 32px 0 ${(props) => props.theme.LiHover};
      -webkit-box-shadow:  0 8px 32px 0 ${(props) => props.theme.LiHover};
      -moz-box-shadow:  0 8px 32px 0 ${(props) => props.theme.LiHover};
      /* transition: 1s; */
      /* animation: pulseItem 2s infinite; */
    }

// animation keyframes
    @keyframes pulseItem {
	0% {
		text-shadow: 1px 1px 10px ${(props) => props.theme.LiHover};
      box-shadow: 0 8px 32px 0 ${(props) => props.theme.panelColor};
      -webkit-box-shadow:  0 8px 32px 0 ${(props) => props.theme.panelColor};
      -moz-box-shadow:  0 8px 32px 0 ${(props) => props.theme.panelColor};
	}

	50% {
		text-shadow: 1px 1px 30px ${(props) => props.theme.LiHover};
      box-shadow: 0 8px 12px 0 ${(props) => props.theme.panelColor};
      -webkit-box-shadow:  0 8px 12px 0 ${(props) => props.theme.panelColor};
      -moz-box-shadow:  0 8px 12px 0 ${(props) => props.theme.panelColor};
	}

	100% {
		text-shadow: 1px 1px 10px ${(props) => props.theme.LiHover};
      box-shadow: 0 8px 32px 0 ${(props) => props.theme.panelColor};
      -webkit-box-shadow:  0 8px 32px 0 ${(props) => props.theme.panelColor};
      -moz-box-shadow:  0 8px 32px 0 ${(props) => props.theme.panelColor};
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
  background-color: ${(props) => props.theme.LiActiveBackground};
  color:  ${(props) => props.theme.textHover};
  -webkit-box-shadow: 0px 2px 10px 1px  ${(props) =>
    props.theme.LiActiveBackground};
  -moz-box-shadow: 0px 2px 10px 1px  ${(props) =>
    props.theme.LiActiveBackground};
  box-shadow: 0px 2px 10px 1px  ${(props) => props.theme.LiActiveBackground};
  text-shadow: 1px 1px 3px  ${(props) => props.theme.textHover};
  /* font-style: italic; */
}
    .li{
      border-radius: 12px;
    }
    .li, .folder {
        color: ${(props) => props.theme.panelColor};
        transition: 0.9s;
    }
    .folderActive {
      box-shadow: 0 0 0 1px  ${(props) => props.theme.panelColor} !important;
      -webkit-box-shadow: 0 0 0 1px  ${(props) =>
        props.theme.panelColor} !important;
      -moz-box-shadow: 0 0 0 1px  ${(props) =>
        props.theme.panelColor} !important;
      color:  ${(props) => props.theme.panelColor} !important;
      font-style: italic !important;
    }
    .folderActive:hover{
      box-shadow: 0 0 0 1px  ${(props) => props.theme.panelColor} !important;
      -webkit-box-shadow: 0 0 0 1px  ${(props) =>
        props.theme.panelColor} !important;
      /* border: 1px solid ${(props) => props.theme.LiHover} ; */
    }
    .folderActive:after{
      border-radius: 5px !important;
    }
      .active:not(.nablaWrapper){
        border-color: #ebebeb;
  background-color: ${(props) => props.theme.LiActiveBackground};
  color:  ${(props) => props.theme.textHover};
  -webkit-box-shadow: 0px 2px 10px 1px  ${(props) =>
    props.theme.LiActiveBackground};
  -moz-box-shadow: 0px 2px 10px 1px  ${(props) =>
    props.theme.LiActiveBackground};
  box-shadow: 0px 2px 10px 1px  ${(props) => props.theme.LiActiveBackground};
  text-shadow: 1px 1px 3px  ${(props) => props.theme.textHover};
  /* font-style: italic; */

   & svg{
    fill: ${(props) => props.theme.textHover};
    -webkit-filter: drop-shadow(1px 1px 3px ${(props) =>
      props.theme.textHover});
    filter: drop-shadow(1px 1px 3px ${(props) => props.theme.textHover});  
  }
}
    .li:hover {
      background-color: ${(props) => props.theme.LiHover};
      -webkit-box-shadow: 0px 2px 10px 1px ${(props) => props.theme.LiHover};
      -moz-box-shadow: 0px 2px 10px 1px ${(props) => props.theme.LiHover};
      box-shadow: 0px 2px 10px 1px ${(props) => props.theme.LiHover};
      color: ${(props) => props.theme.textHover} !important;
      text-shadow: 1px 1px 3px #ebebeb;
      /* transition: 0.3s !important; */
    }
    .arrow {
      fill: ${(props) => props.theme.panelColor};
      height: clamp(8px, 12px, 12px);
      float: right;
    }
    .li svg{
      transition: var(--transition);
      pointer-events: none;
    }
    .li:hover > svg {
      fill: ${(props) => props.theme.textHover};
      stroke: ${(props) => props.theme.textHover} !important;
      -webkit-filter: drop-shadow(1px 1px 6px ${(props) =>
        props.theme.textHover});
      filter: drop-shadow(1px 1px 6px ${(props) => props.theme.textHover});
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
  border-color: ${(props) => props.theme.panelColor};
}

  .spectrum-ColorLoupe_c818a8.is-open_c818a8{
    opacity: 0 !important;
  }
  .spectrum-ColorWheel_31462a .spectrum-ColorWheel-handle_31462a{
    height: 120px;
    width: 120px;
    border-color: ${(props) => props.theme.panelColor} !important;
    background-color:  ${(props) => props.theme.panelColor} !important;
     @media screen and (min-width:768px) {
        &{
             height: 50px;
            width: 50px;
        }
    }
  }
  .spectrum-ColorHandle-color_5a9f41{
    border-color: ${(props) => props.theme.panelColor} !important;
    background-color:  ${(props) => props.theme.panelColor} !important;
  }
`;
