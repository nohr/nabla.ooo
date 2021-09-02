import styled, { createGlobalStyle } from "styled-components"
import { NavLink } from "react-router-dom"
import "../UI/UI.css"

export const Navagator = styled.div`
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
//prt
padding: 2.5em;
  position: absolute;
  z-index: 500;
  left: var(--edge);
  margin: 20px 0;
  /* top: 230px; */
  /* top: calc(var(--panelWidth) + 15px); */

  .w {
    text-indent: 20px;
  }
`
export const Setter = styled.div`
//set
padding: 2.5em;
  position: absolute;
  z-index: 500;
  left: var(--edge);
  margin: 20px 0;

  .w {
    text-indent: 5px;
  }
`
export const Linker = styled(NavLink)`
  font-size:  10px;
  text-decoration: none;
  width: 100%;
  margin: 2px 0;
  padding-bottom: 1px;
  display: block;
  font-family: "Anonymous Pro", monospace;

    &.${props => props.activeClassName}{
  background-color: ${props => props.theme.LiActiveBackground};
  color: #ebebeb;
  -webkit-box-shadow: 0px 2px 10px 1px  ${props => props.theme.LiActiveBackground};
  -moz-box-shadow: 0px 2px 10px 1px  ${props => props.theme.LiActiveBackground};
  box-shadow: 0px 2px 10px 1px  ${props => props.theme.LiActiveBackground};
  text-shadow: 1px 1px 3px #ebebeb;
  font-style: italic;
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
  font-size:  10px;
  width: 100%;
  margin: 2px 0;
  padding-bottom: 1px;
  display: block;
  font-family: "Anonymous Pro", monospace;
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
      display: inline-block;
      width: var(--panelWidth);
      -webkit-overflow-scrolling: touch;
      overflow: visible;
      scroll-snap-type: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      /*Border*/
      --aug-bl: 12px;
      --aug-tl: 12px;
      --aug-br: 35px;
      --aug-tr: 18px;
      --aug-border-all: 1px;
      /*Inlay*/
      //background: ${props => props.theme.panelBg};
      //--aug-inlay-bg: ${props => props.theme.panelBg};
      //--aug-inlay-all: 0px ;
      color: ${props => props.theme.panelColor};
      --aug-border-bg: ${props => props.theme.panelColor};
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }
    .header {
        border-bottom: 1px solid ${props => props.theme.panelColor};
        margin: 0 0 10px 0;
        padding: 2em 0px 0.5em;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        height: 61px;
        text-indent: 5px;
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
        height: clamp(8px, 12px, 12px);
        float: right;
        justify-self: end;
        align-self: center;
        margin: auto 0;
    }
    .li:hover > svg {
        fill: ${props => props.theme.textHover};
        -webkit-filter: drop-shadow(1px 1px 6px ${props => props.theme.textHover});
        filter: drop-shadow(1px 1px 6px ${props => props.theme.textHover});
    }

    .spinner {
        width: 35px;
        height: 35px;
        background: none;
        /* position: absolute; */
        z-index: 500;
        top: calc(var(--edge) + 15px);
        left: calc(var(--edge) + 100px);
    }
    .spinner rect{
        fill: ${props => props.theme.panelColor};
    }

    //Stream
    h1{
        -webkit-text-stroke-color: ${props => props.theme.panelColor};
    }
    .head svg {
      fill: none !important;
      stroke:  ${props => props.theme.panelColor} !important;
      stroke-width: 1px;
      position: absolute;
      top: calc(var(--edge));
      left: calc(var(--edge) + var(--panelWidth) + 20px);
      height: 14vw;
      width: auto;
      overflow: visible;
    } 
    .container{
        color: ${props => props.theme.panelColor};
    }
    //store
    .eko{
      /* background-color: ${props => props.theme.panelBg}; */
      height: min-content;
      display: flex;
      align-self: center;
      align-items: center;
      grid-column-start: 2;
      grid-column-end: 2;
      grid-row-start: 2;
      grid-row-end: 2;
      padding: 30px;
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: 1px solid ${props => props.theme.panelColor};
      border-radius: 10px;
      overflow: visible;
    }
    .eko-thumb{
      text-shadow: 1px 1px 10px ${props => props.theme.panelColor};
      font-family: "ekodigital";
      font-weight: 400;
      font-style: normal;
      font-size: 270px;
      vertical-align: middle;
      /* justify-self: center; */
      letter-spacing: -15px;
      padding-right: 15px;
      -webkit-user-select: none; /* Safari */
      -moz-user-select: none; /* Firefox */
      -ms-user-select: none; /* IE10+/Edge */
      user-select: none; /* Standard */
    }

  .desc {
      padding: 0 20px;
      line-height: 25px;
      align-self: center;
      font-style: italic;
      display: flex;
    justify-content: center;
    flex-direction: column;
    }
  .title {
      padding: 0.5% 0;
      font-style: normal !important;
      vertical-align: middle;
    }
    
    .title p{
      background-color:  ${props => props.theme.LiActiveBackground};
      -webkit-box-shadow: 0px 3px 10px 1px  ${props => props.theme.LiActiveBackground};
      -moz-box-shadow: 0px 3px 10px 1px  ${props => props.theme.LiActiveBackground};
      box-shadow: 0px 3px 10px 1px  ${props => props.theme.LiActiveBackground};
      color: #ebebeb !important;
      align-self: center;
      display: inline-block;
      vertical-align: baseline;
      padding: 0 10px;
      text-shadow: 1px 1px 3px rgba(235, 235, 235, 0.5)
    }
    .buyBtn {
      text-align: center;
      padding: 1px 9px;
      width: 65px;
      font-size: 13px;
      font-style: normal !important;
      font-weight: 800;
      background-color: #c94343;
      color: #ebebeb !important;
      cursor: pointer;
      display: inline;
      justify-self: flex-end;
      -webkit-user-select: none; /* Safari */
      -moz-user-select: none; /* Firefox */
      -ms-user-select: none; /* IE10+/Edge */
      user-select: none; /* Standard */
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

//Not Mobile
@media only screen and (min-width: 768px) {
  h1 {
    font-size: 14vw;
  }
  .eko {
    flex-direction: row;
    width: auto;
    padding-right: 0;
  }
  .eko-thumb {
    border-right: 1px solid ${props => props.theme.panelColor};
    padding-top: 70px;
  }
}

//Mobile
@media only screen and (max-width: 768px) {
  .Panel{
    padding-bottom: 10px;
    /*Border*/
    --aug-bl: 12px;
    --aug-tl: 12px;
    --aug-br: 25px;
    --aug-tr: 10px;
  }
  .nav{
    width: 140px;
  }

  .prt{
    padding: 5px 10px 5px 10px;
    width: max-content;
     /*Border*/
     --aug-bl: 9px;
    --aug-tl: 9px;
    --aug-br: 25px;
    --aug-tr: 13px;
    .w{
      text-indent: 10px;
    }
  }

  .set{
    width: max-content;
  }

  .li{
    font-size: 12px;
    padding: 6px 0;
  }

  h1 {
    font-size: 17vw;
  }

  h1, .head svg {
    top: unset;
    left: unset;
    padding-top: 7px;
    padding-right: 7px;
  }

  .head{
    justify-content: center;
  }

  .eko {
    flex-direction: column;
    width: fit-content;
    padding: 20px;
    align-self: flex-end;
    margin-bottom: 70px;
  }
  .buyBtn{
    font-size: 20px;
    align-self: center;
  }
  .eko-thumb {
    border-right: none;
    font-size: 40vw;
  }
  .title p{
    display: block;
  }
  .desc{
    border-top: 1px solid ${props => props.theme.panelColor};
  }
}
`