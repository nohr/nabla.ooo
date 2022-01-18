import React, { useRef } from 'react'
import { Container } from '../UI/style'
import { useSnapshot } from 'valtio'
import { state } from '../UI/state'
import { Head } from './Page'
import { ContrastLogo } from "../UI/svg";
// import Draggable from 'react-draggable'
// import { HeadSVG } from "../UI/svg";
//TODO: Replace with HeadSVG

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
                <div className="contrastWrap">
                    <ContrastLogo />
                    <p>It's ready when it's ready!</p>
                </div>
            </Container>
        </>
    )
}

export default Contrast
