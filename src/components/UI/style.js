//Styling for the UI - proceed with caution
import styled, { createGlobalStyle } from "styled-components"
import { NavLink } from "react-router-dom"

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
  width: 100%;
  padding: 20px 15px 20px 20px;
  font-size: 14px;
  color: ${props => props.theme.panelColor};

  & .backdrop{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${props => props.theme.backdrop};
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
    -webkit-box-shadow:  3px 5px 7px rgba(0,0,0,0.5);
    -moz-box-shadow:  3px 5px 7px rgba(0,0,0,0.5);
    /* border: 1px solid ${props => props.theme.panelColor}; */
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
    cursor: grab;
  }

  &:last-child(){
    margin-bottom: 60%;
  }

  &:last-child():not(.backdrop){
    height: 90%;
  }

  ::-webkit-scrollbar {
      -webkit-appearance: none;
      width: 5px;
    }
    ::-webkit-scrollbar-thumb {
      outline: 1px solid ${props => props.theme.panelColor};
      border-radius: 4px;
      background-color: transparent;
      /* transition: 0.3s; */
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: ${props => props.theme.panelColor};
          box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
          -webkit-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
          -moz-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
          /* transition: 0.3s; */
    }
`
export const Sector = styled.div`
border: solid 1px ;
border-color: transparent ${props => props.theme.panelColor} transparent ${props => props.theme.panelColor};
/* border-radius: 75px; */
display: flex;
width: 100%;
flex-direction:row;
padding: 0px 0px 0px 0px;
height: 90%;
justify-content: space-between;
gap: 20px;
position: relative;
overflow: hidden;
backdrop-filter: blur(var(--blur));
-webkit-backdrop-filter: blur(var(--blur));
transition: 1.3s;

& .lot{
  color: ${props => props.theme.panelColor};
  transition: 1.3s;
}
`
export const TextWrapper = styled.div`
  width:40%;
  flex-wrap: wrap;
  color: ${props => props.theme.panelColor};
  font-size: 14px;
  text-align: left;
  height: 100%;
  align-self: center;
  padding-left: 20px;
  display: grid;
  grid-template-rows: 2% 39% 49% 10%;
  transition: 1.3s;
  
  
  @media only screen and (max-width: 768px) {
  width: 50%;
  }

& h3{
  clear:both;
  align-self: flex-end;
}

& h4, & h5{
  align-self: flex-end;
}
& p {
text-indent: 2em;
line-height: 2;
overflow-y: scroll;
  ::-webkit-scrollbar {
      -webkit-appearance: none;
      width: 5px;
      position: absolute;
    }
    ::-webkit-scrollbar-thumb {
      outline: 1px solid ${props => props.theme.panelColor};
      border-radius: 4px;
      background-color: transparent;
      transition: 0.3s;
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: ${props => props.theme.panelColor};
          box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
          -webkit-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
          -moz-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
          transition: 0.3s;
    }
}

& a{
  color: ${props => props.theme.link};
  text-decoration: underline;
}

