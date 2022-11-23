import styled from "styled-components";
import { state } from "../../../common/state";

// nav
export const Skew = styled.div`
  transform: ${(props) => props.skew};
  transition: 0.1s;
  position: absolute;
  z-index: 5000;
`;
export const Nav = styled.div`
  padding: 0 0 20px 0;
  position: absolute;
  left: var(--edge);
  top: var(--edge);
  z-index: 5000;
  text-indent: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .grid {
    position: relative;
    padding: 0 15px;
    display: grid;
    justify-items: center;
    margin: 2px 0 10px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    column-gap: 10px;
    row-gap: 5px;

    & a {
      width: 90%;
    }

    & .folder {
      width: 75%;
    }
  }
  .quote {
    text-align: center;
    white-space: nowrap;
    text-indent: 0 !important;
    padding: 4px 0 4px;
    font-size: 10px;
    height: 20.5px !important;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  & .li {
    backdrop-filter: blur(20px) !important;
    width: 80%;
    align-self: center;
    transition: 0.3s;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .folder {
    padding-right: 2px;
  }

  & .speaker {
    cursor: pointer;
    position: absolute;
    z-index: 500;
    width: 12px;
    top: 5%;
    left: 50%;
    transform: translate(-50%, 0);
  }

  & .GrabberWrap {
    display: flex;
    justify-content: center;
    pointer-events: none;
  }

  & .grabber {
    pointer-events: all;
    cursor: grab;
    width: 50px;
    position: absolute;
    bottom: -20px;
    z-index: 500;
    stroke: ${(props) => props.theme.panelColor};
    fill: ${(props) => props.theme.panelColor};
    fill-opacity: 100% !important;
    stroke-width: 1px !important;
    transition: 1.3s;
  }

  & .resetPos {
    border-radius: 50% !important;
    width: 20px !important;
    height: 20px !important;
    border-color: ${(props) => props.theme.panelColor};

    & svg path {
      fill: ${(props) => props.theme.panelColor};
    }

    &:hover {
      border-color: ${(props) => props.theme.sky};
    }

    &:hover > svg path {
      fill: ${(props) => props.theme.LiActiveBackground} !important;
    }
  }

  & .speaker {
    fill: ${(props) => props.theme.panelColor};
    /* TODO: Make this pulse to tempo of current track */
    animation: pulse ${state.songIndex === 1 ? "1.7778s" : "2s"} infinite;
    transition: 1.3s;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.8);
      fill: ${(props) => props.theme.panelColor};
    }

    70% {
      transform: scale(1);
      fill: ${(props) => props.theme.textHover};
    }

    100% {
      transform: scale(0.8);
      fill: ${(props) => props.theme.panelColor};
    }
  }

  & .speaker:hover {
    fill: ${(props) => props.theme.LiHover};
    -webkit-filter: drop-shadow(1px 1px 3px ${(props) => props.theme.LiHover});
    filter: drop-shadow(1px 1px 3px ${(props) => props.theme.LiHover});
    transition: 0.3s;
  }

  & .grabber:not(:hover) {
    fill-opacity: 0% !important;
    stroke-width: 1px !important;
  }

  .spinner {
    width: 25px;
    height: 25px;
    background: none;
    position: absolute;
    z-index: 500;
    pointer-events: none;
    left: 50%;
    bottom: 5%;
    transform: translate(-50%, 0);
  }
  .spinner path {
    fill: ${(props) => props.theme.panelColor};
  }

  .Color {
    grid-row: 2;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    text-indent: 0;
    color: #ebebeb !important;
    background-color: ${(props) => props.theme.LiHover};
    -webkit-filter: drop-shadow(1px 1px 6px ${(props) => props.theme.LiHover});
    filter: drop-shadow(1px 1px 6px ${(props) => props.theme.LiHover});
    text-align: center;
    animation: flashConfirm 0.6s infinite;
    transition: 0.3s;
    outline: 0px;

    &:hover {
      color: ${(props) => props.theme.panelColor} !important;
      text-shadow: none;
      background-color: transparent !important;
      outline: 1px solid ${(props) => props.theme.panelColor};
    }

    @keyframes flashConfirm {
      0% {
        color: #ebebeb;
        background-color: ${(props) => props.theme.LiHover};
        box-shadow: 0px 0px 0px ${(props) => props.theme.LiHover};
      }

      70% {
        color: ${(props) => props.theme.sky};
        background-color: ${(props) => props.theme.LiHover};
        box-shadow: 1px 1px 6px ${(props) => props.theme.LiHover};
      }

      100% {
        color: #ebebeb;
        background-color: ${(props) => props.theme.LiHover};
        box-shadow: 0px 0px 0px ${(props) => props.theme.LiHover};
      }
    }
  }

  .Reset {
    grid-row: 2;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    text-indent: 0;
    color: #ebebeb !important;
    background-color: ${(props) => props.theme.LiActiveBackground};
    -webkit-filter: drop-shadow(
      1px 1px 6px ${(props) => props.theme.LiActiveBackground}
    );
    filter: drop-shadow(
      1px 1px 6px ${(props) => props.theme.LiActiveBackground}
    );
    text-align: center;
    transition: 0.3s;
    outline: 0px;

    &:hover {
      color: ${(props) => props.theme.panelColor} !important;
      text-shadow: none;
      background-color: transparent !important;
      outline: 1px solid ${(props) => props.theme.panelColor};
    }
  }

  & .song {
    position: absolute;
    top: 06px;
    left: 48%;
  }
`;
export const Header = styled.div`
  height: 130px;
  width: ${(props) => props.width};
  border-bottom: 1px solid ${(props) => props.theme.panelColor};
  margin: 0 0 8px 0;
  padding: 25px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  row-gap: 2px !important;
  flex-direction: column;
  flex-wrap: nowrap;
`;
export const TrayWrapper = styled.div`
  transform: skewY(2deg);
  padding: 0 5px;
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  justify-self: flex-start;
  column-gap: 10px;
  border: 1px solid;
  border-radius: 500px;
`;
export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  transform: skewY(-2deg);
`;
export const SearchBar = styled.input`
  border: none !important;
  width: 100%;
  height: 26px;
  margin: auto 0;
  backdrop-filter: blur(20px) !important;
  display: flex;
  border-radius: 500px;
  background-color: transparent;
  box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
  -webkit-box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
  -moz-box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
  color: ${(props) => props.theme.panelColor};
  padding: 2px 25px 2px 25px;
  user-select: text;
  -moz-user-select: text;
  -webkit-user-select: text;
  font-size: 13px;
  cursor: pointer;

  #searchIcon {
    position: absolute;
    top: 0 !important;
    left: 0 !important;
  }

  &::placeholder {
    text-align: center;
    color: ${(props) => props.theme.panelColor};
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
  }

  &:hover::placeholder {
    color: ${(props) => props.theme.textHover};
    transition: 0.3s;
  }
  &:hover {
    color: ${(props) => props.theme.textHover};
    background-color: ${(props) => props.theme.LiHover};
    outline: 1px solid ${(props) => props.theme.textHover};
    box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
    -webkit-box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
    -moz-box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
    transition: 0.3s;
  }
  &:focus::placeholder {
    color: ${(props) => props.theme.textHover};
    transition: 0.3s;
  }
  &:focus {
    color: ${(props) => props.theme.textHover};
    background-color: ${(props) => props.theme.LiHover};
    outline: 1px solid ${(props) => props.theme.textHover};
    box-shadow: 0 0 50px 50px ${(props) => props.theme.LiHover};
    -webkit-box-shadow: 0 0 50px 50px ${(props) => props.theme.LiHover};
    -moz-box-shadow: 0 0 50px 50px ${(props) => props.theme.LiHover};
    transition: 0.3s;
  }
  &:focus ~ #searchIcon,
  &:hover ~ #searchIcon,   
  &:focus ~ #clearIcon svg,
  &:hover ~ #clearIcon svg,
  &:focus ~ #cdIcon,
  &:hover ~ #cdIcon  {
    fill: ${(props) => props.theme.textHover} !important;
    transition: 0.3s;
  }
