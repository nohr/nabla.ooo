import React from "react";
import { state } from '../UI/state'
import { useSnapshot } from 'valtio'
import '../../App.css'
import { Container } from "../UI/style"
import PageData from "./PageData";
import Modal from "../UI/Modal";
import useDocumentTitle from '../UI/documentTitle'
import { HeadSVG } from '../UI/svg'
import styled from "styled-components";


export const Head = styled.div`
      pointer-events: none;
      position: absolute;
      display: flex;
      align-items: center;
      z-index: 550;
      height: var(--panelHeight);
      width: fit-content;
      margin-top: 20px;
      /* ${props => props.margin} */
      margin-left: calc(var(--panelWidth) + var(--headOffset));
      mix-blend-mode: ${props => props.theme.blend} !important;
      /* opacity: 1; */

    & h1{
        justify-self: flex-start;
        position: absolute;
        font-size: 14vw;
        height: 70px;
        line-height: 60px;
        color: transparent;
        -webkit-text-stroke-width: 1px;
        margin: var(--headOffset);
        font-family: "helvetica";
        font-weight: 400;
        font-style: normal;
        -webkit-text-stroke-color: ${props => props.theme.panelColor};
        /* transition: 1.3s; */
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    @media only screen and (min-width: 1366px) {
  h1 {
    font-size: 12vw;
  }
}
    & svg {
      fill: none !important;
      stroke:  ${props => props.theme.panelColor} !important;
      stroke-width: 1px;
      position: absolute;
      width: 35vw;
      height: auto;
      overflow: visible;
      margin: 20px 20px;
      /* transition: 1.3s; */
    }
` 
//offset head
    
function Page(id) {
    // const margin = state.setSwitched ? "margin-left: -40vw !important;" : "margin-left: calc(var(--panelWidth) + var(--headOffset));" 
    useDocumentTitle(id.title);
    const snap = useSnapshot(state);
    
    return (
        <>  
            <Head className="head"
                // margin={margin}
            >
                    <HeadSVG id={id.id}/>
            </Head>
            <Container className="container">
                <PageData id={id.id}/>
                    {snap.selectedImg ? <Modal /> : null}
            </Container>
        </>
    )
}

const Results = React.memo(function Results() {
    // const margin = state.setSwitched ? "margin-left: -40vw !important;" : "margin-left: calc(var(--panelWidth) + var(--headOffset));" 
    useDocumentTitle("Results")
    const snap = useSnapshot(state);
    console.log(state.query);
    return (
        <>
            <Head className="head"
                // margin={margin}
            >
                    <HeadSVG id={snap.query}/>
            </Head>
            <Container className="container">
                <div>
                    {snap.query}
                </div>
            </Container>
        </>
    )
})

export { Page, Results }
