import React, { useState, useEffect } from "react";
import { state } from './state'
import { useSnapshot } from 'valtio'
import '../../App.css'
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
import Draggable from 'react-draggable';

//import Tilt from 'react-parallax-tilt';

//Portfolio -- Child of Panel
function Portfolio(work){
  const snap = useSnapshot(state);
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
  <Draggable position={snap.prtPosition} positionOffset={{x: '110%', y: '70%'}} onStart={() => false}>
    <div  data-augmented-ui="tl-2-clip-y tr-2-clip-x br-clip bl-2-clip-y border" className="Panel prt"> 
        {works.map((work)=>(
            <NavLink exact className="li w" activeClassName="active" onClick={()=> select()} to={`/${work.id}`} key={work.id} >{work.projectName}</NavLink>
        ))}
    </div>
  </Draggable>
)}

//Settings -- Child of Panel
function Settings(){
  const snap = useSnapshot(state);
    return (
      <Draggable position={snap.prtPosition} positionOffset={{x: '0%', y: '160%'}} onStart={() => false}>
      <div  data-augmented-ui="tl-2-clip-y tr-2-clip-x br-clip bl-2-clip-y border" className="Panel set"> 
        Audio <br/>
        Music Volume <br/>
        SFX Volume <br/>
        <br/>
        Display <br/>
        Color Scheme <br/>
        Pause Canvas <br/>
    </div>
    </Draggable>
    );
  }

//Panel -- Child of Parent UI
function Panel() {

      //Portfolio Folder
      const [open] = useSound(sound2);
      const [close] = useSound(sound3);
      const snap = useSnapshot(state);

    function Toggle(n) {
    if (n === 1){
      state.isPort ? (state.isPort = false) : (state.isPort = true);
      const folder = document.getElementById("port");
      if (state.isPort){
        open()
        folder.style.outline = "#444444 dotted 1px"
    } else if (!state.isPort) {
        close()
        folder.style.outline = "none";
    }
  } else if (n === 2){
    state.isSett ? (state.isSett = false) : (state.isSett = true);
    const folder = document.getElementById("sett");
        if (state.isSett){
          open()
          folder.style.outline = "#444444 dotted 1px"
      } else if (!state.isSett) {
          close()
          folder.style.outline = "none";
      }
  }
} 
const [select] = useSound(sound1); 
const toggleLi = () => {select()};

const onControlledDrag = (e, position) => {
  let {x, y} = position;
  state.navPosition = {x, y};
  state.prtPosition = {x, y};
};
    
    return (
      <Draggable handle=".grip" bounds="body" position={snap.navPosition} onDrag={onControlledDrag} >
      <div data-augmented-ui="tl-2-clip-y tr-2-clip-x br-clip bl-2-clip-y border" className="Panel nav"> 
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
        {snap.isPort ? <SideArrow /> : <Arrow />}
      </div>
    </div>      
    <div className="folder">
      <div onClick={() => Toggle(2)} id="sett" className="li">
        Settings
        {snap.isSett ? <SideArrow /> : <Arrow />}
      </div>
    </div>
    <div className="grip"></div>
      </div>
      </Draggable>
    )}

//UI -- Parent Component
function UI() {
  const snap = useSnapshot(state);

  return (
    <Router>
    <Panel /> 
    <div className="bigContainer">
    {snap.isPort ? <Portfolio /> : null}
    {snap.isSett ? <Settings /> : null}           
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/store" component={Store} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>    
    
    
        {/* <Feed /> */}
    </div>
    </Router> 
  );
}

export default UI;