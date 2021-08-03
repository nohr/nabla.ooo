import React from "react";
import "./Panel.css";
import { Arrow, SideArrow } from './svg'
import Portfolio from "./Portfolio";
import { NavLink } from "react-router-dom";
import useSound from 'use-sound';
import sound1 from '../Sounds/select.mp3';
import sound2 from '../Sounds/open.mp3'
import sound3 from '../Sounds/close.mp3'

const Nav = () =>{
    const folder = document.getElementById("folder");
    // const li = document.getElementsByClassName("active");
    const [isOpen, openPortfolio] = React.useState(false)
    const togglePort = () => { 
        if (isOpen) {openPortfolio(false)
            close()
            //Flash
            folder.style.border = "none";
            setTimeout(function(){
                folder.style.border = "1px dotted #444444";
                setTimeout(function(){
                    folder.style.border = "none";
                    setTimeout(function(){
                        folder.style.border = "1px dotted #444444";
                        setTimeout(function(){
                            folder.style.border = "none";
                        },40);},40);},40);},40);
    } else if (!isOpen) {
        openPortfolio(true)
        open()
        folder.style.border = "1px dotted #444444";
        setTimeout(function(){
            folder.style.border = "none";
            setTimeout(function(){
                folder.style.border = "1px dotted #444444";
                setTimeout(function(){
                    folder.style.border = "none";
                    setTimeout(function(){
                        folder.style.border = "1px dotted #444444";
                        setTimeout(function(){
                            folder.style.border = "none";
                            setTimeout(function(){
                                folder.style.border = "1px dotted #444444";
                            },200);},200);},200);},200);},200);},200);
        
    }}
    const toggleLi = () => {
        // console.log(li)
        // for (var i = 0; i < li.length; i++) {
        // li[i].style.border = "1px dotted #ffffff";
        // setTimeout(function(){
        //     li.style.border = "none";
        //     setTimeout(function(){
        //         li.style.border = "1px dotted #444444";
        //     },30);},30);
        // }
            select()
    }

    const [select] = useSound(sound1);  
    const [open] = useSound(sound2);  
    const [close] = useSound(sound3);  
    
    return(
        <nav className="nav" id="nav">
           <NavLink className="li" activeClassName="active" onClick={()=> toggleLi()} to="/Store">
           <div  >Store</div>
           </NavLink >
           <NavLink className="li" activeClassName="active" onClick={()=> toggleLi()} to="/About">
           <div >About</div> 
           </NavLink >
           <NavLink className="li" activeClassName="active" onClick={()=> toggleLi()} to="/Contact">
           <div >Contact</div>
           </NavLink >
           <div className="folder" ><div onClick={togglePort} id="folder" className="li">Portfolio {isOpen ? <Arrow /> : <SideArrow />}</div>
            {isOpen ? <Portfolio /> : null}</div>
        </nav>
    )
}

export default Nav