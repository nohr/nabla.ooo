//Settings -- Child of Panel
import React, { useEffect, useRef } from "react"
import { state } from './state'
import { useSnapshot } from 'valtio'
import Draggable from 'react-draggable'
import { Setter, Folder } from "./style"
import sound1 from '../Sounds/select.mp3'
import useSound from 'use-sound'

const Settings = function Settings() {
    const sett = useRef(null);
    const snap = useSnapshot(state);
    state.selectedImg = null;
    const [select] = useSound(sound1, { volume: state.sfxVolume });
    useEffect(() => {
        state.settWidth = sett.current.getBoundingClientRect().width;
    }, [])

    // AUDIO
    // Toggle Mute Switch
    const toggleMute = () => {
        if (state.muted === false) {
            state.sfxVolume = 0.0;
            state.muted = true
        } else if (state.muted === true) {
            state.sfxVolume = 1;
            state.muted = false
        }
        select()
    }

    //DISPLAY
    //Toggle Theme
    const toggleTheme = () => {
        state.themeChanged = true;
        state.theme === 'light' ? state.theme = 'dark' : state.theme = 'light';
        select()
    }
    // Toggle Canvas Visibility
    const canvas = document.getElementsByTagName('canvas')[0];
    function toggleCanvas() {
        if (!state.canvasVisible) {
            //Show Canvas
            state.canvasVisible = true;
            canvas.style.display = "block";
            if (!state.paused) {
                state.paused = true
            } else if (state.paused) {
                state.paused = true
            }
        } else if (state.canvasVisible) {
            //Hide Canvas
            state.canvasVisible = false;
            canvas.style.display = "none";
            if (!state.paused) {
                state.paused = true;
                state.CDRotationY = 0;
                state.CDRotationZ = 0;
                state.autoRotateSpeed = 0;
                state.userControlled = false;
            }
        }
        select()
    }
    //Pause Canvas Animation
    function togglePause() {
        if (!state.paused) {
            //Pause Canvas
            state.paused = true;
            state.CDRotationY = 0;
            state.CDRotationZ = 0;
            state.autoRotateSpeed = 0;
            state.userControlled = false;

        } else if (state.paused) {
            //Play Canvas
            state.paused = false;
            state.CDRotationY = 0.002;
            state.CDRotationZ = 0.0001;
            state.autoRotateSpeed = 0.09;
            state.userControlled = true;
        }
        select()
    }

    //mobile repositioning - BROKEN
    var x = window.matchMedia("(max-width: 768px)");
    let offset = {};
    if (x.matches) { // If media query matches
        offset = { x: '0px', y: '340px' };
    } else {
        offset = { x: state.navWidth + 10, y: 0 };
    }

    return (
        <Draggable position={snap.navPosition} positionOffset={offset} cancel={".li"} onStart={() => false}>
            <Setter ref={sett} className="Panel set">
                Audio <br />
                <Folder onClick={() => toggleMute()} className="li w">{!snap.muted ? "Mute Sound FX" : "Unmute Sound FX"}</Folder><br />
                <br />
                Display <br />
                <Folder onClick={() => toggleTheme()} className="li w">{snap.theme === "light" ? "Dark Theme" : "Light Theme"}</Folder>
                <Folder onClick={() => toggleCanvas()} className="li w">{snap.canvasVisible ? "Hide Canvas" : "Show Canvas"}</Folder>
                {state.canvasVisible && <Folder onClick={() => togglePause()} className="li w">{snap.paused ? "Play Canvas" : "Pause Canvas"}</Folder>}
            </Setter>
        </Draggable>
    );
}

export default Settings