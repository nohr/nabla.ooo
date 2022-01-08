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
`
export const Sector = styled.div`
border: solid 1px ;
border-color: transparent ${props => props.theme.panelColor} transparent ${props => props.theme.panelColor};
/* border-radius: 75px; */
display: flex;
width: 100%;
flex-direction:row;
padding: 0px 20px 0px 0px;
height: 90%;
justify-content: space-between;
gap: 20px;
position: relative;
overflow: hidden;
backdrop-filter: blur(var(--blur));
-webkit-backdrop-filter: blur(var(--blur));

& .lot{
  color: ${props => props.theme.panelColor};
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
  grid-template-rows: 2% 38% 50% 10%;
  
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
    
    @media only screen and (max-width: 768px) {
      width: 50%;
    }

    .img-thumb:only-child{
      margin: 0 auto;
      padding: 0 28vw;
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
`
export const Navagator = styled.div`
//nav
  padding: 0em 42.5px 30px 42.5px;
  position: fixed;
  left: var(--edge);
  top: var(--edge);
  z-index: 5000;
  text-indent: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;

    & .li{
    width: 80%;
    align-self: center;
    }

    .folder{
      padding-right: 5px;
    }

  & .speaker{
    cursor: pointer;
    position: absolute;
    z-index: 500;
    width: 12px;
    top: 5%;
    left: 50%;
    transform: translate(-50%, 0);
  }

  & .grabber{  
    cursor: grab;
    width: 50px;
    position: absolute;
    z-index: 500;
    left: 50%;
    bottom: 2%;
    transform: translate(-50%, 0);
    stroke: ${props => props.theme.panelColor};
    fill: ${props => props.theme.panelColor};
    fill-opacity: 0% !important; 
    stroke-width: 1px !important;
  }

  & .speaker{
    fill: ${props => props.theme.panelColor};
  	animation: pulse 2s infinite;
}

@keyframes pulse {
	0% {
		transform: scale(0.8);
	}

	70% {
		transform: scale(1);
	}

	100% {
		transform: scale(0.8);
	}
}

  & .speaker:hover {
    fill: ${props => props.theme.LiHover};
    -webkit-filter: drop-shadow(1px 1px 3px ${props => props.theme.LiHover});
    filter: drop-shadow(1px 1px 3px ${props => props.theme.LiHover});
    transition: 0.3s;
  }

  & .grabber:not(:hover){
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
    bottom: 3%;
    transform: translate(-50%, 0);
  }
  .spinner path{
    fill: ${props => props.theme.panelColor};
  }
`
export const Setter = styled.div`
//setings
  padding: var(--panelPadding);
  position: absolute;
  z-index: 4900;
  left: var(--edge);
    display: flex;
    margin: 20px 0;
    flex-direction: column;
    justify-content: flex-start;

  *{
    width: min-content;
    scroll-behavior: smooth;
  }

  .li{
    justify-content: center;
    width: 70%;
    margin: 0 auto 6px auto;
    position: relative;
  }

  p{
    margin: 3px auto 5px auto;
    text-align: center;
    width: 90%;
    border-bottom: 1px solid ${props => props.theme.panelColor};
  }
  
  .modeIcon, .muteIcon, .ShowHideIcon{
    position: absolute;
    left: 5px;
    width: 10px;
    fill: ${props => props.theme.panelColor};
    overflow: visible;
    align-self: left;
    margin-right: auto;
    margin-left: 5px;
  }
  .PlayPauseIcon{
    position: absolute;
    left: 5px;
    height: 10px;
    fill: ${props => props.theme.panelColor};
    overflow: visible;
    align-self: left;
    margin-right: auto;
    margin-left: 5px;
  }
`
export const Porter = styled.div`
//projects
  padding: var(--panelPadding);
  position: absolute;
  z-index: 3500;
  left: var(--edge);
  margin: 20px 0;
  text-align: center;
    overflow: scroll !important;

  &::-webkit-scrollbar{
    display: none;
  }
  & .li{
    width: 70%;
    margin: 0 auto 6px auto;
  }
  p{
    margin: 3px auto 5px auto;
    text-align: center;
    width: 90%;
    border-bottom: 1px solid ${props => props.theme.panelColor};
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
    /* -webkit-filter: drop-shadow(1px 1px 3px ${props => props.theme.panelColor});
    filter: drop-shadow(1px 1px 3px ${props => props.theme.panelColor}); */
  }

  &:hover {
    background-color: ${props => props.theme.LiHover};
    -webkit-box-shadow: 0px 3px 10px 1px ${props => props.theme.LiHover};
    -moz-box-shadow: 0px 3px 10px 1px ${props => props.theme.LiHover};
    box-shadow: 0px 3px 10px 1px ${props => props.theme.LiHover};
    transition: 0.3s;
  }

  &:hover > svg{
    fill: ${props => props.theme.textHover};
    -webkit-filter: drop-shadow(1px 1px 3px ${props => props.theme.textHover});
    filter: drop-shadow(1px 1px 3px ${props => props.theme.textHover});
    transition: 0.3s;
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
export const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 89%;
  margin: 0 auto;
`
export const SearchBar = styled.input`
  border: none !important;
  width: 100%;
  margin: 3px 0;
  display: flex;
  border-radius: 12px;
  background-color: transparent;
  box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
  -webkit-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor}; 
  -moz-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor}; 
  color:  ${props => props.theme.textHover};
  padding: 2px 19px 2px 19px;
  user-select: text;
  -moz-user-select: text;
  -webkit-user-select: text;
  font-size: 13px;
  cursor: not-allowed;

  @media only screen and (max-width: 768px) {
  padding: 6px 19px 6px 20px;
  outline: 1px solid ${props => props.theme.panelColor};
  font-size: 18px;
  }

  &::placeholder{
    color: ${props => props.theme.panelColor};
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
  }

  &:hover::placeholder{
    color: ${props => props.theme.textHover};
  }
  &:hover{
    background-color:${props => props.theme.LiHover};
    box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
    -webkit-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor}; 
    -moz-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor}; 
    transition: 0.3s;
  }
  &:focus::placeholder{
    color: ${props => props.theme.textHover};
    transition: 0.3s;
  }
  &:focus{
    background-color:${props => props.theme.LiHover};
    outline: 1px solid ${props => props.theme.textHover};
    box-shadow: 0 0 50px 50px  ${props => props.theme.LiHover};
    -webkit-box-shadow: 0 0 50px 50px  ${props => props.theme.LiHover};
    -moz-box-shadow: 0 0 50px 50px  ${props => props.theme.LiHover};
    transition: 0.3s;
  }

  &:focus ~ #searchIcon{
    fill: ${props => props.theme.textHover} !important;
  }
  &:focus ~ #clearIcon svg{
    fill: ${props => props.theme.textHover} !important;
  }
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
          isolation: isolate;
        background-color: ${props => props.theme.sky};
    }
    //Panel
    .Panel {
      background-color: #00000000;
      width: var(--panelWidth);
      height: var(--panelHeight);
      scroll-snap-type: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      backdrop-filter: blur(var(--blur));
      -webkit-backdrop-filter: blur(var(--blur));
      mix-blend-mode: ${props => props.theme.blend};
      border: 1px solid ${props => props.theme.panelColor};
      color: ${props => props.theme.panelColor};
      border-radius: 185px;
      overflow: hidden;
    }
    .grabbing{
      box-shadow: 0 8px 32px 0 ${props => props.theme.LiHover};
      -webkit-box-shadow:  0 8px 32px 0 ${props => props.theme.LiHover};
      -moz-box-shadow:  0 8px 32px 0 ${props => props.theme.LiHover};
      transition: 0.3s;
    }
    .header {
        border-bottom: 1px solid ${props => props.theme.panelColor};
        margin: 0 0 2px 0;
        padding: 22px 0px 8px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .li{
      border-radius: 12px;
    }
    .li, .folder {
        color: ${props => props.theme.panelColor};
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
      text-shadow: 1px 1px 3px #ebebeb;
      transition: 0.3s;
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

    //Stream
    //container for h1 or svg
    .head{
      pointer-events: none;
      position: absolute;
      display: flex;
      align-items: center;
      z-index: 550;
      height: var(--panelHeight);
      width: fit-content;
      margin-top: 20px;
      margin-left: calc(var(--panelWidth) + var(--headOffset));
      mix-blend-mode: ${props => props.theme.blend} !important;
    }
    h1{
        justify-self: flex-start;
        position: absolute;
        font-size: 5vw;
        color: transparent;
        -webkit-text-stroke-width: 1px;
        margin: var(--headOffset);
        font-family: "helvetica";
        font-weight: 400;
        font-style: normal;
        -webkit-text-stroke-color: ${props => props.theme.panelColor};
    }
    .head svg {
      fill: none !important;
      stroke:  ${props => props.theme.panelColor} !important;
      stroke-width: 1px;
      position: absolute;
      width: 35vw;
      height: auto;
      overflow: visible;
      margin: 20px 20px;
    }

    .hom {
        pointer-events: none;
        width: 100vw;
    }

    .HomeCD{
      padding: 0;
      width: 491.75px !important;
      stroke: ${props => props.theme.panelColor} !important;
      fill: none;
      margin-top: 154px !important; 
      margin-left: calc(-1 * var(--panelWidth)) !important;
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
      align-content: flex-start;

    }
    .contrast{
      fill: ${props => props.theme.panelColor};
      stroke: none;
      width: 60vw;
    }
    .contrastWrap{
      text-align: center;
      width: 70vw;
      border-bottom: 1px solid ${props => props.theme.panelColor};
    }
    .eko{
      height: min-content;
      display: flex;
      align-self: center;
      align-items: center;
      padding: 10px 30px;
      box-shadow: 0 8px 32px 0 ${props => props.theme.LiHover};
      -webkit-box-shadow:  0 8px 32px 0 ${props => props.theme.LiHover};
      -moz-box-shadow:  0 8px 32px 0 ${props => props.theme.LiHover};
      backdrop-filter: blur(var(--blur));
      -webkit-backdrop-filter: blur(var(--blur));
      border: 1px solid;
      border-color:  ${props => props.theme.panelColor};
      border-radius: 200px;
      overflow: visible;
    }
    .eko-thumb{
      text-shadow: 1px 1px 10px ${props => props.theme.panelColor};
      font-family: "ekodigital", Helvetica, sans-serif;
      font-weight: 400;
      font-style: normal;
      font-size: 270px;
      vertical-align: middle;
      letter-spacing: -15px;
      padding-right: 15px;
      padding-left: 20px;
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
@media only screen and (min-width: 1366px) {
  h1 {
    font-size: 12vw;
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
  h1 {
    font-size: 14vw;
    height: 70px;
    line-height: 60px;
  }
  .eko {
    flex-direction: row;
    width: auto;
    padding-right: 0;
  }
  .eko-thumb {
    border-right: 1px solid ${props => props.theme.panelColor};
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

  .prt{
    /* width: max-content; */
     /*Border*/
     /* --aug-bl: 9px;
    --aug-tl: 9px;
    --aug-br: 25px;
    --aug-tr: 13px; */
    .w{
    text-indent: 0 !important;
    }
    /* height: 80vw; */
    overflow-x: scroll;
  }

  .prt .li{
    padding-right: 0px;
    text-align: center;
  }

  .set{
    padding: 20px;
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