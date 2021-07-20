import React from "react";
import '../App.css'
import "./Panel.css";
import { SvgNabla } from '../svg';
import Nav from './Nav.jsx'
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



function Panel() {
    return (
      
      <div className="slider">
        <div className='logo' >
         <SvgNabla title="nabla" fill='#a1a1a1'  />        
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