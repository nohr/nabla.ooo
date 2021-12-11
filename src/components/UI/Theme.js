import styled, { createGlobalStyle } from "styled-components"
import { NavLink } from "react-router-dom"

//Styling for the UI - proceed with caution

export const Container = styled.div`
  display: flex;
  gap: 60px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 470;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  height: 100%;
  width: 100vw;
  padding: 20px;
  font-size: 14px;

  & .backdrop{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.25);
    display: flex;
    justify-content: center;
  }

  & .backdrop object{
    display: block;
    max-width: 80%;
    max-height: 90%;
    width: auto;
    height: auto;
    align-self: center;
    box-shadow: 3px 5px 7px rgba(0,0,0,0.5);
    /* border: 1px solid ${props => props.theme.sectorColor}; */
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  
    @media only screen and (max-width: 768px) {
      max-width: 80%;
      max-height: 100%;
    }
  }

  & .backdrop object:hover{
    cursor: all-scroll;
  }

  &:last-child(){
    margin-bottom: 60%;
  }
`
export const Sector = styled.div`
border-left: solid 1px ${props => props.theme.sectorColor};
border-right: solid 1px ${props => props.theme.sectorColor};
display: flex;
width: 100%;
flex-direction:row;
padding: 20px 0 20px 20px;
height: 80%;
justify-content: space-between;
gap: 40px;
position: relative;

& .lot{
  position: absolute;
  top: 0;
  left: 0;
  padding-left: 35px; 
  color: ${props => props.theme.sectorColor};
}
`
export const TextWrapper = styled.div`
flex-wrap: wrap;
color: ${props => props.theme.sectorColor};
font-size: 14px;
width:50%;
text-align: left;
height: 100%;
align-self: center;
padding-left: 20px;
display: grid;
grid-template-rows: 40% 50% 10%;

& h3{
  clear:both;
  align-self: flex-end;
}

& h4, & h5{
  align-self: center;
}
& p {
text-indent: 2em;
line-height: 2;
overflow-y: scroll;
}

& a{
  color: ${props => props.theme.link};
  text-decoration: underline;
}

`
export const ImgWrapper = styled.div`
    /* width: 50%; */
    display: flex;
    height: auto;
    text-align: left;
    overflow-x: scroll;
    overflow-y: hidden;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 20px
;
@media only screen and (min-width: 768px) {
  width: 50%;
}

    .img-thumb{
      overflow: hidden;
      width: 0;
      padding: 0 18vw;
      position: relative;
      opacity: 0.8;
      pointer-events: all;
    }

    .img-thumb:hover{
      cursor: pointer;
    }

    object{
    min-height: 100%;
    min-width: 100%;
    max-height: 120%;
    /* max-width: 150%; */
    position: absolute;
    pointer-events:  none;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    }

    video{
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    opacity: 0.8;
    object-fit: contain;
    margin: 0;
    padding: 0;
    }

    .landscape{
    width: 100% !important;
    height: auto !important;
    }

    video:hover{
      opacity: 100%;
    }

    video[poster]{
      object-fit: fill;
    }
`

export const Navagator = styled.div`
//nav
height: auto;
  padding: 0em 25px 25px 25px;
  position: fixed;
  left: var(--edge);
  top: var(--edge);
  z-index: 5000;
  text-indent: 5px;
  &:not(#search){
  cursor: all-scroll;
  }
`
export const Porter = styled.div`
//prt
padding: 2.5em;
  position: absolute;
  z-index: 500;
  left: var(--edge);
  margin: 20px 0;

  .w {
    text-indent: 10px;
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
export const Homer = styled(NavLink)`
  height: min-content;
  width: 100%;
  margin: 7px 0 2px 0;
  padding-top: 3px;
  padding-bottom: 1px;
  display: block;
  border-radius: 5px;
  margin: 0;
  overflow: visible;
