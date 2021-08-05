import React, { useState, Component  } from "react";
import '../../App.css'
import "./Panel.css";
import { SvgNabla } from './svg';
import Nav from './Nav.jsx'
import { useFrame } from "@react-three/fiber";
import Home from '../Stream/Home'
import About from '../Stream/About'
import Store from '../Stream/Store'
import Contact from "../Stream/Contact";
import NotFound from "../Stream/NotFound";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

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
      <div  data-augmented-ui="tl-clip tr-2-clip-x br-clip bl-2-clip-y both" className="Panel"> 
      {/* tl-2-clip-x br-clip bl-2-clip-y */}
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
          <Route component={NotFound} />
        </Switch>
        </Router> 
        {/* <Feed /> */}
    </div>
    </>
  );
}

export default UI;