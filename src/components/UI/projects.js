//Projects -- Child of Panel
import { useRef } from "react"
import { state } from './state'
import { useSnapshot } from 'valtio'
import Draggable from 'react-draggable'
import { Porter, Linker } from "./style"
import sound1 from '../Sounds/select.mp3'
import useSound from 'use-sound'

function Projects() {
    const port = useRef(null);
    const snap = useSnapshot(state);
    state.selectedImg = null;
    const [ding] = useSound(sound1, { volume: state.sfxVolume, soundEnabled: !state.muted });

    function select() {
        ding()
        // state.isPort = false;
        // state.isSett = false;
    }

    //intersection observer
    let offset = {};
    if (state.isSett) {
        offset = { x: state.navWidth + state.settWidth - (state.dist * 3), y: '0px' };
    } else {
        offset = { x: state.navWidth - state.dist, y: '0px' };
    }

    if (!state.loading) {
        return (
            <Draggable nodeRef={port} position={snap.prtPosition} positionOffset={offset} cancel={".li"} onStart={() => false}>
                <Porter ref={port} className="Panel prt">
                    <p>Clients</p>
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