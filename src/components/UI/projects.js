//Projects -- Child of Panel
import React, { useRef } from "react"
import { state } from './state'
import { useSnapshot } from 'valtio'
import Draggable from 'react-draggable'
import { Porter, Linker } from "./style"
import sound1 from '../Sounds/select.mp3'
import useSound from 'use-sound'
// import { useFrame } from '@react-three/fiber'

// function MoveCamera() {
//     useFrame((state) => {
//         state.cameraPosition = [60, 15, 0]
//     })
// }

function Projects() {
    const port = useRef(null);
    const snap = useSnapshot(state);
    state.selectedImg = null;
    const [ding] = useSound(sound1, { volume: state.sfxVolume });

    function select() {
        ding()
        state.isPort = false;
        state.isSett = false;
        // MoveCamera()
    }

    //mobile repositioning - BROKEN
    var x = window.matchMedia("(max-width: 768px)");
    let offset = {};
    if (x.matches) { // If media query matches
        offset = { x: '0', y: '340px' };
    } else {
        if (state.isSett) {
            offset = { x: state.navWidth + state.settWidth + 20, y: '0px' };
        } else {
            offset = { x: state.navWidth + 10, y: '0px' };
        }
    }

    if (!state.loading) {
        return (
            <Draggable position={snap.prtPosition} positionOffset={offset} cancel={".li"} onStart={() => false}>
                <Porter ref={port} className="Panel prt">
                    {snap.works && snap.works.map((work) => (
                        <Linker exact className="li w" activeClassName="any" onClick={() => select()} to={`/${work.id}`} key={Math.random()}>{work.name}</Linker>
                    ))}
                </Porter>
            </Draggable>
        )
    } else {
        return null
    }
}

export default Projects