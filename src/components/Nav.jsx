import React from "react";
import "./Panel.css";
import { Arrow, SideArrow } from '../svg'
import Portfolio from "./Portfolio";
import { NavLink } from "react-router-dom";
import useSound from 'use-sound';
import sound1 from './select.mp3';
import sound2 from './open.mp3'
import sound3 from './close.mp3'

const Nav = () =>{
    const [isOpen, openPortfolio] = React.useState(false)
    const togglePort = () => { 
        if (isOpen) {openPortfolio(false)
            close()
    } else if (!isOpen) {
        openPortfolio(true)
        open()
    }}
    
    const [select] = useSound(sound1);  
    const [open] = useSound(sound2);  
    const [close] = useSound(sound3);  
    
    return(
        <nav className="nav" id="nav">
           <NavLink className="li" activeClassName="active" onClick={()=> select()} to="/Store">
           <div  >Store</div>
           </NavLink >
           <NavLink className="li" activeClassName="active" onClick={()=> select()} to="/Contact">
           <div >Contact</div>
           </NavLink >
           <NavLink className="li" activeClassName="active" onClick={()=> select()} to="/About">
           <div >About</div> 
           </NavLink >
           <div className="group"><div onClick={togglePort} className="li">Portfolio {isOpen ? <Arrow /> : <SideArrow />}</div>
            {isOpen ? <Portfolio /> : null}</div>
        </nav>
    )
}

export default Nav