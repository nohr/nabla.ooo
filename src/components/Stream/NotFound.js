import React, { useRef } from "react";
import '../../App.css'
import Draggable from "react-draggable";
import { state } from '../UI/state'
import { useSnapshot } from 'valtio'
import useDocumentTitle from "../UI/documentTitle";
import { Container } from "../UI/style";
// import { HeadSVG } from "../UI/svg";
//TODO: Replace with HeadSVG

const NotFound = () => {
    const snap = useSnapshot(state);
    useDocumentTitle("404 @ Nabla");
    const nodeRef = useRef(null);

    return (
        <>
            <div className="head">
                <Draggable position={snap.prtPosition} onStart={() => false}>
                    <h1 ref={nodeRef} >404</h1>
                </Draggable>
            </div>
            <Container className="container notfound">
                <p>Can't find this page!</p>
            </Container>

        </>
    )
}

export default NotFound

