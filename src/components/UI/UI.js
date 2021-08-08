import React, { useState, useEffect, Component } from "react";
import '../../App.css'
import "./Panel.css";
import { SvgNabla, Spinner, Arrow, SideArrow  } from './svg';
import Home from '../Stream/Home'
import About from '../Stream/About'
import Store from '../Stream/Store'
import Contact from "../Stream/Contact";
import NotFound from "../Stream/NotFound";
import sound1 from '../Sounds/select.mp3';
import sound2 from '../Sounds/open.mp3'
import sound3 from '../Sounds/close.mp3'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import { Color } from './Colors'
import useSound from 'use-sound'
import db from '../../firebase'
import Tilt from 'react-parallax-tilt';

function Settings(){
    return (null);
  }

//Portfolio -- Child of Panel
function Portfolio(work){
    const[works, setWorks] = useState([]);
    const[loading, setLoading] = useState(false);
    
    const [select] = useSound(sound1);  
    
    const ref = db.collection("portfolio").orderBy("projectYear", "desc");
    
    function getWorks(){
        setLoading(true);
        ref.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setWorks(items);
            setLoading(false);
        });
    }

    useEffect(() => {
        getWorks();
    }, []);
if (loading) {
    return <Spinner />
} return(
    <div  data-augmented-ui="tl-2-clip-y tr-2-clip-x br-clip bl-2-clip-y both" className="Panel b"> 
        {works.map((work)=>(
            <NavLink exact className="li w" activeClassName="active" onClick={()=> select()} to={`/${work.id}`} key={work.id} >{work.projectName}</NavLink>
        ))}
    </div>
)}

//Panel -- Child of Parent UI
function Panel() {
      //Portfolio Folder
      const [open] = useSound(sound2, {interrupt: false});
      const [close] = useSound(sound3, {interrupt: false});
      const [isOpen, openFolder] = React.useState(false)
      function Toggle(fldr){
      console.log(fldr)
      if (!isOpen){
        openFolder(true)
        open()
        const folder = document.getElementById("port");
        folder.style.outline = "#444444 dotted 1px"
      } else if (isOpen) {
        openFolder(false)
        close()
        const folder = document.getElementById("port");
        folder.style.outline = "none";
      } 
    }

    const toggleLi = () => {
            select()
    }

    const [select] = useSound(sound1, {interrupt: true});   

    return (
      <>
      <div data-augmented-ui="tl-2-clip-y tr-2-clip-x br-clip bl-2-clip-y both" className="Panel a"> 
      <div className='header' >
        <SvgNabla title="nabla" />        
      </div>
            <NavLink className="li" activeClassName="active" onClick={()=> toggleLi()} to="/Store">
            Store
            </NavLink >
            <NavLink className="li" activeClassName="active" onClick={()=> toggleLi()} to="/About">
            About 
            </NavLink >
            <NavLink className="li" activeClassName="active" onClick={()=> toggleLi()} to="/Contact">
            Contact
            </NavLink >
    <div className="folder">
      <div onClick={() => Toggle()} id="port" className="li">
        Portfolio 
        {isOpen ? <Arrow /> : <SideArrow />}
      </div>
    </div>      
    <div className="folder">
      <div onClick={() => Toggle()} id="sett" className="li">
        Settings
      </div>
    </div>
      </div>
      {isOpen ? <Portfolio /> : null}
      </>
    )}

//UI -- Parent Component
function UI() {
  return (
    <div className="bigContainer">      
    <Router>          
    <Panel />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/store" component={Store} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
        </Router> 
        {/* <Feed /> */}
    </div>
  );
}

export default UI;