import React from "react";
import "./Panel.css";
import SvgNabla from '../svg';
import Nav from './Nav'
import "../App.css";
// import "./components/scroll.js"
import Feed from "./Feed";
import Home from './Home'
import About from './About'
import Store from './Store'
import Contact from "./Contact";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { useSpring, animated } from '@react-spring/three'
import { useDrag } from '@use-gesture/react'



function Panel() {
    return (
      
      <div className="slider">
        <div className='logo' >
         <SvgNabla title="nabla" fill='#a1a1a1'  />        
         <div className="footer">
        ©2017-2021 nabla ltd.
      </div>
        </div>
        <Nav />    
      </div>
      
    )}


function UI() {
  return (
      <>
    <div className="bigContainer">
      <div className="container">
      <Router>
        <Panel />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Store" component={Store} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
        </Switch>
        </Router> 
        <Feed />
      </div>
    </div>
    </>
  );
}

export default UI;