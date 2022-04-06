import React, { useRef } from 'react'
import { state } from './state'
import { useSnapshot } from 'valtio'
import Draggable from 'react-draggable'
import { motion } from 'framer-motion'

const Modal = () => {
    const snap = useSnapshot(state);
    const nodeRef = useRef(null);
    const types = new Map([["jpg", "img"], ["jpeg", "img"], ["png", "img"], ["gif", "img"], ["mp4", "video"], ["svg", "svg"]])
    const link = new URL(`${snap.selectedImg}`)
    const extension = link.pathname.split(".")
    const element = types.get(extension[extension.length - 1].toLowerCase())
    console.log(element);
    const handleClick = (e) => {
        if (e.target.classList.contains('backdrop')) {
            state.selectedImg = null;
        }
    }
    const onControlledDrag = (e, position) => {
        let { x, y } = position;
        state.modalPosition = { x, y };
    };

    if (element == "svg") {
        return (
            <>
                <motion.div className="backdrop" onClick={handleClick}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <Draggable nodeRef={nodeRef} bounds=".container" position={snap.modalPosition} onDrag={onControlledDrag} >
                        <motion.img ref={nodeRef} className="svgthumb" key={`${Math.random()}`} src={`${snap.selectedImg}`} alt={`loading`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }} />
                    </Draggable>
                </motion.div>
            </>
        )
    } else {
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
}

export default Modal