import React from 'react'
import { Container } from '../UI/style'
// import { useSnapshot } from 'valtio'
// import { state } from '../UI/state'
import { Head } from './Page'
import { ContrastLogo } from "../UI/svg";
import styled from 'styled-components';
// import Draggable from 'react-draggable'
// import { HeadSVG } from "../UI/svg";
//TODO: Replace with HeadSVG

const ContrastWrap = styled.div`
    text-align: center;
    width: 100%;
    padding: 20px;

    .contrast{
      fill: ${props => props.theme.panelColor};
      stroke: none;
      width: 90vw;
      transition: 1.3s;
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
`
function Contrast() {
    // const snap = useSnapshot(state);
    // const nodeRef = useRef(null);
    return (
        <>
            <Head className="head">
                {/* <Draggable nodeRef={nodeRef} position={snap.prtPosition} onStart={() => false}>
                    <h1 ref={nodeRef}>contrast</h1>
                </Draggable> */}
            </Head>
            <Container className="container">
                <ContrastWrap>
                    <ContrastLogo />
                    <p>It's ready when it's ready!</p>
                </ContrastWrap>
            </Container>
        </>
    )
}

export default Contrast
