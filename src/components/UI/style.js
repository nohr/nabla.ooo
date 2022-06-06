//Styling for the UI - proceed with caution
import styled, { createGlobalStyle } from "styled-components"

export const Sector = styled.div`
border: solid 1px;
border-color: ${props => props.theme.panelColor};
border-radius: 10px;
display: flex;
width: 48%;
height: 90%;
flex-direction:column;
padding: 10px 0px 0px 0px;
justify-content: space-around;
gap: 20px;
position: relative;
overflow: hidden;
transition: 1.3s;

& .lot{
  color: ${props => props.theme.panelColor};
  transition: 1.3s;
}
    @media screen and (max-width: 1440px) {
      & {
        width: 80%;
        height: 80%;
      }
  }
  @media screen and (max-width: 940px) {
      & {
        width: 100%;
        height: 100%;
      }
  }
  @media screen and (max-height: 1040px) {
      & {
        /* width: 80%; */
        height: 100%;
      }
  }
`
export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width:100%;
  height: 30% !important;
  flex-wrap: nowrap;
  color: ${props => props.theme.panelColor};
  font-size: 14px;
  text-align: left;
  align-self: center;
  padding: 20px 20px 0 20px;
  transition: 1.3s;
  white-space: break-spaces;
  /* line-height: 25px; */

& h2{
  line-height: 30px;
  font-size: 40px;
  clear:both;
  align-self: center;
    text-align: center;
}

& h4, & h5{
  align-self: center;
  margin: 5px 0;
}

& h4{
  justify-self: center;
}
& h5.last{
  justify-self: flex-end;
}
& p {
  width: 60ch;
  display: inline;
  padding: 0% 3px;
  background-color: ${props => props.theme.layerBG};
  text-indent: 3em;
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
export const TrayWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
  height: 70% !important;
    padding:0 20px 10px 20px ;
    gap: 20px;
  
`
export const ImgWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    overflow-x: scroll;
    overflow-y: hidden;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 20px;
    margin-bottom: 1px;

    .img-thumb{
      border-radius: 5px;
      overflow: hidden;
      width: 0px;
      padding: 0 280px;
      position: relative;
      opacity: 1;
      pointer-events: all;
      border: 1px solid ${props => props.theme.panelColor};
      filter: grayscale(1);
      transition: 0.3s;

      &:hover{
      cursor: pointer;
      border-radius: 50%;
      }
    }
    .img-thumb:hover, video:hover {
      filter: grayscale(0) !important;
    }
    object{
      @media only screen and (max-width: 1440px) {
        grid-template-rows: 35% 30% 35%;
        padding: 0 20px 0 20px;
      }
    /* max-height: 100%; */
    min-width: 100%;
    max-height: 150%;
    position: absolute;
    pointer-events:  all;
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
      border-radius: 5px;
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    opacity: 1;
    object-fit: contain;
    margin: 0;
    padding: 0;
      filter: grayscale(1) !important;
      transition: 0.3s;

      &:hover{
      filter: grayscale(0);
      transition: 0.3s;
      }
    }
    .landscape{
    height: 100% !important;
    width: auto !important;
    }
    video[poster]{
      border-radius: 5px;
      object-fit: fill;
      filter: grayscale(1);
      transition: 0.3s;
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
export const InfoCard = styled.div`
    display: flex;
    overflow-y: scroll;
    flex-direction: column;
    margin-bottom: 1px;
    white-space: break-spaces;
    line-height: 25px;   
    height: 100%;
    width: 50% !important;
    padding-right: 0;
    text-align: justify;

    & p {
      height: min-content;
      padding: 10px;
      border-radius: 10px;
      display: inline;
      background-color: ${props => props.theme.layerBG};
      /* text-indent: 3em; */
      overflow-y: scroll !important;

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
        --blur: 7px;
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
      mix-blend-mode: ${props => props.theme.blend};
      box-shadow: 0 8px 32px 0 ${props => props.theme.panelColor};
      -webkit-box-shadow:  0 8px 32px 0 ${props => props.theme.panelColor};
      -moz-box-shadow:  0 8px 32px 0 ${props => props.theme.panelColor};
      /* transition: 1s; */
      /* animation: pulseItem 2s infinite; */
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