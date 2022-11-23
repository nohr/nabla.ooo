import styled from "styled-components";

// Nav
export const NavWrapper = styled.div`
  pointer-events: none;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  padding: 0 30px;
  width: 100%;
  height: max-content;
  position: absolute;
  z-index: 5000;
  /* bottom: ${(props) => props.offset}; */
  top: 160px;
  transition: 0 !important;
  transition-timing-function: ease-out;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */

  & * {
    transition: 0s !important;
  }
`;
export const MobileNav = styled.div`
  transition: 0.9s;
  height: 70px;
  width: 100%;
  color: ${(props) => props.theme.panelColor};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;

  & .grabber {
    pointer-events: all;
    cursor: grab;
    width: 100px;
    stroke: ${(props) => props.theme.panelColor};
    fill: ${(props) => props.theme.panelColor};
    stroke-width: 1px !important;
    transition: 1.3s;
  }

  & .GrabberWrap {
    pointer-events: none !important;
    margin: 10px 0 0 0 !important;
  }

  .mainRow {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    width: 100%;
    height: 82px;

    & a {
      height: 70px !important;
    }
  }
  .nablaWrapper {
    pointer-events: all !important;
    margin: 0 auto;
    width: 120px !important;
    padding: 0;
    border: 1px solid ${(props) => props.theme.panelColor};
    backdrop-filter: blur(3px);
  }

  .quote {
    height: 15px !important;
    display: block;
    white-space: nowrap;
    font-size: 8px;
    font-weight: 900;
    padding: 1px;
    margin-top: 15px;
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
  }
  .modalContent {
    overflow: visible !important;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    column-gap: 30px;
  }
`;
export const NavButton = styled.div`
  pointer-events: all !important;
  backdrop-filter: blur(20px) !important;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 66px;
  width: 66px;
  font-size: 10px;
  padding: 7px;
  border-radius: 50% !important;
  border: 1px solid ${(props) => props.theme.panelColor};
  transition: 0.3s !important;
  user-select: none;
  -webkit-user-select: none;
`;
export const NavButtonIcon = styled.svg`
  /* position: absolute; */
  ${(props) => props.size}
  fill: ${(props) => props.theme.panelColor};
  stroke: ${(props) => props.colorstroke};
  stroke-width: 1px;
  justify-self: flex-end !important;
  width: auto !important;
`;

// Options
export const OptionsWrapper = styled.div`
  pointer-events: all !important;
  position: relative;
  height: 70px !important;
  width: 100%;
  justify-content: center !important;
  flex-direction: row !important;
  user-select: none;
  -ms-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -webkit-user-drag: none;
  overflow: auto !important;
  margin: 0 20px !important;

  & .carousel {
    padding: 0 10px;
    border-radius: 50px;
    user-select: all !important;
    -ms-user-select: all !important;
    -moz-user-select: all !important;
    -webkit-user-select: all !important;
    -webkit-user-drag: auto !important ;
    margin: 20px 0 0px 0;
    overflow: visible !important;
    height: 50px !important;
    width: fit-content;
    display: flex;
    align-items: center;
    gap: 40px;

    & .li,
    & .folder {
      transform: rotateZ("90");
      backdrop-filter: blur(3px);
      border: 1px solid ${(props) => props.theme.panelColor};
      border-radius: 50%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      height: 40px;
      width: 40px;
      padding: 2px;
      /* margin: 0 20px; */

      &:hover {
        border-color: ${(props) => props.theme.textHover};
      }

      & svg {
        overflow: visible;
        width: 24px !important;
      }
      &.resetPos {
        & svg {
          stroke: ${(props) => props.theme.panelColor};
          width: 32px !important;
          stroke-width: 3px;
        }
      }
      &.MuteIcon svg {
        width: 16px !important;
        fill: transparent;
        stroke: ${(props) => props.theme.panelColor};
      }
      & .nextIcon {
        width: 16px !important;
        height: auto;
        fill: transparent;
        stroke: ${(props) => props.theme.panelColor};
      }
      & .PlayPauseIcon {
        width: 16px !important;
        height: auto;
        fill: transparent;
        stroke: ${(props) => props.theme.panelColor};
      }
      & .GyroIcon {
        fill: ${(props) => props.theme.panelColor};
        & path {
          stroke: ${(props) => props.theme.panelColor} !important;
        }
      }
      & .modeIcon {
        stroke: ${(props) => props.theme.panelColor};
        fill: ${(props) => props.theme.panelColor}!important;
        height: 20px !important;
      }
    }
  }
`;

// Search
export const SearchWrapper = styled.div`
  pointer-events: all !important;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: row !important;
  height: 70px !important;
  margin: 40px 0 0 0;
  column-gap: 10px !important;

  & .li,
  & .folder {
    backdrop-filter: blur(20px) !important;
    border: 1px solid ${(props) => props.theme.panelColor};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 40px;
    width: 40px;
    padding: 2px;
  }
  #clearIcon {
    margin: auto 0 !important;
    padding: 0 !important;
    position: absolute;
    right: 73px;
    height: 25px;
    width: 25px;
    svg {
      position: unset !important;
      transform: unset;
      -webkit-filter: none;
      filter: none;
      overflow: visible !important;
      fill: ${(props) => props.theme.panelColor} !important;
      width: 100% !important;
      height: 100% !important;
    }
  }
`;
export const SearchBar = styled.input`
  /* position: absolute; */
  user-select: text;
  -ms-user-select: text;
  -moz-user-select: text;
  -webkit-user-select: text;
  width: 60%;
  height: 40px;
  display: flex;
  /* background-color: ${(props) => props.theme.LiActiveBackground}; */
  background-color: transparent;
  box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
  -webkit-box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
  -moz-box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
  color: ${(props) => props.theme.panelColor};
  user-select: text;
  -moz-user-select: text;
  -webkit-user-select: text;
  cursor: pointer;
  /* border: 0.5px solid ${(props) => props.theme.panelColor}; */
  border: none;
  border-radius: 25px;
  padding: 6px 19px 6px 20px;
  font-size: 15px;
  -webkit-appearance: none !important;
  backdrop-filter: blur(20px) !important;
  text-align: center;

  &::placeholder {
    color: ${(props) => props.theme.panelColor};
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
  }

  &:focus::placeholder {
    color: ${(props) => props.theme.textHover};
    transition: 0.3s;
  }
  &:focus {
    color: ${(props) => props.theme.textHover};
    background-color: ${(props) => props.theme.LiHover};
    outline-color: ${(props) => props.theme.textHover};
    border: none;
    box-shadow: 0px 20px 50px 10px ${(props) => props.theme.LiHover};
    -webkit-box-shadow: 0px 20px 50px 10px ${(props) => props.theme.LiHover};
    -moz-box-shadow: 0px 20px 50px 10px ${(props) => props.theme.LiHover};
    transition: 0.3s;
  }

  &:focus ~ #clearIcon svg,
  &:hover ~ #clearIcon svg {
    fill: ${(props) => props.theme.textHover} !important;
    transition: 0.3s;
  }
`;
