import React, { useEffect, useRef } from "react";
import { state } from '../UI/state'
import { useSnapshot } from 'valtio'
import Draggable from "react-draggable"
import '../../App.css'
import "./Stream.css"
import { Container } from "../UI/Theme"
import PageData from "./PageData";
import Modal from "../UI/Modal";

// function SVG(title) {
//     const snap = useSnapshot(state);
//     if (snap.sectors.at === title) {
//         return(
//         snap.sectors.map((work) => (
//         work.svg
//          ))
//         )} else {
//             return null
//         }
//   }



function Page(title) {
    const container = useRef(null);
    const snap = useSnapshot(state);
    useEffect(() => {
        state.containerWidth = container.current.getBoundingClientRect().width;
        // console.log(container.current.getBoundingClientRect());
    }, [container])
    return (
        <div className="bigContainer" ref={container}>
            <div className="head">
            <Draggable position={snap.prtPosition} onStart={() => false}>
                <br/>
            </Draggable>
            </div>
            <Container className="container">
                <PageData title={title} />
                {snap.selectedImg && <Modal/>}
            </Container>
        </div>
    )
}

export { Page }
