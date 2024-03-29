import React from "react";
// import { useSnapshot } from 'valtio'
// import { state } from '../UI/state'
import { ContrastLogo } from "../../../../common/svg";
import styled from "styled-components";
import { useDocumentTitle } from "../utils";
import { Container } from "../page.style";

const ContrastWrap = styled.div`
  text-align: center;
  width: 100%;
  padding: 20px;
  color: ${(props) => props.theme.sky};
  .contrast {
    fill: ${(props) => props.theme.sky};
    -webkit-filter: drop-shadow(1px 1px 6px ${(props) => props.theme.sky});
    filter: drop-shadow(1px 1px 6px ${(props) => props.theme.sky});
    stroke: none;
    width: 90vw;
  }
  .contrast:hover {
    cursor: wait;
  }
  .contrast:hover {
    fill: ${(props) => props.theme.panelColor};
    /* stroke: ${(props) => props.theme.sky} !important; */
    -webkit-filter: drop-shadow(
      1px 1px 6px ${(props) => props.theme.panelColor}
    );
    filter: drop-shadow(1px 1px 6px ${(props) => props.theme.panelColor});
    transition: 17s !important;
  }
  .contrast:hover ~ p {
    color: ${(props) => props.theme.panelColor};
    text-shadow: 1px 1px 3px ${(props) => props.theme.panelColor};
    transition: 17s !important;
  }
`;
function Contrast(props) {
  useDocumentTitle("Contrast");
  // const snap = useSnapshot(state);
  // const nodeRef = useRef(null);
  return (
    <>
      <Container
        ref={props.container}
        className="container"
        opacity={props.opacity}
        pointerEvents={props.pointerEvents}
        transition={props.transition}
      >
        <ContrastWrap>
          <ContrastLogo />
          <p>It's ready when it's ready!</p>
        </ContrastWrap>
      </Container>
    </>
  );
}

export default Contrast;
