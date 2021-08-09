import React, { useState, useEffect } from "react";
import '../../App.css'
import './augmented-ui.min.css'
import "./UI.css";
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
} from "react-router-dom"
import useSound from 'use-sound'
import db from '../../firebase'
//import Tilt from 'react-parallax-tilt';

//Portfolio -- Child of Panel
function Portfolio(work){
    const[works, setWorks] = useState([]);
    const[loading, setLoading] = useState(false);
    const [select] = useSound(sound1);  
  
    useEffect(() => {
    setLoading(true);
    const ref = db.collection("portfolio").orderBy("projectYear", "desc");  
    const getWorks = () => {
        
        ref.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setWorks(items);
            setLoading(false);
        });
    }
        getWorks();
    }, []);

if (loading) {
    return <Spinner />
} return (
    <div  data-augmented-ui="tl-2-clip-y tr-2-clip-x br-clip bl-2-clip-y both" className="Panel prt"> 
        {works.map((work)=>(
            <NavLink exact className="li w" activeClassName="active" onClick={()=> select()} to={`/${work.id}`} key={work.id} >{work.projectName}</NavLink>
        ))}
    </div>
)}

//Settings -- Child of Panel
function Settings(){
    return (
      <div  data-augmented-ui="tl-2-clip-y tr-2-clip-x br-clip bl-2-clip-y both" className="Panel prt"> 
        Audio <br/>
        Music Volume <br/>
        SFX Volume <br/>
        <br/>
        Display <br/>
        Color Scheme <br/>
    </div>
    );
  }

//Panel -- Child of Parent UI
function Panel() {
      //Portfolio Folder
      const [open] = useSound(sound2);
      const [close] = useSound(sound3);
      const [isPort, openPort] = React.useState(false)
      const [isSett, openSett] = React.useState(false)
  function Toggle(n){
        if (n === 1){
          const isOpen = isPort;
          if (!isOpen){
            openPort(true)
            open()
            const folder = document.getElementById("port");
            folder.style.outline = "#444444 dotted 1px"
        } else if (isOpen) {
            openPort(false)
            close()
            const folder = document.getElementById("port");
            folder.style.outline = "none";
        }
      } else if (n === 2){
          const isOpen = isSett;
            if (!isOpen){
              openSett(true)
              open()
              const folder = document.getElementById("sett");
              folder.style.outline = "#444444 dotted 1px"
          } else if (isOpen) {
              openSett(false)
              close()
              const folder = document.getElementById("sett");
              folder.style.outline = "none";
          }
      }
  } 
    const toggleLi = () => {
            select()
    }

    const [select] = useSound(sound1);   

    return (
      <>
      <div data-augmented-ui="tl-2-clip-y tr-2-clip-x br-clip bl-2-clip-y both" className="Panel nav"> 
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
      <div onClick={() => Toggle(1)} id="port" className="li">
        Portfolio 
        {isPort ? <SideArrow /> : <Arrow />}
      </div>
    </div>      
    <div className="folder">
      <div onClick={() => Toggle(2)} id="sett" className="li">
        Settings
        {isSett ? <SideArrow /> : <Arrow />}
      </div>
    </div>
      </div>
      {isPort ? <Portfolio /> : null}
      {isSett ? <Settings /> : null}
      </>
    )}

//UI -- Parent Component
function UI() {
  return (
    <div className="bigContainer">      
    <Router>          
      <div>
    <Panel />
    </div>
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