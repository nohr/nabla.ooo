import React, { useRef } from 'react'
import { state } from './state'
import { useSnapshot } from 'valtio'
import Draggable from 'react-draggable'
import { motion } from 'framer-motion'

const Modal = () => {
    const snap = useSnapshot(state);
    const nodeRef = useRef(null);
    const descRef = useRef(null);
    const types = new Map([["jpg", "img"], ["jpeg", "img"], ["png", "img"], ["gif", "img"], ["mp4", "video"], ["svg", "svg"]])
    const link = new URL(`${snap.selectedImg}`)
    const extension = link.pathname.split(".")
    const element = types.get(extension[extension.length - 1].toLowerCase())
    // console.log(element);

    const handleClick = (e) => {
        if (e.target.classList.contains('backdrop')) {
            state.selectedImg = null;
            state.selectedDesc = null;
        }
    }
    const onControlledDrag = (e, position) => {
        let { x, y } = position;
        state.modalPosition = { x, y };
        state.descPosition = { x, y };
    };
    return (
        <>
            <motion.div className="backdrop" onClick={handleClick}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                {snap.selectedDesc && <Draggable nodeRef={descRef} bounds="body" position={snap.descPosition} onDrag={onControlledDrag} >
                    <div className='description' ref={descRef}><p>{snap.selectedDesc}</p></div>
                </Draggable>}
                <Draggable nodeRef={nodeRef} bounds="body" position={snap.modalPosition} onDrag={onControlledDrag} >
                    <motion.object ref={nodeRef} data={snap.selectedImg} alt="full content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }} />
                </Draggable>
            </motion.div>
        </>
    )
}

export default Modal