`;
export const BarIcon = styled.svg`
  position: absolute;
  top: 50%;
  left: 6px;
  transform: translateY(-57%);
  height: 16px;
  fill: ${(props) => props.theme.panelColor};
  cursor: pointer;
  stroke-width: 1px;

  g{
    height: 12px;
    
  }
  &:hover {
    opacity: 50%;
    pointer-events: painted;
  }
`;
export const Clear = styled.svg`
  position: absolute;
  top: 52%;
  right: 15px;
  transform: translate(50%, -57%);
  height: 14px;
  fill: ${(props) => props.theme.panelColor};
  cursor: pointer;

  &:hover {
    opacity: 50%;
    pointer-events: painted;
  }
`;
// projects
export const Project = styled.div`
  /* padding: var(--panelPadding); */
  padding-bottom: 0;
  position: absolute;
  z-index: 4800;
  left: var(--edge);
  margin: 20px 0 0 0;
  text-align: center;
  overflow: scroll !important;
  display: flex;
  align-items: ${(props) => props.align};
  justify-content: center;
  ${(props) => props.layout}
  ${(props) => props.hide}
      ${(props) => props.top}
      -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &::-webkit-scrollbar {
    width: 0px;
    /* display: none; */
  }

  * .li {
    cursor: pointer;
    /* backdrop-filter: blur(10px) !important; */
    margin: 0 0 4px 0;
    width: 95%;
    transition: 0.9s !important;
  }
  p {
    cursor: pointer;
    margin: 3px auto 5px auto;
    overflow: visible;
    text-align: center;
    border: 1px solid;
    border-color: transparent transparent ${(props) => props.theme.panelColor}
      transparent;
    transition: 0.9s;
    border-radius: 10px;
    text-transform: uppercase !important;
    font-size: 10px !important;
    padding: 3px 0;

    &:hover {
      transition: 0.1s;
      font-weight: 900;
      color: ${(props) => props.theme.textHover};
      background-color: ${(props) => props.theme.LiHover};
    }
  }

  .self,
  .client {
    display: flex !important;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    overflow-y: scroll;
    overflow-x: visible;
    padding: 2px 2px 0px 10px;
    width: 90%;

    .li {
      transition: 0.1s !important;
    }

    ::-webkit-scrollbar {
      -webkit-appearance: none;
      width: 5px;
      position: absolute;
    }
    ::-webkit-scrollbar-thumb {
      background-color: transparent;
      border: 1px solid;
      border-color: ${(props) => props.theme.panelColor};
      border-radius: 4px;
      transition: 0.1s;
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: ${(props) => props.theme.panelColor};
      box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
      -webkit-box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
      -moz-box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
      transition: 0.1s;
    }
  }

  #selfhead,
  #clienthead {
    @media screen and (min-height: 1087px) and (max-height: 1300px) {
      font-size: 0.8vh !important;
    }
    @media screen and (min-height: 1300px) {
      font-size: 0.65vh !important;
    }
  }

  .self {
    padding-bottom: 0;
  }
  .client {
    padding-bottom: 32px;
  }
