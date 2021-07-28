import React, { useState, Component  } from "react";
import '../../App.css'
import "./Panel.css";
import { SvgNabla } from './svg';
import Nav from './Nav.jsx'
import Stream from "../Stream/Stream";
import Home from '../Stream/Home'
import About from '../Stream/About'
import Store from '../Stream/Store'
import Contact from "../Stream/Contact";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import HorizontalScroll from 'react-scroll-horizontal'

function HeaderState() {
  const header = "header";
  return (
    <div className={header} >
      <SvgNabla title="nabla" />        
    </div>
  );
}


function Panel() {
    return (
      
      <div className="Panel">
        <HeaderState />
        <Nav />    
      </div>
      
    )}


function UI() {
  return (
      <>
    <div className="bigContainer">
      <Router>
        <Panel />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Store" component={Store} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
        </Switch>
        </Router> 
        {/* <Feed /> */}
    </div>
    </>
  );
}

export default UI;