`
export const ImgWrapper = styled.div`
    width: 60%;
    display: flex;
    height: auto;
    overflow-x: scroll;
    overflow-y: hidden;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 20px;
    padding-bottom: 7px;
    margin-bottom: 1px;
    
    @media only screen and (max-width: 768px) {
      width: 50%;
    }

    .img-thumb:only-child{
      margin: 0 auto;
      padding: 0 27vw;
    }

    .img-thumb{
      overflow: hidden;
      width: 0;
      padding: 0 25vw;
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
    ::-webkit-scrollbar {
  -webkit-appearance: none;
  height: 9px;
}
::-webkit-scrollbar-thumb {
  outline: 1px solid ${props => props.theme.panelColor};
  border-radius: 4px;
  background-color: transparent;
  transition: 0.3s;
  overflow: visible;
}
::-webkit-scrollbar-thumb:hover {
  background-color: ${props => props.theme.panelColor};
      box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
      -webkit-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
      -moz-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
      transition: 0.3s;
}
`
export const Homer = styled(NavLink)`
  height: 100%;
  width: 70%;
  display: flex;
  justify-content: center;
  margin: 9px 0 2px 0;
  padding-top: 3px;
  padding-bottom: 1px;
  border-radius: 120px;
  overflow: visible;

  & svg{
    align-self:center;
    fill: ${props => props.theme.panelColor};
    color: ${props => props.theme.panelColor};
    transition: 2.3s;
  }

  &:hover {
    background-color: ${props => props.theme.LiHover};
    -webkit-box-shadow: 0px 3px 10px 1px ${props => props.theme.LiHover};
    -moz-box-shadow: 0px 3px 10px 1px ${props => props.theme.LiHover};
    box-shadow: 0px 3px 10px 1px ${props => props.theme.LiHover};
    transition: 0.6s;
  }

  &:hover > svg{
    fill: ${props => props.theme.textHover};
    -webkit-filter: drop-shadow(1px 1px 3px ${props => props.theme.textHover});
    filter: drop-shadow(1px 1px 3px ${props => props.theme.textHover});
    transition: 2.3s;
  }

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

export const GlobalStyle = createGlobalStyle`
    //App
    :root{
        --theme: ${props => props.theme.sky};
        --panelWidth: 270px;
        --panelHeight: 270px;
        --panelPadding: 26px 42.5px;
        --headOffset: 10px;
        --edge: 20px;
        --blur: 5px;
    }
    html, body, #root {
        /* isolation: isolate; */
        background-color: ${props => props.theme.sky};
    }
    //Panel
    .Panel {
      background-color: #00000000;
      width: var(--panelWidth);
      height: var(--panelHeight);
      scroll-snap-type: none;
      backdrop-filter: blur(var(--blur));
      -webkit-backdrop-filter: blur(var(--blur));
      mix-blend-mode: ${props => props.theme.blend};
      border: 1px solid ${props => props.theme.panelColor};
      color: ${props => props.theme.panelColor};
      border-radius: 185px;
      overflow: hidden;
    }
    .glow{
      box-shadow: 0 8px 32px 0 ${props => props.theme.panelColor};
      -webkit-box-shadow:  0 8px 32px 0 ${props => props.theme.panelColor};
      -moz-box-shadow:  0 8px 32px 0 ${props => props.theme.panelColor};
      /* transition: 100ms; */
    }

    .li{
      border-radius: 12px;
    }
    .li, .folder {
        color: ${props => props.theme.panelColor};
        transition: 0.9s;
    }
    .folderActive {
      box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
      -webkit-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
      -moz-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
      color:  ${props => props.theme.panelColor};
      font-style: italic;
    }
    .folderActive:hover{
      box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
      -webkit-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
      /* border: 1px solid ${props => props.theme.LiHover} ; */
    }
    .folderActive:after{
      border-radius: 5px;
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
      transition: 0.9s;
    }
    .li:hover > svg {
      fill: ${props => props.theme.textHover};
      stroke: ${props => props.theme.textHover} !important;
      -webkit-filter: drop-shadow(1px 1px 6px ${props => props.theme.textHover});
      filter: drop-shadow(1px 1px 6px ${props => props.theme.textHover});
      /* transition: 0.3s !important; */
    }

    //Stream
    //container for h1 or svg
    

    .hom {
        pointer-events: none;
        width: 100vw;
    }

    .HomeCD{
      padding: 0;
      width: 641.75px !important;
      stroke: ${props => props.theme.panelColor} !important;
      fill: none;
      margin-top: 288px !important;
      margin-left: calc(-1 * var(--panelWidth) + 15px) !important;
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
      display: flex !important;
      align-items: center;
      justify-content: space-between;
      align-content: center;
      flex-direction: column-reverse;
      flex-wrap: nowrap;
      overflow: visible;
      margin: 250px 0 100px 0;
      gap: 60px;
    }
    .contrast{
      fill: ${props => props.theme.panelColor};
      stroke: none;
      width: 90vw;
      transition: 1.3s;
    }

    .contrastWrap{
      text-align: center;
      width: 100%;
      padding: 20px;
    }
    .contrast:hover{
      cursor: wait;
    }
    .contrast:hover{
      fill: ${props => props.theme.sky};
      /* stroke: ${props => props.theme.sky} !important; */
      -webkit-filter: drop-shadow(1px 1px 6px ${props => props.theme.sky});
      filter: drop-shadow(1px 1px 6px ${props => props.theme.sky});
      transition: 0.3s !important;
    }
     .contrast:hover ~ p{
      color: ${props => props.theme.sky};
      text-shadow: 1px 1px 3px ${props => props.theme.sky};
      transition: 0.3s !important;
     }
    .eko{
      height: min-content;
      display: flex;
      align-self: center;
      align-items: center;
      padding: 10px 30px;
      box-shadow: 0 8px 32px 0 ${props => props.theme.panelColor};
      -webkit-box-shadow:  0 8px 32px 0 ${props => props.theme.panelColor};
      -moz-box-shadow:  0 8px 32px 0 ${props => props.theme.panelColor};
      backdrop-filter: blur(var(--blur));
      -webkit-backdrop-filter: blur(var(--blur));
      border: 1px solid;
      border-color:  ${props => props.theme.panelColor};
      border-radius: 200px;
      overflow: visible;
      transition: 1.3s;
    }
    .eko-thumb{
      text-shadow: 1px 1px 10px ${props => props.theme.panelColor};
      font-family: "ekodigital", Helvetica, sans-serif;
      font-weight: 400;
      font-style: normal;
      font-size: 270px;
      vertical-align: middle;
      letter-spacing: -15px;
      padding-left: 15px;
      padding-right: 20px;
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
  .eko {
    flex-direction: row-reverse;
    width: auto;
    /* padding-left: 0; */
  }
  .eko-thumb {
    /* border-left: 1px solid ${props => props.theme.panelColor}; */
    padding-top: 30px;
  }
}

//Mobile
@media only screen and (max-width: 768px) {
  .nablaWrapper{
    background-color: transparent;
  }
  .Panel{
    mix-blend-mode: normal;
    width: 50vw;
    padding: 0 10px 30px 10px;
    /*Border*/
    /* --aug-bl: 12px;
    --aug-tl: 12px;
    --aug-br: 25px;
    --aug-tr: 10px; */
  }
  .nav{
    height: min-content;
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
    margin-left: 0;

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
    padding-bottom: 30px;
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