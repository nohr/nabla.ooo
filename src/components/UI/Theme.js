import styled, { createGlobalStyle } from "styled-components"
import { NavLink } from "react-router-dom"


export const Navagatior = styled.div`

display: inline-block;
width: var(--panelWidth);
-webkit-overflow-scrolling: touch;
overflow: visible;
scroll-snap-type: none;
-webkit-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
/*Border*/
--aug-bl: 12px;
--aug-tl: 12px;
--aug-br: 35px;
--aug-tr: 18px;
--aug-border-all: 1px;
/*Inlay*/
--aug-inlay-all: 7px;
--aug-inlay-bg: linear-gradient(
    320deg,
    rgba(184, 184, 184, 0) 0%,
    rgba(195, 195, 195, 0.8) 50%
);
//nav
height: min-content;
  padding: 0em 2.5em 2.5em 2.5em;
  position: fixed;
  left: var(--edge);
  z-index: 5000;
  top: var(--edge);
  /* height: fit-content; */
  /* padding: 15px 0; */
  text-indent: 5px;
`
export const Porter = styled.div`

display: inline-block;
width: var(--panelWidth);
-webkit-overflow-scrolling: touch;
text-indent: 15px;
overflow: visible;
scroll-snap-type: none;
-webkit-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
/*Border*/
--aug-bl: 12px;
--aug-tl: 12px;
--aug-br: 35px;
--aug-tr: 18px;
--aug-border-all: 1px;
/*Inlay*/
--aug-inlay-all: 7px;
--aug-inlay-bg: linear-gradient(
    320deg,
    rgba(184, 184, 184, 0) 0%,
    rgba(195, 195, 195, 0.8) 50%
);
//prt
padding: 2.5em;
  position: absolute;
  z-index: 500;
  left: var(--edge);
  margin: 20px 0;
  /* top: 230px; */
  /* top: calc(var(--panelWidth) + 15px); */
`
export const Setter = styled.div`

display: inline-block;
width: var(--panelWidth);
-webkit-overflow-scrolling: touch;
overflow: visible;
scroll-snap-type: none;
-webkit-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
/*Border*/
--aug-bl: 12px;
--aug-tl: 12px;
--aug-br: 35px;
--aug-tr: 18px;
--aug-border-all: 1px;
/*Inlay*/
--aug-inlay-all: 7px;
--aug-inlay-bg: linear-gradient(
    320deg,
    rgba(184, 184, 184, 0) 0%,
    rgba(195, 195, 195, 0.8) 50%
);
//set
padding: 2.5em;
  position: absolute;
  z-index: 500;
  left: var(--edge);
  margin: 20px 0;
`
export const Linker = styled(NavLink)`
  font-size: clamp(10px, 0.81vw, 12px);
  text-decoration: none;
  width: 100%;
  margin: 2px 0;
  padding-bottom: 1px;
  display: block;
  font-family: "Anonymous Pro", monospace;

    &.${props => props.activeClassName}{
  background-color: #5e5e5e67;
  color: #ebebeb;
  -webkit-box-shadow: 0px 2px 10px 1px #5e5e5e67;
  -moz-box-shadow: 0px 2px 10px 1px #5e5e5e67;
  box-shadow: 0px 2px 10px 1px #5e5e5e67;
  text-shadow: 1px 1px 3px #ebebeb;
}
`

export const Homer = styled(NavLink)`

  clear: left;
  height: min-content;
  width: 100%;
  margin: 2px 0;
  padding-top: 3px;
  padding-bottom: 1px;
  display: block;
  font-family: "Anonymous Pro", monospace;

  margin: 0;
  background: rgba(255, 255, 255, 0);
  overflow: visible;
    & text{
        font-size: 95px;
        font-family: Arial, sans-serif;
    }
`
export const Folder = styled.div`
  font-size: clamp(10px, 0.81vw, 12px);
  width: 100%;
  margin: 2px 0;
  padding-bottom: 1px;
  display: block;
  font-family: "Anonymous Pro", monospace;
  text-indent: 5px;
`

export const GlobalStyle = createGlobalStyle`
    //Panel
    .SvgNabla {
        fill: ${props => props.theme.panelColor};
        color: ${props => props.theme.panelColor};
        -webkit-filter: drop-shadow(1px 1px 3px ${props => props.theme.panelColor});
        filter: drop-shadow(1px 1px 3px ${props => props.theme.panelColor});
    }

    .nablaWrapper:hover {
        background-color: ${props => props.theme.LiHover};
        -webkit-box-shadow: 0px 3px 10px 1px ${props => props.theme.LiHover};
        -moz-box-shadow: 0px 3px 10px 1px ${props => props.theme.LiHover};
        box-shadow: 0px 3px 10px 1px ${props => props.theme.LiHover};
    }

    .nablaWrapper:hover > svg{
        fill: ${props => props.theme.textHover};
        -webkit-filter: drop-shadow(1px 1px 3px ${props => props.theme.textHover});
        filter: drop-shadow(1px 1px 3px ${props => props.theme.textHover});
    }

    .nablaWrapper:hover > text{
        color: ${props => props.theme.textHover};
    }

    .Panel {
        color: ${props => props.theme.panelColor};
        --aug-border-bg: ${props => props.theme.panelColor};
    }
    .header {
        border-bottom: 1px solid ${props => props.theme.panelColor};
    }

    .li, .folder {
        color: ${props => props.theme.panelColor};
    }
    .folderBorder {
        outline: 1px dotted ${props => props.theme.panelColor};
    }
    .folderBorder:hover {
        outline: 1px dotted ${props => props.theme.textHover};
    }
    .li:hover {
        color: ${props => props.theme.textHover};
        background-color: ${props => props.theme.LiHover};
        -webkit-box-shadow: 0px 2px 10px 1px ${props => props.theme.LiHover};
        -moz-box-shadow: 0px 2px 10px 1px ${props => props.theme.LiHover};
        box-shadow: 0px 2px 10px 1px ${props => props.theme.LiHover};
    }
    .arrow {
        fill: ${props => props.theme.panelColor};
    }
    .li:hover > svg {
        fill: ${props => props.theme.textHover};
        -webkit-filter: drop-shadow(1px 1px 6px ${props => props.theme.textHover});
        filter: drop-shadow(1px 1px 6px ${props => props.theme.textHover});
    }
    .grip{
        border-left: 1px solid ${props => props.theme.panelColor};
        border-right: 1px solid ${props => props.theme.panelColor};
    }
    .spinner rect{
        fill: ${props => props.theme.panelColor};
    }

    //Stream
    h1{
        -webkit-text-stroke-color: ${props => props.theme.panelColor};
    }
    .container{
        color: ${props => props.theme.panelColor};
    }
    .buyBtn:hover {
        background-color: ${props => props.theme.LiHover};
        -webkit-box-shadow: 0px 3px 10px 1px ${props => props.theme.LiHover};
        -moz-box-shadow: 0px 3px 10px 1px ${props => props.theme.LiHover};
        box-shadow: 0px 3px 10px 1px ${props => props.theme.LiHover};
    }
    
    //App
    :root{
        --theme: ${props => props.theme.sky};
    }
    html, body, #root {
        background-color: ${props => props.theme.sky};
}
`