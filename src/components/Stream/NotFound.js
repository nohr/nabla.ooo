import React, { useRef } from "react";
import '../../App.css'
import Draggable from "react-draggable";
import { state } from '../UI/state'
import { useSnapshot } from 'valtio'
import useDocumentTitle from "../UI/documentTitle";
import { Container } from "../UI/style";
import { Head } from "./Page";
// import { HeadSVG } from "../UI/svg";
//TODO: Replace with HeadSVG

const NotFound = () => {
    const snap = useSnapshot(state);
    useDocumentTitle("404 @ Nabla");
    const nodeRef = useRef(null);

    return (
        <>
            <Head className="head">
                <Draggable position={snap.prtPosition} onStart={() => false}>
                    <h1 ref={nodeRef} >404</h1>
                </Draggable>
            </Head>
            <Container className="container notfound">
                <p>Can't find this page!</p>
            </Container>

        </>
    )
}

export default NotFound

