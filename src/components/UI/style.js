//Styling for the UI - proceed with caution
import styled, { createGlobalStyle } from "styled-components"

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

   &.resetPos{
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
            backdrop-filter: blur(3px);
            border: 1px solid ${props => props.theme.panelColor};
            border-radius: 50%;
            justify-content: center;
            display:flex;
            height: 50px;
            flex-direction: column;
            padding: 2px;
            width: 50px;

            & svg{
            width: 24px !important;
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
    animation: flashConfirm 0.6s steps(5, start) infinite;
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
  .nextIcon, .modeIcon, .muteIcon, .ShowHideIcon, .ColorIcon{
    fill: ${props => props.theme.panelColor};
    overflow: visible;
  }
  .ConfirmIcon,  .ResetIcon{
    height: 80%;
  }
  .ResetIcon{
    fill: #ebebeb;
  }

  .PlayPauseIcon{
    fill: ${props => props.theme.panelColor};
    overflow: visible;
  }
  .DirectionIcon{
    stroke-width: 1px !important;
    overflow: visible;
  }
`
export const Wheel = styled.div`
@media only screen and (max-width: 768px) {
  & {
   backdrop-filter: blur(4px);
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
      backdrop-filter: blur(var(--blur));
      -webkit-backdrop-filter: blur(var(--blur));
      border: 1px solid ${props => props.theme.panelColor};
      color: ${props => props.theme.panelColor};
      border-radius: 185px;
      overflow: hidden;
    }
    .glow{
      fill: ${props => props.theme.panelColor} !important;
      background-color: ${props => props.theme.panelColor} !important;
      /* color: ${props => props.theme.bwElement} !important; */
      /* mix-blend-mode: ${props => props.theme.blend}; */
      box-shadow: 0 8px 32px 0 ${props => props.theme.panelColor};
      -webkit-box-shadow:  0 8px 32px 0 ${props => props.theme.panelColor};
      -moz-box-shadow:  0 8px 32px 0 ${props => props.theme.panelColor};
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
  }
  .spectrum-ColorHandle-color_5a9f41{
    border-color: ${props => props.theme.panelColor} !important;
    background-color:  ${props => props.theme.panelColor} !important;
  }
`