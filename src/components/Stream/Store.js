import React, { useRef } from "react"
import "../../App.css"
// import { state } from "../UI/state"
// import { useSnapshot } from "valtio"
import { Container } from "./Page";
import { HashLink } from "react-router-hash-link";
import styled from "styled-components";
import useFontFaceObserver from "use-font-face-observer";
import { DiagonalArrow, Header } from "../UI/svg";


const StoreContainer = styled.div`
  display: flex !important;
  align-items: center;
  justify-content: space-between;
  align-content: center;
  flex-direction: column-reverse;
  flex-wrap: nowrap;
  overflow: visible;
  gap: 60px;

    .eko{
      height: 525px;
      display: grid;
      grid-template-rows: 65% 35%;
      justify-items: center;
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
      font-family: "ekodigital", Helvetica, sans-serif !important;
      font-weight: 400;
      font-style: normal;
      font-size: 350px;
      font-display: block;
      vertical-align: middle;
      letter-spacing: -15px;
      -webkit-user-select: none; /* Safari */
      -moz-user-select: none; /* Fiefox */
      -ms-user-select: none; /* IE10+/Edge */
      user-select: none; /* Standard */
      transition: 2.3s;
      /* filter: blur(30px); */
    }

    /* .eko-thumb:hover{
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
} */

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
      padding: 0.5% 10px;
      font-style: normal !important;
      vertical-align: middle;
      display: flex;
      justify-content: center;
      align-items: center;

    }
    
    a{
      /* height: min-content; */
      width: max-content;
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
    a:hover{
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
      -webkit-box-shadow: 0px 3px 10px 1px #c94343;
      -moz-box-shadow: 0px 3px 10px 1px #c94343;
      box-shadow: 0px 3px 10px 1px #c94343;
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



function Store(props) {
  const ekoRef = useRef(null);
  // function FontObserver() {
  //   const isFontListLoaded = useFontFaceObserver([
  //     {
  //       family: `ekodigital`,
  //     },
  //   ]);
  //   if (isFontListLoaded) {
  //     ekoRef.current.setAttribute("style", "filter: blur(0px);")
  //   }
  // }

  return (
    <>
      <Header id={"store"} />
      <Container className="container"
        opacity={props.opacity}
        pointerEvents={props.pointerEvents}
        transition={props.transition}
      >
        <StoreContainer>
          <div className="eko">
            <div className="eko-thumb" ref={ekoRef} >
              Aa
            </div>
            <div className="desc">
              <HashLink className="title w" to="/nabla#EkoDigital">
                Eko Digital
                <DiagonalArrow />
              </HashLink>
              My first display font offers a stencil with a distinct futuristic style. <br />
              <i style={{ opacity: ".5" }}>It"s just what your acid graphics were missing!</i>
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