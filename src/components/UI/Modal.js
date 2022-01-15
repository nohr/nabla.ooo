import React, { useRef } from 'react'
import { state } from './state'
import { useSnapshot } from 'valtio'
import Draggable from 'react-draggable'
import { motion } from 'framer-motion'


const Modal = () => {
    const snap = useSnapshot(state);
    const nodeRef = useRef(null);
    const handleClick = (e) => {
        if (e.target.classList.contains('backdrop')) {
            state.selectedImg = null;
        }
    }
    const onControlledDrag = (e, position) => {
        let { x, y } = position;
        state.modalPosition = { x, y };
    };
    return (
        <>
            <motion.div className="backdrop" onClick={handleClick}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <Draggable nodeRef={nodeRef} bounds=".container" position={snap.modalPosition} onDrag={onControlledDrag} >
                    <motion.object ref={nodeRef} data={snap.selectedImg} alt="full content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }} />
                </Draggable>
            </motion.div>
        </>
    )
}

export default Modal