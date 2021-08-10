import React from "react";
import '../../App.css'
import Draggable from "react-draggable";
import { state } from '../UI/state'
import { useSnapshot } from 'valtio'

const NotFound = () => {
    const snap = useSnapshot(state);
    return (  
        <div className="bigContainer">
        <div className="head">
            <Draggable position={snap.prtPosition} onStart={() => false}>    
                <h1>404</h1>
            </Draggable>
        </div>
        <div className="container cnt">
            <p>Can't find this page!</p>
        </div>
        
        </div>
    )}

export default NotFound

