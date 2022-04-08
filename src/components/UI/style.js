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
  overflow-y: overlay;
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

  /* &:last-child(){
    margin-bottom: 60%;
  } */

  &:last-child():not(.backdrop){
    height: 90%;
  }

  ::-webkit-scrollbar {
      -webkit-appearance: none;
      width: 5px;
      display: flex;
    }
    ::-webkit-scrollbar-thumb {
      background-color:${props => props.theme.panelColor};
      border-radius: 4px;
      /* transition: 0.3s; */
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: ${props => props.theme.panelColor};
          box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
          -webkit-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
          -moz-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
          /* transition: 0.3s; */
    }
    .oldNabla{
      fill: ${props => props.theme.panelColor};
      overflow: visible;
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%,-60%);
    }
`
export const Sector = styled.div`
border: solid 1px ;
border-color: transparent ${props => props.theme.panelColor} transparent ${props => props.theme.panelColor};
border-radius: 10px;
display: flex;
width: 100%;
flex-direction:column;
padding: 0px 0px 0px 0px;
height: 90%;
justify-content: space-between;
gap: 20px;
position: relative;
overflow: hidden;
/* backdrop-filter: blur(var(--blur)); */
/* -webkit-backdrop-filter: blur(var(--blur)); */
transition: 1.3s;

& .lot{
  color: ${props => props.theme.panelColor};
  transition: 1.3s;
}
`
export const TextWrapper = styled.div`
  width:100%;
  flex-wrap: wrap;
  color: ${props => props.theme.panelColor};
  font-size: 14px;
  text-align: left;
  height: 40% !important;
  align-self: center;
  padding: 0 280px 0 280px;
  display: grid;
  grid-template-rows: 2% 35% 5% 58%;
  transition: 1.3s;
  
  @media only screen and (max-width: 768px) {
  width: 50%;
  }

& h2{
  clear:both;
  align-self: flex-end;
    text-align: center;
}

& h4, & h5{
  align-self: center;
  margin: 5px 0;
}
& p {
text-indent: 3em;
line-height: 2;
overflow-y: scroll;
padding: 0 !important;
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
    width: 100%;
    display: flex;
    height: 60% !important;
    overflow-x: scroll;
    overflow-y: hidden;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 20px;
    padding:0 20px 10px 20px ;
    margin-bottom: 1px;
    
    @media only screen and (max-width: 768px) {
      width: 50%;
    }

    .img-thumb{
      overflow: hidden;
      width: 0;
      padding: 0 257px;
      position: relative;
      opacity: 1;
      pointer-events: all;
      border: 1px solid ${props => props.theme.panelColor} ;
    }

    .img-thumb:hover{
      cursor: pointer;
    }

    object{
    /* max-height: 100%; */
    min-width: 100%;
    max-height: 120%;
    /* max-width: 150%; */
    position: absolute;
    pointer-events:  none;
    top: 0%;
    left: 50%;
    transform: translate(-50%, -0%);
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
    opacity: 1;
    object-fit: contain;
    margin: 0;
    padding: 0;
    }

    .landscape{
    height: 100% !important;
    width: auto !important;
    }

    video[poster]{
      object-fit: fill;
    }
    ::-webkit-scrollbar {
  -webkit-appearance: none;
  height: 9px;
}
::-webkit-scrollbar-thumb {
  background-color: ${props => props.theme.panelColor};
  border-radius: 4px;
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
        --blur: 2px;
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
      /* transition: 1s; */
      animation: pulseItem 2s infinite;
    }

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
  font-style: italic;
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
`