`
export const Linker = styled(NavLink)`
  text-decoration: none;
  width: 100%;
  margin: 3px 0;
  padding: 2px 0;
  display: block;

  &.${props => props.activeClassName}{
  background-color: ${props => props.theme.LiActiveBackground};
  color:  ${props => props.theme.textHover};
  -webkit-box-shadow: 0px 2px 10px 1px  ${props => props.theme.LiActiveBackground};
  -moz-box-shadow: 0px 2px 10px 1px  ${props => props.theme.LiActiveBackground};
  box-shadow: 0px 2px 10px 1px  ${props => props.theme.LiActiveBackground};
  text-shadow: 1px 1px 3px  ${props => props.theme.textHover};
  font-style: italic;
}
`
export const Folder = styled.div`
  width: 100%;
  margin: 3px 0;
  padding: 2px 0;
  display: block;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const SearchWrapper = styled.div`
  position: relative;
  display: flex;
`
export const SearchBar = styled.input`
  border: none !important;
  width: 100%;
  margin: 3px 0;
  display: flex;
  border-radius: 5px;
  background-color: transparent;
  box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
  color:  ${props => props.theme.panelColor};
  padding: 2px 19px 2px 20px;
  user-select: text;
  -moz-user-select: text;
  -webkit-user-select: text;
  font-size: 13px;

  @media only screen and (max-width: 768px) {
  padding: 6px 19px 6px 20px;
  outline: 1px solid ${props => props.theme.panelColor};
  font-size: 18px;
  }

  &:hover{
    box-shadow: 0 0 3px 3px  ${props => props.theme.LiHover};
  }

  &:focus{
    border: 1px solid ${props => props.theme.LiHover};
    outline: none;
    box-shadow: 0 0 50px 50px  ${props => props.theme.LiHover};
  }
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

    .Panel {
      display: inline-block;
      width: var(--panelWidth);
      overflow: visible;
      scroll-snap-type: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      mix-blend-mode: ${props => props.theme.blend};
      /*Border*/
      --aug-bl: 12px;
      --aug-tl: 12px;
      --aug-br: 35px;
      --aug-tr: 18px;
      --aug-border-all: 1px;
      color: ${props => props.theme.panelColor};
      --aug-border-bg: ${props => props.theme.panelColor};
    }
    .header {
        border-bottom: 1px solid ${props => props.theme.panelColor};
        margin: 0 0 7px 0;
        padding: 22px 0px 5px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .li{
      border-radius: 5px;
    }
    .li, .folder {
        color: ${props => props.theme.panelColor};
    }
    .folderActive {
      /* background-color: ${props => props.theme.LiActiveBackground}; */
      box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
      color:  ${props => props.theme.panelColor};
      /* -webkit-box-shadow: 0px 2px 10px 1px  ${props => props.theme.LiActiveBackground}; */
      /* -moz-box-shadow: 0px 2px 10px 1px  ${props => props.theme.LiActiveBackground}; */
      /* box-shadow: 0px 2px 10px 1px  ${props => props.theme.LiActiveBackground}; */
      /* text-shadow: 1px 1px 3px #ebebeb; */
      font-style: italic;
}
    .folderActive:hover{
      box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
    }
    .folderActive:after{
      border-radius: 5px;
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
    }
    .li:hover > svg {
      fill: ${props => props.theme.textHover};
      -webkit-filter: drop-shadow(1px 1px 6px ${props => props.theme.textHover});
      filter: drop-shadow(1px 1px 6px ${props => props.theme.textHover});
    }

    .spinner {
      width: 30px;
      height: 30px;
      background: none;
      position: absolute;
      z-index: 500;
      top: calc(var(--edge) + 10px);
      left: calc(var(--edge) + 90px);
    }
    .spinner path{
        fill: ${props => props.theme.panelColor};
    }

    //Stream
    h1{
        justify-self: flex-start;
        position: absolute;
        font-size: 7vw;
        letter-spacing: -0.3vw;
        color: transparent;
        -webkit-text-stroke-width: 1px;
        margin: 0;
        font-family: "ekodigital";
        font-weight: 400;
        font-style: normal;
        -webkit-user-select: none; /* Safari */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* IE10+/Edge */
        user-select: none; /* Standard */
        -webkit-text-stroke-color: ${props => props.theme.panelColor};
    }
    .head{
      pointer-events: none;
      position: absolute;
      z-index: 50;
      mix-blend-mode: ${props => props.theme.blend} !important;
    }
    .head svg {
      fill: none !important;
      stroke:  ${props => props.theme.panelColor} !important;
      stroke-width: 1px;
      position: absolute;
      width: 50vw;
      height: auto;
      overflow: visible;
      margin: 20px 20px;
    }
    
    .container {
      padding: 20px;
      color: ${props => props.theme.panelColor};
    }

    .hom {
        pointer-events: none;
        width: 100vw;
    }

    .HomeCD g{
      padding: 0;
      stroke: ${props => props.theme.panelColor} !important;
      fill: none;
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
    
    //store
    .str {
      width: 100vw;
      height: 100%;
      display: flex !important;
      align-items: center;
      justify-content: center;
    }
    .eko{
      height: min-content;
      display: flex;
      align-self: center;
      align-items: center;
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
      background-color:  ${props => props.theme.LiHover};
      -webkit-box-shadow: 0px 3px 10px 1px  ${props => props.theme.LiHover};
      -moz-box-shadow: 0px 3px 10px 1px  ${props => props.theme.LiHover};
      box-shadow: 0px 3px 10px 1px  ${props => props.theme.LiHover};
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
        --panelWidth: 180px;
        --edge: 20px;
      }
    html, body, #root {
        background-color: ${props => props.theme.sky};
}
::-webkit-scrollbar {
  display: none;
}



@media only screen and (min-width: 1366px) {
  h1 {
    font-size: 12vw;
  }
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
  .nablaWrapper{
    background-color: transparent;
  }
  .Panel{
    padding-bottom: 10px;
    mix-blend-mode: normal;
    /*Border*/
    --aug-bl: 12px;
    --aug-tl: 12px;
    --aug-br: 25px;
    --aug-tr: 10px;
  }
  .nav{
    width: 50vw;
    height: min-content;
  }

  .prt{
    width: max-content;
     /*Border*/
     --aug-bl: 9px;
    --aug-tl: 9px;
    --aug-br: 25px;
    --aug-tr: 13px;
    .w{
      text-indent: 10px;
    }
    height: 80vw;
    overflow-x: scroll;
  }

  .prt .li{
    padding-right: 10px;
  }

  .set{
    width: max-content;
  }
  .set .li{
    padding-right: 5px;
  }

  .header{
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row-start: 1;
    grid-row-end: 1;
  }

  .li{
    font-size: 18px;
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
  .head svg {
    stroke-width: 0.5px;
    width: 92vw;
  }

  .head{
    justify-content: center;
  }
  
  .sector{
    flex-direction: column-reverse;
    padding: 0;
    height: 95%;
  }

  .textWrapper,.imgWrapper{
    width: 100% !important;
    height: 50%;
  }
  .imgWrapper{
    padding-top: 20px;
    /* This cuts off starting images in carousel no clue why */
    /* justify-content: center; */
  }
  .textWrapper{
    padding-right: 20px;
  }
  .img-thumb{
        padding:18vw 0;
  }

  .str{
    align-items: flex-end;
  }
  .eko {
    flex-direction: column;
    width: fit-content;
    padding: 20px;
    align-self: center;
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