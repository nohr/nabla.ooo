//Projects -- Child of Panel
import { useRef } from "react"
import { state } from './state'
import { useSnapshot } from 'valtio'
import Draggable from 'react-draggable'
import { Linker } from "./style"
import styled from "styled-components"
import sound1 from '../Sounds/select.mp3'
import useSound from 'use-sound'

export const Porter = styled.div`
//projects
  padding: var(--panelPadding);
  position: absolute;
  z-index: 3500;
  left: var(--edge);
  margin: 20px 0;
  text-align: center;
    overflow: scroll !important;

  &::-webkit-scrollbar{
    display: none;
  }
  & .li{
    width: 70%;
    margin: 0 auto 4px auto;
  }
  p{
    margin: 3px auto 5px auto;
    text-align: center;
    width: 90%;
    border-bottom: 1px solid ${props => props.theme.panelColor};
  }
`

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
    //offset panel if settings is open
    let offset = {};
    if (state.isSett) {
        offset = { x: (state.navWidth * 2) - (state.dist * 2), y: '0px' };
    } else {
        offset = { x: state.navWidth - state.dist, y: '0px' };
    }

    if (!state.loading) {
        return (
            <Draggable nodeRef={port} position={snap.prtPosition} positionOffset={offset} cancel={".li"} onStart={() => false}>
                <Porter ref={port} className="Panel prt">
                    <p>Self-Initiate</p>
                    {snap.selfs && snap.selfs.map((work) => (
                        <Linker exact className="li w" activeClassName="any" onClick={() => select()} to={`/${work.id}`} key={Math.random()}>{work.name}</Linker>
                    ))}
                    <br />
                    <p>Client</p>
                    {snap.clients && snap.clients.map((work) => (
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