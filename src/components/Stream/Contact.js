import React from "react";
import '../../App.css'
import Draggable from "react-draggable";
import { state } from '../UI/state'
import { useSnapshot } from 'valtio'

function Contact() {
    const snap = useSnapshot(state);
    return (
        <>
        
        <div className="head">
            <Draggable position={snap.prtPosition} positionOffset={{x: '0%', y: '0%'}} onStart={() => false}>    
                <h1>contact</h1>
            </Draggable>
        </div>
        <div className="container cnt">
            <p>aite@nabla.ooo</p>
        </div>
        
        </>
    )}
export default Contact;
