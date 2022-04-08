import React from 'react'
import { Container } from '../UI/style'
// import { useSnapshot } from 'valtio'
// import { state } from '../UI/state'
import { ContrastLogo } from "../UI/svg";
import styled from 'styled-components';
import useDocumentTitle from '../UI/documentTitle';

const ContrastWrap = styled.div`
    text-align: center;
    width: 100%;
    padding: 20px;
    color: ${props => props.theme.sky};
    .contrast{
      fill: ${props => props.theme.sky};
            -webkit-filter: drop-shadow(1px 1px 6px ${props => props.theme.sky});
      filter: drop-shadow(1px 1px 6px ${props => props.theme.sky});
      stroke: none;
      width: 90vw;
    }
    .contrast:hover{
      cursor: wait;
    }
    .contrast:hover{
      fill: ${props => props.theme.panelColor};
      /* stroke: ${props => props.theme.sky} !important; */
      -webkit-filter: drop-shadow(1px 1px 6px ${props => props.theme.panelColor});
      filter: drop-shadow(1px 1px 6px ${props => props.theme.panelColor});
      transition: 17s !important;
    }
     .contrast:hover ~ p{
      color: ${props => props.theme.panelColor};
      text-shadow: 1px 1px 3px ${props => props.theme.panelColor};
      transition: 17s !important;
     }
`
function Contrast() {
    useDocumentTitle("Contrast")
    // const snap = useSnapshot(state);
    // const nodeRef = useRef(null);
    return (
        <>
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
