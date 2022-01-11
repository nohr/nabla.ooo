import React, { useRef } from 'react'
import { Container } from '../UI/style'
import Draggable from 'react-draggable'
import { useSnapshot } from 'valtio'
import { state } from '../UI/state'
// import { HeadSVG } from "../UI/svg";
//TODO: Replace with HeadSVG

function Blog() {
    const snap = useSnapshot(state);
    const nodeRef = useRef(null);
    return (
        <>
            <div className="head">
                <Draggable nodeRef={nodeRef} position={snap.prtPosition} onStart={() => false}>
                    <h1 ref={nodeRef}>blog</h1>
                </Draggable>
            </div>
            <Container className="container">
                <div>
                    HI!
                </div>
            </Container>
        </>
    )
}

export default Blog
