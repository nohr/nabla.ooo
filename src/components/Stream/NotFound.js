import React from "react";
import '../../App.css'
import Draggable from "react-draggable";
import { state } from '../UI/state'
import { useSnapshot } from 'valtio'
import useDocumentTitle from "../UI/documentTitle";
import { Container } from "../UI/Theme";

const NotFound = () => {
    const snap = useSnapshot(state);
    useDocumentTitle("404 @ Nabla");
    return (
        <>
            <div className="head">
                <Draggable position={snap.prtPosition} onStart={() => false}>
                    <h1>404</h1>
                </Draggable>
            </div>
            <Container className="container notfound">
                <p>Can't find this page!</p>
            </Container>

        </>
    )
}

export default NotFound

