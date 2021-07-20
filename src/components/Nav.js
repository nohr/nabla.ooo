import React from "react";
import "./Panel.css";
import {   Link, useLocation } from "react-router-dom";

//Current Locator
function HeaderView() {
    const location = useLocation();
    console.log(location.pathname);
    return <span>Path : {location.pathname}</span>
  }


function Nav(){
    HeaderView();
    return(
        <ul className="nav">
           <Link to="/Store">
           <li> Store </li>
           </Link>
           <Link to="/Contact">
               <li> Contact </li>
            </Link>
            <Link to="/About">
                <li> About</li> 
            </Link>
        </ul>
    )
}

export default Nav