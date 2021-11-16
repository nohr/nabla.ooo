import React, { useEffect, useRef } from "react";
import { state } from '../UI/state'
import { useSnapshot } from 'valtio'
import Draggable from "react-draggable"
import '../../App.css'
import { Container } from "../UI/Theme"
import PageData from "./PageData";
import Modal from "../UI/Modal";
import useDocumentTitle from '../UI/documentTitle'
import { HeadSVG } from '../UI/svg'

function SVG(id) {
    const snap = useSnapshot(state);
    // console.log(id.id);
        return (
            <Draggable position={snap.prtPosition} onStart={() => false}>
                    <HeadSVG id={id.id} />
            </Draggable>
        )
    }

const Page = React.memo(function Page(id) {
    useDocumentTitle(id.title)
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
                    <SVG id={id.id}/>
            </Draggable>
            </div>
            <Container className="container">
                <PageData id={id.id} />
                {snap.selectedImg && <Modal/>}
            </Container>
        </div>
    )
})

export { Page }