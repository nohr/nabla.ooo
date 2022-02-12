import React, { useRef } from "react"
import '../../App.css'
import Draggable from "react-draggable";
import { Head } from "./Page";
import { state } from '../UI/state'
import { useSnapshot } from 'valtio'
import { Container } from "../UI/style";
import useDocumentTitle from "../UI/documentTitle";
import { HashLink } from 'react-router-hash-link';
import styled from "styled-components";
import useFontFaceObserver from "use-font-face-observer";
import { DiagonalArrow } from "../UI/svg";

// import { HeadSVG } from "../UI/svg";
//TODO: Replace with HeadSVG

const StoreContainer = styled.div`
  display: flex !important;
  align-items: center;
  justify-content: space-between;
  align-content: center;
  flex-direction: column-reverse;
  flex-wrap: nowrap;
  overflow: visible;
  gap: 60px;

    @font-face {
  font-family: "ekodigital";
  src: url("https://firebasestorage.googleapis.com/v0/b/nabla7.appspot.com/o/assets%2Fekodigital-webfont.woff2?alt=media&token=2ecf835d-a956-4f86-a8c3-11819f2a11ec")
      format("woff2"),
    url("https://firebasestorage.googleapis.com/v0/b/nabla7.appspot.com/o/assets%2Fekodigital-webfont.woff?alt=media&token=08ac051d-78bb-4c67-b26c-a3a184cba89d")
      format("woff");
  font-weight: normal;
  font-style: normal;
}

    .eko{
      height: 525px;
      display: flex;
      align-self: center;
      align-items: center;
      flex-direction: column;
      padding: 50px;
      box-shadow: 0 8px 32px 0 ${props => props.theme.panelColor};
      -webkit-box-shadow:  0 8px 32px 0 ${props => props.theme.panelColor};
      -moz-box-shadow:  0 8px 32px 0 ${props => props.theme.panelColor};
      backdrop-filter: blur(var(--blur));
      -webkit-backdrop-filter: blur(var(--blur));
      border: 1px solid;
      border-color:  ${props => props.theme.panelColor};
      border-radius: 500px;
      overflow: visible;
      transition: 1.3s;
    }
    .eko:hover{
  	animation: pulseItem 4s infinite;
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

    .eko-thumb{
      text-shadow: 1px 1px 10px ${props => props.theme.LiHover};
      color: ${props => props.theme.LiHover};
      font-family: "ekodigital", Helvetica, sans-serif;
      font-weight: 400;
      font-style: normal;
      font-size: 270px;
      font-display: block;
      vertical-align: middle;
      letter-spacing: -15px;
      -webkit-user-select: none; /* Safari */
      -moz-user-select: none; /* Firefox */
      -ms-user-select: none; /* IE10+/Edge */
      user-select: none; /* Standard */
      transition: 2.3s;
      filter: blur(30px);
  	animation: pulse 4s infinite;
    }

    @keyframes pulse {
	0% {
		text-shadow: 1px 1px 10px ${props => props.theme.LiHover};
	}

	50% {
		text-shadow: 1px 1px 30px ${props => props.theme.LiHover};
	}

	100% {
		text-shadow: 1px 1px 10px ${props => props.theme.LiHover};
	}
}

  .desc {
      padding: 0 20px;
      line-height: 25px;
      align-self: center;
      display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    }
  .title {
      padding: 0.5% 0;
      font-style: normal !important;
      vertical-align: middle;
      display: flex;
      justify-content: center;
      padding-bottom: 10px;
    }
    
    .title a{
      width: fit-content;
      background-color:  ${props => props.theme.LiHover};
      -webkit-box-shadow: 0px 3px 10px 1px  ${props => props.theme.LiHover};
      -moz-box-shadow: 0px 3px 10px 1px  ${props => props.theme.LiHover};
      box-shadow: 0px 3px 10px 1px  ${props => props.theme.LiHover};
      color: #ebebeb !important;
      font-style: italic;
      align-self: center;
      display: inline-block;
      vertical-align: baseline;
      padding: 0 10px;
      text-shadow: 1px 1px 3px rgba(235, 235, 235, 0.5);
      border-radius: 30px;
    }
    .title a:hover{
      text-shadow: 1px 1px 10px ${props => props.theme.LiHover};
      box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
      -webkit-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
      -moz-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
      color:  ${props => props.theme.panelColor};
      transition: 1.3s;
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
      align-self: center;
      -webkit-user-select: none; /* Safari */
      -moz-user-select: none; /* Firefox */
      -ms-user-select: none; /* IE10+/Edge */
      user-select: none; /* Standard */
      border-radius: 30px;
    }
    .buyBtn:hover {
      background-color: ${props => props.theme.LiHover};
      -webkit-box-shadow: 0px 3px 10px 1px ${props => props.theme.LiHover};
      -moz-box-shadow: 0px 3px 10px 1px ${props => props.theme.LiHover};
      box-shadow: 0px 3px 10px 1px ${props => props.theme.LiHover};
    }
`

function Store() {
  useDocumentTitle("Store @ Nabla");
  const snap = useSnapshot(state);
  const nodeRef = useRef(null);
  const ekoRef = useRef(null);

  const isFontListLoaded = useFontFaceObserver([
    {
      family: `ekodigital`,
    },
  ]);

  if (isFontListLoaded) {
    ekoRef.current.setAttribute("style", "filter: blur(0px);")
  }

  // const eko = new FontFaceObserver('Output Sans');
  // console.log(eko);


  // isFontListLoaded ? ekoRef.current.setAttribute("style", "filter: blur(0px);") : ekoRef.current.setAttribute("style", "filter: blur(30px);");


  return (
    <>
      <Head className="head">
        <Draggable nodeRef={nodeRef} position={snap.prtPosition} onStart={() => false}>
          <h1 ref={nodeRef} >store</h1>
        </Draggable>
      </Head>
      <Container className="container">
        <StoreContainer>
          <div className="eko">
            <div className="eko-thumb" ref={ekoRef}>
              Aa
            </div>
            <div className="desc">
              <div className="title"> <HashLink to={"/nabla#EkoDigital"}> Eko Digital <DiagonalArrow /></HashLink></div>
              My first display font offers a stencil with a distinct futuristic style. <br />
              <i style={{ opacity: ".5" }}>It's just what your acid graphics were missing!</i>
              <br />
              <a className="buyBtn" href="https://nablaooo.gumroad.com/l/ekodigi" target="_blank" rel="noopener noreferrer">
                $30
              </a>
            </div>
          </div>
        </StoreContainer>
      </Container>
    </>
  )
}
export default Store;