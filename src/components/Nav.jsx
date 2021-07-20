import React, { Component, useState } from "react";
import "./Panel.css";
import { Arrow, SideArrow } from '../svg'
import Portfolio from "./Portfolio";
import { useLocation, NavLink } from "react-router-dom";
import useSound from 'use-sound';
import select from './select.mp3';

//Current Locator
function HeaderView() {
    const location = useLocation();
    console.log(location.pathname);
    return <span>Path : {location.pathname}</span>
  }

const Nav = () =>{
    const [isOpen, openPortfolio] = React.useState(true)
    const togglePort = () => { 
        if (isOpen) {openPortfolio(false)
        
    } else if (!isOpen) {
        openPortfolio(true)
    } play()}
    
    const group = document.querySelectorAll('.group');
    const [play] = useSound(select);  

    return(
        <div className="nav">
           <NavLink className="li" activeClassName="active" onClick={()=> play()} to="/Store">
           <div  >Store</div>
           </NavLink >
           <NavLink className="li" activeClassName="active" onClick={()=> play()} to="/Contact">
           <div >Contact</div>
           </NavLink >
           <NavLink className="li" activeClassName="active" onClick={()=> play()} to="/About">
           <div >About</div> 
           </NavLink >
           <div className="group"><div onClick={togglePort} className="li">Portfolio {isOpen ? <Arrow /> : <SideArrow />}</div>
            {isOpen ? <Portfolio /> : null}</div>
        </div>
    )
}

export default Nav