`;
export const Group = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: max-content;
  height: 100%;
  row-gap: 10px;
  ${(props) => props.margin}/* overflow: scroll; */
`;
export const TitleList = styled.div`
  display: flex;
  flex-direction: column;
  width: 140px !important;
  /* width: max-content !important; */

  & .list {
    display: flex;
    flex-direction: column;
    height: 100%;
    /* overflow: visible; */
    overflow: auto;
    align-items: center;
  }
`;

// options
export const Option = styled.div`
  padding: var(--panelPadding);
  padding-bottom: 0;
  position: absolute;
  z-index: 4210;
  left: var(--edge);
  margin: 20px 0 0 0;
  display: grid;
  align-items: start;
  ${(props) => props.layout}
  ${(props) => props.hide}
    ${(props) => props.top}
      -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .audio,
  .display {
    width: 100%;
    /* overflow-y: scroll; */
    padding: 2px 2px 0px 7px;

    ::-webkit-scrollbar {
      -webkit-appearance: none;
      width: 5px;
      position: absolute;
    }
    ::-webkit-scrollbar-thumb {
      border: 1px solid;
      border-color: ${(props) => props.theme.panelColor};
      border-radius: 4px;
      transition: 0.3s;
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: ${(props) => props.theme.panelColor};
      box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
      -webkit-box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
      -moz-box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
      transition: 0.3s;
    }
  }

  #audiohead,
  #displayhead {
    border-radius: 10px;
    text-transform: uppercase !important;
    font-size: 10px !important;
    padding-bottom: 6px;

    @media screen and (min-height: 1087px) and (max-height: 1300px) {
      font-size: 0.8vh !important;
    }
    @media screen and (min-height: 1300px) {
      font-size: 0.65vh !important;
    }
  }
  .display {
    padding-bottom: 10px !important;
  }

  .li {
    justify-content: flex-end;
    width: 65%;
    /* margin: 4px auto 8px auto; */
    margin: 0 auto 4px auto;
    position: relative;
    height: fit-content;
    padding-right: 7px;
    transition: 0.3s;

    & svg {
      left: 10px !important;
      right: unset !important;
    }
  }

  p {
    margin: 3px auto 5px auto;
    text-align: center;
    border: 1px solid;
    border-color: transparent transparent ${(props) => props.theme.panelColor}
      transparent;
    transition: 0.9s;
    stroke-width: 1px !important;
  }

  @media screen and (min-height: 768px) {
    svg:not(.ShowHideIcon):not(.light):not(.dark) {
      fill: none !important;
      stroke: ${(props) => props.theme.panelColor};
    }
    .dark {
      fill: none !important;
      stroke: ${(props) => props.theme.panelColor};
      stroke-width: 12px !important;
    }
  }

  .nextIcon,
  .modeIcon,
  .muteIcon,
  .ShowHideIcon {
    position: absolute;
    right: 6px;
    width: 10px;
    stroke: ${(props) => props.theme.panelColor};
    stroke-width: 1px !important;
    overflow: visible;
    align-self: left;
    top: 50%;
    transform: translateY(-50%);
  }

  .ColorIcon {
    position: absolute;
    right: 6px;
    width: 10px;
    stroke: transparent !important;
    overflow: visible;
    align-self: left;
    top: 50%;
    transform: translateY(-50%);
  }

  .ColorChangedIcon {
    position: absolute;
    right: 6px;
    width: 10px;
    overflow: visible;
    align-self: left;
    top: 50%;
    transform: translateY(-50%);
    stroke: ${(props) => props.theme.panelColor};

    circle {
      fill: ${(props) => props.theme.panelColor};
    }
  }

  .PlayPauseIcon {
    position: absolute;
    right: 7px;
    height: 10px;
    fill: ${(props) => props.theme.panelColor};
    overflow: visible;
    align-self: left;
    top: 50%;
    transform: translateY(-50%);
  }
  .DirectionIcon {
    stroke-width: 1px !important;
    position: absolute;
    right: 6px;
    width: 10px;
    overflow: visible;
    align-self: left;
    top: 50%;
    transform: translateY(-50%);
  }
`;
