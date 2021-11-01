//Settings -- Child of Panel

import React, { useEffect, useRef } from "react"
import { state } from './state'
import { useSnapshot } from 'valtio'
import Draggable from 'react-draggable'
import { Setter, Folder } from "./Theme"
import { SvgNabla, Spinner, Arrow, SideArrow } from './svg'
import sound1 from '../Sounds/select.mp3'
import useSound from 'use-sound'


export default function Settings() {
    const sett = useRef(null);
    const snap = useSnapshot(state);
    state.selectedImg = null;
    const [select] = useSound(sound1, { volume: state.sfxVolume });
    useEffect(() => {
        state.settWidth = sett.current.getBoundingClientRect().width;
    }, [])

    const themeToggeler = () => {
        select()
        state.wasClicked = true;
        state.theme === 'light' ? state.theme = 'dark' : state.theme = 'light';

    }

    // Volume
    const volume = () => {
        if (state.muted === false) {
            state.sfxVolume = 0.0;
            select()
            state.muted = true
        } else if (state.muted === true) {
            state.sfxVolume = 1;
            select()
            state.muted = false
        }
    }

    function togglePause() {
        if (!state.paused) {
            state.paused = true;
            select()

        } else if (state.paused) {
            state.paused = false;
            select()
        }
    }

    var x = window.matchMedia("(max-width: 768px)");
    let offset = {};
    if (x.matches) { // If media query matches
        offset = { x: '0px', y: '250px' };
    } else {
        offset = { x: state.navWidth - 20, y: 0 };
    }

    return (
        <Draggable position={snap.navPosition} positionOffset={offset} cancel={".li"} onStart={() => false}>
            <Setter ref={sett} data-augmented-ui="tl-2-clip-y tr-2-clip-x br-clip bl-2-clip-y border" className="Panel set">
                Audio <br />
                <Folder onClick={() => volume()} className="li w">{!snap.muted ? "Mute Sound" : "Unmute Sound"}</Folder><br />
                <br />
                Display <br />
                <Folder onClick={() => themeToggeler()} className="li w">{snap.theme === "light" ? "Dark Theme" : "Light Theme"}</Folder>
                <Folder onClick={() => togglePause()} className="li w">{snap.paused ? "Play Animation" : "Pause Animation"}</Folder><br />
            </Setter>
        </Draggable>
    );
}
